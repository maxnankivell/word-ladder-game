import { WordConnection } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useWordObjectStore = defineStore("wordObjectStore", () => {
  const wordArray = ref(["tent", "bent", "rent", "fart", "farm", "done", "dart", "farc"]);
  const objectWithWordConnections = ref<WordConnection>({});

  return { wordArray, objectWithWordConnections };
});

// import { useWordObjectStore } from "@/stores/word-object-store";
// const { wordArray, objectWithWordConnections, objectWithParents } = storeToRefs(useWordObjectStore());
