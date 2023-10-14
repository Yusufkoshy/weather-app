<template>
  <teleport to="body">
    <transition name="modal-outer">
      <div
        v-show="modalActive"
        class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8"
      >
        <div
          v-if="modalActive"
          class="p-4 bg-white self-start mt-32 max-w-scree-md"
        >
          <slot />
          <button
            @click="$emit('close-modal')"
            class="text-white mt-8 bg-sky-800 py-2 px-6"
          >
            Close
          </button>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: {
    modalActive: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close-modal"],
  setup() {},
};
</script>

<style lang="scss" scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}
</style>
