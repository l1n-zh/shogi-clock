<template>
    <div class="flex flex-col">
        <div class="flex m-auto flex-wrap">
            <div class="w-min px-4 relative text-5xl font-thin select-none" v-for="option in options"
                @click="result = option">
                {{ option }}
                <div
                    :class="[option != options.at(-1) ? 'border-r-1' : '', 'h-6 w-full absolute top-1/2 left-1/2 -translate-1/2']">
                </div>
            </div>
        </div>
        <div class="m-auto">
            <span class="mt-3 border-b-1">
                <input class="text-center text-5xl font-thin w-[2em]" inputmode="numeric" v-model="result"
                    @input="event => { result = verify_input(event.target.value) }">
            </span>
            <text class="font-light text-2xl">{{ unit }}</text>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
const options = [0, 3, 5, 10, 15, 20, 30, 60];

defineProps({
    unit: String,
    options: Array
})

const result = defineModel()

const verify_input = value => {
    if (isNaN(value)) return "";
    return Math.min(Math.max(value, 0), 600);
}

</script>
