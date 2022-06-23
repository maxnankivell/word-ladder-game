<template>
  <div id="game-page">
    <div class="game-section">
      <v-otp-input
        :num-input="4"
        :input-classes="['start-end-otp-input', colorMode === 'dark' ? 'dark' : 'light']"
        input-type="letter-numeric"
        inputmode="text"
        separator=""
        :placeholder="startWord"
        :conditional-class="['one', 'two', 'three', 'four']"
        :is-disabled="true"
        class="start-end-otp-main"
      />
      <InputArea />
      <v-otp-input
        :num-input="4"
        :input-classes="['start-end-otp-input', colorMode === 'dark' ? 'dark' : 'light']"
        input-type="letter-numeric"
        inputmode="text"
        separator=""
        :placeholder="endWord"
        :conditional-class="['one', 'two', 'three', 'four']"
        :is-disabled="true"
        class="start-end-otp-main"
      />
    </div>
    <button id="new-puzzle" :class="[colorMode === 'dark' ? 'dark' : 'light']" type="button">New Random Puzzle</button>
    <!-- <button @click="populateObjectWithWordConnections">Populate Object With Word Connections</button> -->
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useWordObjectStore } from "@/stores/word-object-store";
import VOtpInput from "vue3-otp-input";
import { onBeforeMount, onMounted, ref } from "vue";

import InputArea from "@/components/InputArea.vue";

import { doc, getDoc } from "firebase/firestore";
import db from "@/firebase";

import { useColorModeStore } from "@/stores/color-mode-store";

const { colorMode } = storeToRefs(useColorModeStore());

const { wordArray, objectWithWordConnections } = storeToRefs(useWordObjectStore());

const startWord = ref<string[]>(["D", "O", "O", "R"]);
const endWord = ref<string[]>(["F", "A", "R", "M"]);

onBeforeMount(async () => {
  if (wordArray.value.length > 0 && Object.keys(objectWithWordConnections.value).length > 0) {
    return;
  }

  const docRefWords = doc(db, "words", "word-ladder");
  const docSnap = await getDoc(docRefWords);

  if (docSnap.exists()) {
    wordArray.value = docSnap.data().allWords;
    objectWithWordConnections.value = docSnap.data().wordConnections;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
});
</script>

<style scoped lang="scss">
#game-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}

.game-section {
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-content: center;
}
.start-end-otp-main {
  gap: 1rem;
  justify-content: center;
}

#new-puzzle {
  &.light {
    background-color: $yInMnBlue-1-light;
    box-shadow: 0 4px 6px -1px rgb(11 19 43 / 0.1), 0 2px 4px -2px rgb(11 19 43 / 0.1);
    color: $isabelline;
  }
  &.dark {
    background-color: $spaceCadet-1-dark;
    color: $isabelline;
  }
}
</style>

<style lang="scss">
.start-end-otp-input {
  height: 8rem;
  width: 8rem;
  border-radius: 4px;
  text-align: center;
  font-size: 4rem;
  padding: 0;
  font-weight: 600;

  &:disabled {
    border: 0;
  }

  &:focus {
    outline: 5px solid yellow;
  }

  &.light {
    background-color: $yInMnBlue;
    box-shadow: 0 4px 6px -1px rgb(11 19 43 / 0.1), 0 2px 4px -2px rgb(11 19 43 / 0.1);
    &::placeholder {
      color: $isabelline;
    }
  }
  &.dark {
    background-color: $spaceCadet-1-dark;
    &::placeholder {
      color: $isabelline;
    }
  }
}
.start-end-otp-input::-webkit-inner-spin-button,
.start-end-otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
