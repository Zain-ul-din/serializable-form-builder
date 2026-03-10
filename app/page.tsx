import { Footer } from "@/components/footer"
import {
  FormBuilder,
  FormBuilderCanvas,
  FormBuilderPalette,
  FormBuilderPaletteItems,
  FormBuilderSettings,
} from "@/components/form-builder/form-builder"
import { Header } from "@/components/header"

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex h-dvh items-center justify-center">
        <section className="w-full max-w-7xl rounded-xl border p-6">
          <FormBuilder>
            <FormBuilderPalette>
              <FormBuilderPaletteItems />
            </FormBuilderPalette>
            <FormBuilderCanvas />
            <FormBuilderSettings />
          </FormBuilder>
        </section>
      </main>
      <Footer />
    </>
  )
}
