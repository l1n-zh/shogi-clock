<template>
    <div class="flex flex-col items-center justify-center h-full gap-6">
        <ConnectionManager></ConnectionManager>
        <TimeSetting v-model="time_setting"></TimeSetting>
    </div>
    <button @click="console.log(time_setting)">log</button>
</template>

<script setup>
import TimeSetting from "./TimeSetting.vue";
import ConnectionManager from "./ConnectionManager.vue";
import { ref } from "vue";

const time_setting = ref({
    initial_time: 10,
    byoyomi: 30,
});
</script>
