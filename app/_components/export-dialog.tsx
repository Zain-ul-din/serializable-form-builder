"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ExportData {
  fields: unknown
  schema: unknown
}

interface ExportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: ExportData | null
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-7"
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
    </Button>
  )
}

export function ExportDialog({ open, onOpenChange, data }: ExportDialogProps) {
  if (!data) return null

  const fieldsJson = JSON.stringify(data.fields, null, 2)
  const schemaJson = JSON.stringify(data.schema, null, 2)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Export</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 overflow-y-auto flex-1 min-h-0">
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-sm font-medium">
                Fields Configuration
              </label>
              <CopyButton text={fieldsJson} />
            </div>
            <pre className="max-h-[300px] overflow-auto rounded-md bg-muted p-4 text-xs font-mono">
              {fieldsJson}
            </pre>
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-sm font-medium">JSON Schema</label>
              <CopyButton text={schemaJson} />
            </div>
            <pre className="max-h-[300px] overflow-auto rounded-md bg-muted p-4 text-xs font-mono">
              {schemaJson}
            </pre>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
