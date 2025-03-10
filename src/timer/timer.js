const TIMER_TICK_INTERVAL = 10;
const UI_UPDATE_INTERVAL = 50;
const UI_UPDATE_RATIO = UI_UPDATE_INTERVAL / TIMER_TICK_INTERVAL;

class Timer {
    constructor({
        total_time = 0,
        callback = (timer) => {},
        on_timeout = () => {},
    }) {
        this.total_time = total_time;
        this.callback = callback;
        this.on_timeout = on_timeout;

        this.remaining_time = total_time;
        this.tick_count = 0;
    }

    start() {
        if (this.interval) return;
        this.interval = setInterval(() => {
            this.remaining_time -= TIMER_TICK_INTERVAL;
            if (this.remaining_time <= 0) {
                this.on_timeout();
                this.stop();
                return;
            }
            ++this.tick_count;
            this.callback(this);
        }, TIMER_TICK_INTERVAL);
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }
}

const Event = {
    START: "start",
    STOP: "stop",
    UPDATE: "update",
    TIMEOUT: "timeout",
    BYOYOMI_START: "byoyomi_start",
};

class Broadcast {
    /**
     *
     * @param  {...Event} events
     */
    constructor(...events) {
        this.listeners = {};
        events.forEach((event) => {
            this.listeners[event] = [];
        });
    }

    /**
     *
     * @param {Event} event
     * @param {function} callback
     */
    add_listener(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    /**
     *
     * @param {Event} event
     * @returns
     */
    emit(event) {
        if (!this.listeners[event]) return;
        this.listeners[event].forEach((callback) => callback());
    }
}

function ui_update_callback(timer) {
    if (timer.tick_count % UI_UPDATE_RATIO === 0) {
        this.remaining_time = timer.remaining_time;
        this.total_time = timer.total_time;
        this.broadcast.emit(Event.UPDATE);
    }
}

class CountDownTimer {
    /**
     *
     * @param {Number} initial_time - Initial time in milliseconds
     * @param {Number} byoyomi - Byoyomi time in milliseconds
     */
    constructor({ initial_time = 0, byoyomi = 0 }) {
        this.initial_time = initial_time;
        this.byoyomi = byoyomi;

        this.is_byoyomi_started = false;

        this.remaining_time = initial_time;
        this.total_time = initial_time;
        this.is_running = false;

        this.broadcast = new Broadcast(
            Event.START,
            Event.STOP,
            Event.UPDATE,
            Event.TIMEOUT,
            Event.BYOYOMI_START
        );

        this.timer = new Timer({
            total_time: initial_time,
            callback: ui_update_callback.bind(this),
            on_timeout: () => {
                this.timer = new Timer({
                    total_time: byoyomi,
                    callback: ui_update_callback.bind(this),
                    on_timeout: () => {
                        this.broadcast.emit(Event.TIMEOUT);
                    },
                });
                this.timer.start();
                this.is_byoyomi_started = true;
                this.broadcast.emit(Event.BYOYOMI_START);
            },
        });
    }

    start() {
        if (this.is_running) return;
        this.timer.start();
        this.is_running = true;
        this.broadcast.emit(Event.START);
    }

    stop() {
        if (!this.is_running) return;
        this.timer.stop();
        this.is_running = false;
        if (this.is_byoyomi_started) {
            this.timer.remaining_time = this.byoyomi;
            this.remaining_time = this.byoyomi;
            this.broadcast.emit(Event.UPDATE);
        }
        this.broadcast.emit(Event.STOP);
    }
}

class IncrementalTimer {
    /**
     *
     * @param {Number} initial_time - Initial time in milliseconds
     * @param {Number} increment - Increment time in milliseconds
     */
    constructor({ initial_time = 0, increment = 0 }) {
        this.initial_time = initial_time;
        this.increment = increment;

        this.remaining_time = initial_time;
        this.total_time = initial_time;
        this.is_running = false;

        this.broadcast = new Broadcast(
            Event.START,
            Event.STOP,
            Event.UPDATE,
            Event.TIMEOUT
        );

        this.timer = new Timer({
            total_time: initial_time,
            callback: ui_update_callback.bind(this),
            on_timeout: () => {
                this.broadcast.emit(Event.TIMEOUT);
            },
        });
    }

    start() {
        if (this.is_running) return;
        this.timer.start();
        this.is_running = true;
        this.broadcast.emit(Event.START);
    }

    stop() {
        if (!this.is_running) return;
        this.timer.stop();
        this.is_running = false;
        this.timer.remaining_time += this.increment;
        this.timer.total_time = this.timer.remaining_time;

        this.remaining_time = this.timer.remaining_time;
        this.total_time = this.timer.total_time;

        this.broadcast.emit(Event.UPDATE);
        this.broadcast.emit(Event.STOP);
    }
}

export { CountDownTimer, IncrementalTimer, UI_UPDATE_INTERVAL, Event };
