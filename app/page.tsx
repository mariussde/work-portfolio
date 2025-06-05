"use client"

import { useState, useEffect } from "react"
import DynamicFrameLayout from "../components/DynamicFrameLayout"
import { inter } from "../lib/fonts"
import { Playfair_Display } from "next/font/google"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/hooks/use-theme"
import { cn } from "@/lib/utils"
import { LeftSection } from "@/components/LeftSection"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-playfair",
})

const SKILLS = {
  Frontend: "React | Angular | Next.js | CSS | HTML | TypeScript | JavaScript | Jest | Cypress",
  Backend: "Java | Node.js | Python | C++ | C# | FastAPI | Spring Boot | PostgreSQL | MySQL | MongoDB | GraphQL | Prisma",
  "Machine Learning": "PyTorch | Keras | Hugging Face | Scikit-learn | Neural Networks | NLP",
  Other: "AWS | EC2 | S3 | RDS | Lambda | Kubernetes | Full-Stack | Git | RESTful | CI/CD | ORM",
  Languages: "Spanish, English, Russian, Catalan, Moldovan.<br />Currently learning German and French.",
} as const

const SkillSection = ({ title, content }: { title: string; content: string }) => (
  <div>
    <h3 className="font-bold mb-2">{title}</h3>
    <p dangerouslySetInnerHTML={{ __html: content }} />
  </div>
)

export default function Home() {
  const [headerSize] = useState(1.2)
  const [textSize] = useState(0.8)
  const { theme, colors, toggleTheme, isDark } = useTheme()
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
        <button
          onClick={toggleTheme}
          className="w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-300 hover:shadow-md hover:bg-white/5"
          style={{ color: colors.text }}
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
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
          <DynamicFrameLayout theme={theme} />
        </div>
      </div>
    </div>
  )
}
