"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import DragonInfinity from "./dragon-infinity"

export default function HeroSection() {
  const controlsRef = useRef<any>(null)
  let resetTimeout: NodeJS.Timeout
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [charIndex, setCharIndex] = useState(0)

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  // Animated titles that cycle through
  const titles = [
    "Yugan Kavinda",
    "a QA Engineer",
    "a DevOps Engineer", 
    "an AI/ML Enthusiast"
  ]

  // Typewriter effect
  useEffect(() => {
    const currentTitle = titles[currentTitleIndex]
    
    if (isTyping) {
      // Typing effect
      if (charIndex < currentTitle.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentTitle.slice(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        }, 100) // Typing speed
        return () => clearTimeout(timeout)
      } else {
        // Finished typing, wait before starting to delete
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 2000) // Pause before deleting
        return () => clearTimeout(timeout)
      }
    } else {
      // Deleting effect
      if (charIndex > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentTitle.slice(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        }, 50) // Deleting speed (faster than typing)
        return () => clearTimeout(timeout)
      } else {
        // Finished deleting, move to next title
        const timeout = setTimeout(() => {
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length)
          setIsTyping(true)
        }, 500) // Brief pause before next title
        return () => clearTimeout(timeout)
      }
    }
  }, [charIndex, isTyping, currentTitleIndex, titles])

  // Auto-reset to default position after user interaction
  useEffect(() => {
    const handleInteractionEnd = () => {
      // Clear any existing timeout
      if (resetTimeout) clearTimeout(resetTimeout)
      
      // Wait 3 seconds after user stops interacting, then smoothly reset
      resetTimeout = setTimeout(() => {
        if (controlsRef.current) {
          controlsRef.current.reset()
        }
      }, 3000)
    }

    return () => {
      if (resetTimeout) clearTimeout(resetTimeout)
    }
  }, [])

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative z-40">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="h-[400px] sm:h-[500px] lg:h-[600px] relative">
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 0, 8]} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b6b" />
              <DragonInfinity isDark={true} />
              <OrbitControls
                ref={controlsRef}
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.5}
                enableDamping={true}
                dampingFactor={0.05}
                autoRotate={false}
                onEnd={() => {
                  // Trigger reset after user stops interacting
                  if (resetTimeout) clearTimeout(resetTimeout)
                  resetTimeout = setTimeout(() => {
                    if (controlsRef.current) {
                      // Smoothly animate back to default position
                      controlsRef.current.reset()
                    }
                  }, 3000)
                }}
              />
            </Canvas>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-balance">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-primary via-[var(--color-devops-flow)] to-accent bg-clip-text text-transparent">
                {displayedText}
                <span className="animate-pulse text-primary">|</span>
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
              DevOps Engineer & QA Specialist passionate about building robust CI/CD pipelines, ensuring quality in
              software and AI/ML models, and contributing to open source.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                View My Work
              </Button>
              <a href="https://www.linkedin.com/in/theekshana-yugan/" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="hover:text-[var(--color-devops-deploy)]">
                  Get In Touch
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
