<script setup lang="ts">
import { useField } from 'vee-validate'
import { FieldOptions, FieldType } from '@/types/form'
import ErrorMessage from '@/components/ErrorMessage.vue'

const props = defineProps<{
  title: string
  options: FieldOptions<FieldType>
  id: string
}>()

// Для мультивыбора обычно value — массив строк
const { value, errorMessage } = useField<string[]>(props.id, [], {
  initialValue: [],
})

function onCheckboxChange(event: Event, optionValue: string) {
  const checked = (event.target as HTMLInputElement).checked
  if (checked) {
    // Добавляем выбранное значение
    if (!value.value.includes(optionValue)) {
      value.value = [...value.value, optionValue]
    }
  } else {
    // Убираем значение
    value.value = value.value.filter((v) => v !== optionValue)
  }
}
</script>

<template>
  <fieldset>
    <legend>{{ title }}</legend>
    <div class="checkbox-container">
      <div v-for="option in options.variants" :key="option.id">
        <label>
          <input
            type="checkbox"
            :value="option.value"
            :checked="value.includes(option.value)"
            @change="onCheckboxChange($event, option.id)"
          />
          {{ option.label }}
        </label>
      </div>
    </div>
    <ErrorMessage v-if="errorMessage">{{ errorMessage }}</ErrorMessage>
  </fieldset>
</template>

<style scoped lang="scss">
fieldset {
  border: none;
  padding: 0;
}
legend {
  margin-bottom: 16px;
  font-weight: 600;
  font-size: 14px;
  line-height: 129%;
  color: var(--color-black);
}
.checkbox-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  /* Сброс стандартного оформления чекбокса */
  input[type='checkbox'] {
    -webkit-appearance: none;
    appearance: none;
    border: 1.5px solid var(--color-gray-checkbox);
    border-radius: 99px;
    width: 20px;
    height: 20px;
    transition:
      border-color 0.2s ease,
      border-width 0.3s ease;
  }

  /* Стили для состояния "отмечено" */
  input[type='checkbox']:checked {
    border-color: var(--color-blue);
    border-width: 5px;
  }
}
label {
  display: flex;
  gap: 8px;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 129%;
  color: var(--color-black);
}
</style>
