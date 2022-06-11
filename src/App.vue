<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <button @click="populateObjectWithWordConnections">Populate Object With Word Connections</button>
</template>

<script setup lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import { storeToRefs } from "pinia";
import { useWordObjectStore } from "@/stores/word-object-store";

const { wordArray, objectWithWordConnections } = storeToRefs(useWordObjectStore());

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
