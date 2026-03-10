import { ReactNode } from "react"
import { FormBuilderProvider } from "./form-builder-provider"
import { paletteItems } from "./config"
import { FormBuilderPaletteItem } from "./form-builder-palette-item"
import { cn } from "@/lib/utils"

export function FormBuilder({ children }: { children: ReactNode }) {
  return <FormBuilderProvider>{children}</FormBuilderProvider>
}

export function FormBuilderPalette({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export function FormBuilderPaletteItems({ className }: { className?: string }) {
  return (
    <ul className={cn("space-y-2", className)}>
      {paletteItems.map((item, i) => (
        <FormBuilderPaletteItem item={item} key={i} />
      ))}
    </ul>
  )
}
