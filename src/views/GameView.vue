<template>
  <div id="game-page">
    <div class="game-section">
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
    </div>
    <button id="new-puzzel" type="button">New Random Puzzle</button>
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
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
