import { ComponentType } from "react"

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "email"
  | "url"
  | "phone"
  | "password"
  | "file"
  | "select"
  | "multiselect"
  | "checkbox"
  | "date"

export type PaletteItemConfig = {
  type: FieldType
  label: string
  description?: string
  icon: ComponentType<{ className?: string }>
}

// Discriminated union for validation rules
export type ValidationRule =
  | { type: "required"; message?: string }
  | { type: "minLength"; value: number; message?: string }
  | { type: "maxLength"; value: number; message?: string }
  | { type: "min"; value: number; message?: string }
  | { type: "max"; value: number; message?: string }
  | { type: "pattern"; value: string; message?: string }
  | { type: "email"; message?: string }
  | { type: "url"; message?: string }
  | { type: "uuid"; message?: string }
  | { type: "phoneNumber"; message?: string }

export type FieldOption = {
  label: string
  value: string
}

export type FieldConfig = {
  id: string
  type: FieldType
  name: string
  label: string
  placeholder?: string
  description?: string
  required?: boolean
  options?: FieldOption[]
  validation: ValidationRule[]
}

export type DragSourceType = "palette" | "field"

export type DragData =
  | { source: "palette"; item: PaletteItemConfig }
  | { source: "field"; fieldId: string; index: number }
