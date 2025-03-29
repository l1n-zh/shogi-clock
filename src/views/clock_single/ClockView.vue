<template>
    <TimeControlPanel :time_settings="time_settings"></TimeControlPanel>
    <div class="h-[100vh]">
        <ClockVue :clock="clock"></ClockVue>
    </div>
</template>

<script setup>
import ClockVue from "@/components/shared/Clock.vue";
import TimeControlPanel from "@/components/clock_single/TimeControlPanel.vue";

import { onMounted, ref } from "vue";
import { TimeSettings } from "@/timer/time_settings";

import { Clock } from "@/timer/clock";

const time_settings = new TimeSettings();
const clock = ref(new Clock(time_settings));
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
