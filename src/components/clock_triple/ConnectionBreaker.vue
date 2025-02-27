<template>
        <span class="w-25 relative select-none">
            <hr
                :class="[
                    'w-full transition-colors duration-300 delay-400 top-1/2 absolute -z-1',
                    connected ? 'border-black' : 'border-gray-300',
                ]"
            />

            <Transition>
                <div
                    v-show="!connected"
                    class="bg-white text-2xl writing-rl text-gray-300 absolute h-max left-1/2 -translate-1/2"
                >
                    未連線
                </div>
            </Transition>

            <Transition name="breaker">
                <div
                    v-show="connected"
                    class="w-0 h-6 border-x-transparent border-x-[4px] border-y-[8px]  absolute left-1/2 -translate-1/2"
                    @click="connected = false"
                >
                    <text
                        class="absolute w-max text-2xl top-0 -translate-x-1/2 -translate-y-[130%]"
                        >切斷</text
                    >
                </div>
            </Transition>
        </span>

</template>

<script setup>
import { ref } from "vue";

const connected = defineModel({type: Boolean});
</script>

<style lang="postcss" scoped>
.writing-rl {
    writing-mode: vertical-rl;
}

.v-enter-from {
    transform: scaleY(0.2) scaleX(0);
    color: white;
}

.v-enter-active {
    transition: all 0.5s ease-in-out 0.5s;
}

.v-enter-to {
    transform: scale(1);
}

.v-leave-active {
    transition: all 0.5s linear;
}

.v-leave-to {
    transform: rotate3d(0, 1, 0, 90deg);
    color: white;
}

.breaker-enter-from {
    opacity: 0;
    height: 30pt;
}

.breaker-enter-active {
    transition: all 0.5s ease-out 0.7s;
}

.breaker-enter-to {
    opacity: 1;
}

.breaker-leave-active {
    transition: all 0.5s ease-in, opacity 0.5s linear 0.3s;
}
.breaker-leave-to {
    height: 0;
    opacity: 0;
}
</style>
