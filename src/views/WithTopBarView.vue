<template>
  <div>
    <nav class="nav-section">
      <NavBar />
    </nav>
    <main class="main-section" :class="[colorMode === 'dark' ? 'dark' : 'light']">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import { useColorModeStore } from "@/stores/color-mode-store";
import { storeToRefs } from "pinia";

const { colorMode } = storeToRefs(useColorModeStore());
</script>

<style scoped lang="scss">
.nav-section {
  height: 6.4rem;
  z-index: 10;
  position: relative;
}
.main-section {
  height: calc(100vh - 6.4rem);
  overflow: auto;
  &.light {
    background-color: $isabelline;
  }

  &.dark {
    background-color: #060a16;
  }
}
</style>
