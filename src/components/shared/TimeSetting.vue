<template>
    <div class="flex md:gap-6 gap-3 font-light max-w-fit">
        <TimeSelect
            heading="每方分鐘數"
            :options="[0, 5, 10, 15, 20, 30, 60]"
            unit="分"
            v-model="time_setting.initial_time"
        >
        </TimeSelect>

        <div>
            <Switch
                :options="[TimerMode.COUNTDOWN, TimerMode.INCREMENTAL]"
                :labels="['讀秒', '加秒']"
                v-model="time_setting.mode"
                class="text-2xl"
            ></Switch>
            <TimeSelect
                :options="[0, 5, 10, 20, 30, 60]"
                unit="秒"
                v-model="time_setting.byoyomi"
                v-if="time_setting.mode == TimerMode.COUNTDOWN"
            ></TimeSelect>

            <TimeSelect
                :options="[0, 2, 5, 10]"
                unit="秒"
                v-model="time_setting.increment"
                v-if="time_setting.mode == TimerMode.INCREMENTAL"
            ></TimeSelect>
        </div>
    </div>
</template>

<script setup>
import Switch from "../ui/Switch.vue";
import TimeSelect from "./TimeSelect.vue";
import { TimerMode } from "@/timer/time_settings";

const time_setting = defineModel({
    mode: {
        type: String,
    },
    initial_time: {
        type: Number,
    },
    byoyomi: {
        type: Number,
    },
    increment: {
        type: Number,
    },
});
</script>
