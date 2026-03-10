import { HandIcon } from "lucide-react"
import { PaletteItemConfig } from "./types"
import { cn } from "@/lib/utils"

export function FormBuilderPaletteItem({ item }: { item: PaletteItemConfig }) {
  return (
    <li
      className={cn(
        "group flex items-center gap-2 rounded-xl border bg-card p-2 ring-border hover:cursor-grab hover:ring-1"
      )}
    >
      <item.icon className="size-4" />
      <p className="text-sm">{item.label}</p>
      <HandIcon className="ml-auto size-4 text-muted-foreground transition-all group-hover:scale-x-110 group-hover:text-foreground" />
    </li>
  )
}
