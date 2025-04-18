<template>
    <button
        class="text-center font-light shadow-sm border-1 border-gray-300 touch-manipulation active:bg-gray-100 active:shadow-none active:translate-y-0.5"
        @touchstart="active = true"
        @touchend="active = false"
        @touchcancel="active = false"
        :class="{
            'bg-gray-100 shadow-none translate-y-0.5': active,
            'rounded-full aspect-square w-[2em] text-center ': shape == 'circle',
            'p-1 sm:p-2 rounded-sm': shape == 'rectangle',
        }"
    >
        <slot></slot>
    </button>
</template>

<script setup>
import { ref } from "vue";
const { shape } = defineProps({
    shape: {
        type: String,
        default: "rectangle",
    },
});
const active = ref(false);
</script>
