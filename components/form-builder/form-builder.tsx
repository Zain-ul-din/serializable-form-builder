"use client"
import { ReactNode } from "react"
import { FormBuilderProvider } from "./form-builder-context"
import { paletteItems } from "./config"
import { FormBuilderPaletteItem } from "./form-builder-palette-item"
import { cn } from "@/lib/utils"
import { FormBuilderCanvasRender } from "./form-builder-canvas-render"

export function FormBuilder({ children }: { children: ReactNode }) {
  return (
    <FormBuilderProvider>
      <div className="grid grid-cols-10 gap-4">{children}</div>
    </FormBuilderProvider>
  )
}

export function FormBuilderPalette({ children }: { children: ReactNode }) {
  return <aside className={cn("col-span-3")}>{children}</aside>
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

export function FormBuilderCanvas({ className }: { className?: string }) {
  return <FormBuilderCanvasRender className={cn("col-span-4", className)} />
}
