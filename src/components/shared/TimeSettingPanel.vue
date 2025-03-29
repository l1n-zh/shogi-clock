<template>
    <div class="flex flex-col items-center justify-center">
        <Switch
            v-model="advance_mode"
            :labels="['基本', '進階']"
            class="font-light text-xl"
        ></Switch>

        <div v-if="!advance_mode" class="md:mt-3 mt-1">
            <TimeSetting v-model="time_setting_l"></TimeSetting>
        </div>

        <div v-if="advance_mode" class="flex flex-wrap justify-center gap-6">
            <div class="flex flex-col items-center">
                <Divider class="w-[90%] md:text-md text-sm"> 左 </Divider>
                <TimeSetting v-model="time_setting_l"></TimeSetting>
            </div>

            <div class="flex flex-col items-center">
                <Divider class="w-[90%] md:text-md text-sm">右</Divider>
                <TimeSetting v-model="time_setting_r"></TimeSetting>
            </div>
        </div>
    </div>
</template>

<script setup>
import TimeSetting from "@/components/shared/TimeSetting.vue";
import Switch from "@/components/ui/Switch.vue";
import Divider from "@/components/ui/Divider.vue";

import { TimeSettings } from "@/timer/time_settings";

import { ref, watchEffect, watch } from "vue";

const advance_mode = ref(0);

/**
 * @type {{
 *     time_settings: TimeSettings;
 * }}
 */
const { time_settings } = defineProps({
    time_settings: { type: Object, required: true },
});

const time_setting_l = ref(time_settings[0]);
const time_setting_r = ref(time_settings[1]);

watchEffect(() => {
    time_settings[0] = time_setting_l.value;
    time_settings[1] = advance_mode.value ? time_setting_r.value : time_setting_l.value;
});

watch(advance_mode, () => {
    time_setting_r.value = JSON.parse(JSON.stringify(time_settings[0]));
});
</script>
