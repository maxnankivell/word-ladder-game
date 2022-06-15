import { defineStore } from "pinia";
import { useColorMode } from "@vueuse/core";

export const useColorModeStore = defineStore("colorModeStore", () => {
  const colorMode = useColorMode();
  return { colorMode };
});

// import { useColorModeStore } from '@/stores/color-mode-store'
// import { storeToRefs } from 'pinia'
// const { colorMode } = storeToRefs(useColorModeStore())
