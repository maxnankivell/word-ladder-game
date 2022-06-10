<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script setup lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import { onMounted } from "vue";
import Queue from "@/queue";

interface WordConnection {
  [word: string]: string[];
}
interface ParentConnection {
  [word: string]: string;
}

const wordArray = ["tent", "bent", "rent", "fart", "farm", "done", "dart"];
const objectWithWordConnections: WordConnection = {};
const objectWithParents: ParentConnection = {};

onMounted(() => {
  for (const outerWord of wordArray) {
    for (const innerWord of wordArray) {
      let sum = 0;
      for (let i = 0; i < outerWord.length; i++) {
        if (outerWord.charAt(i) == innerWord.charAt(i)) {
          sum += 1;
        }
      }
      if (sum === 3) {
        if (objectWithWordConnections[outerWord]) {
          objectWithWordConnections[outerWord].push(innerWord);
        } else {
          objectWithWordConnections[outerWord] = [innerWord];
        }
      }
    }
    objectWithParents[outerWord] = ``;
  }

  console.log(objectWithWordConnections);

  const wordEntered = `farm`;
  const finalWord = `dart`;
  let solutionFound = false;
  const queue = new Queue();

  queue.enQueue(wordEntered);
  while (!queue.isEmpty() && !solutionFound) {
    const currentWord = queue.peek();
    for (const word of objectWithWordConnections[currentWord]) {
      //put into test method
      let continueForLoop = false;
      let testWord = word;
      while (objectWithParents[testWord] != ``) {
        if (objectWithParents[testWord] === word) {
          continueForLoop = true;
        }
        testWord = objectWithParents[testWord];
      }
      if (continueForLoop) {
        continue;
      }

      objectWithParents[word] = currentWord;
      if (word === finalWord) {
        solutionFound = true;
        break;
      }
      queue.enQueue(word);
    }
  }
});
</script>

<style scoped lang="scss"></style>
