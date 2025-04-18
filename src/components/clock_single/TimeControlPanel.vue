<template>
    <Button
        class="absolute text-3xl lg:text-4xl left-1/2 top-2 -translate-x-1/2 !px-3 text-gray-700"
        :class="{
            'z-3': setting_overlay == false,
        }"
        shape="circle"
        @click="clock_status == 'running' ? pause() : adjust_settings()"
        >{{ clock_status == "running" ? "⏸︎" : "⏱︎" }}</Button
    >
    <Overlay v-model="paused_overlay">
        <div
            class="w-full h-full flex flex-col items-center justify-center gap-3 font-light"
            @click="start()"
        >
            <text class="text-3xl text-gray-300 text-center breathing">
                暫停中
            </text>
            <Divider
                class="w-2/3"
                line_width="2px"
                color="var(--color-gray-500)"
            >
                <text class="text-6xl text-gray-500 text-center mx-3">
                    點擊繼續
                </text>
            </Divider>
        </div>
    </Overlay>

    <Overlay v-model="setting_overlay">
        <Panel class="relative flex flex-col">
            <TimeSettingPanel
                :time_settings="time_settings"
                class="mb-3"
            ></TimeSettingPanel>
            <Button @click="update()"> 更新設定 </Button>
        </Panel>
    </Overlay>
</template>

<script setup>
import TimeSettingPanel from "@/components/shared/TimeSettingPanel.vue";
import Button from "@/components/ui/Button.vue";
import Overlay from "@/components/ui/Overlay.vue";
import Panel from "@/components/ui/Panel.vue";
import Divider from "@/components/ui/Divider.vue";
import { Clock, Event } from "@/timer/clock";

import { ref } from "vue";

const { clock, time_settings } = defineProps({
    time_settings: Array,
    clock: Clock,
});

const clock_status = ref("initial");

const paused_overlay = ref(false);
const setting_overlay = ref(false);

clock.broadcast.add_listener(Event.START, () => {
    clock_status.value = "running";
});

function pause() {
    if (clock_status.value == "running") {
        clock.pause();
        clock_status.value = "paused";
        paused_overlay.value = true;
    }
}

function update() {
    clock.apply_settings(time_settings);
    paused_overlay.value = false;
    setting_overlay.value = false;
    clock_status.value = "initial";
}

function start() {
    clock.start();
    paused_overlay.value = false;
    setting_overlay.value = false;
    clock_status.value = "running";
}

function adjust_settings() {
    setting_overlay.value = true;
}
</script>

<style scoped>
@keyframes breathing {
    0%,
    100% {
        opacity: 1;
    }
    80% {
        opacity: 0.3;
    }
    60% {
        opacity: 1;
    }
}

.breathing {
    animation: breathing 3s linear infinite;
}
</style>
