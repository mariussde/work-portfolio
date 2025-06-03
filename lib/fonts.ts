import { Inter } from "next/font/google"
import type { NextFontWithVariable } from "next/dist/compiled/@next/font"

/**
 * Font configuration types
 */
type FontConfig = {
  className: string
  style: {
    fontFamily: string
    fontWeight: number
    fontStyle: string
  }
  variable: string
}

/**
 * Google Fonts
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

/**
 * Local Fonts
 */
const ppEditorialNewUltralightItalic: NextFontWithVariable = {
  className: "font-pp-editorial",
  style: {
    fontFamily: "PPEditorialNew-UltralightItalic",
    fontWeight: 200,
    fontStyle: "italic",
  },
  variable: "--font-pp-editorial",
}

/**
 * Font configuration object for easy access to all font properties
 */
export const fonts = {
  inter: {
    className: inter.className,
    variable: inter.variable,
  },
  ppEditorial: {
    className: ppEditorialNewUltralightItalic.className,
    variable: ppEditorialNewUltralightItalic.variable,
  },
} as const

/**
 * Export individual fonts for direct usage
 */
export { inter, ppEditorialNewUltralightItalic }
