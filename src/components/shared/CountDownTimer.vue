<template>
    <Timer :timer="timer" :alarm="alarm">
        <Transition>
            <div v-if="!is_byoyomi_started">
                {{ timer.byoyomi / 1000 }}
            </div>
        </Transition>
    </Timer>
</template>

<script setup>
import { ref } from "vue";
import Timer from "./Timer.vue";
import {
    CountDownTimer,
    Event,
    UI_UPDATE_INTERVAL,
} from "@/timer/timer";

/**
 * @type {{
 *     timer: CountDownTimer;
 * }}
 */
const { timer } = defineProps({
    timer: { type: Object },
});
const alarm = ref(false);
const is_byoyomi_started = ref(false);

timer.broadcast.add_listener(Event.UPDATE, () => {
    alarm.value =
        timer.is_byoyomi_started &&
        timer.remaining_time <= 3000 + UI_UPDATE_INTERVAL;
});

timer.broadcast.add_listener(Event.BYOYOMI_START, () => {
    is_byoyomi_started.value = true;
});
</script>

<style scoped>
.v-leave-active {
    transition: all 0.5s ease-out;
}

.v-leave-to {
    transform: translateY(-2em) scale(1.5);
    opacity: 0;
}
</style>
