<template>
  <BasicModal modal-width="50rem" modal-height="200rem">
    <h1 class="header">How To Play</h1>
    <p class="history">Created in 1877 by Lewis Carroll - Word Ladder has been a hit ever since</p>
    <p class="rules">
      Given a four letter start word and a four letter end word, the goal of Word Ladder is to connect the two words.
      Each connecting word must only be one letter different than the word before it.
    </p>
    <!-- enter an example? -->
    <p class="hint-expaination">
      If you get stuck at any point you can click the hint button to get the best word to enter next.
    </p>
    <p class="solution-expaination">
      If you get really stuck you can click the solution button to get the shortest solution.
    </p>
    <p class="reset-expaination">
      After you finish the puzzle, either reset to try again or click generate new puzzle to get a new puzzle.
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
</style>
