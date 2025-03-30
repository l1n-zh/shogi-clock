<template>
    <div class="h-min text-5xl relative flex items-end">
        <span class="border-b-1 w-min h-min mb-2">
            <input
                class="text-center font-thin line-0 leading-none -mb-2 outline-0"
                :style="{ width: props.width }"
                inputmode="numeric"
                v-model="_input"
                @input="
                    (event) => {
                        input = verify_input(event.target.value);
                        _input = input;
                    }
                "
            />
        </span>
        <text class="font-light text-2xl">{{ props.unit }}</text>
    </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
const input = defineModel();

// using v-model on input directly may display invalid input still
const _input = ref(input.value);
watchEffect(() => {
    _input.value = input.value;
});

const props = defineProps({
    unit: String,
    width: { type: String, default: "2em" },
});

const verify_input = (value) => {
    return Math.min(Math.max(value.replace(/\D/g, ""), 0), 600);
};
</script>
