'use client'

import React from "react"
import {
  Globe2,
  MapPin,
  CalendarDays,
  Wallet,
  Sparkles,
  Send,
  ArrowDown,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog"

import { useUser, SignInButton } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

const suggestions = [
  {
    title: "Create a new trip",
    icon: <Globe2 className="text-blue-400 h-5 w-5" />,
  },
  {
    title: "Explore trending destinations",
    icon: <MapPin className="text-pink-400 h-5 w-5" />,
  },
  {
    title: "Plan a weekend getaway",
    icon: <CalendarDays className="text-green-400 h-5 w-5" />,
  },
  {
    title: "Build a budget-friendly trip",
    icon: <Wallet className="text-yellow-400 h-5 w-5" />,
  },
  {
    title: "Discover hidden gems",
    icon: <Sparkles className="text-purple-400 h-5 w-5" />,
  },
]

function Hero() {
  const { user } = useUser()
  const router = useRouter()

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-24 max-w-3xl w-full mx-auto">
        {/* Heading */}
        <div className="w-full text-center max-w-3xl">
          <h1 className="text-5xl md:text-4xl font-bold">
            Hey I am your personal{" "}
            <span className="text-primary">trip planner</span>
          </h1>
          <p className="text-xl mt-6">
            Tell me what you want and I will handle the rest. Like flights,
            hotels, trip planning — all in seconds.
          </p>
        </div>

        {/* Chat Input */}
        <div className="w-full max-w-2xl mt-8 relative">
          <div className="relative">
            <Textarea
              placeholder={
                user
                  ? "Create a trip for Paris from New York"
                  : "Sign in to start planning your trip"
              }
              disabled={!user}
              className="w-full h-28 rounded-xl border border-gray-300 bg-white focus-visible:ring-2 focus-visible:ring-primary/30 resize-none p-4"
            />

            {/* Send Button Logic */}
            {!user ? (
              <SignInButton mode="modal">
                <Button
                  size="icon"
                  className="absolute bottom-6 right-6"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </SignInButton>
            ) : (
              <Button
                size="icon"
                className="absolute bottom-6 right-6"
                onClick={() => router.push("/create-new-trip")}
              >
                <Send className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Suggestions */}
        <div className="flex flex-col gap-5 mt-8 w-full max-w-2xl">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-3 border rounded-full cursor-pointer hover:bg-primary hover:text-white transition-all"
            >
              {suggestion.icon}
              <h2 className="text-sm font-medium">{suggestion.title}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Video Section */}
      <div className="mt-40 flex flex-col items-center gap-2">
        <h2 className="text-center text-2xl font-semibold">
          Not sure where to start? <strong>See how it works</strong>{" "}
          <ArrowDown />
        </h2>

        <HeroVideoDialog
          thumbnailSrc="/video-thumbnail.jpg"
          videoSrc="https://youtube.com/embed/..."
          animation="fade-up"
          thumbnailAlt="Demo video"
        />
      </div>
    </div>
  )
}

export default Hero
