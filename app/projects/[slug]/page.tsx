"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/hooks/use-theme"
import { SharedLayout } from "@/components/layout/SharedLayout"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null
  }

  return (
    <SharedLayout>
      <div className="w-full md:w-[calc(100%-348px)] lg:w-[calc(100%-372px)] xl:w-[calc(100%-396px)] 2xl:w-[calc(100%-396px)] h-[60vh] md:h-[80vh]">
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1>Project: {params.slug}</h1>
          {/* Add your project content here */}
        </article>
      </div>
    </SharedLayout>
  )
} 
