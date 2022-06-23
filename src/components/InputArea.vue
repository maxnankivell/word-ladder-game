<template>
  <div class="input-area">
    <template v-for="(word, index) in inputWords" :key="word.join('') + index">
      <v-otp-input
        :num-input="4"
        :input-classes="['input-otp-input', colorMode === 'dark' ? 'dark' : 'light']"
        input-type="letter-numeric"
        inputmode="text"
        separator=""
        :placeholder="word"
        :conditional-class="['one', 'two', 'three', 'four']"
        :is-disabled="word.join('') ? true : false"
        class="input-otp-main"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import VOtpInput from "vue3-otp-input";
import { useColorModeStore } from "@/stores/color-mode-store";

const { colorMode } = storeToRefs(useColorModeStore());

const inputWords = ref<string[][]>([
  ["D", "O", "O", "M"],
  ["", "", "", ""],
]);
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
.input-otp-input {
  height: 8rem;
  width: 8rem;
  border-radius: 4px;
  text-align: center;
  font-size: 4rem;
  padding: 0;

  &:disabled {
    border: 0;
  }

  &:focus {
    outline: 5px solid yellow;
  }

  &.light {
    border: 3px solid $yInMnBlue;
    box-shadow: 0 4px 6px -1px rgb(11 19 43 / 0.1), 0 2px 4px -2px rgb(11 19 43 / 0.1);
    color: $yInMnBlue;
    &::placeholder {
      color: $yInMnBlue;
    }
  }
  &.dark {
    background-color: black;
    border: 3px solid $spaceCadet-1-dark;
    color: $isabelline;
    &::placeholder {
      color: $isabelline;
    }
  }
}
.input-otp-input::-webkit-inner-spin-button,
.input-otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
