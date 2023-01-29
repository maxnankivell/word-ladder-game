import { WordConnection } from "@/types";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useWordObjectStore = defineStore("wordObjectStore", () => {
  const wordArray = useStorage<string[]>("word-array", []);
  const objectWithWordConnections = useStorage<WordConnection>("object-with-word-connections", {});

  return { wordArray, objectWithWordConnections };
});

// import { useWordObjectStore } from "@/stores/word-object-store";
// const { wordArray, objectWithWordConnections, objectWithParents } = storeToRefs(useWordObjectStore());
