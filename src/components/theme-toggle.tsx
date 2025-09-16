"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  const isDark = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  if (!isClient) {
    // Render a placeholder on the server
    return <div className="h-10 w-10" />;
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative overflow-hidden"
    >
      <div className="relative h-10 w-10 flex items-center justify-center">
        {/* Sun Icon */}
        <div
          className={`absolute transition-all duration-500 transform ${
            isDark ? "-translate-y-8 rotate-90 scale-0" : "translate-y-0 rotate-0 scale-100"
          }`}
        >
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        </div>
        {/* Moon Icon */}
        <div
          className={`absolute transition-all duration-500 transform ${
            isDark ? "translate-y-0 rotate-0 scale-100" : "translate-y-8 rotate-90 scale-0"
          }`}
        >
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        </div>
      </div>
    </Button>
  )
}
