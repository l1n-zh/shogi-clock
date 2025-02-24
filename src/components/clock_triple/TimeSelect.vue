<template>
    <div class="flex flex-col">
        <div class="flex m-auto">
            <div class="w-min px-4 relative text-5xl font-thin " v-for="time in time_list">
                {{ time }}
                <div
                    :class="[time != time_list.at(-1) ? 'border-r-1' : '', 'h-6 w-full absolute top-1/2 left-1/2 -translate-1/2']">
                </div>
            </div>
        </div>
        <input class="mt-3 border-b-1 text-center w-[3em] m-auto text-4xl font-light" type="number" inputmode="numeric"
            placeholder="自訂" v-model="time" @input="event => { time = Math.min(Math.max(event.target.value,0),600); }">
    </div>
</template>

<script setup>
import { ref } from "vue";
const time_list = [3, 5, 10, 15, 20, 30, 40, 50, 60];
const time = ref();


</script>
