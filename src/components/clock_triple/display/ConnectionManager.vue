<template>
    <div class="flex justify-center items-center font-light">
        <Card
            :class="[
                'transition-all duration-500 delay-500',
                pad_connections[1] ? '' : 'text-gray-300',
            ]"
        >
            <text class="text-4xl font-normal"> 左 </text>
            <br />
            <text class="text-lg sm:leading-normal leading-none">按鍵</text>
        </Card>
        <ConnectionBreaker
            :connected="pad_connections[1]"
            @click="manager.disconnect(1)"
        ></ConnectionBreaker>
        <Card
            :class="['sm:text-6xl text-5xl rounded-t-none']"
            @click="
                pad_connections[1] && pad_connections[2]
                    ? manager.ready()
                    : console.log('copy to clipboard')
            "
        >
            {{ pad_connections[1] && pad_connections[2] ? "start" : clock_id }}
        </Card>
        <ConnectionBreaker
            :connected="pad_connections[2]"
            @click="manager.disconnect(2)"
        ></ConnectionBreaker>
        <Card
            :class="[
                'transition-all duration-500 delay-500',
                pad_connections[2] ? '' : 'text-gray-300',
            ]"
        >
            <text class="text-4xl font-normal"> 右 </text>
            <br />
            <text class="text-lg sm:leading-normal leading-none">按鍵</text>
        </Card>
    </div>
</template>

<script setup>
import { ref } from "vue";
import ConnectionBreaker from "./ConnectionBreaker.vue";
import Card from "@/components/ui/Card.vue";
import { ConnectionManager, Event } from "@/connection/connection_manager";

/**
 * @type {{
 *     manager: ConnectionManager;
 * }}
 */
const { clock_id, manager } = defineProps({
    clock_id: String,
    manager: Object,
});

const pad_connections = ref({
    1: manager.is_pad_connected(1),
    2: manager.is_pad_connected(2),
});

manager.broadcast.add_listener(Event.DISCONNECT, (id) => {
    console.log("disconnect", id);
    pad_connections.value[id] = false;
});

manager.broadcast.add_listener(Event.CONNECT, (id) => {
    console.log("connect", id);
    pad_connections.value[id] = true;
});
</script>
