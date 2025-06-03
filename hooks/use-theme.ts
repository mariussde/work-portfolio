import { useTheme as useNextTheme } from "next-themes"
import { type Theme, themeColors } from "@/lib/theme"

export function useTheme() {
  const { theme, setTheme } = useNextTheme()
  const currentTheme = (theme as Theme) || "dark"

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark")
  }

  const colors = themeColors[currentTheme]

  return {
    theme: currentTheme,
    colors,
    toggleTheme,
    isDark: currentTheme === "dark",
  }
} 
