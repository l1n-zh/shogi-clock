<template>
    <div class="absolute z-1 w-full h-full backdrop-blur-xs" @click="enable = false; result = selected_value"
        v-show="enable">
    </div>
    <div class="flex flex-col absolute backdrop-blur-xs border-1 border-gray-100 rounded-md top-1/2 left-1/2 -translate-1/2 p-10 z-2 w-max max-w-10/12 backdrop-brightness-125 select-none"
        v-show="enable">
        <div class="flex m-auto flex-wrap">
            <div class="w-min px-4 relative text-5xl font-thin" v-for="option in options"
                @click="selected_value = option">
                {{ option }}
                <div
                    :class="[option != options.at(-1) ? 'border-r-1' : '', 'h-6 w-full absolute top-1/2 left-1/2 -translate-1/2']">
                </div>
            </div>
        </div>
        <div class="m-auto">
            <span class="mt-3 border-b-1">
                <input class="text-center text-5xl font-thin w-[2em]" inputmode="numeric" v-model="selected_value"
                    @input="event => { selected_value = verify_input(event.target.value) }">
            </span>
            <text class="font-light text-2xl">{{ unit }}</text>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const options = [0, 3, 5, 10, 15, 20, 30, 60];

const props = defineProps({
    unit: String,
    options: Array,
    enable: Boolean
})

const result = defineModel('result', {
    type: Number
})
const selected_value = ref(result.value);
const enable = defineModel('enable', {
    type: Boolean
})

const verify_input = value => {
    if (isNaN(value)) return "";
    return Math.min(Math.max(value, 0), 600);
}

</script>
