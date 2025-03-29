const TimerMode = {
    COUNTDOWN: "countdown",
    INCREMENTAL: "increment",
};

class TimeSettings {
    constructor() {
        return [
            {
                initial_time: 10, // minutes
                byoyomi: 30, // seconds
                increment: 5, // seconds
                mode: "countdown",
            },
            {
                initial_time: 10,
                byoyomi: 30,
                increment: 5,
                mode: "countdown",
            },
        ];
    }
}

export { TimeSettings, TimerMode };
