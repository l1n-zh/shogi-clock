<template>
    <div class="text-2xl">
        <span ref="selector" class="select-none">
            <text class="block text-gray-800">{{ heading }}</text>
            <span class="border-b-1 w-min mr-0.5">
                <text class="text-6xl">{{ result }}</text>
            </span>
            <text>{{ unit }}</text>
        </span>
        <Modal :activator="selector" class="flex flex-col items-center">
            <Selects :options="options" v-model="result"></Selects>
            <NumberInput v-model="result" :unit="unit"></NumberInput>
        </Modal>
    </div>
</template>

<script setup>
import NumberInput from "@/components/ui/NumberInput.vue";
import Selects from "@/components/ui/Selects.vue";
import Modal from "@/components/ui/Modal.vue";

import { useTemplateRef } from "vue";

const selector = useTemplateRef("selector");

const props = defineProps({
    heading: String,
    unit: String,
    options: Array,
});

const result = defineModel({
    type: Number,
});
</script>
