<template>
  <div id="nav-bar-box" :class="[colorMode === 'dark' ? 'dark' : 'light']">
    <div class="nav-flex">
      <!-- <router-link to="/"
        ><div
          class="nav-element"
          :class="[colorMode === 'dark' ? 'dark' : 'light']"
          @mouseover="iconWeight[0] = 'fill'"
          @mouseleave="iconWeight[0] = 'regular'"
        >
          <ph-house-simple :size="'3.2rem'" :weight="iconWeight[0]" /></div
      ></router-link>
      <router-link to="/history"
        ><div
          class="nav-element"
          :class="[colorMode === 'dark' ? 'dark' : 'light']"
          @mouseover="iconWeight[1] = 'fill'"
          @mouseleave="iconWeight[1] = 'regular'"
        >
          <ph-archive :size="'3.2rem'" :weight="iconWeight[1]" /></div
      ></router-link> -->
    </div>
    <router-link to="/"
      ><h1 class="nav-title" :class="[colorMode === 'dark' ? 'dark' : 'light']">WordLadder</h1></router-link
    >
    <div class="nav-flex">
      <DarkLightSwitch v-model="toggleValue" class="dark-light-switch" />
      <div
        id="helpButton"
        class="nav-element"
        :class="[colorMode === 'dark' ? 'dark' : 'light']"
        @mouseover="iconWeight[2] = 'fill'"
        @mouseleave="iconWeight[2] = 'regular'"
        @click="isHelpModalVisible = true"
      >
        <ph-question :size="'3.2rem'" :weight="iconWeight[2]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhQuestion, PhArchive, PhHouseSimple } from "phosphor-vue";
import { onBeforeMount, ref, watch } from "vue";
import DarkLightSwitch from "@/components/DarkLightSwitch.vue";
import { useColorModeStore } from "@/stores/color-mode-store";
import { useHelpModalVisibilityStore } from "@/stores/help-modal-visibility-store";
import { storeToRefs } from "pinia";

const { colorMode } = storeToRefs(useColorModeStore());
const { isHelpModalVisible } = storeToRefs(useHelpModalVisibilityStore());
const toggleValue = ref(false);

onBeforeMount(() => (colorMode.value === "dark" ? (toggleValue.value = false) : (toggleValue.value = true)));
watch([toggleValue], () => (toggleValue.value ? (colorMode.value = "light") : (colorMode.value = "dark")));

type Weight = "fill" | "regular";
const iconWeight = ref<Weight[]>(["regular", "regular", "regular"]);
</script>

<style scoped lang="scss">
#nav-bar-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.6rem;
  &.light {
    background-color: $isabelline;
    box-shadow: 0 4px 6px -1px rgb(11 19 43 / 0.1), 0 2px 4px -2px rgb(11 19 43 / 0.1);
  }

  &.dark {
    background-color: #060a16;
  }
}

.nav-flex {
  display: flex;
  gap: 1.6rem;
  align-items: center;
  width: 10rem;
}

.nav-title {
  cursor: pointer;
  &.light {
    color: $oxfordBlue;
  }

  &.dark {
    color: white;
  }
}

.nav-element {
  cursor: pointer;
  transition: all 0.05s;

  &:hover {
    transform: scale(1.15);
  }

  &.light {
    color: $spaceCadet;
  }

  &.dark {
    color: $isabelline;
  }
}
</style>
