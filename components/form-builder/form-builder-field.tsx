"use client"

import { useDroppable, useDraggable } from "@dnd-kit/core"
import { Field } from "../ui/field"
import { FieldConfig } from "./types"
import { cn } from "@/lib/utils"
import { useFormBuilder } from "./form-builder-context"
import { GripVertical } from "lucide-react"
import { FormBuilderFieldControls } from "./form-builder-field-controls"
import { FormBuilderFieldRenderer } from "./form-builder-field-render"

export function FormBuilderField({
  field,
  lastItem,
}: {
  field: FieldConfig
  lastItem?: boolean
}) {
  const { fields } = useFormBuilder()

  const index = fields.findIndex((f) => f.id === field.id)

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `field-draggable-${field.id}`,
      data: {
        source: "field",
        fieldId: field.id,
        index: index,
      },
    })

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div className="flex w-full flex-col">
      <DropZone index={index} />

      <Field
        ref={setNodeRef}
        style={style}
        className={cn("group relative", isDragging && "z-50")}
      >
        <div
          {...listeners}
          {...attributes}
          className="absolute top-1/2 left-0 -translate-x-4 -translate-y-1/2 cursor-grab opacity-0 transition-opacity group-hover:opacity-100 active:cursor-grabbing"
        >
          <GripVertical className="size-5 text-muted-foreground hover:text-foreground" />
        </div>

        <FormBuilderFieldControls id={field.id}>
          <FormBuilderFieldRenderer field={field} />
        </FormBuilderFieldControls>
      </Field>

      {lastItem && <DropZone index={fields.length} />}
    </div>
  )
}

const DropZone = ({ index }: { index: number }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `field-${index}`,
    data: {
      index,
    },
  })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "h-4 w-full transition-all",
        isOver && "my-2 h-10 rounded-xl border border-dashed"
      )}
    ></div>
  )
}
