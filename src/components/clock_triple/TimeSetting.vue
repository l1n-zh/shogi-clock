<template>
    <div class="flex gap-10 font-light">
        <TimeSelect
            heading="每方分鐘數"
            :options="[0, 3, 5, 10, 15, 20, 30, 60]"
            unit="分鐘"
            v-model:result="time_setting.initial_time"
        >
        </TimeSelect>
        <TimeSelect
            heading="讀秒"
            :options="[0, 10, 15, 20, 30, 40, 50, 60]"
            unit="秒"
            v-model:result="time_setting.byoyomi"
        ></TimeSelect>
    </div>
</template>

<script setup>
import TimeSelect from "./TimeSelect.vue";

const time_setting = defineModel({
    initial_time: {
        type: Number,
    },
    byoyomi: {
        type: Number,
    },
});
</script>
