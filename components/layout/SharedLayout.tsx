import { LeftSection } from "@/components/layout/LeftSection"
import { ThemeButton } from "@/components/layout/ThemeButton"
import { useTheme } from "@/hooks/use-theme"
import { cn } from "@/lib/utils"
import { inter } from "@/lib/fonts"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-playfair",
})

interface SharedLayoutProps {
  children: React.ReactNode
  headerSize?: number
  textSize?: number
}

export const SharedLayout = ({ 
  children, 
  headerSize = 1.2, 
  textSize = 0.8 
}: SharedLayoutProps) => {
  const { colors, isDark } = useTheme()

  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center p-8 transition-colors duration-300",
        playfair.variable,
        inter.variable
      )}
    >
      <div className="absolute top-8 right-8 flex items-center gap-4">
        <ThemeButton />
      </div>
      <div className="w-full h-full flex flex-col md:flex-row items-start gap-8 md:gap-24 lg:gap-32 xl:gap-48 2xl:gap-48">
        <LeftSection 
          headerSize={headerSize}
          textSize={textSize}
          colors={colors}
          isDark={isDark}
        />
        {children}
      </div>
    </div>
  )
} 
