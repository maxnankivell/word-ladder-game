<template>
  <div class="modal-container" :class="[colorMode === 'dark' ? 'dark' : 'light']">
    <slot></slot>
  </div>
  <div class="modal-background" :class="[colorMode === 'dark' ? 'dark' : 'light']" />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useColorModeStore } from "@/stores/color-mode-store";
import { computed, defineProps } from "vue";

interface Props {
  modalWidth: string;
  modalHeight: string;
}
const props = defineProps<Props>();

const { colorMode } = storeToRefs(useColorModeStore());

const computedWidth = computed(() => props.modalWidth);
const computedHeight = computed(() => props.modalHeight);
</script>

<style scoped lang="scss">
.modal-container {
  position: fixed;
  left: 50vw;
  top: 50vh;
  transform: translate(-50%, -50%);
  width: v-bind(computedWidth);
  height: v-bind(computedHeight);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 2.4rem;
  border-radius: 1.2rem;
  overflow: auto;
  z-index: 999;
  align-items: center;
  &.light {
    background-color: $isabelline;
  }
  &.dark {
    background-color: $oxfordBlue;
  }
}
.modal-background {
  z-index: 998;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0.5;
  &.light {
    background-color: $oxfordBlue;
  }
  &.dark {
    background-color: black;
  }
}
</style>
