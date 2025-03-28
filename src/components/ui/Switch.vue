<template>
    <div class="flex select-none items-center font-thin">
        <text
            :class="[
                'transition-all',
                mode == 0
                    ? 'text-gray-800'
                    : 'text-gray-400 scale-80 translate-x-[calc(100%+var(--spacing))]',
            ]"
            @click="mode = 0"
            >{{ options[0] }}</text
        >
        <div class="border-r-1 border-gray-400 w-0 h-5 mx-1"></div>
        <text
            :class="[
                'transition-all',
                mode == 1
                    ? 'text-gray-800 translate-x-[calc(-100%-var(--spacing)*2)]'
                    : 'text-gray-400 scale-90 ',
            ]"
            @click="mode = 1"
            >{{ options[1] }}</text
        >
    </div>
</template>

<script setup>
const mode = defineModel({
    type: Number,
    required: true,
});

const { options } = defineProps({
    options: {
        type: Array,
        required: true,
    },
});
</script>

<style scoped></style>
