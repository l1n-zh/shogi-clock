<template>
    <Transition>
        <div
            class="absolute z-2 w-full h-full top-0 left-0 backdrop-blur-xs"
            @click="enable = false"
            v-show="enable"
        ></div>
    </Transition>
    <Transition>
        <div
            class="flex flex-col items-center absolute backdrop-blur-xs border-1 border-gray-100 rounded-md top-1/2 left-1/2 backdrop-brightness-110 -translate-1/2 p-10 z-2 w-max max-w-11/12 select-none"
            v-show="enable"
        >
            <slot></slot>
        </div>
    </Transition>
</template>

<script setup>
const enable = defineModel();
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
