<template>
    <div class="flex gap-10 font-light">
        <TimeSelect
            heading="每方分鐘數"
            :options="[0, 3, 5, 10, 15, 20, 30, 60]"
            unit="分"
            v-model:result="time_setting.initial_time"
        >
        </TimeSelect>

        <div>
            <div class="flex select-none items-center">
                <text
                    :class="[
                        'text-2xl transition-all',
                        time_setting.mode == 'countdown'
                            ? 'text-gray-800'
                            : 'text-gray-400 scale-80 translate-x-[calc(100%+4px)]',
                    ]"
                    @click="time_setting.mode = 'countdown'"
                    >讀秒</text
                >
                <div class="border-r-1 border-gray-400 w-0 h-5 mx-1"></div>
                <text
                    :class="[
                        'text-2xl transition-all',
                        time_setting.mode == 'incremental'
                            ? 'text-gray-800 translate-x-[calc(-100%-8px)]'
                            : 'text-gray-400 scale-90 ',
                    ]"
                    @click="time_setting.mode = 'incremental'"
                    >加秒</text
                >
            </div>
            <TimeSelect
                :options=" [0, 10, 15, 20, 30, 40, 50, 60]"
                unit="秒"
                v-model:result="time_setting.byoyomi"
                v-if="time_setting.mode == 'countdown'"
            ></TimeSelect>

            <TimeSelect
                :options="[0, 3, 5, 10, 20, 30, 40, 50]" unit="秒"
                v-model:result="time_setting.increment"
                v-if="time_setting.mode == 'incremental'"
            ></TimeSelect>
        </div>
    </div>
</template>

<script setup>
import TimeSelect from "./TimeSelect.vue";

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
