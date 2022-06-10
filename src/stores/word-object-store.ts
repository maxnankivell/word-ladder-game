import { ParentConnection, WordConnection } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useWordObjectStore = defineStore("wordObjectStore", () => {
  const wordArray = ref([
    "tent",
    "bent",
    "rent",
    "fart",
    "farm",
    "done",
    "dart",
    "farc",
  ]);
  const objectWithWordConnections = ref<WordConnection>({});
  const objectWithParents = ref<ParentConnection>({});

  return { wordArray, objectWithWordConnections, objectWithParents };
});

// import { useWordObjectStore } from "@/stores/word-object-store";
// const { wordArray, objectWithWordConnections, objectWithParents } = storeToRefs(useWordObjectStore());
