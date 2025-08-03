<script setup lang="ts">
import { FieldOptions, FieldType } from '@/types/form'
import { useField } from 'vee-validate'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { watch } from 'vue'

const props = defineProps<{
  options: FieldOptions<FieldType> & { icon?: string } // добавляем icon
  title: string
  id: string
}>()

const { value, errorMessage } = useField(() => props.id)

if (props.options.uppercase) {
  watch(value, (newVal: string) => {
    if (newVal !== newVal.toUpperCase()) {
      value.value = newVal.toUpperCase()
    }
  })
}
</script>

<template>
  <div class="input-wrapper">
    <label>{{ title }}</label>
    <div class="input-with-icon" v-if="options.icon">
      <img :src="options.icon" alt="icon" class="input-icon" />
      <input
        :class="{ uppercase: options.uppercase }"
        v-model="value"
        :placeholder="options.placeholder"
        :type="options.type"
      />
    </div>
    <input
      v-else
      :class="{ uppercase: options.uppercase }"
      v-model="value"
      :placeholder="options.placeholder"
      :type="options.type"
    />
    <ErrorMessage v-if="errorMessage">{{ errorMessage }}</ErrorMessage>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  label {
    font-weight: 600;
    font-size: 14px;
    line-height: 129%;
    display: block;
    margin-bottom: 6px;
  }
}

/* Контейнер с иконкой */
.input-with-icon {
  position: relative;
  display: inline-block;
  width: 100%;
}

.input-icon {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  width: 20px; /* подстрой под размер иконки */
  height: 20px;
  pointer-events: none;
}

/* Стилизуем инпут */
input {
  all: unset;
  box-sizing: border-box;
  padding: 16px 12px;
  border-radius: 12px;
  width: 100%;
  height: 44px;
  background-color: var(--color-gray-100);

  /* Если есть иконка слева - добавляем отступ */
  &.uppercase {
    text-transform: uppercase;
  }
}

.input-with-icon input {
  padding-left: 44px; /* отступ слева для иконки */
}

input:hover {
  border-width: 1px;
}
</style>
