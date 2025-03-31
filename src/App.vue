<template>
    <div class="h-[100vh] select-none">
        <router-view v-slot="{ Component }">
            <transition>
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>

<script setup>
</script>

<style scoped></style>
