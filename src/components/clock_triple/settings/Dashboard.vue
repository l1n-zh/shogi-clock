<template>
    <div class="flex flex-col items-center justify-center h-full gap-6">
        <ConnectionManagerVue
            :manager="connection_manager"
            clock_id="12345"
        ></ConnectionManagerVue>
        <TimeSetting v-model="timer_setting_l"></TimeSetting>

        <div v-if="advance_mode">
            <TimeSetting v-model="timer_setting_l"></TimeSetting>
            <TimeSetting v-model="timer_setting_r"></TimeSetting>
        </div>
        <div class="fixed left-0 top-0">
            <button @click="connection_manager.connect(1)" class="border-1">
                connect 1
            </button>
            <button @click="connection_manager.connect(2)" class="border-1">
                connect 2
            </button>
            <button></button>
        </div>
    </div>
</template>

<script setup>
import TimeSetting from "./TimeSetting.vue";
import ConnectionManagerVue from "./ConnectionManager.vue";

import { TimerSettingManager } from "@/timer/timer_setting_manager";
import { ConnectionManager, Event } from "@/connection/connection_manager";

import { ref, watchEffect } from "vue";

const advance_mode = ref(false);

/**
 * @type {{
 *     timer_setting_manager: TimerSettingManager;
 *     connection_manager: ConnectionManager;
 * }}
 */
const { timer_setting_manager, connection_manager } = defineProps({
    timer_setting_manager: { type: Object },
    connection_manager: { type: Object },
});

const timer_setting_l = ref(timer_setting_manager.settings[1]);
const timer_setting_r = ref(timer_setting_manager.settings[2]);

watchEffect(() => {
    timer_setting_manager.settings[1] = timer_setting_l.value;
    timer_setting_manager.settings[2] = advance_mode.value
        ? timer_setting_r.value
        : timer_setting_l.value;
});
</script>
