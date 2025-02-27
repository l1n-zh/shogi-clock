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
                    class="w-full h-full z-0 drop-shadow-lg"
                    :style="{
                        background: `conic-gradient(transparent 0deg var(--degree), ${color} var(--degree) 360deg)`,
                        '--degree': `${degree}deg`,
                        transition: '--degree 1s linear',
                    }"
                ></div>
            </div>
            <div
                class="border-1 aspect-square h-[75%] border-gray-400 rounded-[50%] bg-white drop-shadow-sm m-auto flex z-1"
            >
                <div
                    class="text-5xl sm:text-7xl md:text-8xl lg:text-9xl row-start-2 row-end-3 relative m-auto font-thin"
                >
                    {{ time_string(remaining_time) }}
                    <text
                        class="absolute text-gray-400 md:text-4xl lg:text-5xl sm:text-3xl text-2xl row-start-3 translate-y-full bottom-0 left-1/2 -translate-x-1/2"
                    >
                        {{ start_byoyomi ? "" : time_string(byoyomi) }}
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
    start_byoyomi: Boolean,
});

const { initial_time, byoyomi } = props;
const color = ref("white");
const degree = ref(0);

watchEffect(() => {
    const { remaining_time, start_byoyomi } = props;
    if (
        (start_byoyomi && remaining_time <= 10) ||
        (byoyomi == 0 && remaining_time <= 60)
    )
        color.value = "red";
    else color.value = "white";
    console.log(color.value);
    degree.value =
        (1 - remaining_time / (start_byoyomi ? byoyomi : initial_time)) * 360;
    console.log(degree.value);
});

const time_string = (seconds) => {
    if (seconds < 60) return `${String(seconds).padStart(2, "0")}`;
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
