<template>
    <div class="flex gap-10">
        <span>
            <text class="block text-2xl text-gray-500">每方分鐘數</text>
            <span class="border-b-1 w-min mr-0.5">
                <text class="text-6xl">{{ time_setting.initial_time }}</text>
            </span>
            <text class="text-2xl font-light">分鐘</text>
        </span>
        <TimeSelect :options="[0, 3, 5, 10, 15, 20, 30, 60]" unit="分鐘" v-if="1" v-model="time_setting.initial_time"></TimeSelect>
        <span>
            <text class="block text-2xl text-gray-500">讀秒</text>
            <span class="border-b-1 w-min mr-0.5">
                <text class="text-6xl">{{ time_setting.byoyomi }}</text>
            </span>
            <text class="text-2xl font-light">秒</text>
        </span>
        <TimeSelect :options="[0, 10, 15, 20, 30, 40, 50, 60]" unit="秒" v-if="1" :callback="value => time_setting.initial_time = 10"></TimeSelect>
    </div>

</template>

<script setup>
import TimeSelect from './TimeSelect.vue';

const time_setting = defineModel({
    initial_time: {
        type: Number,
        default: 10
    },
    byoyomi: {
        type: Number,
        default: 30
    }
})
</script>