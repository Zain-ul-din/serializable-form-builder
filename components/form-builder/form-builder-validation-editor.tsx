"use client"

import { useFormBuilder } from "./form-builder-context"
import { ValidationRule } from "./types"
import { Input } from "../ui/input"
import { FieldLabel } from "../ui/field"
import { Switch } from "../ui/switch"
import { getApplicableValidationRules } from "./form-builder-validation-rules"

export function FormBuilderValidationEditor({ fieldId }: { fieldId: string }) {
  const {
    fields,
    addValidationRule,
    removeValidationRule,
    updateValidationRule,
  } = useFormBuilder()

  const field = fields.find((f) => f.id === fieldId)

  if (!field) return null

  // Filter out "required" since it's in general settings
  const applicableRules = getApplicableValidationRules(field.type).filter(
    (r) => r.type !== "required"
  )

  const getRuleByType = (
    ruleType: string
  ): { rule: ValidationRule; index: number } | null => {
    const index = field.validation.findIndex((r) => r.type === ruleType)
    if (index === -1) return null
    return { rule: field.validation[index], index }
  }

  const isRuleEnabled = (ruleType: string): boolean => {
    return field.validation.some((r) => r.type === ruleType)
  }

  const toggleRule = (ruleType: string) => {
    const existing = getRuleByType(ruleType)

    if (existing) {
      // Remove rule
      removeValidationRule(fieldId, existing.index)
    } else {
      // Add rule with default values
      let rule: ValidationRule

      switch (ruleType) {
        case "minLength":
          rule = { type: "minLength", value: 1 }
          break
        case "maxLength":
          rule = { type: "maxLength", value: 100 }
          break
        case "min":
          rule = { type: "min", value: 0 }
          break
        case "max":
          rule = { type: "max", value: 100 }
          break
        case "pattern":
          rule = { type: "pattern", value: "" }
          break
        case "email":
          rule = { type: "email" }
          break
        case "url":
          rule = { type: "url" }
          break
        case "uuid":
          rule = { type: "uuid" }
          break
        case "phoneNumber":
          rule = { type: "phoneNumber" }
          break
        default:
          return
      }

      addValidationRule(fieldId, rule)
    }
  }

  const updateRuleValue = (ruleType: string, value: number | string) => {
    const existing = getRuleByType(ruleType)
    if (!existing) return

    const updatedRule: ValidationRule = {
      ...existing.rule,
      value,
    } as ValidationRule

    updateValidationRule(fieldId, existing.index, updatedRule)
  }

  const updateRuleMessage = (ruleType: string, message: string) => {
    const existing = getRuleByType(ruleType)
    if (!existing) return

    const updatedRule: ValidationRule = {
      ...existing.rule,
      message: message || undefined,
    } as ValidationRule

    updateValidationRule(fieldId, existing.index, updatedRule)
  }

  return (
    <div className="space-y-3">
      {applicableRules.map((ruleType) => {
        const enabled = isRuleEnabled(ruleType.type)
        const existing = getRuleByType(ruleType.type)

        return (
          <div key={ruleType.type} className="space-y-2">
            <div className="flex items-center justify-between">
              <FieldLabel className="text-sm font-normal">
                {ruleType.label}
              </FieldLabel>
              <Switch
                checked={enabled}
                onCheckedChange={() => toggleRule(ruleType.type)}
              />
            </div>

            {enabled && ruleType.requiresValue && existing && (
              <div className="ml-4 space-y-2">
                <Input
                  type={ruleType.type === "pattern" ? "text" : "number"}
                  placeholder={
                    ruleType.type === "pattern"
                      ? "Enter regex pattern"
                      : "Enter value"
                  }
                  value={
                    (existing.rule as { value: string }).value !== undefined
                      ? (existing.rule as { value: string }).value
                      : ""
                  }
                  onChange={(e) =>
                    updateRuleValue(
                      ruleType.type,
                      ruleType.type === "pattern"
                        ? e.target.value
                        : parseInt(e.target.value) || 0
                    )
                  }
                  className="text-sm"
                />
                <Input
                  type="text"
                  placeholder="Custom error message (optional)"
                  value={existing.rule.message || ""}
                  onChange={(e) =>
                    updateRuleMessage(ruleType.type, e.target.value)
                  }
                  className="text-sm"
                />
              </div>
            )}

            {enabled && !ruleType.requiresValue && existing && (
              <div className="ml-4">
                <Input
                  type="text"
                  placeholder="Custom error message (optional)"
                  value={existing.rule.message || ""}
                  onChange={(e) =>
                    updateRuleMessage(ruleType.type, e.target.value)
                  }
                  className="text-sm"
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
