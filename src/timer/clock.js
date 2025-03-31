import { IncrementalTimer, CountDownTimer } from "./timer";
import { TimeSettings } from "./time_settings";
import { Broadcast } from "@/utils/broadcast";

const Event = {
    START: "start",
    PAUSE: "pause",
    SETTING_UPDATE: "update",
};

const Status = {
    INITIAL: "initial",
    RUNNING: "running",
    PAUSED: "paused",
};

class Clock {
    /**
     * @param { TimeSettings } time_settings
     */
    constructor(time_settings) {
        this.broadcast = new Broadcast(
            Event.START,
            Event.PAUSE,
            Event.SETTING_UPDATE
        );
        this.apply_settings(time_settings);
    }

    start() {
        this.timers[this.running_timer_id].start();
        this.status = Status.RUNNING;
        this.broadcast.emit(Event.START);
    }

    pause() {
        this.timers[this.running_timer_id].stop(false);
        this.status = Status.PAUSED;
        this.broadcast.emit(Event.PAUSE);
    }

    apply_settings(settings) {
        this.timers = settings.map((setting) => create_timer(setting));
        this.running_timer_id = 0;
        this.status = Status.INITIAL;
        this.broadcast.emit(Event.SETTING_UPDATE);
    }

    press(timer_id) {
        if (this.status === Status.INITIAL) {
            this.running_timer_id = timer_id;
            this.running_timer_id = this.get_next_timer_id();
            this.start();
        } else if (this.status === Status.PAUSED) {
            this.start();
        } else if (this.running_timer_id === timer_id) {
            this.timers[this.running_timer_id].stop();
            this.running_timer_id = this.get_next_timer_id();
            this.timers[this.running_timer_id].start();
        }
    }

    get_next_timer_id() {
        return (this.running_timer_id + 1) % this.timers.length;
    }
}

/**
 * @param {TimeSettings} settings
 * @returns {CountDownTimer | IncrementalTimer}
 * @throws invalid settings
 */
function create_timer(setting) {
    const { initial_time, byoyomi, increment, mode } = setting;
    const is_valid_setting =
        initial_time > 0 || (mode === "countdown" && byoyomi > 0);

    if (!is_valid_setting) {
        throw new Error("Invalid settings");
    }

    if (mode === "countdown") {
        return new CountDownTimer({
            initial_time: initial_time * 60 * 1000,
            byoyomi: byoyomi * 1000,
        });
    } else {
        return new IncrementalTimer({
            initial_time: initial_time * 60 * 1000,
            increment: increment * 1000,
        });
    }
}

export { Clock, Event };
