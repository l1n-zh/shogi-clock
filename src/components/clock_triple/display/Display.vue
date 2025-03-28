<template>
    <Clock :timer_l="timer_l" :timer_r="timer_r"></Clock>
</template>

<script setup>
import Clock from "@/components/shared/Clock.vue";

const { timer_l, timer_r } = defineProps({
    timer_l: {
        type: Object,
    },
    timer_r: {
        type: Object,
    },
});
</script>
