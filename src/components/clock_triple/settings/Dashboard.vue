<template>
    <div class="flex flex-col items-center justify-center h-full gap-6">
        <ConnectionManager></ConnectionManager>
        <TimeSetting v-model="time_setting"></TimeSetting>
    </div>
    <button @click="console.log(time_setting)">log</button>
</template>

<script setup>
import TimeSetting from "@/components/clock_triple/TimeSetting.vue";
import ConnectionManager from "@/components/clock_triple/ConnectionManager.vue";
import { ref } from "vue";

const time_setting = ref({
    mode:"countdown",
    initial_time: 10,
    increment: 10,
    byoyomi: 30,
});
</script>
