<template>
    <div class="grid grid-cols-2 gap-3 h-full w-full place-items-center">
        <Clock
            :byoyomi="byoyomi"
            :initial_time="initial_time"
            :remaining_time="remaining_time"
            :start_byoyomi="start_byoyomi"
        />
        <Clock
            :byoyomi="byoyomi"
            :initial_time="initial_time"
            :remaining_time="remaining_time"
            :start_byoyomi="start_byoyomi"
        />
    </div>
    <div class="absolute top-0 left-0">
        <input
            type="range"
            :min="0"
            :max="start_byoyomi ? byoyomi : initial_time"
            v-model.number="remaining_time"
        />
        <input type="checkbox" v-model.number="start_byoyomi" />
    </div>
</template>

<script setup>
import { ref } from "vue";
const initial_time = ref(600);
const byoyomi = ref(30);
const start_byoyomi = ref(false);
const remaining_time = ref(initial_time.value);

import Clock from "./Clock.vue";
</script>

<style scoped>
input {
    border: 1;
}
</style>
