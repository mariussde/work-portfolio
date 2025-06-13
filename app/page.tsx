"use client"

import { useState, useEffect } from "react"
import BentoGrid from "@/components/BentoGrid"
import { inter } from "../lib/fonts"
import { Playfair_Display } from "next/font/google"
import { useTheme } from "@/hooks/use-theme"
import { cn } from "@/lib/utils"
import { LeftSection } from "@/components/LeftSection"
import { ThemeButton } from "@/components/ThemeButton"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-playfair",
})


export default function Home() {
  const [headerSize] = useState(1.2)
  const [textSize] = useState(0.8)
  const { theme, colors, isDark } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null
  }

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

        {/* Right Content */}
        <div className="w-full md:w-[calc(100%-348px)] lg:w-[calc(100%-372px)] xl:w-[calc(100%-396px)] 2xl:w-[calc(100%-396px)] h-[60vh] md:h-[80vh]">
          <BentoGrid theme={theme} />
        </div>
      </div>
    </div>
  )
}
