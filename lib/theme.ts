export type Theme = "dark" | "light"

export const themeColors = {
  dark: {
    background: "#141414",
    text: "rgba(255, 255, 255, 0.8)",
    textStrong: "rgba(255, 255, 255, 0.95)",
    border: "rgba(255, 255, 255, 0.15)",
    button: {
      background: "#faf0e6",
      text: "#2C231E",
      border: "rgba(44, 35, 30, 0.2)",
      hoverBorder: "rgba(44, 35, 30, 0.4)",
    },
  },
  light: {
    background: "#faf0e6",
    text: "#2C231E",
    textStrong: "#2C231E",
    border: "rgba(44, 35, 30, 0.15)",
    button: {
      background: "#141414",
      text: "rgba(255, 255, 255, 0.95)",
      border: "rgba(255, 255, 255, 0.2)",
      hoverBorder: "rgba(255, 255, 255, 0.4)",
    },
  },
} as const 
