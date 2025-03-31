<template>
    <div class="flex items-center touch-manipulation">
        <text
            :class="[
                'transition-all',
                option === options[0]
                    ? 'text-gray-800'
                    : 'text-gray-400 scale-80 translate-x-[calc(100%+var(--spacing))]',
            ]"
            @click="option = options[0]"
            >{{ labels[0] }}</text
        >
        <div class="border-r-1 border-gray-400 w-0 h-5 mx-1"></div>
        <text
            :class="[
                'transition-all',
                option === options[1]
                    ? 'text-gray-800 translate-x-[calc(-100%-var(--spacing)*2)]'
                    : 'text-gray-400 scale-90 ',
            ]"
            @click="option = options[1]"
            >{{ labels[1] }}</text
        >
    </div>
</template>

<script setup>
const option = defineModel({
    required: true,
});

const { labels, options } = defineProps({
    labels: {
        type: Array,
        required: true,
    },
    options: {
        type: Array,
        default: () => [0, 1],
    },
});
</script>

<style scoped></style>
