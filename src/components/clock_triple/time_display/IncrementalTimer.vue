<template>
    <Timer :timer="timer" :alarm="alarm">
        <div :class="animation"
            @animationend="animation = ''"
        >+{{ timer.increment / 1000 }}</div>
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
const animation = ref("");

timer.broadcast.add_listener(Event.UPDATE, () => {
    alarm.value = timer.remaining_time <= 3000 + UI_UPDATE_INTERVAL;
});

timer.broadcast.add_listener(Event.STOP, () => {
    animation.value = "fade";
});

</script>

<style scoped>
.fade {
    animation: fade 1s both;
}

@keyframes fade {
    50% {
        transform: translateY(-2em) scale(1.2);
        opacity: 0;
    }
    51%{
        transform: translateY(110%);
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
</style>
