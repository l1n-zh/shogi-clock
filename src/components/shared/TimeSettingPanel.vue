<template>
    <Sheet class="flex flex-col items-center justify-center">
        <Switch
            v-model="advance_mode"
            :labels="['基本', '進階']"
            class="font-light text-xl md:mb-3"
        ></Switch>

        <div v-if="!advance_mode">
            <TimeSetting v-model="timer_setting_l"></TimeSetting>
        </div>

        <div v-if="advance_mode" class="flex flex-wrap justify-center gap-6">
            <div class="flex flex-col items-center">
                <Divider class="w-[90%] md:text-md text-sm"> 左 </Divider>
                <TimeSetting v-model="timer_setting_l"></TimeSetting>
            </div>

            <div class="flex flex-col items-center">
                <Divider class="w-[90%] md:text-md text-sm">右</Divider>
                <TimeSetting v-model="timer_setting_r"></TimeSetting>
            </div>
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
    timer_setting_manager: { type: Object, required: true },
});

const timer_setting_l = ref(timer_setting_manager.settings[1]);
const timer_setting_r = ref(timer_setting_manager.settings[2]);

watchEffect(() => {
    timer_setting_manager.settings[1] = timer_setting_l.value;
    console.log(advance_mode.value);
    if (!advance_mode.value) {
        timer_setting_manager.settings[2] = timer_setting_l.value;
    }
    timer_setting_manager.settings[2] = timer_setting_r.value;
});
</script>
