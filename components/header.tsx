import { ModeToggle } from "./mode-toggle"

export function Header() {
  return (
    <header className="w-full border-b p-4">
      <div className="mx-auto flex w-full max-w-7xl items-center">
        <h1 className="text-lg font-semibold">Serializable Form Builder</h1>

        <nav className="flex flex-1 justify-end">
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
