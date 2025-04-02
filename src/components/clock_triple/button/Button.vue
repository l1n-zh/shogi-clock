<template>
    <button
        class="bg-white w-full h-full p-5 touch-none select-none fixed-element"
        @touchstart="pressed = true"
        @touchend="pressed = false"
        @touchcancel="pressed = false"
    >
        <div
            class="bg-gray-200 w-full h-full rounded-xl button p-[12px] transition-all duration-10"
            :class="[
                pressed
                    ? 'pressed'
                    : 'normal border-r-8 border-b-6 border-[hsl(0,0%,60%)]',
            ]"
        >
            <div
                class="bg-gray-100 w-full h-full rounded-xl border-gray-300 border-2"
            ></div>
        </div>
    </button>
</template>

<script setup>
import { ref } from "vue";

const pressed = ref(false);
</script>

<style scoped lang="postcss">
.normal {
    box-shadow: inset 2px 2px 4px hsl(0, 0%, 100%),
        inset -1px -1px 2px hsl(0, 0%, 50%), inset -2px -2px 4px hsl(0, 0%, 80%),
        3px 3px 6px hsl(0, 0%, 40%);
}
.pressed {
    box-shadow: inset 3px 3px 6px hsl(0, 0%, 100%),
        inset -2px -2px 4px hsl(0, 0%, 80%), inset -1px -1px 2px hsl(0, 0%, 80%),
        2px 2px 4px hsl(0, 0%, 50%);
    scale: 0.98;
    translate: 6px 6px;
}
</style>
