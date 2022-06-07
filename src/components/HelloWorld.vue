<template>
  <h1>{{ finalMessage }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script setup lang="ts">
import { defineProps, ref, withDefaults } from "vue";

interface Props {
  msg: string;
  test?: string;
}

const props = withDefaults(defineProps<Props>(), {
  test: "hello",
});

const finalMessage = ref(props.msg + props.test);

const count = ref(0);
</script>

<style scoped lang="scss">
$its-a-color: #304455;

h1 {
  background-color: $variable;
}

a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

p {
  code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: $its-a-color;
  }
}
</style>
