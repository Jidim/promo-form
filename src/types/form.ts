export type FormConfiguration = {
  title: string
  stages: StageConfiguration[]
}
type StageConfiguration = {
  title: string
  fields: FieldConfiguration[]
  validationSchema: object
}
type FieldConfiguration = {
  title: string
  id: string
  options: FieldOptions<FieldType>
}

type FieldValueMap = {
  text: string
  multitext: string
  number: number
  checkbox: boolean
  date: Date
}

export type FieldType = keyof FieldValueMap

export type FieldOptions<T extends FieldType> = {
  type: T
  required?: boolean
  placeholder?: string
  uppercase?: boolean
  variants?: Array<{ label: string; id: string }>
  maxLength?: number
  icon?: string
}
