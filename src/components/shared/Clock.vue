<template>
    <div class="grid grid-cols-2 gap-3 h-full w-full place-items-center">
        <component :is="typeof_timer(clock.timers[0])" :timer="clock.timers[0]" />
        <component :is="typeof_timer(clock.timers[1])" :timer="clock.timers[1]" />
    </div>
</template>

<script setup>
import CountDownTimerVue from "./CountDownTimer.vue";
import IncrementalTimerVue from "./IncrementalTimer.vue";
import { CountDownTimer, IncrementalTimer } from "@/timer/timer";
import { Clock } from "@/timer/clock";

const { clock } = defineProps({
    clock: {
        type: Clock,
        required: true,
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
