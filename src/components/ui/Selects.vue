<template>
    <div>
        <ul class="flex m-auto flex-wrap">
            <li
                :class="[
                    'w-min px-4 relative text-5xl font-thin touch-manipulation',
                    'after:border-gray-500 after:border-r-1 after:h-6 after:w-full after:absolute after:top-1/2 after:left-1/2 after:-translate-1/2 last:after:border-r-0',
                    option === selected ? 'text-gray-600' : 'text-gray-400',
                ]"
                v-for="option in options"
                @click="selected = option"
            >
                {{ option }}
            </li>
        </ul>
    </div>
</template>

<script setup>
const props = defineProps({
    options: Array,
});

const selected = defineModel();
</script>
