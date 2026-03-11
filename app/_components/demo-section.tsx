import { FormBuilderDemo } from "./form-builder-demo"

export function DemoSection() {
  return (
    <section id="demo" className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-8 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">
            Demo
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Try it yourself
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Drag fields onto the canvas, configure them, and export the result.
          </p>
        </div>
      </div>

      <div className="w-full px-4">
        <FormBuilderDemo />
      </div>
    </section>
  )
}
