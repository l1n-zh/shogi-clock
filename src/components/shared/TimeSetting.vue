<template>
    <div class="flex gap-10 font-light">
        <TimeSelect
            heading="每方分鐘數"
            :options="[0, 5, 10, 15, 20, 30, 60]"
            unit="分"
            v-model="timer_setting.initial_time"
        >
        </TimeSelect>

        <div>
            <div class="flex select-none items-center">
                <text
                    :class="[
                        'text-2xl transition-all',
                        timer_setting.mode == TimerMode.COUNTDOWN
                            ? 'text-gray-800'
                            : 'text-gray-400 scale-80 translate-x-[calc(100%+4px)]',
                    ]"
                    @click="timer_setting.mode = TimerMode.COUNTDOWN"
                    >讀秒</text
                >
                <div class="border-r-1 border-gray-400 w-0 h-5 mx-1"></div>
                <text
                    :class="[
                        'text-2xl transition-all',
                        timer_setting.mode == TimerMode.INCREMENTAL
                            ? 'text-gray-800 translate-x-[calc(-100%-8px)]'
                            : 'text-gray-400 scale-90 ',
                    ]"
                    @click="timer_setting.mode = TimerMode.INCREMENTAL"
                    >加秒</text
                >
            </div>
            <TimeSelect
                :options="[0, 5, 10, 20, 30, 60]"
                unit="秒"
                v-model="timer_setting.byoyomi"
                v-if="timer_setting.mode == TimerMode.COUNTDOWN"
            ></TimeSelect>

            <TimeSelect
                :options="[0, 2, 5, 10]"
                unit="秒"
                v-model="timer_setting.increment"
                v-if="timer_setting.mode == TimerMode.INCREMENTAL"
            ></TimeSelect>
        </div>
    </div>
</template>

<script setup>
import TimeSelect from "./TimeSelect.vue";
import { TimerMode } from "@/timer/timer_setting_manager";

const timer_setting = defineModel({
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
