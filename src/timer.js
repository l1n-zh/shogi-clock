class Timer {
    constructor({
        initial_time,
        byoyomi,
        timer_tick = 10,
        callback_threshold = 50,
        on_ui_update = () => {},
        on_timeout = () => {},
        on_byoyomi = () => {},
    }) {
        this.initial_time = initial_time;
        this.byoyomi = byoyomi;
        this.timer_tick = timer_tick;
        this.callback_threshold = callback_threshold;
        this.on_ui_update = on_ui_update;
        this.on_timeout = on_timeout;
        this.on_byoyomi = on_byoyomi;

        this.remaining_time = initial_time;
        this.is_byoyomi_started = false;
        this.is_running = false;
        this.tick_count = 0;
    }

    start() {
        if (this.is_running) return;
        this.is_running = true;
        this.interval = setInterval(() => {
            this.remaining_time -= this.timer_tick;
            if (this.remaining_time <= 0) {
                if (this.is_byoyomi_started) {
                    this.on_timeout();
                    this.stop();
                    return;
                } else {
                    this.is_byoyomi_started = true;
                    this.remaining_time = this.byoyomi;
                    this.on_byoyomi();
                }
            }
            ++this.tick_count;
            if (this.tick_count % this.callback_threshold === 0) {
                this.on_ui_update();
            }
        }, this.timer_tick);
    }

    stop() {
        this.is_running = false;
        clearInterval(this.interval);
    }
}

export { Timer };