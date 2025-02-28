<template>
    <div class="w-full max-w-[100vh] relative aspect-square">
        <div
            class="box-content border-3 border-gray-100 aspect-square h-full rounded-[50%] flex bg-gray-50 inset-shadow relative"
        >
            <div
                class="w-full h-full absolute rounded-full z-0"
                style="
                    mask-image: radial-gradient(circle, black 0%, black 100%);
                "
            >
                <div
                    class="w-full h-full z-0 drop-shadow-lg transition-all"
                    :style="{
                        background: `conic-gradient(transparent 0deg var(--degree), ${
                            alarm ? 'var(--color-red-500)' : 'white'
                        } var(--degree) 360deg)`,
                        '--degree': `${degree}deg`,
                        transition: `--degree ${UI_UPDATE_INTERVAL}ms linear`,
                    }"
                ></div>
            </div>
            <div
                :class="[
                    ' border-1 aspect-square bg-white h-[75%] rounded-[50%] drop-shadow-sm m-auto flex z-1 transition-all',
                    timeout
                        ? 'border-red-500 border-10 md:border-20'
                        : alarm
                        ? 'border-red-500 border-5'
                        : 'border-gray-400',
                ]"
            >
                <div
                    :class="[
                        'text-4xl sm:text-7xl md:text-8xl lg:text-9xl row-start-2 row-end-3 relative m-auto transition-all',
                        timeout
                            ? 'text-red-500 sm:font-bold font-bold'
                            : alarm
                            ? 'text-red-500 font-normal scale-130'
                            : 'text-black font-thin',
                    ]"
                >
                    {{ timeout ? "時間切" : time_string(remaining_time) }}
                    <text
                        class="absolute text-gray-400 md:text-4xl lg:text-5xl sm:text-3xl text-2xl row-start-3 translate-y-full bottom-0 left-1/2 -translate-x-1/2"
                        v-if="!is_byoyomi_started"
                    >
                        {{ time_string(timer.byoyomi) }}
                    </text>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { CountDownTimer, UI_UPDATE_INTERVAL } from "../../timer";

const { timer } = defineProps({
    timer: CountDownTimer,
});

const alarm = ref(false);
const timeout = ref(false);
const degree = ref(0);
const is_byoyomi_started = ref(false);
const remaining_time = ref(timer.remaining_time);

timer.on_byoyomi_start = () => {
    is_byoyomi_started.value = true;
};

timer.callback = () => {
    remaining_time.value = timer.remaining_time;
    alarm.value = timer.is_byoyomi_started && timer.remaining_time <= 10000;
    degree.value =
        (1 -
            (timer.remaining_time -
                (timer.is_running ? UI_UPDATE_INTERVAL : 0)) /
                timer.total_time) *
        360;
};

timer.on_timeout = () => {
    timeout.value = true;
};

const time_string = (ms) => {
    if (ms < 60000) {
        if (alarm.value) {
            return `${Math.floor(ms / 1000)}.${Math.floor((ms % 1000) / 100)}`;
        }
        return String(Math.ceil(ms / 1000));
    }

    return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(
        s % 60
    ).padStart(2, "0")}`;
};
</script>

<style scoped>
.shadow {
    box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.25);
}

.inset-shadow {
    box-shadow: inset 2px 2px 4px 0 rgba(0, 0, 0, 0.25);
}

@property --degree {
    syntax: "<angle>";
    inherits: false;
    initial-value: 0deg;
}
</style>
