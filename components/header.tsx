import { Github } from "lucide-react"
import { Button } from "./ui/button"
import { ModeToggle } from "./mode-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm p-4">
      <div className="mx-auto flex w-full max-w-7xl items-center">
        <h1 className="text-lg font-semibold">Serializable Form Builder</h1>

        <nav className="flex flex-1 items-center justify-end gap-1">
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com/Zain-ul-din/serializable-form-builder"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="size-4" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
