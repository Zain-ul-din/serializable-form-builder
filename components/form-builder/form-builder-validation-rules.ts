import { z } from "zod/v4"
import { FieldConfig, ValidationRule } from "./types"

/**
 * Generates a runtime Zod schema for a single field based on its configuration
 */
export function generateFieldZodSchema(field: FieldConfig): z.ZodTypeAny {
  let schema: z.ZodTypeAny

  switch (field.type) {
    case "text":
    case "textarea":
    case "email":
    case "url":
    case "phone":
    case "password":
      schema = z.string()
      break

    case "number":
      schema = z.number()
      break

    case "date":
      schema = z.coerce.date()
      break

    case "checkbox":
      schema = z.boolean()
      break

    case "select":
      if (field.options?.length) {
        const values = field.options.map((o) => o.value)
        schema = z.enum(values as [string, ...string[]])
      } else {
        schema = z.string()
      }
      break

    case "multiselect":
      if (field.options?.length) {
        const values = field.options.map((o) => o.value)
        schema = z.array(z.enum(values as [string, ...string[]]))
      } else {
        schema = z.array(z.string())
      }
      break

    case "file":
      schema = z.instanceof(File)
      break

    default:
      schema = z.string()
  }

  // Auto-apply type-specific validations
  if (field.type === "email" && schema instanceof z.ZodString) {
    schema = z.email("Invalid email address")
  }
  if (field.type === "url" && schema instanceof z.ZodString) {
    schema = z.url("Invalid URL")
  }
  if (field.type === "phone" && schema instanceof z.ZodString) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    schema = schema.regex(phoneRegex, "Invalid phone number")
  }

  // Apply required validation if field.required is true (before custom rules)
  if (field.required) {
    if (schema instanceof z.ZodString) {
      schema = schema.min(1, "This field is required")
    } else if (schema instanceof z.ZodArray) {
      schema = schema.min(1, "Select at least one option")
    }
    // For other types (boolean, number, date, enum), not being optional is sufficient
  }

  // Apply validation rules dynamically
  field.validation.forEach((rule) => {
    switch (rule.type) {
      case "required":
        // For strings, ensure not empty
        if (schema instanceof z.ZodString) {
          schema = schema.min(1, rule.message || "This field is required")
        }
        break

      case "minLength":
        if (schema instanceof z.ZodString) {
          schema = schema.min(
            rule.value,
            rule.message || `Minimum ${rule.value} characters`
          )
        }
        break

      case "maxLength":
        if (schema instanceof z.ZodString) {
          schema = schema.max(
            rule.value,
            rule.message || `Maximum ${rule.value} characters`
          )
        }
        break

      case "min":
        if (schema instanceof z.ZodNumber) {
          schema = schema.min(
            rule.value,
            rule.message || `Minimum value is ${rule.value}`
          )
        }
        break

      case "max":
        if (schema instanceof z.ZodNumber) {
          schema = schema.max(
            rule.value,
            rule.message || `Maximum value is ${rule.value}`
          )
        }
        break

      case "pattern":
        if (schema instanceof z.ZodString) {
          try {
            const regex = new RegExp(rule.value)
            schema = schema.regex(regex, rule.message || "Invalid format")
          } catch (e) {
            console.error("Invalid regex pattern:", rule.value)
          }
        }
        break

      case "email":
        if (schema instanceof z.ZodString) {
          schema = schema.email(rule.message || "Invalid email address")
        }
        break

      case "url":
        if (schema instanceof z.ZodString) {
          schema = schema.url(rule.message || "Invalid URL")
        }
        break

      case "uuid":
        if (schema instanceof z.ZodString) {
          schema = schema.uuid(rule.message || "Invalid UUID")
        }
        break

      case "phoneNumber":
        if (schema instanceof z.ZodString) {
          // Basic phone number validation regex
          const phoneRegex = /^[\d\s\-\+\(\)]+$/
          schema = schema.regex(
            phoneRegex,
            rule.message || "Invalid phone number"
          )
        }
        break
    }
  })

  // Handle optional fields (make optional if not required)
  if (!field.required) {
    schema = schema.optional()
  }

  return schema
}

/**
 * Generates a runtime Zod object schema for an entire form
 */
export function generateZodSchema(
  fields: FieldConfig[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): z.ZodObject<any> {
  const shape: Record<string, z.ZodTypeAny> = {}

  fields.forEach((field) => {
    shape[field.id] = generateFieldZodSchema(field)
  })

  return z.object(shape)
}

/**
 * Metadata for available validation rule types
 */
export const validationRuleTypes: {
  type: ValidationRule["type"]
  label: string
  requiresValue: boolean
}[] = [
  { type: "required", label: "Required", requiresValue: false },
  { type: "minLength", label: "Minimum Length", requiresValue: true },
  { type: "maxLength", label: "Maximum Length", requiresValue: true },
  { type: "min", label: "Minimum Value", requiresValue: true },
  { type: "max", label: "Maximum Value", requiresValue: true },
  { type: "pattern", label: "Pattern (Regex)", requiresValue: true },
  { type: "email", label: "Email Format", requiresValue: false },
  { type: "url", label: "URL Format", requiresValue: false },
  { type: "uuid", label: "UUID Format", requiresValue: false },
  { type: "phoneNumber", label: "Phone Number", requiresValue: false },
] as const

/**
 * Get applicable validation rule types for a field type
 */
export function getApplicableValidationRules(
  fieldType: string
): Array<{ type: string; label: string; requiresValue: boolean }> {
  switch (fieldType) {
    case "text":
    case "textarea":
    case "password":
      return validationRuleTypes.filter((r) =>
        ["required", "minLength", "maxLength", "pattern"].includes(r.type)
      )

    case "email":
      return validationRuleTypes.filter((r) =>
        ["required", "minLength", "maxLength", "email"].includes(r.type)
      )

    case "url":
      return validationRuleTypes.filter((r) =>
        ["required", "url"].includes(r.type)
      )

    case "phone":
      return validationRuleTypes.filter((r) =>
        ["required", "phoneNumber"].includes(r.type)
      )

    case "number":
      return validationRuleTypes.filter((r) =>
        ["required", "min", "max"].includes(r.type)
      )

    case "date":
      return validationRuleTypes.filter((r) => ["required"].includes(r.type))

    case "select":
    case "multiselect":
    case "checkbox":
      return validationRuleTypes.filter((r) => r.type === "required")

    default:
      return validationRuleTypes.filter((r) => r.type === "required")
  }
}
