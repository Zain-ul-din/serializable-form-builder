"use client"

import { useState } from "react"
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
import { ExportDialog } from "./export-dialog"

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
  const { fields, getBuilderState } = useFormBuilder()
  const [exportOpen, setExportOpen] = useState(false)
  const [exportData, setExportData] = useState<{
    fields: unknown
    schema: unknown
  } | null>(null)

  return (
    <nav className="flex flex-1 items-center justify-end">
      <Button
        disabled={fields.length === 0}
        onClick={() => {
          const state = getBuilderState()
          setExportData({
            fields: state.fields,
            schema: state.schema.toJSONSchema(),
          })
          setExportOpen(true)
        }}
      >
        Export
      </Button>
      <ExportDialog
        open={exportOpen}
        onOpenChange={setExportOpen}
        data={exportData}
      />
    </nav>
  )
}
