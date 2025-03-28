<template>
        <Sheet class="flex flex-col items-center justify-center gap-6">
            <div>進階設定 <Switch v-model="advance_mode" :options="['基本','進階']"></Switch></div>
            <div v-if="!advance_mode">
                <TimeSetting v-model="timer_setting_l"></TimeSetting>
            </div>
            <div v-if="advance_mode" class="flex">
                <Divider :vertical="true"> 左 </Divider>
                <TimeSetting v-model="timer_setting_l" class="mr-10"></TimeSetting>
                <Divider :vertical="true"> 右 </Divider>
                <TimeSetting v-model="timer_setting_r"></TimeSetting>
            </div>
        </Sheet>
</template>

<script setup>
import TimeSetting from "@/components/shared/TimeSetting.vue";
import Sheet from "@/components/ui/Sheet.vue";
import Switch from "@/components/ui/Switch.vue";
import Divider from "@/components/ui/Divider.vue";

import { TimerSettingManager } from "@/timer/timer_setting_manager";

import { ref, watchEffect } from "vue";

const advance_mode = ref(0);

/**
 * @type {{
 *     timer_setting_manager: TimerSettingManager;
 * }}
 */
const { timer_setting_manager } = defineProps({
    timer_setting_manager: { type: Object, required:true },
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
