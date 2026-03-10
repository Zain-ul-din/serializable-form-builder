"use client"
import { createContext, use, useState } from "react"

import { ReactNode } from "react"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { DragData, FieldConfig } from "./types"
import { nanoid } from "nanoid"

type FormBuilderContextValue = {
  fields: FieldConfig[]
  selectedFieldId: string | null
  selectField: (id: string | null) => void
  removeField: (id: string) => void
  updateField: (id: string, updates: Partial<FieldConfig>) => void
}

const FromBuilderContext = createContext<FormBuilderContextValue | null>(null)

export function FormBuilderProvider({ children }: { children?: ReactNode }) {
  const [fields, setFields] = useState<FieldConfig[]>([])
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null)

  const handleOnDragEnd = (e: DragEndEvent) => {
    const dragData = e.active.data.current as DragData

    if (dragData.source === "palette") {
      if (!e.over) return

      const paletteItem = dragData.item

      const newField: FieldConfig = {
        type: paletteItem.type,
        label: paletteItem.label,
        id: nanoid(),
        //   name: createFieldName(paletteItem.label, fields),
        name: nanoid(),
        validation: [],
        required: false,
      }

      if (e.over?.id === "form-builder-canvas") {
        setFields((prev) => [...prev, newField])
        return
      }

      if (e.over?.id.toString().startsWith("field-")) {
        const newFieldIndex = e.over.data.current?.index as number

        // insert at the index
        setFields((prev) => {
          const newFields = [...prev]
          newFields.splice(newFieldIndex, 0, newField)
          return newFields
        })
        setSelectedFieldId(newField.id) // Auto-select new field
      }
    }
  }

  return (
    <FromBuilderContext
      value={{
        fields,
        selectedFieldId,

        selectField(id) {
          setSelectedFieldId(id)
        },

        removeField(id) {
          setFields((prev) => prev.filter((field) => field.id !== id))
          // Clear selection if deleted field was selected
          if (selectedFieldId === id) {
            setSelectedFieldId(null)
          }
        },

        updateField(id, updates) {
          setFields((prev) =>
            prev.map((field) =>
              field.id === id ? { ...field, ...updates } : field
            )
          )
        },
      }}
    >
      <DndContext onDragEnd={handleOnDragEnd}>{children}</DndContext>
    </FromBuilderContext>
  )
}

export const useFormBuilder = () => {
  const formBuilder = use(FromBuilderContext)

  if (formBuilder === null)
    throw new Error("useFormBuilder must be used within FormBuilderProvider")
  return formBuilder
}
