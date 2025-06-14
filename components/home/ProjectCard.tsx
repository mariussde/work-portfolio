"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "../ui/button"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

type ProjectInfo = {
  title: string
  slug: string
  siteUrl?: string
  githubUrl?: string
}

interface ProjectCardProps {
  video: string
  width: string
  height: string
  className?: string
  autoplayMode: "all" | "hover"
  isHovered: boolean
  isExpanded?: boolean
  projectInfo: ProjectInfo
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

const ProjectLinks = ({ siteUrl, githubUrl }: Pick<ProjectInfo, "siteUrl" | "githubUrl">) => {
  const isMobile = useIsMobile()
  
  return (
    <div className={cn(
      "flex gap-2 shrink-0",
      isMobile && "flex-col"
    )}>
      {siteUrl && (
        <Button
          variant="outline"
          size="sm"
          className="bg-white/10 text-white/90 border-white/20 hover:bg-white/20 hover:border-white/30 hover:text-white flex-shrink-0"
          onClick={(e) => {
            e.stopPropagation()
            window.open(siteUrl, "_blank")
          }}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          View Site
        </Button>
      )}
      {githubUrl && (
        <Button
          variant="outline"
          size="sm"
          className="bg-white/10 text-white/90 border-white/20 hover:bg-white/20 hover:border-white/30 hover:text-white flex-shrink-0"
          onClick={(e) => {
            e.stopPropagation()
            window.open(githubUrl, "_blank")
          }}
        >
          <Github className="w-4 h-4 mr-2" />
          GitHub
        </Button>
      )}
    </div>
  )
}

export function ProjectCard({ 
  video, 
  width, 
  height, 
  className = "", 
  autoplayMode, 
  isHovered,
  isExpanded = false,
  projectInfo 
}: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const isMobile = useIsMobile()

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

  const handleClick = () => {
    if (isMobile) {
      if (!isExpanded) {
        // The expanded state is now managed by the parent component
        return
      } else if (projectInfo?.slug) {
        window.location.href = `/projects/${projectInfo.slug}`
      }
    } else if (projectInfo?.slug) {
      window.location.href = `/projects/${projectInfo.slug}`
    }
  }

  return (
    <div
      className={cn(
        "relative cursor-pointer group",
        "transition-all duration-300 ease-in-out",
        "hover:shadow-2xl",
        isMobile && isExpanded && "ring-2 ring-white/30",
        className
      )}
      style={{
        width,
        height,
        transition: "width 0.3s ease-in-out, height 0.3s ease-in-out",
      }}
      onClick={handleClick}
    >
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full overflow-hidden rounded-lg">
            <video
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              src={video}
              loop
              muted
              playsInline
              autoPlay={autoplayMode === "all" || (autoplayMode === "hover" && isHovered)}
              ref={videoRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            {(isHovered || (isMobile && isExpanded)) && projectInfo && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-lg">
                <div className="absolute bottom-0 right-0 p-4 w-full">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-semibold text-white">{projectInfo.title}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white/90 hover:text-white hover:bg-white/20 group/button"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (projectInfo?.slug) {
                            window.location.href = `/projects/${projectInfo.slug}`
                          }
                        }}
                      >
                        View Case Study
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/button:translate-x-1" />
                      </Button>
                    </div>
                    <div className="flex flex-col gap-2">
                      {projectInfo.siteUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white/10 text-white/90 border-white/20 hover:bg-white/20 hover:border-white/30 hover:text-white flex-shrink-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(projectInfo.siteUrl, "_blank")
                          }}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Site
                        </Button>
                      )}
                      {projectInfo.githubUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white/10 text-white/90 border-white/20 hover:bg-white/20 hover:border-white/30 hover:text-white flex-shrink-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(projectInfo.githubUrl, "_blank")
                          }}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 
