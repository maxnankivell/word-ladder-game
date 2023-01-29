import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useHelpModalVisibilityStore = defineStore("helpModalVisibilityStore", () => {
  const isHelpModalVisible = useStorage<boolean>("is-help-modal-visible", false);

  return { isHelpModalVisible };
});
