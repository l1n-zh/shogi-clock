<template>
    <Button
        class="absolute text-sm lg:text-3xl sm:text-xl left-1/2 top-2 -translate-x-1/2"
        ref="setting-button"
        >Setting</Button
    >
    <Modal :activator="setting_button">
        <div class="relative">
            <div>
                <Button>開始</Button>
                <Button>暫停</Button>
                <Button>重設</Button>
            </div>
            <!-- <div class="absolute w-full h-full z-1"></div> -->
            <Divider class="text-xl" line_style="dashed">時間設定</Divider>
            <TimeSettingPanel
                :time_settings="time_settings"
                class="px-3"
            ></TimeSettingPanel>
        </div>
    </Modal>
</template>

<script setup>
import TimeSettingPanel from "@/components/shared/TimeSettingPanel.vue";
import Button from "@/components/ui/Button.vue";
import Divider from "@/components/ui/Divider.vue";
import Modal from "@/components/ui/Modal.vue";

import { useTemplateRef } from "vue";

const setting_button = useTemplateRef("setting-button");

const { time_settings } = defineProps({
    time_settings: { type: Object },
});
</script>
