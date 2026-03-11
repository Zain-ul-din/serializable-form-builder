"use client"
import { Button } from "@/components/ui/button"
import {
  FormBuilder,
  FormBuilderHeader,
  FormBuilderPalette,
  FormBuilderPaletteItems,
  FormBuilderCanvas,
  FormBuilderSettings,
} from "@/components/form-builder/form-builder"
import { useFormBuilder } from "@/components/form-builder/form-builder-context"

export function FormBuilderDemo() {
  return (
    <FormBuilder>
      <FormBuilderHeader className="flex items-center py-2">
        <FormBuilderNav />
      </FormBuilderHeader>
      <FormBuilderPalette>
        <FormBuilderPaletteItems />
      </FormBuilderPalette>
      <FormBuilderCanvas />
      <FormBuilderSettings />
    </FormBuilder>
  )
}

function FormBuilderNav() {
  const { getBuilderState } = useFormBuilder()
  return (
    <nav className="flex flex-1 items-center justify-end">
      <Button
        onClick={() => {
          const state = getBuilderState()

          const serializableState = {
            ...state,
            schema: state.schema.toJSONSchema(),
          }

          console.log(JSON.stringify(serializableState))
        }}
      >
        Export
      </Button>
    </nav>
  )
}
