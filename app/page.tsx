import { Footer } from "@/components/footer"

import { FormBuilderDemo } from "./_components/form-builder-demo"
import { Header } from "@/components/header"

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex items-center justify-center py-24">
        <section className="w-full p-4">
          <FormBuilderDemo />
        </section>
      </main>
      <Footer />
    </>
  )
}
