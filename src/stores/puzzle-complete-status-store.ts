import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const usePuzzleCompleteStatusStore = defineStore("puzzleCompletStatusStore", () => {
  const isPuzzleCompleteStatus = useStorage<boolean>("is-puzzle-complete-status", false);

  return { isPuzzleCompleteStatus };
});
