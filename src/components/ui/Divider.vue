<template>
    <div class="relative flex h-20">
        <text class="p-1 bg-white m-auto font-thin">
            <slot></slot>
        </text>
        <div class="w-full h-[1px] absolute bg-gray-500 top-1/2 -z-1" v-if="!vertical"></div>
        <div class="h-full w-[1px] absolute bg-gray-500 left-1/2 -z-1" v-if="vertical"></div>
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
