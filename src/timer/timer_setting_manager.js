import { CountDownTimer, IncrementalTimer } from "./timer";

const TimerMode = {
    COUNTDOWN: "countdown",
    INCREMENTAL: "increment",
};

class TimerSettingManager {
    constructor() {
        this.settings = {
            1: {
                initial_time: 10, // minutes
                byoyomi: 30, // seconds
                increment: 5, // seconds
                mode: "countdown",
            },
            2: {
                initial_time: 10,
                byoyomi: 30,
                increment: 5,
                mode: "countdown",
            },
        };
    }

    /**
     * @param {Number} player_id
     * @returns {CountDownTimer | IncrementalTimer}
     * @throws invalid settings
     */
    apply_settings(player_id) {
        if (!this.is_valid_setting(player_id)) {
            throw new Error("Invalid settings");
        }

        const { initial_time, byoyomi, increment, mode } =
            this.settings[player_id];

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

    /**
     * @param {Number} player_id
     * @returns {Boolean}
     */
    is_valid_setting(player_id) {
        const { initial_time, byoyomi, increment, mode } =
            this.settings[player_id];
        return initial_time > 0 || (mode === "countdown" && byoyomi > 0);
    }
}

export { TimerSettingManager, TimerMode };
