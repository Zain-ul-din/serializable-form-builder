"use client"

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

  const showOptionsEditor =
    field && (field.type === "select" || field.type === "multiselect")

  if (!selectedFieldId || !field) {
    return (
      <div
        className={cn("flex h-full items-center justify-center p-4", className)}
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
    <div className={cn("h-full space-y-6 overflow-y-auto p-4", className)}>
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
      <div className="mt-4">
        <h3 className="mb-4 text-base font-semibold">Validation Rules</h3>
        <FormBuilderValidationEditor fieldId={selectedFieldId} />
      </div>
    </div>
  )
}
