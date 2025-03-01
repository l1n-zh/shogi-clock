<template>
    <Timer :timer="timer" :alarm="alarm">
        <Transition>
            <text>+{{ timer.increment/1000 }}</text>
        </Transition>
    </Timer>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import Timer from "./Timer.vue";
import { Event, IncrementalTimer, UI_UPDATE_INTERVAL } from "../../timer";

/**
 * @type {{
 *     timer: IncrementalTimer;
 * }}
 */
const { timer } = defineProps({
    timer: { type: Object },
});

const alarm = ref(false);

timer.broadcast.add_listener(Event.UPDATE, () => {
    alarm.value = timer.is_running && timer.remaining_time <= 3000 + UI_UPDATE_INTERVAL;
});

timer.broadcast.add_listener(Event.STOP, () => {});
</script>

<style scoped>
.v-leave-active {
    transition: all 0.5s ease-out;
}

.v-leave-to {
    font-size: 0;
    opacity: 0;
}
</style>
