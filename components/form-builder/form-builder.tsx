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
      <div className="mx-auto grid h-[calc(90vh-12rem)] w-full max-w-7xl grid-cols-[250px_1fr_350px] overflow-hidden rounded-xl border">
        {children}
      </div>
    </FormBuilderProvider>
  )
}

export function FormBuilderHeader({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) {
  return (
    <header className={cn("col-span-full border-b px-4 py-2", className)}>
      {children}
    </header>
  )
}

export function FormBuilderPalette({ children }: { children: ReactNode }) {
  return (
    <aside className="min-h-0 overflow-x-hidden overflow-y-auto border-r p-4">
      {children}
    </aside>
  )
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
      className={cn("mx-auto min-h-0 max-w-xl overflow-y-auto p-4", className)}
    />
  )
}

export function FormBuilderSettings() {
  return (
    <FormBuilderSettingsRender className="min-h-0 overflow-y-auto border-l bg-card/50 p-4" />
  )
}
