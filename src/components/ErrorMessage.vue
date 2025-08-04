<script setup lang="ts">
import { computed } from 'vue'

const model = defineModel<string | undefined>()

const emptyError = computed(() => !model.value || model.value.length === 0)
</script>

<template>
  <span :class="{ empty: emptyError }" class="error-message">
    {{ model }}
  </span>
</template>

<style scoped lang="scss">
.error-message {
  font-weight: 400;
  font-size: 12px;
  line-height: 133%;
  color: var(--color-error);

  /* Плавный переход по opacity и max-height */
  transition:
    opacity 0.3s ease,
    max-height 0.3s ease;
  opacity: 1;
  max-height: 100px; /* достаточно большой, чтобы поместить текст */
  overflow: hidden;
  display: block;
}

.empty {
  opacity: 0;
  max-height: 0;
  padding: 0;
  margin: 0;
  pointer-events: none;
}
</style>
