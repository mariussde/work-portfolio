import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { inter } from "@/lib/fonts"
import { Linkedin } from "lucide-react"
import { Playfair_Display } from "next/font/google"
import { useRouter } from "next/navigation"
import { useIsMobile } from "@/hooks/use-mobile"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-playfair",
})

const SKILLS = {
  Frontend: "React | Angular | Next.js | CSS | HTML | TypeScript | JavaScript | Jest | Cypress",
  Backend: "Java | Node.js | Python | C++ | C# | FastAPI | Spring Boot | PostgreSQL | MySQL | MongoDB | GraphQL | Prisma",
  "Machine Learning": "PyTorch | Keras | Hugging Face | Scikit-learn | Neural Networks | NLP",
  DevOps: "AWS | EC2 | S3 | RDS | Lambda | Kubernetes | Full-Stack | Git | RESTful | CI/CD | ORM",
  Languages: "Spanish, English, Russian, Catalan, Moldovan.<br />Currently learning German and French.",
} as const

const SkillSection = ({ title, content }: { title: string; content: string }) => (
  <div>
    <h3 className="font-bold mb-2">{title}</h3>
    <p dangerouslySetInnerHTML={{ __html: content }} />
  </div>
)

interface LeftSectionProps {
  headerSize: number
  textSize: number
  colors: {
    text: string
    textStrong: string
    border: string
  }
  isDark: boolean
}

export const LeftSection = ({ headerSize, textSize, colors, isDark }: LeftSectionProps) => {
  const [isCopied, setIsCopied] = useState(false)
  const router = useRouter()
  const isMobile = useIsMobile()

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("marius.sdeing@gmail.com")
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 3000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="w-full md:w-[350px] lg:w-[350px] xl:w-[350px] 2xl:w-[350px] flex-shrink-0 flex flex-col justify-between h-full">
      <div className="flex flex-col gap-6">
        <h1
          className="text-4xl md:text-6xl tracking-tighter leading-[130%] cursor-pointer hover:opacity-80 transition-opacity"
          style={{
            fontSize: `${4 * headerSize}rem`,
            color: colors.textStrong,
            fontFamily: "var(--font-playfair)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
          }}
          onClick={() => router.push("/")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              router.push("/")
            }
          }}
          role="link"
          tabIndex={0}
          aria-label="Go to home page"
        >
          Marius
          <br />
          Lefter
          <br />
        </h1>
        <div
          className={cn(
            inter.className,
            "flex flex-col gap-4 text-sm font-light w-full"
          )}
          style={{
            fontSize: `${0.875 * textSize}rem`,
            color: colors.text,
          }}
        >
          <p className="font-medium" style={{ color: colors.textStrong }}>
            Software engineer focused on full stack web apps and Artificial Intelligence.
          </p>
          <div className="flex gap-2 mt-5">
            <Button
              variant="outline"
              size="default"
              onClick={handleCopyEmail}
              disabled={isCopied}
              className={cn(
                "shadow-none transition-all duration-300",
                isDark
                  ? "bg-[#faf0e6] text-[#2C231E] border-[#2C231E]/20 hover:border-[#2C231E]/40"
                  : "bg-[#141414] text-white/95 border-white/20 hover:border-white/40",
                isCopied && "opacity-50 cursor-not-allowed"
              )}
            >
              {isCopied ? "Copied!" : "Copy Email"}
            </Button>
            <Button
              variant="outline"
              size="default"
              onClick={() => window.open("/cv_english.pdf", "_blank")}
              className={cn(
                "shadow-none transition-all duration-300",
                isDark
                  ? "bg-[#faf0e6] text-[#2C231E] border-[#2C231E]/20 hover:border-[#2C231E]/40"
                  : "bg-[#141414] text-white/95 border-white/20 hover:border-white/40"
              )}
            >
              Read.cv
            </Button>
            <Button
              variant="outline"
              size="default"
              onClick={() => window.open("https://github.com/mariussde?tab=repositories", "_blank")}
              className={cn(
                "shadow-none transition-all duration-300",
                isDark
                  ? "bg-[#faf0e6] text-[#2C231E] border-[#2C231E]/20 hover:border-[#2C231E]/40"
                  : "bg-[#141414] text-white/95 border-white/20 hover:border-white/40"
              )}
            >
              GitHub
            </Button>
            <Button
              variant="outline"
              size="default"
              onClick={() => window.open("https://www.linkedin.com/in/marius-lefter-lefter-17948b2a2/", "_blank")}
              className={cn(
                "shadow-none transition-all duration-300",
                isDark
                  ? "bg-[#faf0e6] text-[#2C231E] border-[#2C231E]/20 hover:border-[#2C231E]/40"
                  : "bg-[#141414] text-white/95 border-white/20 hover:border-white/40"
              )}
            >
              <Linkedin size={16} />
            </Button>
          </div>
          <div
            className="h-px w-full"
            style={{ backgroundColor: colors.border }}
          />
          {!isMobile && (
            <div className="space-y-4">
              {Object.entries(SKILLS).map(([title, content]) => (
                <SkillSection key={title} title={title} content={content} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 
