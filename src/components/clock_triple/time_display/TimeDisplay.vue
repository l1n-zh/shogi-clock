<template>
    <div class="grid grid-cols-2 gap-3 h-full w-full place-items-center">
        <CountDownTimerVue :timer="timer_l" />
        <IncrementalTimerVue :timer="timer_r" />
    </div>

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
</template>

<script setup>
import { ref } from "vue";
import CountDownTimerVue from "./CountDownTimer.vue";
import IncrementalTimerVue from "./IncrementalTimer.vue";
import { CountDownTimer, IncrementalTimer } from "../../timer";

const timer_l = new CountDownTimer({
    initial_time: 1 * 1000,
    byoyomi: 10 * 1000,
});

const timer_r = new IncrementalTimer({
    initial_time: 11 * 1000,
    increment: 1 * 1000,
});
</script>

<style scoped>
input {
    border: 1;
}
</style>
