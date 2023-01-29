<template>
  <div class="input-area">
    <template v-for="(word, index) in inputWords" :key="index">
      <v-otp-input
        :num-input="4"
        :input-classes="['input-otp-input', colorMode === 'dark' ? 'dark' : 'light']"
        input-type="letter-numeric"
        inputmode="text"
        separator=""
        :placeholder="word"
        :conditional-class="getConditionalClassArray(index)"
        :is-disabled="true"
        class="input-otp-main"
      />
    </template>
    <v-otp-input
      v-if="!isPuzzleComplete"
      ref="otpInput"
      :num-input="4"
      :input-classes="['input-otp-input-active', colorMode === 'dark' ? 'dark' : 'light']"
      input-type="letter-numeric"
      inputmode="text"
      separator=""
      :placeholder="hint.split('')"
      :should-auto-focus="true"
      :conditional-class="['one-active', 'two-active', 'three-active', 'four-active']"
      :is-disabled="false"
      class="input-otp-main"
      @keydown.backspace="checkDeleteWord"
      @on-change="updateCurrentWord"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed, watch } from "vue";
import { storeToRefs } from "pinia";
import VOtpInput from "vue3-otp-input";
import { useColorModeStore } from "@/stores/color-mode-store";
import { isValidWord } from "@/ladder-logic";

import confetti from "canvas-confetti";

const { colorMode } = storeToRefs(useColorModeStore());

interface Props {
  inputWords: string[][];
  startWord: string;
  finalWord: string;
  hint: string;
}

const emit = defineEmits<{
  (emit: "add-input-word", inputWord: string[]): void;
  (emit: "remove-input-word"): void;
  (emit: "remove-hint"): void;
}>();

const props = defineProps<Props>();

const otpInput = ref<typeof VOtpInput>();
const clearInput = () => otpInput.value?.clearInput();

const isPuzzleComplete = computed(
  () => props.inputWords.length > 0 && props.inputWords[props.inputWords.length - 1].join("") === props.finalWord
);

watch(
  () => isPuzzleComplete.value,
  () => {
    if (isPuzzleComplete.value) {
      confetti();
    }
  }
);

const getPreviousWord = () =>
  props.inputWords.length > 0 ? props.inputWords[props.inputWords.length - 1].join("") : props.startWord;

let emptyCount = 2;

async function updateCurrentWord(newWord: string) {
  if (newWord === "") {
    emptyCount = 1;
  } else {
    emptyCount = 0;
  }
  if (newWord.length === 4 && isValidWord(newWord, getPreviousWord())) {
    await emit("add-input-word", newWord.split(""));
    await emit("remove-hint");
    clearInput();
    emptyCount = 2;
  }
}

function checkDeleteWord() {
  if (emptyCount === 1) {
    emptyCount = 2;
  } else if (emptyCount === 2) {
    emit("remove-input-word");
  }
}

function getConditionalClassArray(index: number) {
  return props.inputWords[index].map((letter, letterIndex) =>
    letter === props.finalWord[letterIndex]
      ? `prev-${letterIndex + 1} ${colorMode.value === "dark" ? "dark" : "light"}`
      : ``
  );
}
</script>

<style lang="scss" scoped>
.input-area {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}
.input-otp-main {
  gap: 1rem;
  justify-content: center;
}
</style>

<style lang="scss">
.input-otp-input,
.input-otp-input-active {
  height: 8rem;
  width: 8rem;
  border-radius: 4px;
  text-align: center;
  font-size: 4rem;
  padding: 0;

  &:disabled {
    border: 0;
  }

  &.light {
    border: 3px solid $yInMnBlue;
    box-shadow: 0 4px 6px -1px rgb(11 19 43 / 0.1), 0 2px 4px -2px rgb(11 19 43 / 0.1);
    color: $yInMnBlue;
    &::placeholder {
      color: $yInMnBlue;
    }
    &:focus {
      outline: 5px solid $melon;
    }
  }
  &.dark {
    background-color: $spaceCadet;
    border: 0;
    color: $isabelline;
    &::placeholder {
      color: $isabelline;
    }
    &:focus {
      outline: 5px solid white;
    }
  }
}

.prev-1,
.prev-2,
.prev-3,
.prev-4 {
  &.light {
    background-color: $tea-green;
  }
  &.dark {
    background-color: $dark-sea-green;
  }
}

.input-otp-input-active {
  &.light {
    &::placeholder {
      color: $melon;
    }
  }
  &.dark {
    &::placeholder {
      color: $melon;
    }
  }
}

.input-otp-input::-webkit-inner-spin-button,
.input-otp-input::-webkit-outer-spin-button,
.input-otp-input-active::-webkit-inner-spin-button,
.input-otp-input-active::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
