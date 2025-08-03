<script setup lang="ts">
const props = defineProps<{
  variant: 'white' | 'black' | 'secondary'
  size: 'mini' | 'normal'
}>()
</script>

<template>
  <button :class="['btn', `btn--type--${props.variant}`, `btn--size--${props.size}`]">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.btn {
  cursor: pointer;
  box-sizing: content-box;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  line-height: 129%;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  &--type {
    &--white {
      background-color: var(--color-gray-100);
      color: var(--color-gray-400);

      &:hover {
        background-color: var(--color-gray-200);
        color: var(--color-gray-500);
      }
    }
    &--black {
      background-color: var(--color-black);
      color: var(--color-white);

      &:hover {
        background-color: var(--color-gray-500);
        color: var(--color-gray-100);
      }
    }
    &--secondary {
    }
  }
  &--size {
    &--normal {
      width: 228px;
      height: 40px;
    }
    &--mini {
      height: min-content;
      width: min-content;
    }
  }
}
</style>
