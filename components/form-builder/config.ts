import {
  CalendarDays,
  ChevronDown,
  CircleCheck,
  Hash,
  KeyRound,
  Link,
  ListChecks,
  Mail,
  Phone,
  TextAlignStart,
  TextCursorInput,
  Upload,
} from "lucide-react"
import { PaletteItemConfig } from "./types"

export const paletteItems: PaletteItemConfig[] = [
  {
    label: "Text Field",
    type: "text",
    description: "Single line text input",
    icon: TextCursorInput,
  },
  {
    label: "Text Area",
    type: "textarea",
    description: "Multi-line text input",
    icon: TextAlignStart,
  },
  {
    label: "Number",
    type: "number",
    description: "Numeric input",
    icon: Hash,
  },
  {
    label: "Email",
    type: "email",
    description: "Email address input",
    icon: Mail,
  },
  {
    label: "URL",
    type: "url",
    description: "Website URL input",
    icon: Link,
  },
  {
    label: "Phone",
    type: "phone",
    description: "Phone number input",
    icon: Phone,
  },
  {
    label: "Password",
    type: "password",
    description: "Password input",
    icon: KeyRound,
  },
  {
    label: "Date",
    type: "date",
    description: "Date picker",
    icon: CalendarDays,
  },
  {
    label: "File Upload",
    type: "file",
    description: "File upload input",
    icon: Upload,
  },
  {
    label: "Select",
    type: "select",
    description: "Dropdown selection",
    icon: ChevronDown,
  },
  {
    label: "Multi Select",
    type: "multiselect",
    description: "Multiple selection",
    icon: ListChecks,
  },
  {
    label: "Checkbox",
    type: "checkbox",
    description: "True/false toggle",
    icon: CircleCheck,
  },
]
