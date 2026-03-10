import {
  FormBuilder,
  FormBuilderPalette,
  FormBuilderPaletteItems,
} from "@/components/form-builder/form-builder"

export default function Page() {
  return (
    <main className="flex h-dvh items-center justify-center">
      <section className="rounded-xl border p-6">
        <FormBuilder>
          <FormBuilderPalette>
            <FormBuilderPaletteItems />
          </FormBuilderPalette>
        </FormBuilder>
      </section>
    </main>
  )
}
