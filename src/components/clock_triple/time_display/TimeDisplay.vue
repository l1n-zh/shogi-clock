<template>
    <div class="grid grid-cols-2 gap-3 h-full w-full place-items-center">
        <Timer
            :byoyomi="byoyomi"
            :initial_time="initial_time"
            :remaining_time="remaining_time"
            :is_byoyomi_started="is_byoyomi_started"
            :is_running="true"
        />
        <Timer
            :byoyomi="byoyomi"
            :initial_time="initial_time"
            :remaining_time="remaining_time"
            :is_byoyomi_started="is_byoyomi_started"
            :is_running="true"
        />
    </div>
    <div class="absolute top-0 left-0">
        <input
            type="range"
            :min="0"
            :max="is_byoyomi_started ? byoyomi : initial_time"
            v-model.number="remaining_time"
        />
        <input type="checkbox" v-model.number="is_byoyomi_started" />
    </div>
</template>

<script setup>
import { ref } from "vue";
const initial_time = ref(600);
const byoyomi = ref(30);
const is_byoyomi_started = ref(false);
const remaining_time = ref(initial_time.value);

import Timer from "./Timer.vue";
</script>

<style scoped>
input {
    border: 1;
}
</style>
