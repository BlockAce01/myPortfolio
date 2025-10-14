"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import DragonInfinity from "./dragon-infinity"
import { useTheme } from "./theme-provider"

export default function HeroSection() {
  const { theme } = useTheme()

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="home" className="min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="h-[500px] lg:h-[600px] relative">
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 0, 8]} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b6b" />
              <DragonInfinity isDark={theme === "dark"} />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.5}
              />
            </Canvas>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-balance">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-primary via-[var(--color-devops-flow)] to-accent bg-clip-text text-transparent">
                Yugan Kavinda
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
              <Button size="lg" variant="outline" onClick={() => scrollToSection("contact")}>
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
