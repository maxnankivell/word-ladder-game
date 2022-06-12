<template>
  <div id="nav-bar-box">
    <router-link to="/"><div class="nav-element">Home</div></router-link>
    <router-link to="/history"><div class="nav-element">History</div></router-link>
  </div>
</template>

<script setup lang="ts"></script>

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
