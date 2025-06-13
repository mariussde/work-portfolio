"use client"

import { useEffect, useRef } from "react"
import { Button } from "./button"
import { ExternalLink, Github } from "lucide-react"
import { cn } from "@/lib/utils"

type ProjectInfo = {
  tags: string[]
  siteUrl?: string
  githubUrl?: string
}

interface ProjectCardProps {
  video: string
  width: number | string
  height: number | string
  className?: string
  autoplayMode: "all" | "hover"
  isHovered: boolean
  projectInfo?: ProjectInfo
}

const ProjectTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-nowrap gap-2 justify-end overflow-hidden flex-shrink">
    {tags.map((tag, index) => (
      <span
        key={index}
        className="px-2 py-1 text-xs font-medium text-white/90 bg-white/10 rounded-full backdrop-blur-sm flex-shrink-0"
      >
        {tag}
      </span>
    ))}
  </div>
)

const ProjectLinks = ({ siteUrl, githubUrl }: Pick<ProjectInfo, "siteUrl" | "githubUrl">) => (
  <div className="flex gap-2 shrink-0">
    {siteUrl && (
      <Button
        variant="outline"
        size="sm"
        className="bg-white/10 text-white/90 border-white/20 hover:bg-white/20 hover:border-white/30 flex-shrink-0"
        onClick={() => window.open(siteUrl, "_blank")}
      >
        <ExternalLink className="w-4 h-4 mr-2" />
        View Site
      </Button>
    )}
    {githubUrl && (
      <Button
        variant="outline"
        size="sm"
        className="bg-white/10 text-white/90 border-white/20 hover:bg-white/20 hover:border-white/30 flex-shrink-0"
        onClick={() => window.open(githubUrl, "_blank")}
      >
        <Github className="w-4 h-4 mr-2" />
        GitHub
      </Button>
    )}
  </div>
)

export function ProjectCard({ 
  video, 
  width, 
  height, 
  className = "", 
  autoplayMode, 
  isHovered,
  projectInfo 
}: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current) return

    const videoElement = videoRef.current

    const handleEnded = () => {
      videoElement.currentTime = 0
      videoElement.play().catch(console.error)
    }

    const handleError = () => {
      console.error('Video playback error:', videoElement.error)
      // Attempt to reload and play the video
      videoElement.load()
      videoElement.play().catch(console.error)
    }

    if (autoplayMode === "all") {
      videoElement.play().catch(console.error)
    } else if (autoplayMode === "hover") {
      if (isHovered) {
        videoElement.play().catch(console.error)
      } else {
        videoElement.pause()
      }
    }

    // Add event listeners
    videoElement.addEventListener('ended', handleEnded)
    videoElement.addEventListener('error', handleError)

    // Cleanup
    return () => {
      videoElement.removeEventListener('ended', handleEnded)
      videoElement.removeEventListener('error', handleError)
    }
  }, [isHovered, autoplayMode])

  const handleMouseEnter = () => {
    if (autoplayMode === "hover" && videoRef.current) {
      videoRef.current.play().catch(console.error)
    }
  }

  const handleMouseLeave = () => {
    if (autoplayMode === "hover" && videoRef.current) {
      videoRef.current.pause()
    }
  }

  return (
    <div
      className={cn("relative", className)}
      style={{
        width,
        height,
        transition: "width 0.3s ease-in-out, height 0.3s ease-in-out",
      }}
    >
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full overflow-hidden rounded-lg">
            <video
              className="w-full h-full object-cover rounded-lg"
              src={video}
              loop
              muted
              playsInline
              autoPlay={autoplayMode === "all" || (autoplayMode === "hover" && isHovered)}
              ref={videoRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            {isHovered && projectInfo && (
              <div className="absolute bottom-0 right-0 p-4 w-full bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                <div className="flex items-center justify-end gap-4">
                  <ProjectTags tags={projectInfo.tags} />
                  <ProjectLinks siteUrl={projectInfo.siteUrl} githubUrl={projectInfo.githubUrl} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 
