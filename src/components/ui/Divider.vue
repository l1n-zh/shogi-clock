<template>
    <div class="relative inline-block">
        <text class="absolute p-1 bg-white font-light left-1/2 top-1/2 -translate-1/2">
            <slot></slot>
        </text>
        <div class="w-full h-[1px] bg-gray-500 top-1/2 -z-1" v-if="!vertical"></div>
        <div class="h-full w-[1px] bg-gray-500 left-1/2 -z-1" v-if="vertical"></div>
    </div>
</template>

<script setup>
defineProps({
    vertical: {
        type: Boolean,
        default: false,
    },
});
</script>
