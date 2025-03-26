<template>
    <div class="h-[100vh]">
        <Transition name="fade">
            <Dashboard
                :timer_setting_manager="timer_setting_manager"
                :connection_manager="connection_manager"
                v-if="!ready"
            ></Dashboard>
        </Transition>
        <Transition name="fade">
            <Display
                v-if="ready"
                :timer_l="timer_l"
                :timer_r="timer_r"
            ></Display>
        </Transition>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Dashboard from "@/components/clock_triple/display/Dashboard.vue";
import Display from "@/components/clock_triple/display/Display.vue";

import { TimerSettingManager } from "@/timer/timer_setting_manager";
import { ConnectionManager, Event } from "@/connection/connection_manager";

const ready = ref(false);

const timer_setting_manager = new TimerSettingManager();
const connection_manager = new ConnectionManager();

const timer_l = ref();
const timer_r = ref();

connection_manager.broadcast.add_listener(Event.READY, () => {
    ready.value = true;
    timer_l.value = timer_setting_manager.apply_settings(1);
    timer_r.value = timer_setting_manager.apply_settings(2);
});
</script>

<style scoped>
.fade-enter-active {
    transition: opacity 0.5s ease 0.5s;
    opacity: 0;
}

.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter {
    opacity: 0;
}

.fade-enter-to {
    opacity: 1;
}
.fade-leave-to {
    opacity: 0;
}
</style>
