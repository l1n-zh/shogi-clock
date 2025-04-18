<template>
    <div
        class="flex items-center content-center"
        :style="{
            color: props.color,
            '--line-style': props.line_style,
            '--line-width': props.line_width,
        }"
    >
        <span class="text px-[.5em] font-light"><slot></slot></span>
    </div>
</template>

<script setup>
const props = defineProps({
    line_width: {
        type: String,
        default: "1px",
    },
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
    border-top-width: var(--line-width);
    border-top-style: var(--line-style);
}
</style>