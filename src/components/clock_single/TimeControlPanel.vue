<template>
    <Button
        class="absolute text-sm lg:text-3xl sm:text-xl left-1/2 top-2 -translate-x-1/2"
        ref="setting-button"
        @click="pause()"
        >{{ clock_status == "running" ? "暫停" : "設定" }}</Button
    >
    <Modal :activator="setting_button" v-model="modal">
        <Divider
            class="text-md mb-3"
            line_style="dashed"
            color="var(--color-gray-400)"
            v-if="clock_status == 'paused'"
            >暫停中</Divider
        >
        <div
            :class="[
                'relative flex flex-col',
                clock_status == 'paused' ? 'bg-white' : '',
            ]"
        >
            <div
                class="absolute w-full h-full backdrop-blur-xs bg-white/80 text-center content-center text-2xl font-light z-1 border-1 border-gray-200 text-gray-400"
                v-if="mask"
                @click="mask = false"
            >
                重設棋鐘
            </div>
            <TimeSettingPanel
                :time_settings="time_settings"
                class="mb-3"
            ></TimeSettingPanel>
            <Button @click="update()"> 更新設定 </Button>
        </div>
    </Modal>
</template>

<script setup>
import TimeSettingPanel from "@/components/shared/TimeSettingPanel.vue";
import Button from "@/components/ui/Button.vue";
import Divider from "@/components/ui/Divider.vue";
import Modal from "@/components/ui/Modal.vue";
import { Clock, Event } from "@/timer/clock";

import { useTemplateRef, ref } from "vue";
const setting_button = useTemplateRef("setting-button");

const { clock, time_settings } = defineProps({
    time_settings: Array,
    clock: Clock,
});

const clock_status = ref("initial");
const modal = ref(false);
const mask = ref(false);

clock.broadcast.add_listener(Event.START, () => {
    clock_status.value = "running";
});

function pause() {
    if (clock_status.value == "running") {
        clock.pause();
        clock_status.value = "paused";
        mask.value = true;
    }
}

function update() {
    clock.apply_settings(time_settings);
    clock_status.value = "initial";
    modal.value = false;
}
</script>
