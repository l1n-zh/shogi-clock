<template>
    <div class="flex flex-col items-center justify-center h-full gap-6">
        <ConnectionControlPanel
            :manager="connection_manager"
            clock_id="12345"
        ></ConnectionControlPanel>
        <TimeSettingPanel :time_settings="time_settings"></TimeSettingPanel>
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
import ConnectionControlPanel from "./ConnectionControlPanel.vue";
import TimeSettingPanel from "@/components/shared/TimeSettingPanel.vue";

import { TimeSettings } from "@/timer/time_settings";
import { ConnectionManager } from "@/connection/connection_manager";

import { ref } from "vue";

const advance_mode = ref(false);

/**
 * @type {{
 *     time_settings: TimeSettings;
 *     connection_manager: ConnectionManager;
 * }}
 */
const { time_settings, connection_manager } = defineProps({
    time_settings: { type: Object },
    connection_manager: { type: Object },
});
</script>
