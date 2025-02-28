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

function add_listener(event, callback) {
    this.listeners[event].push(callback);
}

function emit(event) {
    this.listeners[event].forEach((callback) => callback());
}

function ui_update_callback(timer) {
    if (timer.tick_count % UI_UPDATE_RATIO === 0) {
        this.remaining_time = timer.remaining_time;
        this.total_time = timer.total_time;
        this.emit(Event.UPDATE);
    }
}

class CountDownTimer {
    constructor({ initial_time = 0, byoyomi = 0 }) {
        this.initial_time = initial_time;
        this.byoyomi = byoyomi;

        this.is_byoyomi_started = false;

        this.remaining_time = initial_time;
        this.total_time = initial_time;
        this.is_running = false;

        this.listeners = {
            [Event.START]: [],
            [Event.STOP]: [],
            [Event.UPDATE]: [],
            [Event.TIMEOUT]: [],
            [Event.BYOYOMI_START]: [],
        };

        this.emit = emit.bind(this);
        this.add_listener = add_listener.bind(this);

        this.timer = new Timer({
            total_time: initial_time,
            callback: ui_update_callback.bind(this),
            on_timeout: () => {
                this.timer = new Timer({
                    total_time: byoyomi,
                    callback: ui_update_callback.bind(this),
                    on_timeout: () => {
                        this.emit(Event.TIMEOUT);
                    },
                });
                this.timer.start();
                this.is_byoyomi_started = true;
                this.emit(Event.BYOYOMI_START);
            },
        });
    }

    start() {
        if (this.is_running) return;
        this.timer.start();
        this.is_running = true;
        this.emit(Event.START);
    }

    stop() {
        if (!this.is_running) return;
        this.timer.stop();
        this.is_running = false;
        if (this.is_byoyomi_started) {
            this.timer.remaining_time = this.byoyomi;
            this.remaining_time = this.byoyomi;
            this.callback();
        }
        this.emit(Event.STOP);
    }
}

class IncrementalTimer {
    constructor({ initial_time = 0, increment = 0 }) {
        this.initial_time = initial_time;
        this.increment = increment;

        this.callback = callback;

        this.remaining_time = initial_time;
        this.total_time = initial_time;
        this.is_running = false;

        this.timer = new Timer({
            total_time: initial_time,
            callback: ui_update_callback.bind(this),
            on_timeout: () => {
                this.emit(Event.TIMEOUT);
            },
        });
        this.emit = emit.bind(this);
        this.add_listener = add_listener.bind(this);

        this.listeners = {
            [Event.START]: [],
            [Event.STOP]: [],
            [Event.UPDATE]: [],
            [Event.TIMEOUT]: [],
        };
    }

    start() {
        if (this.is_running) return;
        this.timer.start();
        this.is_running = true;
        this.emit(Event.START);
    }

    stop() {
        if (!this.is_running) return;
        this.timer.stop();
        this.is_running = false;
        this.timer.remaining_time += this.increment;
        this.total_time = this.timer.remaining_time;
        this.emit(Event.STOP);
        this.emit(Event.UPDATE);
    }
}

export { CountDownTimer, IncrementalTimer, UI_UPDATE_INTERVAL, Event };
