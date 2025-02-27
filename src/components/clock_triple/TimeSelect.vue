<template>
    <Transition>
        <div
            class="absolute z-2 w-full h-full top-0 left-0 backdrop-blur-xs"
            @click="
                enable = false;
                result = selected_value;
            "
            v-show="enable"
        ></div>
    </Transition>
    <Transition>
        <div
            class="flex flex-col absolute backdrop-blur-xs border-1 border-gray-100 rounded-md top-1/2 left-1/2 backdrop-brightness-110 -translate-1/2 p-10 z-2 w-max max-w-11/12 select-none"
            v-show="enable"
        >
            <ul class="flex m-auto flex-wrap">
                <li
                    :class="[
                        'w-min px-4 relative text-5xl font-thin after:border-gray-500 after:border-r-1 after:h-6 after:w-full after:absolute after:top-1/2 after:left-1/2 after:-translate-1/2 last:after:border-r-0',
                        option === selected_value
                            ? 'text-gray-600'
                            : 'text-gray-400',
                    ]"
                    v-for="option in options"
                    @click="selected_value = option"
                >
                    {{ option }}
                </li>
            </ul>
            <div class="m-auto">
                <span class="mt-3 border-b-1">
                    <input
                        class="text-center text-5xl font-thin w-[2em] outline-0"
                        inputmode="numeric"
                        v-model="selected_value"
                        @input="
                            (event) => {
                                selected_value = verify_input(
                                    event.target.value
                                );
                            }
                        "
                    />
                </span>
                <text class="font-light text-2xl">{{ unit }}</text>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { ref } from "vue";

const options = [0, 3, 5, 10, 15, 20, 30, 60];

const props = defineProps({
    unit: String,
    options: Array,
    enable: Boolean,
});

const result = defineModel("result", {
    type: Number,
});
const selected_value = ref(result.value);
const enable = defineModel("enable", {
    type: Boolean,
});

const verify_input = (value) => {
    if (isNaN(value)) return "";
    return Math.min(Math.max(value, 0), 600);
};
</script>

<style lang="postcss" scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease-in-out;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
