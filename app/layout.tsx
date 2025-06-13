import "./globals.css"
import { ppEditorialNewUltralightItalic, inter } from "../lib/fonts"
import type React from "react"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: "Marius Lefter | Portfolio",
  description: "Software engineer focused on full stack web apps and Artificial Intelligence.",
  openGraph: {
    title: "Marius Lefter | Portfolio",
    description: "Software engineer focused on full stack web apps and Artificial Intelligence.",
    url: "https://www.mariuslefter.com", // your site URL
    siteName: "Marius Lefter Portfolio",
    images: [
      {
        url: "https://www.mariuslefter.com/og-image.png", // your image URL
        width: 1200,
        height: 630,
        alt: "Marius Lefter Portfolio"
      }
    ],
    locale: "en_US",
    type: "website"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${ppEditorialNewUltralightItalic.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
