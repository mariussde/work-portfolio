"use client"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()
  const { colors, isDark } = useTheme()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 
        className="text-6xl font-bold mb-4"
        style={{ color: colors.textStrong }}
      >
        404
      </h1>
      <p 
        className="text-xl mb-8"
        style={{ color: colors.text }}
      >
        Page not found
      </p>
      <Button
        variant="outline"
        size="default"
        onClick={() => router.push("/")}
        className={cn(
          "shadow-none transition-all duration-300",
          isDark
            ? "bg-[#faf0e6] text-[#2C231E] border-[#2C231E]/20 hover:border-[#2C231E]/40"
            : "bg-[#141414] text-white/95 border-white/20 hover:border-white/40"
        )}
      >
        Return Home
      </Button>
    </div>
  )
}
