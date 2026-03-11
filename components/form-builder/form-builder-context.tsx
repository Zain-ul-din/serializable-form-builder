"use client"
import { createContext, use, useState } from "react"

import { ReactNode } from "react"
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core"
import {
  DragData,
  FieldConfig,
  FieldOption,
  PaletteItemConfig,
  ValidationRule,
} from "./types"
import { nanoid } from "nanoid"
import z from "zod/v4"
import { generateZodSchema } from "./form-builder-validation-rules"

type FormBuilderState = {
  fields: FieldConfig[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: z.ZodObject<any>
}

type FormBuilderContextValue = {
  fields: FieldConfig[]
  selectedFieldId: string | null
  selectField: (id: string | null) => void
  removeField: (id: string) => void
  updateField: (id: string, updates: Partial<FieldConfig>) => void

  updateFieldProperty: <K extends keyof FieldConfig>(
    id: string,
    property: K,
    value: FieldConfig[K]
  ) => void

  addOption: (id: string, option: FieldOption) => void
  removeOption: (id: string, optionIndex: number) => void
  updateOption: (id: string, optionIndex: number, option: FieldOption) => void

  addValidationRule: (id: string, rule: ValidationRule) => void
  removeValidationRule: (id: string, ruleIndex: number) => void
  updateValidationRule: (
    id: string,
    ruleIndex: number,
    rule: ValidationRule
  ) => void
  getBuilderState: () => FormBuilderState
}

const FromBuilderContext = createContext<FormBuilderContextValue | null>(null)

export function FormBuilderProvider({ children }: { children?: ReactNode }) {
  const [fields, setFields] = useState<FieldConfig[]>([])
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null)
  const [activePaletteItem, setActivePaletteItem] =
    useState<PaletteItemConfig | null>(null)

  const handleOnDragStart = (e: DragStartEvent) => {
    const dragData = e.active.data.current as DragData
    if (dragData.source === "palette") {
      setActivePaletteItem(dragData.item)
    }
  }

  const handleOnDragEnd = (e: DragEndEvent) => {
    if (!e.over) return
    setActivePaletteItem(null)
    const dragData = e.active.data.current as DragData

    if (dragData.source === "palette") {
      const paletteItem = dragData.item

      const newField: FieldConfig = {
        type: paletteItem.type,
        label: paletteItem.label,
        id: nanoid(),
        //   name: createFieldName(paletteItem.label, fields),
        validation: [],
        required: false,
      }

      if (e.over?.id === "form-builder-canvas") {
        setFields((prev) => [...prev, newField])
        setSelectedFieldId(newField.id)
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

    if (dragData.source === "field") {
      const fromIndex = dragData.index

      if (e.over.id.toString().startsWith("field-")) {
        const toIndex = e.over.data.current?.index as number

        if (fromIndex !== toIndex) {
          setFields((prev) => {
            const updated = [...prev]
            const [removed] = updated.splice(fromIndex, 1)
            updated.splice(toIndex, 0, removed)
            return updated
          })
        }
      }
    }
  }

  return (
    <FromBuilderContext
      value={{
        // fields
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
        updateFieldProperty(id, property, value) {
          setFields((prev) =>
            prev.map((field) =>
              field.id === id ? { ...field, [property]: value } : field
            )
          )
        },
        // validation rules
        addValidationRule(id, rule) {
          setFields((prev) =>
            prev.map((field) =>
              field.id === id
                ? { ...field, validation: [...field.validation, rule] }
                : field
            )
          )
        },
        removeValidationRule(id, ruleIndex) {
          setFields((prev) =>
            prev.map((field) =>
              field.id === id
                ? {
                    ...field,
                    validation: field.validation.filter(
                      (_, i) => i !== ruleIndex
                    ),
                  }
                : field
            )
          )
        },
        updateValidationRule(id, ruleIndex, rule) {
          setFields((prev) =>
            prev.map((field) =>
              field.id === id
                ? {
                    ...field,
                    validation: field.validation.map((r, i) =>
                      i === ruleIndex ? rule : r
                    ),
                  }
                : field
            )
          )
        },
        // options
        addOption(id, option) {
          setFields((prev) =>
            prev.map((field) =>
              field.id === id
                ? {
                    ...field,
                    options: [...(field.options || []), option],
                  }
                : field
            )
          )
        },
        removeOption(id, optionIndex) {
          setFields((prev) =>
            prev.map((field) =>
              field.id === id
                ? {
                    ...field,
                    options: field.options?.filter((_, i) => i !== optionIndex),
                  }
                : field
            )
          )
        },
        updateOption(id, optionIndex, option) {
          setFields((prev) =>
            prev.map((field) =>
              field.id === id
                ? {
                    ...field,
                    options: field.options?.map((o, i) =>
                      i === optionIndex ? option : o
                    ),
                  }
                : field
            )
          )
        },
        getBuilderState: () => {
          return {
            fields,
            schema: generateZodSchema(fields),
          }
        },
      }}
    >
      <DndContext onDragStart={handleOnDragStart} onDragEnd={handleOnDragEnd}>
        {children}
        <DragOverlay dropAnimation={null}>
          {activePaletteItem && (
            <div className="flex items-center gap-2 rounded-xl border bg-card p-2 shadow-lg">
              <activePaletteItem.icon className="size-4" />
              <p className="text-sm">{activePaletteItem.label}</p>
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </FromBuilderContext>
  )
}

export const useFormBuilder = () => {
  const formBuilder = use(FromBuilderContext)

  if (formBuilder === null)
    throw new Error("useFormBuilder must be used within FormBuilderProvider")
  return formBuilder
}
