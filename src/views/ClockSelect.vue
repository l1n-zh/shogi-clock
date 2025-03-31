<template>
    <div class="w-full h-full">
        <text class="block m-[6vh] text-gray-700 text-5xl text-center"
            >科摩多龍棋鐘</text
        >
        <div
            class="grid grid-cols-3 lg:gap-20 sm:gap-10 gap-3 lg:mx-10 sm:mx-5 mx-3 sm:font-light font-thin"
        >
            <RouterLink to="/single">
                <div>
                    <div class="aspect-video content-center">
                        <ClockSingle></ClockSingle>
                    </div>
                    <text class="block w-full text-center text-2xl mt-3"
                        >單機</text
                    >
                </div>
            </RouterLink>
            <RouterLink to="/triple">
                <div>
                    <div class="aspect-video content-center">
                        <ClockTriple />
                    </div>
                    <text class="block w-full text-center text-2xl mt-3"
                        >三機</text
                    >
                </div>
            </RouterLink>
            <div class="opacity-40">
                <div class="aspect-video content-center">
                    <ClockMulti></ClockMulti>
                </div>
                <text class="block w-full text-center text-2xl mt-3">聯機</text>
            </div>
        </div>
    </div>
</template>

<style scoped></style>

<script setup>
import ClockMulti from "@/components/icons/ClockMulti.vue";
import ClockTriple from "@/components/icons/ClockTriple.vue";
import ClockSingle from "@/components/icons/ClockSingle.vue";
</script>
