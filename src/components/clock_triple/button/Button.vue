<template>
    <div class="bg-white w-full h-full p-5">
        <div
            class="bg-gray-200 w-full h-full rounded-2xl button p-[12px] transition-all"
        >
            <div
                class="bg-gray-100 w-full h-full rounded-2xl border-gray-300 border-2"
            ></div>
        </div>
    </div>
</template>

<style scoped lang="postcss">
.button {
    box-shadow: inset 2px 2px 4px hsl(0, 0%, 100%),
        inset -1px -1px 2px hsl(0, 0%, 50%), inset -2px -2px 4px hsl(0, 0%, 80%),
        3px 3px 6px hsl(0, 0%, 50%);
}
.button:hover {
    box-shadow: inset 1px 1px 2px hsl(0, 0%, 100%), inset -2px -2px 4px hsl(0, 0%, 80%),
        inset -1px -1px 2px hsl(0, 0%, 80%), 2px 2px 4px hsl(0, 0%, 50%);
    translate: 2px 2px;
}
</style>
