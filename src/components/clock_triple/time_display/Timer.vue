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
                        transition: '--degree 1s linear',
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
                    >
                        {{ is_byoyomi_started ? "" : time_string(byoyomi) }}
                    </text>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";

const props = defineProps({
    remaining_time: Number,
    initial_time: Number,
    byoyomi: Number,
    is_byoyomi_started: Boolean,
    is_running: Boolean,
});

const { initial_time, byoyomi } = props;
const alarm = ref(false);
const timeout = ref(true);
const degree = ref(0);

watchEffect(() => {
    const { remaining_time, is_byoyomi_started, is_running } = props;
    alarm.value =
        (is_byoyomi_started && remaining_time <= 10) ||
        (byoyomi == 0 && remaining_time <= 60);
    degree.value =
        (1 -
            (remaining_time - (is_running ? 1 : 0)) /
                (is_byoyomi_started ? byoyomi : initial_time)) *
        360;
    timeout.value = is_byoyomi_started && remaining_time <= 0;
});

const time_string = (seconds) => {
    if (seconds < 10) return String(seconds);
    if (seconds < 60) return String(seconds).padStart(2, "0");
    return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
        seconds % 60
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
