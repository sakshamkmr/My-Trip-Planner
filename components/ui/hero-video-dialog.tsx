"use client"

import * as React from "react"
import { Play } from "lucide-react"
import { cn } from "@/lib/utils"


interface HeroVideoDialogProps {
  thumbnailSrc: string
  videoSrc: string
  animation?: string
  thumbnailAlt?: string
  className?: string
}


export default function HeroVideoDialog({
  videoSrc,
  thumbnailSrc,
  animation,
  thumbnailAlt,
  className,
}: HeroVideoDialogProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={cn(
          "relative cursor-pointer overflow-hidden rounded-2xl group",
          className
        )}
      >
        <img
          src={thumbnailSrc}
          alt="Video thumbnail"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-black transition-transform group-hover:scale-110">
            <Play className="h-7 w-7 ml-1" />
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 z-10 rounded-full bg-black/70 px-3 py-1 text-sm text-white"
            >
              ✕
            </button>

            <iframe
              src={videoSrc}
              className="w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  )
}
export {HeroVideoDialog}

