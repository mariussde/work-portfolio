"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FrameComponent } from "./FrameComponent"
import { type Theme } from "@/lib/theme"
import { useIsMobile } from "@/hooks/use-mobile"

interface Frame {
  id: number
  video: string
  defaultPos: { x: number; y: number; w: number; h: number }
  projectInfo: {
    tags: string[]
    siteUrl?: string
    githubUrl?: string
  }
}

interface DynamicFrameLayoutProps {
  theme: Theme
}

const GRID_SIZE = 12
const GAP_SIZE = 8
const DEFAULT_FRAME_SIZE = 4

// Helper function to check if a position is occupied
const isPositionOccupied = (frames: Frame[], x: number, y: number, w: number, h: number): boolean => {
  return frames.some(frame => {
    const frameX = frame.defaultPos.x
    const frameY = frame.defaultPos.y
    const frameW = frame.defaultPos.w
    const frameH = frame.defaultPos.h

    return (
      x < frameX + frameW &&
      x + w > frameX &&
      y < frameY + frameH &&
      y + h > frameY
    )
  })
}

const initialFrames: Frame[] = [
  {
    id: 1,
    video: "https://aarqynohzxfrbmfa.public.blob.vercel-storage.com/coca-cola-4k-ogSVl9krnGoXwIDK8fxjEoAGLVw91W.mp4",
    defaultPos: { x: 0, y: 0, w: 8, h: 8 }, // Large square (2x2)
    projectInfo: {
      tags: ["Next.js", "TypeScript", "TailwindCSS"],
      siteUrl: "https://example.com",
      githubUrl: "https://github.com/example"
    }
  },
  {
    id: 2,
    video: "https://aarqynohzxfrbmfa.public.blob.vercel-storage.com/coca-cola-720p-4Hdkynjv2KNgjYl8JZUnroAIsYvuQn.mp4",
    defaultPos: { x: 8, y: 0, w: 4, h: 8 }, // Vertical (1x2)
    projectInfo: {
      tags: ["Three.js", "WebGL", "React"],
      siteUrl: "https://example.com",
      githubUrl: "https://github.com/example"
    }
  },
  {
    id: 3,
    video: "https://aarqynohzxfrbmfa.public.blob.vercel-storage.com/fanta-4k-8XwpzIi2DPz3qmQRlU6W6w0qO6VA1P.mp4",
    defaultPos: { x: 0, y: 8, w: 4, h: 4 }, // Regular (1x1)
    projectInfo: {
      tags: ["Framer Motion", "GSAP", "React"],
      siteUrl: "https://example.com",
      githubUrl: "https://github.com/example"
    }
  },
  {
    id: 4,
    video: "https://aarqynohzxfrbmfa.public.blob.vercel-storage.com/coca-cola-4k-ogSVl9krnGoXwIDK8fxjEoAGLVw91W.mp4",
    defaultPos: { x: 4, y: 8, w: 4, h: 4 }, // Regular (1x1)
    projectInfo: {
      tags: ["Next.js", "Supabase", "TailwindCSS"],
      siteUrl: "https://example.com",
      githubUrl: "https://github.com/example"
    }
  },
  {
    id: 5,
    video: "https://aarqynohzxfrbmfa.public.blob.vercel-storage.com/fanta-4k-8XwpzIi2DPz3qmQRlU6W6w0qO6VA1P.mp4",
    defaultPos: { x: 8, y: 8, w: 4, h: 4 }, // Regular (1x1)
    projectInfo: {
      tags: ["Figma", "After Effects", "Illustrator"],
      siteUrl: "https://example.com",
      githubUrl: "https://github.com/example"
    }
  }
]

const getTransformOrigin = (x: number, y: number, w: number, h: number): string => {
  const vertical = y === 0 ? "top" : y + h === GRID_SIZE ? "bottom" : "center"
  const horizontal = x === 0 ? "left" : x + w === GRID_SIZE ? "right" : "center"
  return `${vertical} ${horizontal}`
}

export default function DynamicFrameLayout({ theme }: DynamicFrameLayoutProps) {
  const [frames] = useState<Frame[]>(initialFrames)
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)
  const autoplayMode = "all"
  const isMobile = useIsMobile()

  // Adjust frame positions for mobile
  const adjustedFrames = frames.map(frame => {
    if (isMobile) {
      // On mobile, make all frames full width and adjust heights
      if (frame.defaultPos.w === 8 && frame.defaultPos.h === 8) {
        // Large square frames
        return {
          ...frame,
          defaultPos: {
            ...frame.defaultPos,
            w: 12,
            h: 8
          }
        }
      } else if (frame.defaultPos.w === 4 && frame.defaultPos.h === 8) {
        // Vertical frames
        return {
          ...frame,
          defaultPos: {
            ...frame.defaultPos,
            w: 12,
            h: 6
          }
        }
      } else {
        // Regular frames
        return {
          ...frame,
          defaultPos: {
            ...frame.defaultPos,
            w: 12,
            h: 4
          }
        }
      }
    }
    return frame
  })

  const getGridSizes = (hovered: { row: number; col: number } | null, isRow: boolean): string => {
    if (isMobile) {
      // On mobile, use a single column layout
      return "1fr"
    }
    
    if (hovered === null) {
      return `${DEFAULT_FRAME_SIZE}fr ${DEFAULT_FRAME_SIZE}fr ${DEFAULT_FRAME_SIZE}fr`
    }

    const hoverSize = 6
    const nonHoveredSize = (GRID_SIZE - hoverSize) / 2
    const index = isRow ? hovered.row : hovered.col

    return [0, 1, 2].map((i) => (i === index ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  return (
    <div className="w-full h-full">
      <div
        className="relative w-full h-full"
        style={{
          display: "grid",
          gridTemplateRows: isMobile ? "auto" : getGridSizes(hovered, true),
          gridTemplateColumns: isMobile ? "1fr" : getGridSizes(hovered, false),
          gap: `${GAP_SIZE}px`,
          transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
        }}
      >
        {adjustedFrames.map((frame) => {
          const row = Math.floor(frame.defaultPos.y / DEFAULT_FRAME_SIZE)
          const col = Math.floor(frame.defaultPos.x / DEFAULT_FRAME_SIZE)
          const transformOrigin = getTransformOrigin(
            frame.defaultPos.x,
            frame.defaultPos.y,
            frame.defaultPos.w,
            frame.defaultPos.h
          )

          return (
            <motion.div
              key={frame.id}
              className="relative"
              style={{
                transformOrigin,
                transition: "transform 0.4s ease",
                gridColumn: isMobile ? "1" : `span ${frame.defaultPos.w / DEFAULT_FRAME_SIZE}`,
                gridRow: isMobile ? "auto" : `span ${frame.defaultPos.h / DEFAULT_FRAME_SIZE}`,
                height: isMobile ? `${frame.defaultPos.h * 50}px` : "auto",
              }}
              onMouseEnter={() => setHovered({ row, col })}
              onMouseLeave={() => setHovered(null)}
            >
              <FrameComponent
                video={frame.video}
                width="100%"
                height="100%"
                className="absolute inset-0"
                autoplayMode={autoplayMode}
                isHovered={
                  hovered?.row === row &&
                  hovered?.col === col
                }
                projectInfo={frame.projectInfo}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
