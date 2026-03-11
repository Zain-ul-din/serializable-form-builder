import { cn } from "@/lib/utils"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty"
import { HandGrab } from "lucide-react"
import { useDroppable } from "@dnd-kit/core"
import { useFormBuilder } from "./form-builder-context"
import { FormBuilderField } from "./form-builder-field"

export function FormBuilderCanvasRender({ className }: { className?: string }) {
  const { setNodeRef, isOver } = useDroppable({
    id: "form-builder-canvas",
  })
  const { fields } = useFormBuilder()

  return (
    <section
      className={cn(
        "flex h-full w-full",
        fields.length === 0 && "items-center justify-center",
        className
      )}
    >
      {fields.length === 0 ? (
        <Empty
          ref={setNodeRef}
          className={cn(
            "h-full",
            isOver && "border-2 border-dashed bg-card/50"
          )}
        >
          <EmptyHeader>
            <EmptyMedia>
              <HandGrab />
            </EmptyMedia>
            <EmptyTitle>Drag and drop form elements here</EmptyTitle>
          </EmptyHeader>
        </Empty>
      ) : (
        <ul className="w-full py-4">
          {fields.map((field, i, self) => (
            <FormBuilderField
              key={i}
              field={field}
              lastItem={i == self.length - 1}
            />
          ))}
        </ul>
      )}
    </section>
  )
}
