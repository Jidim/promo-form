<script setup lang="ts">
import { useField } from 'vee-validate'
import ErrorMessage from '@/components/ErrorMessage.vue'

const props = defineProps<{
  title: string
  id: string // например: "promoPeriod"
}>()

const { value, errorMessage } = useField(() => props.id, undefined, {
  initialValue: { startDate: '', startTime: '', endDate: '', endTime: '', noEndDate: false },
})

// Для чекбокса "Без даты конца"
function onNoEndDateChange(event: Event) {
  if ((event.target as HTMLInputElement).checked) {
    value.value = {
      ...value.value,
      endDate: '',
      endTime: '',
      noEndDate: true,
    }
  } else {
    value.value = {
      ...value.value,
      noEndDate: false,
    }
  }
}
</script>
<template>
  <div class="input-wrapper">
    <label class="input-wrapper--main-label">{{ title }}</label>
    <div class="input-wrapper--inputs">
      <div>
        <span>Дата начала</span>
        <div class="input-wrapper--inline-inputs">
          <div class="input-wrapper--input-block">
            <div class="input-wrapper--input-with-icon">
              <span class="input-wrapper--calendar-icon"></span>
              <div class="input-wrapper--date-input-container">
                <span class="input-wrapper--input-label">Дата</span>
                <input
                  type="date"
                  v-model="value.startDate"
                  class="input-wrapper--date-input"
                  :placeholder="'ДД.ММ.ГГГГ'"
                  :disabled="false"
                />
              </div>
            </div>
          </div>
          <div class="input-wrapper--input-block">
            <input
              type="time"
              v-model="value.startTime"
              class="input-wrapper--time-input"
              :placeholder="'--:--'"
              :disabled="false"
            />
          </div>
        </div>
      </div>
      <div>
        <span>Дата конца</span>
        <div class="input-wrapper--inline-inputs">
          <div class="input-wrapper--input-block">
            <div class="input-wrapper--input-with-icon">
              <span class="input-wrapper--calendar-icon"></span>
              <div class="input-wrapper--date-input-container">
                <span class="input-wrapper--input-label">Дата</span>
                <input
                  type="date"
                  v-model="value.endDate"
                  class="input-wrapper--date-input"
                  :placeholder="'ДД.ММ.ГГГГ'"
                  :disabled="value.noEndDate"
                />
              </div>
            </div>
          </div>

          <div class="input-wrapper--input-block">
            <input
              type="time"
              v-model="value.endTime"
              class="input-wrapper--time-input"
              :placeholder="'--:--'"
              :disabled="value.noEndDate"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="input-wrapper--no-end-checkbox">
      <input type="checkbox" id="no-end" :checked="value.noEndDate" @change="onNoEndDateChange" />
      <label for="no-end">Без даты конца</label>
    </div>
    <ErrorMessage v-if="errorMessage">{{ errorMessage }}</ErrorMessage>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: fit-content;

  &--main-label {
    /* если нужно, можно стилизовать */
  }

  &--inputs {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }

  &--inline-inputs {
    display: flex;
    gap: 1px;
  }

  &--input-block {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &--input-label {
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    color: var(--color-gray-600);
  }

  &--input-with-icon {
    position: relative;
    display: flex;
    align-items: center;
    background: var(--color-gray-100);
    padding: 8px 4px;
    border-radius: 12px;
    gap: 2px;
  }

  &--calendar-icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url('/src/assets/calendar.svg') no-repeat center center;
    background-size: 18px 18px;
    pointer-events: none;
    align-self: center;
  }

  &--date-input-container {
    display: flex;
    flex-direction: column;
  }

  &--date-input,
  &--time-input {
    font-weight: 500;
    font-size: 14px;
    line-height: 100%;
    background: var(--color-gray-100);
    border: none;
    text-align: left;
    color: var(--color-gray-500);
    &:hover,
    &:focus {
      background: var(--color-gray-100);
      border: none;
      outline: none;
      box-shadow: none;
      color: var(--color-gray-500);
    }
    &::placeholder {
      color: var(--color-gray-500);
      opacity: 0.5;
    }
  }

  &--date-input {
    padding: 0;
  }

  &--time-input {
    padding: 14px 12px;
    border-radius: 12px;
  }

  &--no-end-checkbox {
    margin-top: 7px;
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 16px;
  }
}

/* Скрываем встроенные иконки календаря и времени */
input[type='date']::-webkit-calendar-picker-indicator,
input[type='time']::-webkit-calendar-picker-indicator {
  opacity: 0;
  display: none;
  pointer-events: none;
}
</style>
