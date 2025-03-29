<template>
    <div
        class="flex items-center content-center"
        :style="{
            color: props.color,
            '--border-style': props.line_style,
        }"
    >
        <span class="text px-[.5em] font-light"><slot></slot></span>
    </div>
</template>

<script setup>
const props = defineProps({
    line_style: {
        type: String,
        default: "solid",
    },
    color: {
        type: String,
        default: "var(--color-gray-600)",
    },
});
</script>

<style lang="postcss" scoped>
div::before,
div::after {
    content: "";
    flex: 1;
    border-top: 1px var(--border-style);
}
</style>
