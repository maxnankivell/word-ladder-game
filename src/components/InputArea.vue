<template>
  <div>
    <template v-for="word in inputWords" :key="word.join('')">
      <v-otp-input
        :num-input="4"
        input-classes="start-word-otp"
        input-type="letter-numeric"
        inputmode="text"
        separator=""
        :placeholder="word"
        :conditional-class="['one', 'two', 'three', 'four']"
        :is-disabled="word.join('') ? true : false"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import VOtpInput from "vue3-otp-input";
const inputWords = ref<string[][]>([
  ["a", "b", "c", "d"],
  ["", "", "", ""],
]);
</script>

<style lang="scss" scoped></style>
