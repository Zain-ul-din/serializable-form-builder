"use client"

import { useState } from "react"
import { useFormBuilder } from "./form-builder-context"
import { Field, FieldLabel, FieldSeparator } from "../ui/field"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Switch } from "../ui/switch"
import { FormBuilderValidationEditor } from "./form-builder-validation-editor"
import { FormBuilderOptionsEditor } from "./form-builder-options-editor"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty"
import { Settings2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function FormBuilderSettingsRender({
  className,
}: {
  className?: string
}) {
  const { fields, selectedFieldId, updateFieldProperty } = useFormBuilder()
  const field = fields.find((f) => f.id === selectedFieldId)
  const [nameError, setNameError] = useState<string | null>(null)

  const showOptionsEditor =
    field && (field.type === "select" || field.type === "multiselect")

  if (!selectedFieldId || !field) {
    return (
      <div
        className={cn("flex h-full items-center justify-center p-8", className)}
      >
        <Empty>
          <EmptyHeader>
            <EmptyMedia>
              <Settings2 />
            </EmptyMedia>
            <EmptyTitle>No field selected</EmptyTitle>
          </EmptyHeader>
          <p className="text-center text-sm text-muted-foreground">
            Select a field to edit its settings
          </p>
        </Empty>
      </div>
    )
  }

  return (
    <div className={cn("h-full space-y-6 overflow-y-auto p-6", className)}>
      {/* General Settings Section */}
      <div>
        <h3 className="mb-4 text-base font-semibold">General Settings</h3>
        <div className="space-y-3">
          <Field>
            <FieldLabel>Label</FieldLabel>
            <Input
              placeholder="Field label"
              value={field.label}
              onChange={(e) =>
                updateFieldProperty(selectedFieldId, "label", e.target.value)
              }
            />
          </Field>

          <Field>
            <FieldLabel>Field Name</FieldLabel>
            <Input
              placeholder="field_name"
              value={field.name}
              onChange={(e) => {
                const value = e.target.value
                // Validate: not empty, valid identifier chars
                if (!value.trim()) {
                  setNameError("Field name cannot be empty")
                  return
                }
                if (!/^[a-z][a-z0-9_]*$/.test(value)) {
                  setNameError(
                    "Must start with a letter and contain only lowercase letters, numbers, and underscores"
                  )
                  return
                }
                // Check for duplicates
                const isDuplicate = fields.some(
                  (f) => f.id !== selectedFieldId && f.name === value
                )
                if (isDuplicate) {
                  setNameError("A field with this name already exists")
                  return
                }
                setNameError(null)
                updateFieldProperty(selectedFieldId, "name", value)
              }}
            />
            {nameError && (
              <p className="text-sm text-destructive">{nameError}</p>
            )}
          </Field>

          <Field>
            <FieldLabel>Placeholder</FieldLabel>
            <Input
              placeholder="Placeholder text"
              value={field.placeholder || ""}
              onChange={(e) =>
                updateFieldProperty(
                  selectedFieldId,
                  "placeholder",
                  e.target.value
                )
              }
            />
          </Field>

          <Field>
            <FieldLabel>Description</FieldLabel>
            <Textarea
              placeholder="Help text for this field"
              value={field.description || ""}
              onChange={(e) =>
                updateFieldProperty(
                  selectedFieldId,
                  "description",
                  e.target.value
                )
              }
            />
          </Field>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel>Required Field</FieldLabel>
              <Switch
                checked={field.required || false}
                onCheckedChange={(checked) =>
                  updateFieldProperty(selectedFieldId, "required", checked)
                }
              />
            </div>
          </Field>
        </div>
      </div>

      {/* Options Section (for select/multiselect) */}
      {showOptionsEditor && (
        <>
          <FieldSeparator />
          <div>
            <h3 className="mb-4 text-base font-semibold">Options</h3>
            <FormBuilderOptionsEditor fieldId={selectedFieldId} />
          </div>
        </>
      )}

      {/* Validation Rules Section */}
      <FieldSeparator />
      <div>
        <h3 className="mb-4 text-base font-semibold">Validation Rules</h3>
        <FormBuilderValidationEditor fieldId={selectedFieldId} />
      </div>
    </div>
  )
}
