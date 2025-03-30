<template>
    <TimeControlPanel
        :time_settings="time_settings"
        :clock="clock"
    ></TimeControlPanel>
    <div class="h-[100vh]">
        <ClockVue :clock="clock"></ClockVue>
    </div>
    <button @click="clock.press(0)">press 0</button>
    <button @click="clock.press(1)">press 1</button>
</template>

<script setup>
import ClockVue from "@/components/shared/Clock.vue";
import TimeControlPanel from "@/components/clock_single/TimeControlPanel.vue";

import { TimeSettings } from "@/timer/time_settings";

import { Clock } from "@/timer/clock";

const time_settings = new TimeSettings();
const clock = new Clock(time_settings);
</script>

<style scoped>
.fade-enter-active {
    transition: opacity 0.5s ease 0.5s;
    opacity: 0;
}

.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter {
    opacity: 0;
}

.fade-enter-to {
    opacity: 1;
}
.fade-leave-to {
    opacity: 0;
}
</style>
