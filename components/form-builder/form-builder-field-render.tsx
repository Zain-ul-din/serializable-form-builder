"use client"

import { FieldConfig } from "./types"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Checkbox } from "../ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Field, FieldLabel } from "../ui/field"

/**
 * Pure rendering component for form fields
 * Renders the appropriate UI based on field type
 */
export function FormBuilderFieldRenderer({ field }: { field: FieldConfig }) {
  const renderField = () => {
    switch (field.type) {
      case "text":
        return (
          <Input id={field.id} type="text" placeholder={field.placeholder} />
        )

      case "textarea":
        return <Textarea id={field.id} placeholder={field.placeholder} />

      case "number":
        return (
          <Input id={field.id} type="number" placeholder={field.placeholder} />
        )

      case "email":
        return (
          <Input id={field.id} type="email" placeholder={field.placeholder} />
        )

      case "url":
        return (
          <Input id={field.id} type="url" placeholder={field.placeholder} />
        )

      case "phone":
        return (
          <Input id={field.id} type="tel" placeholder={field.placeholder} />
        )

      case "password":
        return (
          <Input
            id={field.id}
            type="password"
            placeholder={field.placeholder}
          />
        )

      case "date":
        return (
          <Input id={field.id} type="date" placeholder={field.placeholder} />
        )

      case "file":
        return <Input id={field.id} type="file" />

      case "select":
        return (
          <Select>
            <SelectTrigger>
              <SelectValue
                placeholder={field.placeholder || "Select an option"}
              />
            </SelectTrigger>
            <SelectContent>
              {field.options && field.options.length > 0 ? (
                field.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="no-options" disabled>
                  No options configured
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        )

      case "multiselect":
        return (
          <div className="rounded-lg border border-input px-2.5 py-2 text-sm">
            {field.options && field.options.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {field.options.map((option) => (
                  <div key={option.value} className="flex items-center gap-1.5">
                    <Checkbox />
                    <span>{option.label}</span>
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-muted-foreground">
                No options configured
              </span>
            )}
          </div>
        )

      case "checkbox":
        return (
          <div className="flex items-center gap-2">
            <Checkbox />
            <label className="text-sm">{field.label}</label>
          </div>
        )

      default:
        return <Input type="text" placeholder={field.placeholder} />
    }
  }

  // For checkbox, render inline (no separate label)
  if (field.type === "checkbox") {
    return <div className="space-y-2">{renderField()}</div>
  }

  return (
    <Field>
      <FieldLabel className="text-sm font-medium">
        {field.label}
        {field.required && <span className="ml-1 text-destructive">*</span>}
      </FieldLabel>
      {renderField()}
      {field.description && (
        <p className="text-sm text-muted-foreground">{field.description}</p>
      )}
    </Field>
  )
}
