<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script setup lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import { onMounted } from "vue";

interface WordConnection {
  [word: string]: string[];
}

const wordArray = ["tent", "bent", "rent", "fart", "farm", "done", "dart"];
const objectWithWordConnections: WordConnection = {};

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
  }

  console.log(objectWithWordConnections);
});
</script>

<style scoped lang="scss"></style>
