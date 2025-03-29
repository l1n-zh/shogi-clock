<template>
    <div class="relative">
        <ClockVue :timer_l="timer_l" :timer_r="timer_r"></ClockVue>
        <div>
            <Button
                class="absolute lg:text-3xl sm:text-xl text-sm left-1/2 top-2 -translate-x-1/2"
                ref="setting-button"
                >Setting</Button
            >
            <Modal :activator="setting_button">
                <TimeControlPanel
                    :time_settings="time_settings"
                ></TimeControlPanel>
            </Modal>
        </div>
    </div>
</template>

<script setup>
import Button from "@/components/ui/Button.vue";
import Modal from "@/components/ui/Modal.vue";
import { useTemplateRef } from "vue";
import TimeControlPanel from "./TimeControlPanel.vue";

const setting_button = useTemplateRef("setting-button");

const { timer_l, timer_r } = defineProps({
    timer_l: {
        type: Object,
    },
    timer_r: {
        type: Object,
    },
});
</script>
