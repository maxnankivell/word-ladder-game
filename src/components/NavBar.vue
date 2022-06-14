<template>
  <div id="nav-bar-box">
    <div id="helpButton" class="nav-element"><ph-question :size="32" /></div>
    <router-link to="/"><h1>WordLadder</h1></router-link>
    <router-link to="/history"
      ><div class="nav-element"><ph-archive :size="32" /></div
    ></router-link>
  </div>
</template>

<script setup lang="ts">
import { PhQuestion, PhArchive } from "phosphor-vue";
</script>

<style scoped lang="scss">
#nav-bar-box {
  display: flex;
  gap: 0.4rem;
}

.nav-element {
  font-size: 2.4rem;
  padding: 0.8rem;
  background-color: red;
  color: blue;
  cursor: pointer;

  &:hover {
    background-color: pink;
  }
}
</style>
