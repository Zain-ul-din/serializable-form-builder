import { ArrowDown, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b">
      {/* Dot grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Gradient glow behind hero */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 pt-24 pb-20 text-center">
        <Badge variant="outline" className="mb-6">
          Open Source
        </Badge>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Build forms visually.
          <br />
          <span className="text-primary">Export as JSON Schema.</span>
        </h1>

        <p className="mt-6 max-w-xl text-base text-muted-foreground leading-relaxed">
          A drag-and-drop form builder that generates serializable field
          configurations and Zod-compatible JSON schemas. Design once, render
          anywhere.
        </p>

        <div className="mt-10 flex items-center gap-3">
          <Button size="lg" asChild>
            <a href="#demo">
              Try the demo
              <ArrowDown className="size-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a
              href="https://github.com/Zain-ul-din/serializable-form-builder"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="size-4" />
              GitHub
            </a>
          </Button>
        </div>

        <div className="mt-12 flex items-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-primary" />
            12 field types
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-primary" />
            Zod schemas
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-primary" />
            JSON export
          </span>
        </div>
      </div>
    </section>
  )
}
