"use client"

import { useEffect, useRef } from "react"

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videoRef.current?.pause()
    }
  }, [])

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/images/lifestyle/hero-poster.jpg"
      className="absolute inset-0 w-full h-full object-cover"
      aria-hidden="true"
    >
      <source src="/videos/hero-journey.mp4" type="video/mp4" />
    </video>
  )
}
