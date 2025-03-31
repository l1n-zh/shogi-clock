<template>
    <Teleport to="body">
        <Transition>
            <div
                class="fixed w-full h-full top-0 left-0 backdrop-blur-xs z-2 flex touch-none select-none"
                v-show="visible"
                @click.prevent="visible = false"
            >
                <div
                    :class="[
                        'bg-white/70 m-auto border-1 border-gray-200 rounded-md px-6 py-3 md:px-10 md:py-6 w-max max-w-11/12 shadow-xs overflow-auto max-h-11/12 touch-none',
                        props.class,
                    ]"
                    v-show="visible"
                    @click.stop=""
                >
                    <slot></slot>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from "vue";

const props = defineProps({
    activator: Object,
    class: { type: String, default: "" },
});

const visible = defineModel({ default: false })
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
