"use client"
import { HandIcon } from "lucide-react"
import { PaletteItemConfig } from "./types"
import { cn } from "@/lib/utils"
import { useDraggable } from "@dnd-kit/core"

export function FormBuilderPaletteItem({ item }: { item: PaletteItemConfig }) {
  const { attributes, isDragging, listeners, setNodeRef } = useDraggable({
    id: item.type,
    data: {
      source: "palette",
      item: item,
    },
  })

  return (
    <li
      ref={setNodeRef}
      className={cn(
        "group flex items-center gap-2 rounded-xl border bg-card p-2 ring-border hover:cursor-grab hover:ring-1",
        isDragging && "opacity-50"
      )}
      {...listeners}
      {...attributes}
    >
      <item.icon className="size-4" />
      <p className="text-sm">{item.label}</p>
      <HandIcon className="ml-auto size-4 text-muted-foreground transition-all group-hover:scale-x-110 group-hover:text-foreground" />
    </li>
  )
}
