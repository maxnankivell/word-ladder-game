<template>
  <div>
    <nav class="nav-section">
      <NavBar />
    </nav>
    <main class="main-section">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
</script>

<style scoped lang="scss">
.nav-section {
  height: 6.4rem;
}
.main-section {
  height: calc(100vh - 6.4rem);
  overflow: auto;
}
</style>
