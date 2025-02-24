<template>
    <TimeSetting v-model="time_setting"></TimeSetting>
    <button @click="console.log(time_setting)">log</button>
</template>

<script setup>
import TimeSetting from "./TimeSetting.vue";
import { ref, reactive, unref } from "vue";

const time_setting = ref({
    initial_time: 10,
    byoyomi: 30,
});
</script>