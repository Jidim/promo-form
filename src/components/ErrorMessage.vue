<script setup lang="ts"></script>

<template>
  <span class="error-message">
    <slot></slot>
  </span>
</template>

<style scoped lang="scss">
.error-message {
  font-weight: 400;
  font-size: 12px;
  line-height: 133%;
  color: var(--color-error);
}
</style>
