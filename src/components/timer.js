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
    }
}

class CountDownTimer {
    constructor({
        initial_time = 0,
        byoyomi = 0,
        callback = () => {},
        on_timeout = () => {},
        on_byoyomi_start = () => {},
        on_start = () => {},
        on_stop = () => {},
    }) {
        this.initial_time = initial_time;
        this.byoyomi = byoyomi;

        this.callback = callback;
        this.on_timeout = on_timeout;
        this.on_byoyomi_start = on_byoyomi_start;
        this.is_byoyomi_started = false;
        this.on_start = on_start;
        this.on_stop = on_stop;

        this.remaining_time = initial_time;
        this.total_time = initial_time;
        this.is_running = false;

        const ui_update_callback = (timer) => {
            if (timer.tick_count % UI_UPDATE_RATIO === 0) {
                this.remaining_time = timer.remaining_time;
                this.total_time = timer.total_time;
                this.callback();
            }
        };

        this.timer = new Timer({
            total_time: initial_time,
            callback: ui_update_callback,
            on_timeout: () => {
                this.timer = new Timer({
                    total_time: byoyomi,
                    callback: ui_update_callback,
                    on_timeout: () => {
                        this.on_timeout();
                    },
                });
                this.timer.start();
                this.is_byoyomi_started = true;
                this.on_byoyomi_start();
            },
        });
    }

    start() {
        if(this.is_running) return;
        this.timer.start();
        this.is_running = true;
        this.on_start();
    }

    stop() {
        if(!this.is_running) return;
        this.timer.stop();
        this.is_running = false;
        if (this.is_byoyomi_started) {
            this.timer.remaining_time = this.byoyomi;
            this.remaining_time = this.byoyomi;
            this.callback();
        }
        this.on_stop();
    }
}

class IncrementalTimer {
    constructor({
        initial_time = 0,
        increment = 0,
        callback = () => {},
        on_timeout = () => {},
        on_start = () => {},
        on_stop = () => {},
    }) {
        this.initial_time = initial_time;
        this.increment = increment;

        this.callback = callback;
        this.on_timeout = on_timeout;
        this.on_start = on_start;
        this.on_stop = on_stop;

        this.remaining_time = initial_time;
        this.total_time = initial_time;

        const ui_update_callback = (timer) => {
            if (timer.tick_count % UI_UPDATE_RATIO === 0) {
                this.remaining_time = timer.remaining_time;
                this.total_time = timer.total_time;
                this.callback();
            }
        };

        this.timer = new Timer({
            total_time: initial_time,
            callback: ui_update_callback,
            on_timeout: () => {
                this.on_timeout();
            },
        });
    }

    start() {
        this.timer.start();
        this.on_start();
    }

    stop() {
        this.timer.stop();
        this.timer.remaining_time += this.increment;
        this.timer.total_time += this.increment;
        this.on_stop();
    }
}

export { CountDownTimer, IncrementalTimer, UI_UPDATE_INTERVAL };
