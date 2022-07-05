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
      <InputArea
        :input-words="inputWords"
        :start-word="startWord.join('')"
        :final-word="endWord.join('')"
        :hint="hint"
        @add-input-word="addInputWord"
        @remove-input-word="removeInputWord"
        @remove-hint="removeHint"
      />
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
    <div class="bottom-button-section">
      <button
        class="reset-puzzle"
        :class="[colorMode === 'dark' ? 'dark' : 'light']"
        type="button"
        @click="resetCurrentPuzzle"
      >
        Reset
      </button>
      <button class="show-hint" :class="[colorMode === 'dark' ? 'dark' : 'light']" type="button" @click="showHint">
        Hint
      </button>
      <button
        class="show-solution"
        :class="[colorMode === 'dark' ? 'dark' : 'light']"
        type="button"
        @click="showSolution"
      >
        Solution
      </button>
      <!-- <button @click="populateObjectWithWordConnections">Populate Object With Word Connections</button> -->
    </div>
    <button class="new-puzzle" :class="[colorMode === 'dark' ? 'dark' : 'light']" type="button" @click="newPuzzle">
      New Random Puzzle
    </button>
    <HintErrorModal v-if="showHintErrorModal" @close="showHintErrorModal = false" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useWordObjectStore } from "@/stores/word-object-store";
import VOtpInput from "vue3-otp-input";
import { onBeforeMount, onMounted, ref } from "vue";
import InputArea from "@/components/InputArea.vue";
import { useColorModeStore } from "@/stores/color-mode-store";
import { doc, getDoc } from "firebase/firestore";
import db from "@/firebase";
import { useStorage } from "@vueuse/core";
import {
  getOptimalNextWord,
  getPossibleWords,
  getRandomStartWordAndEndWord,
  getShortestSolution,
} from "@/ladder-logic";
import HintErrorModal from "@/components/HintErrorModal.vue";

const { colorMode } = storeToRefs(useColorModeStore());
const { wordArray, objectWithWordConnections } = storeToRefs(useWordObjectStore());

const startWord = useStorage<string[]>("startWord", ["t", "h", "e", "m"]);
const endWord = useStorage<string[]>("endWord", ["t", "h", "a", "n"]);
const inputWords = useStorage<string[][]>("inputWords", []);
const hint = ref("");
const showHintErrorModal = ref(false);

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

onMounted(() => {
  if (startWord.value.join("") === `them` && endWord.value.join("") === `than`) {
    //show intro modal
  }
});

const convertToSplitWordArray = (arr: string[]): string[][] => arr.map((element) => element.split(""));

async function newPuzzle() {
  //in future maybe save history here????

  inputWords.value = [];
  let start: string;
  let end: string;
  [start, end] = await getRandomStartWordAndEndWord();
  startWord.value = start.split("");
  endWord.value = end.split("");
  removeHint();
}

function addInputWord(newWordArr: string[]) {
  inputWords.value.push(newWordArr);
}

function removeInputWord() {
  inputWords.value.pop();
  hint.value = "";
}

function removeHint() {
  hint.value = "";
}

function showSolution() {
  const arr = getShortestSolution(startWord.value.join(""), endWord.value.join(""));
  if (!arr) {
    return;
  }
  arr.splice(0, 1);
  inputWords.value = convertToSplitWordArray(arr);
}

function resetCurrentPuzzle() {
  inputWords.value = [];
  removeHint();
}

function showHint() {
  const optimalWord = getOptimalNextWord(getLatestCompleteInputWord(), endWord.value.join(""));
  if (!optimalWord) {
    showHintErrorModal.value = true;
    return;
  }
  hint.value = optimalWord;
}

function showOptimalNextWord() {
  const optimalWord = getOptimalNextWord(getLatestCompleteInputWord(), endWord.value.join(""));
  //show this somehow
}

function showPossibleNextWords() {
  const possibleWords = getPossibleWords(getLatestCompleteInputWord());
  //show this somehow
}

function getLatestCompleteInputWord(): string {
  if (inputWords.value.length !== 0) {
    console.log(inputWords.value);
    return inputWords.value[inputWords.value.length - 1].join("");
  }
  return startWord.value.join("");
}
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

.bottom-button-section {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}
.start-end-otp-main {
  gap: 1rem;
  justify-content: center;
}

.reset-puzzle,
.show-solution,
.show-hint {
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

.new-puzzle {
  &.light {
    // box-shadow: 0px 0px 0px 3px $melon inset;
    box-shadow: 0 4px 6px -1px rgb(11 19 43 / 0.1), 0 2px 4px -2px rgb(11 19 43 / 0.1), 0px 0px 0px 3px $melon inset;
    color: $yInMnBlue;
  }
  &.dark {
    background-color: $spaceCadet-1-dark;
    color: $melon;
    box-shadow: 0px 0px 0px 3px rgba(58, 80, 107, 0.5) inset;
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
  box-shadow: 0px 0px 0px 3px rgba(58, 80, 107, 0.5) inset;

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
