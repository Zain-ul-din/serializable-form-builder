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
