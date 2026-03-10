import { ReactNode, useState } from "react"
import { Button } from "../ui/button"
import { TrashIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useFormBuilder } from "./form-builder-context"

export function FormBuilderFieldControls({
  children,
  id,
}: {
  children: ReactNode
  id: string
}) {
  const { removeField, selectField, selectedFieldId } = useFormBuilder()
  const [deleteOpen, setDeleteOpen] = useState(false)
  const isSelected = selectedFieldId === id

  return (
    <div
      onClick={() => selectField(id)}
      className={`cursor-pointer transition-all ${
        isSelected
          ? "rounded-lg ring-2 ring-primary"
          : "rounded-lg hover:ring-1 hover:ring-border"
      }`}
    >
      <div className="absolute top-0 right-0 z-10 flex w-full">
        <div className="ml-auto flex -translate-y-1 gap-2">
          <Popover open={deleteOpen} onOpenChange={setDeleteOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"destructive"}
                size={"icon-sm"}
                onClick={(e) => e.stopPropagation()}
              >
                <TrashIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="max-w-44"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                size={"sm"}
                onClick={() => {
                  removeField(id)
                  setDeleteOpen(false)
                }}
                variant={"destructive"}
              >
                Confirm Delete
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {children}
    </div>
  )
}
