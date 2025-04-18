<template>
    <div
        :class="[
            'bg-white/70 m-auto border-1 border-gray-200 rounded-md px-6 py-3 md:px-10 md:py-6 w-max max-w-11/12 shadow-xs overflow-auto max-h-11/12 touch-none',
        ]"
    >
        <slot></slot>
    </div>
</template>
