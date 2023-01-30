<template>
  <BasicModal modal-width="50rem" modal-height="70rem">
    <h1 class="header" :class="[colorMode === 'dark' ? 'dark' : 'light']">How To Play</h1>
    <p class="main-message rules" :class="[colorMode === 'dark' ? 'dark' : 'light']">
      Given a four letter start word and a four letter end word, the goal of Word Ladder is to connect the two words.
      Each connecting word must only be one letter different than the word before it.
    </p>
    <img
      v-if="colorMode === 'dark'"
      class="example-gif"
      src="@/assets/gifs/dark-mode.gif"
      alt="example gif showing how to solve a simple word ladder puzzle"
    />
    <img
      v-if="colorMode === 'light'"
      class="example-gif"
      src="@/assets/gifs/light-mode.gif"
      alt="example gif showing how to solve a simple word ladder puzzle"
    />
    <p class="extra-info hint-explanation" :class="[colorMode === 'dark' ? 'dark' : 'light']">
      If you get stuck you can click the
      <span class="stand-button-example" :class="[colorMode === 'dark' ? 'dark' : 'light']">hint</span> button to get
      the best word to enter next.
    </p>
    <p class="extra-info solution-explanation" :class="[colorMode === 'dark' ? 'dark' : 'light']">
      If you get really stuck you can click the
      <span class="stand-button-example" :class="[colorMode === 'dark' ? 'dark' : 'light']">solution</span> button to
      get the shortest solution.
    </p>
    <p class="extra-info reset-explanation" :class="[colorMode === 'dark' ? 'dark' : 'light']">
      After you finish the puzzle, either
      <span class="stand-button-example" :class="[colorMode === 'dark' ? 'dark' : 'light']">reset</span> to try again or
      click
      <span class="main-button-example" :class="[colorMode === 'dark' ? 'dark' : 'light']">generate new puzzle</span> to
      get a new puzzle.
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
.header {
  font-size: 2.8rem;
  &.light {
    color: $yInMnBlue-1-light;
  }
  &.dark {
    color: white;
  }
}
.close {
  margin-top: auto;
  font-size: 1.6rem;

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

.example-gif {
  width: 23rem;
}

.main-message {
  padding: 0 1.2rem;
  margin: 0;
  font-size: 1.6rem;
  text-align: center;

  &.light {
    color: $yInMnBlue-1-light;
  }
  &.dark {
    color: white;
  }
}

.extra-info {
  padding: 0.6rem 1.2rem;
  margin: 0;
  font-size: 1.6rem;
  text-align: center;

  &.light {
    color: $yInMnBlue-1-light;
  }
  &.dark {
    color: white;
  }
}

.stand-button-example {
  font-size: 1.6rem;
  font-weight: 600;
  padding: 0.2rem 0.3rem;
  border-radius: 4px;
  display: inline-block;

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

.main-button-example {
  font-size: 1.6rem;
  font-weight: 600;
  padding: 0.2rem 0.3rem;
  border-radius: 4px;
  display: inline-block;
  &.light {
    // box-shadow: 0px 0px 0px 3px $melon inset;
    box-shadow: 0 4px 6px -1px rgb(11 19 43 / 0.1), 0 2px 4px -2px rgb(11 19 43 / 0.1), 0px 0px 0px 3px $yInMnBlue inset;
    color: $yInMnBlue;
  }
  &.dark {
    background-color: $spaceCadet-1-dark;
    color: $melon;
    box-shadow: 0px 0px 0px 3px rgba(58, 80, 107, 0.5) inset;
  }
}
</style>
