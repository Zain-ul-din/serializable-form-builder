"use client"

import { useState } from "react"
import { useFormBuilder } from "./form-builder-context"
import { FieldOption } from "./types"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { TrashIcon, PlusIcon } from "lucide-react"

export function FormBuilderOptionsEditor({ fieldId }: { fieldId: string }) {
  const { fields, addOption, removeOption, updateOption } = useFormBuilder()
  const field = fields.find((f) => f.id === fieldId)

  const [newOptionLabel, setNewOptionLabel] = useState("")
  const [newOptionValue, setNewOptionValue] = useState("")

  if (!field) return null

  const handleAddOption = () => {
    if (!newOptionLabel || !newOptionValue) return

    const option: FieldOption = {
      label: newOptionLabel,
      value: newOptionValue,
    }

    addOption(fieldId, option)
    setNewOptionLabel("")
    setNewOptionValue("")
  }

  return (
    <div className="space-y-3">
      {field.options && field.options.length > 0 && (
        <div className="space-y-2">
          {field.options.map((option, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder="Label"
                value={option.label}
                onChange={(e) =>
                  updateOption(fieldId, index, {
                    ...option,
                    label: e.target.value,
                  })
                }
                className="flex-1"
              />
              <Input
                placeholder="Value"
                value={option.value}
                onChange={(e) =>
                  updateOption(fieldId, index, {
                    ...option,
                    value: e.target.value,
                  })
                }
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => removeOption(fieldId, index)}
              >
                <TrashIcon />
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2 rounded-lg border border-border bg-muted/30 p-3">
        <div className="flex gap-2">
          <Input
            placeholder="Label"
            value={newOptionLabel}
            onChange={(e) => setNewOptionLabel(e.target.value)}
            className="flex-1"
          />
          <Input
            placeholder="Value"
            value={newOptionValue}
            onChange={(e) => setNewOptionValue(e.target.value)}
            className="flex-1"
          />
        </div>
        <Button
          size="sm"
          onClick={handleAddOption}
          disabled={!newOptionLabel || !newOptionValue}
          className="w-full"
        >
          <PlusIcon />
          Add Option
        </Button>
      </div>
    </div>
  )
}
