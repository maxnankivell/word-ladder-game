<template>
  <BasicModal modal-width="40rem" modal-height="25rem">
    <p class="main-message" :class="[colorMode === 'dark' ? 'dark' : 'light']">
      There are no possible paths from this word to the target word within 6 guesses.
    </p>
    <button class="close" :class="[colorMode === 'dark' ? 'dark' : 'light']" type="button" @click="emit('close')">
      Close
    </button>
  </BasicModal>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
import { storeToRefs } from "pinia";
import { useColorModeStore } from "@/stores/color-mode-store";

import BasicModal from "@/components/BasicModal.vue";

const emit = defineEmits<{
  (emit: "close"): void;
}>();

const { colorMode } = storeToRefs(useColorModeStore());
</script>

<style scoped lang="scss">
.close {
  margin-top: auto;
  font-size: 2.8rem;

  &.light {
    background-color: $yInMnBlue-1-light;
    box-shadow: 0 4px 6px -1px rgb(11 19 43 / 0.1), 0 2px 4px -2px rgb(11 19 43 / 0.1);
    color: $isabelline;
  }
  &.dark {
    background-color: $spaceCadet-1-dark;
    color: $isabelline;
    box-shadow: 0px 0px 0px 3px rgba(58, 80, 107, 0.5) inset;
  }
}

.main-message {
  padding: 0 1.2rem;
  margin: 0;
  font-size: 2.4rem;
  text-align: center;

  &.light {
    color: $yInMnBlue-1-light;
  }
  &.dark {
    color: white;
  }
}
</style>
