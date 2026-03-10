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
      <main className="flex items-center justify-center py-24">
        <section className="w-full p-4">
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
