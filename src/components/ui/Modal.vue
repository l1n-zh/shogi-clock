<template>
    <Transition>
        <div
            class="absolute z-2 w-full h-full top-0 left-0 backdrop-blur-xs"
            @click="visible = false"
            v-show="visible"
        ></div>
    </Transition>
    <Transition>
        <div
            class="flex flex-col items-center absolute backdrop-blur-xs border-1 border-gray-100 rounded-md top-1/2 left-1/2 backdrop-brightness-110 -translate-1/2 p-10 z-2 w-max max-w-11/12 select-none"
            v-show="visible"
        >
            <slot></slot>
        </div>
    </Transition>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';

const props = defineProps({
  activator: Object,
});

const visible = ref(false);
let activator_el = null;

const toggle_visibility = () => {
  visible.value = !visible.value;
};

onMounted(() => {
  watch(
    () => props.activator,
    (new_activator, old_activator) => {
    console.log(new_activator, old_activator)
      if (old_activator) {
        old_activator.$el.removeEventListener('click', toggle_visibility);
      }

      if (new_activator) {
        activator_el = new_activator.$el;
        activator_el.addEventListener('click', toggle_visibility);
      }
    },
    { immediate: true }
  );
});

onUnmounted(() => {
  if (activator_el) {
    activator_el.removeEventListener('click', toggle_visibility);
  }
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
