<template>
    <div class="grid grid-cols-2 gap-3 h-full w-full place-items-center">
        <Timer :timer="timer" />
        <Timer :timer="timer" />
    </div>
    <div class="absolute top-0 left-0">
        <button
            @click="
                if (timer.is_running) timer.stop();
                else timer.start();
            "
            class="border-1"
        >
            toggle
        </button>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Timer from "./Timer.vue";
import { CountDownTimer, IncrementalTimer } from "../../timer";

const timer = new CountDownTimer({
    initial_time: 11*1000,
    byoyomi: 10*1000,
});
</script>

<style scoped>
input {
    border: 1;
}
</style>
