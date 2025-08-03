<script setup lang="ts">
import { useField } from 'vee-validate'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { FieldOptions, FieldType } from '@/types/form'

const props = defineProps<{
  options: FieldOptions<FieldType> & { icon?: string } // добавляем icon
  title: string
  id: string
}>()

const { value, errorMessage } = useField<string>(() => props.id, [], {
  initialValue: '',
})
</script>

<template>
  <div class="multi-text">
    <label v-if="title">{{ title }}</label>
    <textarea
      v-model="value"
      :placeholder="options.placeholder"
      :maxlength="options.maxLength || 250"
      class="multi-text--area"
    ></textarea>
    <div class="multi-text--footer">
      <span v-if="options.maxLength" class="multi-text--counter"
        >{{ value.length }}/{{ options.maxLength }}</span
      >
    </div>
    <ErrorMessage v-if="errorMessage">{{ errorMessage }}</ErrorMessage>
  </div>
</template>

<style scoped lang="scss">
.multi-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  label {
    font-weight: 600;
    font-size: 14px;
  }
  &--area {
    min-height: 72px;
    resize: vertical;
    width: 100%;
    background: var(--color-gray-100);
    border: none;
    border-radius: 12px;
    padding: 16px 12px;
    font-size: 15px;
    color: var(--color-text);
    box-sizing: border-box;

    &:focus {
      border: none;
      outline: none;
      box-shadow: none;
    }
  }
  &--footer {
    display: flex;
    justify-content: flex-end;
    font-size: 13px;
    color: var(--color-gray-600);
  }
  &--counter {
    /* стиль счетчика */
  }
}
</style>
