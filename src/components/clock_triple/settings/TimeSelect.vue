<template>
    <div>
        <span @click="select_clicked = true" class="select-none">
            <text class="block text-2xl text-gray-800">{{ heading }}</text>
            <span class="border-b-1 w-min mr-0.5">
                <text class="text-6xl">{{ result }}</text>
            </span>
            <text class="text-2xl">{{ unit }}</text>
        </span>
        <Dialog v-model="select_clicked">
            <Selects :options="options" v-model="result"></Selects>
            <NumberInput v-model="result" :unit="unit"></NumberInput>
        </Dialog>
    </div>
</template>

<script setup>
import NumberInput from "@/components/ui/NumberInput.vue";
import Selects from "@/components/ui/Selects.vue";
import Dialog from "@/components/ui/Dialog.vue";

import { ref } from "vue";

const props = defineProps({
    heading: String,
    unit: String,
    options: Array,
});

const result = defineModel("result", {
    type: Number,
});

const select_clicked = ref(false);
</script>
