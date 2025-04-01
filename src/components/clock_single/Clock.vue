<template>
    <div class="grid grid-cols-2 gap-3 h-full w-full place-items-center">
        <component
            :is="typeof_timer(timers[0])"
            :timer="timers[0]"
            :key="timers"
            @click="clock.press(0)"
        />
        <component
            :is="typeof_timer(timers[1])"
            :timer="timers[1]"
            :key="timers"
            @click="clock.press(1)"
        />
    </div>
</template>

<script setup>
import CountDownTimerVue from "@/components/shared/CountDownTimer.vue";
import IncrementalTimerVue from "@/components/shared/IncrementalTimer.vue";
import { CountDownTimer, IncrementalTimer } from "@/timer/timer";
import { Clock, Event } from "@/timer/clock";

import { ref } from "vue";

const { clock } = defineProps({
    clock: {
        type: Clock,
        required: true,
    },
});

const timers = ref(clock.timers);

clock.broadcast.add_listener(Event.SETTING_UPDATE, () => {
    timers.value = clock.timers;
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
