<template>
  <div id="game-page">
    <v-otp-input
      :num-input="4"
      input-classes="start-word-otp"
      input-type="letter-numeric"
      inputmode="text"
      separator=""
      :placeholder="startWord"
      :conditional-class="['one', 'two', 'three', 'four']"
      :is-disabled="true"
    />
    <InputArea />
    <v-otp-input
      :num-input="4"
      input-classes="end-word-otp"
      input-type="letter-numeric"
      inputmode="text"
      separator=""
      :placeholder="endWord"
      :conditional-class="['one', 'two', 'three', 'four']"
      :is-disabled="true"
    />
    <button type="button">New Random Puzzle</button>
    <!-- <button @click="populateObjectWithWordConnections">Populate Object With Word Connections</button> -->
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useWordObjectStore } from "@/stores/word-object-store";
import VOtpInput from "vue3-otp-input";
import { ref } from "vue";

import InputArea from "@/components/InputArea.vue";

const { wordArray, objectWithWordConnections } = storeToRefs(useWordObjectStore());

const startWord = ref<string[]>(["D", "O", "O", "R"]);
const endWord = ref<string[]>(["F", "A", "R", "M"]);

function populateObjectWithWordConnections(): void {
  for (const outerWord of wordArray.value) {
    for (const innerWord of wordArray.value) {
      let sum = 0;
      for (let i = 0; i < outerWord.length; i++) {
        if (outerWord.charAt(i) == innerWord.charAt(i)) {
          sum += 1;
        }
      }
      if (sum === 3) {
        if (objectWithWordConnections.value[outerWord]) {
          objectWithWordConnections.value[outerWord].push(innerWord);
        } else {
          objectWithWordConnections.value[outerWord] = [innerWord];
        }
      }
    }
  }

  console.log(objectWithWordConnections.value);
}
</script>

<style scoped lang="scss"></style>
