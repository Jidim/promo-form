<script setup lang="ts">
import { FormConfiguration } from '@/types/form'
import AppForm from '@/components/AppForm.vue'
import AppButton from '@/components/AppButton.vue'
import { ref } from 'vue'
import * as yup from 'yup'

const promoFormConfig: FormConfiguration = {
  title: 'Создание промокода',
  stages: [
    {
      title: 'Шаг 1: Основное',
      fields: [
        {
          title: 'Название промокода',
          id: 'codeName',
          options: {
            placeholder: 'Введи название',
            type: 'text',
            required: true,
            maxLength: 150,
            uppercase: true,
          },
        },
        {
          title: 'Заголовок',
          id: 'headline',
          options: {
            placeholder: 'Введи заголовок',
            type: 'text',
            required: true,
            maxLength: 150,
          },
        },
        {
          title: 'Сопроводительный текст',
          id: 'desc',
          options: {
            placeholder: 'Например: «Ты попал в число счастливчиков! Дарим 300 баллов»',
            type: 'multitext',
            maxLength: 250,
          },
        },
        {
          title: 'Укажи количество баллов',
          id: 'points',
          options: {
            type: 'number',
            icon: '/src/assets/bonus.svg', // если поддерживается формой (или icon)
            required: true,
          },
        },
      ],
      validationSchema: yup.object({
        codeName: yup.string().required('Обязательное поле').max(30, 'Не больше 30 символов'),
        headline: yup.string().required('Обязательное поле').max(120, 'Не больше 120 символов'),
        desc: yup.string().max(250, 'Максимум 250 символов'),
        points: yup.number().required('Обязательное поле').min(1, 'Значение должно быть больше 0'),
      }),
    },
    {
      title: 'Шаг 2: Настройки промокода',
      fields: [
        {
          title: 'Срок действия промокода',
          id: 'promoPeriod',
          options: {
            type: 'date',
            // Дополнительные настройки по твоему компоненту
            required: true,
          },
        },
        {
          title: 'Введите лимит активаций (шт.)',
          id: 'activationLimit',
          options: {
            type: 'number',
            placeholder: 'Введите число',
            required: true,
          },
        },
        {
          title: 'Настроить получение промокода',
          id: 'sendMode',
          options: {
            type: 'checkbox',
            required: true,
            variants: [
              {
                label: 'Создать промокод без отправки',
                id: 'withoutSend',
              },
              {
                label: 'Отправить промокод всем пользователям',
                id: 'sendAll',
              },
            ],
          },
        },
      ],
      validationSchema: yup.object({
        promoPeriod: yup.object({
          startDate: yup.string().required('Укажите дату начала'),
          startTime: yup.string().required('Укажите время начала'),
          endDate: yup.string().when('noEndDate', {
            is: false,
            then: (s) => s.required('Укажите дату конца'),
            otherwise: (s) => s,
          }),
          endTime: yup.string().when('noEndDate', {
            is: false,
            then: (s) => s.required('Укажите время конца'),
            otherwise: (s) => s,
          }),
          noEndDate: yup.boolean(),
        }),
        activationLimit: yup
          .number()
          .required('Обязательное поле')
          .min(1, 'Значение должно быть больше 0'),
        sendMode: yup
          .array()
          .of(yup.string())
          .min(1, 'Выберите хотя бы один вариант')
          .max(1, 'Только один вариант'),
      }),
    },
  ],
}

const showForm = ref(false)

const saveData = (data) => {
  console.log(data)
  showForm.value = false
}
</script>

<template>
  <AppButton variant="black" size="normal" @click="() => (showForm = true)"
    >Добавить промокод</AppButton
  >
  <AppForm
    v-if="showForm"
    :form-model="promoFormConfig"
    @close-form="showForm = false"
    @submit-form="saveData"
  ></AppForm>
</template>

<style scoped></style>
