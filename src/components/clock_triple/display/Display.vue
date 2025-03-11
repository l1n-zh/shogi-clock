<template>
    <div class="grid grid-cols-2 gap-3 h-full w-full place-items-center">
        <component :is="typeof_timer(timer_l)" :timer="timer_l" />
        <component :is="typeof_timer(timer_r)" :timer="timer_r" />
        <div class="absolute top-0 left-0">
            <button
                @click="
                    if (timer_l.is_running) timer_l.stop();
                    else timer_l.start();
                "
                class="border-1"
            >
                toggle left
            </button>
            <button
                @click="
                    if (timer_r.is_running) timer_r.stop();
                    else timer_r.start();
                "
                class="border-1"
            >
                toggle right
            </button>
        </div>
    </div>
</template>

<script setup>
import CountDownTimerVue from "./CountDownTimer.vue";
import IncrementalTimerVue from "./IncrementalTimer.vue";
import { CountDownTimer, IncrementalTimer } from "@/timer/timer";

const { timer_l, timer_r } = defineProps({
    timer_l: {
        type: Object,
    },
    timer_r: {
        type: Object,
    },
});

const typeof_timer = (timer) => {
    if (timer instanceof CountDownTimer) return CountDownTimerVue;
    if (timer instanceof IncrementalTimer) return IncrementalTimerVue;
};
</script>

<style scoped>
input {
    border: 1;
}
</style>
