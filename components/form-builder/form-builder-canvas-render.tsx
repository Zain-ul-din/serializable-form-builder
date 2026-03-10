import { cn } from "@/lib/utils"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty"
import { HandGrab } from "lucide-react"

export function FormBuilderCanvasRender({ className }: { className?: string }) {
  return (
    <section
      className={cn("flex h-full items-center justify-center", className)}
    >
      <Empty className="h-full border-2 border-dashed">
        <EmptyHeader>
          <EmptyMedia>
            <HandGrab />
          </EmptyMedia>
          <EmptyTitle>Drag and drop form elements here</EmptyTitle>
        </EmptyHeader>
      </Empty>
    </section>
  )
}
