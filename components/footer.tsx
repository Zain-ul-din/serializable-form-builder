import { Github } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t">
      <div className="mx-auto flex max-w-7xl py-8">
        <div className="flex flex-1 justify-end">
          <Link href="https://github.com/Zain-ul-din/serializable-form-builder">
            <span className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <Github /> Proudly Open sourced
            </span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
