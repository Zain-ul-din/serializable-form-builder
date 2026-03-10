"use client"
import { ReactNode } from "react"
import { FormBuilderProvider } from "./form-builder-context"
import { paletteItems } from "./config"
import { FormBuilderPaletteItem } from "./form-builder-palette-item"
import { cn } from "@/lib/utils"
import { FormBuilderCanvasRender } from "./form-builder-canvas-render"
import { FormBuilderSettingsRender } from "./form-builder-settings-render"

export function FormBuilder({ children }: { children: ReactNode }) {
  return (
    <FormBuilderProvider>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-[250px_1fr_350px] rounded-xl border">
        {children}
      </div>
    </FormBuilderProvider>
  )
}

export function FormBuilderPalette({ children }: { children: ReactNode }) {
  return <aside className="border-r p-4">{children}</aside>
}

export function FormBuilderPaletteHeader() {
  return <h3 className="mb-4 text-base font-semibold">Drag & Drop</h3>
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
  return (
    <FormBuilderCanvasRender
      className={cn("mx-auto max-w-xl overflow-y-auto p-4", className)}
    />
  )
}

export function FormBuilderSettings() {
  return <FormBuilderSettingsRender className="border-l bg-card/50 p-4" />
}
