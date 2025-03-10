<template>
    <div class="w-full h-full">
        <text class="block m-[3vh] font-bold text-gray-400 text-3xl"
            >科摩多龍棋鐘</text
        >
        <div class="grid grid-cols-3 gap-[3vh] mx-[3vh]">
            <div class="border-1">
                <div class="aspect-square bg-gray-200"></div>
                <text class="block w-full text-center text-2xl">單機</text>
            </div>
            <RouterLink to="/triple">
                <div class="border-1">
                    <div class="aspect-square bg-gray-200"></div>
                    <text class="block w-full text-center text-2xl">三機</text>
                </div>
            </RouterLink>
            <div class="border-1">
                <div class="aspect-square bg-gray-200"></div>
                <text class="block w-full text-center text-2xl">聯機</text>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
