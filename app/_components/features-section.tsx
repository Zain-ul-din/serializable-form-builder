import {
  Braces,
  GripVertical,
  Layers,
  MousePointerClick,
  Shield,
  FileJson,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const features = [
  {
    icon: GripVertical,
    title: "Drag & Drop Builder",
    description:
      "Compose forms by dragging field types onto a visual canvas. Reorder with intuitive drag handles.",
  },
  {
    icon: Layers,
    title: "12 Field Types",
    description:
      "Text, email, URL, phone, number, date, password, file upload, select, multi-select, checkbox, and textarea.",
  },
  {
    icon: Braces,
    title: "Zod Schema Generation",
    description:
      "Automatically generates Zod validation schemas from your form configuration with full type safety.",
  },
  {
    icon: FileJson,
    title: "JSON Schema Export",
    description:
      "Export form definitions as portable JSON. Field configs and schemas are fully serializable.",
  },
  {
    icon: Shield,
    title: "Validation Rules",
    description:
      "Configure min/max length, patterns, email format, URL format, and custom error messages per field.",
  },
  {
    icon: MousePointerClick,
    title: "Real-time Preview",
    description:
      "See your form take shape as you build. Select any field to configure its properties in the settings panel.",
  },
]

export function FeaturesSection() {
  return (
    <section className="border-b py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 max-w-lg">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">
            Features
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Everything you need to build forms
          </h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            A complete toolkit for visual form design with serializable output
            you can store, transfer, and render anywhere.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} size="sm">
              <CardHeader>
                <div className="mb-1 flex size-9 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="size-4 text-primary" />
                </div>
                <CardTitle className="text-sm">{feature.title}</CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
