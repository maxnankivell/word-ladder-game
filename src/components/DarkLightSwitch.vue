<template>
  <div>
    <span
      class="toggle-wrapper"
      :class="backgroundStyles"
      role="checkbox"
      :aria-checked="toggleValue"
      tabindex="0"
      @click="toggleValue = !toggleValue"
      @keydown.space.prevent="toggleValue = !toggleValue"
    >
      <span class="toggle-indicator" :class="indicatorStyles">
        <transition name="fast-fade">
          <ph-sun v-if="toggleValue" :size="'1.92rem'" style="color: black" />
          <ph-moon v-else-if="!toggleValue" :size="'1.92rem'" style="color: white" />
        </transition>
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from "vue";
import { PhMoon, PhSun } from "phosphor-vue";
interface Props {
  modelValue: boolean;
}
const emit = defineEmits<{
  (emit: "update:modelValue", newValue: boolean): void;
}>();
const props = defineProps<Props>();
const toggleValue = computed({
  get: () => props.modelValue,
  set: (newValue: boolean) => emit("update:modelValue", newValue),
});
const backgroundStyles = computed(() => {
  return {
    "light-mode": toggleValue.value,
    "dark-mode": !toggleValue.value,
  };
});
const indicatorStyles = computed(() => {
  return {
    on: toggleValue.value,
    off: !toggleValue.value,
  };
});
</script>

<style scoped lang="scss">
.light-mode {
  background-color: $isabelline-1-dark;
  &:hover {
    background-color: $isabelline-2-dark;
  }
}
.dark-mode {
  background-color: $oxfordBlue-2-light;
  &:hover {
    background-color: $oxfordBlue-3-light;
  }
}
.toggle-wrapper {
  display: inline-block;
  position: relative;
  cursor: pointer;
  width: calc(4.8rem + 0.4rem);
  height: calc(2.4rem + 0.4rem);
  border-radius: 9999px;
  transition: background-color 0.25s ease;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}
.toggle-wrapper:focus {
  outline: 0;
}
.toggle-indicator {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.4rem;
  width: 2.4rem;
  left: 2px;
  bottom: 2px;
  background-color: #ffffff;
  border-radius: 9999px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.25s ease;
  &.on {
    transform: translateX(2.4rem);
    background-color: #ffffff;
  }
  &.off {
    transform: translateX(0);
    background-color: black;
  }
}
// fast fade transition
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.25s linear;
}
.fade-leave-active {
  transition: all 0.25s linear;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
