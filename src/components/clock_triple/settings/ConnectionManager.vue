<template>
    <div class="flex justify-center items-center font-light">
        <Card
            :class="[
                'transition-all duration-500 delay-500',
                connected ? '' : 'text-gray-300',
            ]"
        >
            <text class="text-4xl font-normal"> 左 </text>
            <br />
            <text class="text-2xl sm:leading-normal leading-none">按鍵</text>
        </Card>
        <ConnectionBreaker v-model="connected"></ConnectionBreaker>
        <Card class="sm:text-6xl text-5xl"> 123456 </Card>
        <ConnectionBreaker v-model="connected"></ConnectionBreaker>
        <Card
            :class="[
                'transition-all duration-500 delay-500',
                connected ? '' : 'text-gray-300',
            ]"
        >
            <text class="text-4xl font-normal"> 右 </text>
            <br />
            <text class="text-2xl sm:leading-normal leading-none">按鍵</text>
        </Card>
    </div>
    <button @click="connected = true" class="border-1 absolute">
        toggle connect
    </button>
</template>

<script setup>
import { ref } from "vue";
import ConnectionBreaker from "./ConnectionBreaker.vue";
import Card from "@/components/ui/Card.vue";
const connected = ref(false);
</script>
