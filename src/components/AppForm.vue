<script setup lang="ts">
import { FieldType, FormConfiguration } from '@/types/form'
import { computed, nextTick, ref, watch } from 'vue'
import AppInput from '@/components/AppInput.vue'
import AppButton from '@/components/AppButton.vue'
import { Form } from 'vee-validate'
import AppCheckbox from '@/components/AppCheckbox.vue'
import DateInput from '@/components/DateInput.vue'
import MultiText from '@/components/MultiText.vue'

const props = defineProps<{
  formModel: FormConfiguration
}>()

const emits = defineEmits(['submit-form', 'close-form'])

let currentValues = {}
const currentStageIndex = ref(0)
const currentStage = computed(() => props.formModel.stages[currentStageIndex.value])

function submitForm(values: object) {
  currentValues = { ...currentValues, ...values }

  if (props.formModel.stages.length - 1 === currentStageIndex.value) {
    emits('submit-form', currentValues)
  } else {
    currentStageIndex.value++
  }
}

const getComponent = (type: FieldType) => {
  switch (type) {
    case 'text':
      return AppInput
    case 'number':
      return AppInput
    case 'multitext':
      return MultiText
    case 'checkbox':
      return AppCheckbox
    case 'date':
      return DateInput
  }
}

const getBack = () => {
  if (currentStageIndex.value > 0) currentStageIndex.value--
}

const submitButtonText = computed(() =>
  currentStageIndex.value < props.formModel.stages.length - 1 ? 'Далее' : 'Завершить'
)

const stageBar = ref<HTMLDivElement | null>(null)
const stageWidth = 217
const visibleStages = 2

watch(currentStageIndex, async (newIdx) => {
  await nextTick()
  if (stageBar.value) {
    const lastIndex = props.formModel.stages.length - 1

    let leftmostIdx = 0

    if (newIdx === lastIndex && props.formModel.stages.length > visibleStages) {
      leftmostIdx = lastIndex - visibleStages + 1
    } else {
      leftmostIdx = newIdx
    }

    stageBar.value.style.transform = `translateX(-${leftmostIdx * stageWidth}px)`
  }
})
</script>

<template>
  <Form class="form" :validation-schema="currentStage.validationSchema" @submit="submitForm">
    <img
      class="form--close-button"
      @click="emits('close-form')"
      src="@/assets/close.svg/"
      alt="Закрыть"
    />
    <header class="form--title">{{ formModel.title }}</header>
    <nav class="form--stage-bar-wrapper">
      <div class="form--stage-bar" ref="stageBar">
        <div
          class="form--stage-bar--item"
          :class="{ 'form--stage-bar--item--active': currentStageIndex === index }"
          v-for="(stage, index) in formModel.stages"
          :key="stage.title"
        >
          {{ stage.title }}
        </div>
      </div>
    </nav>
    <section class="form--fields-container">
      <Component
        v-for="field in currentStage.fields"
        :key="field.id"
        :is="getComponent(field.options.type)"
        :options="field.options"
        :title="field.title"
        :id="field.id"
      ></Component>
    </section>
    <div class="form--actions">
      <AppButton variant="white" size="normal" type="button" @click="getBack">Назад</AppButton>
      <AppButton variant="black" size="normal" type="submit">{{ submitButtonText }}</AppButton>
    </div>
  </Form>
</template>

<style scoped lang="scss">
.form {
  position: absolute;
  width: 516px;
  min-height: 591px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 16px;
  padding: 24px;
  background-color: var(--color-white);
  display: flex;
  flex-direction: column;
  gap: 20px;

  &--close-button {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }

  &--title {
    font-weight: 600;
    font-size: 20px;
    line-height: 125%;
    color: var(--color-gray-500);
  }

  &--fields-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1;
  }

  &--actions {
    display: flex;
    flex-direction: row;
    gap: 12px;
  }

  &--stage-bar-wrapper {
    width: 440px;
    overflow-x: hidden;
    padding: 0 12px;
    border-bottom: 1px solid var(--color-gray-border);
  }

  &--stage-bar {
    display: flex;
    flex-direction: row;
    transition: transform 0.4s ease-in-out;
    width: max-content;

    &--item {
      width: 217px;
      height: 34px;
      text-align: center;
      line-height: 34px;
      white-space: nowrap;

      &--active {
        color: var(--color-blue);
        border-bottom: 2px solid var(--color-blue);
      }
    }
  }
}
</style>
