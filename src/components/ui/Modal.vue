<template>
    <Transition>
        <Teleport to="body">
            <div
                class="fixed w-screen h-screen top-0 left-0 backdrop-blur-xs z-2 border-1 flex"
                v-show="visible"
                @click.prevent="visible = false"
            >
                <div
                    class="bg-white/70 m-auto border-1 border-gray-100 rounded-md backdrop-brightness-110 p-10 w-max max-w-11/12 select-none shadow-xs"
                    v-show="visible"
                    @click.stop=""
                >
                    <slot></slot>
                </div>
            </div>
        </Teleport>
    </Transition>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from "vue";

const props = defineProps({
    activator: Object,
});

const visible = ref(false);
let activator_el = null;

const toggle_visibility = () => {
    visible.value = !visible.value;
};

const get_activator_el = (activator) => {
    if (activator.$el) {
        return activator.$el;
    }
    if (activator instanceof HTMLElement) {
        return activator;
    }
    return null;
};

const remove_listener = () => {
    if (activator_el) {
        activator_el.removeEventListener("click", toggle_visibility);
    }
};

onMounted(() => {
    watch(
        () => props.activator,
        (new_activator, old_activator) => {
            console.log(new_activator, old_activator);
            remove_listener();
            if (new_activator) {
                activator_el = get_activator_el(new_activator);
                activator_el.addEventListener("click", toggle_visibility);
            }
        },
        { immediate: true }
    );
});

onUnmounted(() => {
    remove_listener();
});
</script>

<style lang="postcss" scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
