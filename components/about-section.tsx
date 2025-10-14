"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TestTube, Rocket, Brain, Container, GitBranch, Server, Cloud, Database } from "lucide-react"

const skills = [
  { name: "QA & Testing", icon: TestTube },
  { name: "CI/CD Pipelines", icon: Rocket },
  { name: "AI/ML Ops", icon: Brain },
  { name: "Docker & K8s", icon: Container },
  { name: "Git & Version Control", icon: GitBranch },
  { name: "Infrastructure", icon: Server },
  { name: "Cloud Platforms", icon: Cloud },
  { name: "Databases", icon: Database },
]

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            I'm a DevOps engineer with a strong focus on quality assurance and automation. My passion lies in building
            robust CI/CD pipelines that ensure software and AI/ML models are thoroughly tested before deployment. I
            believe in the power of automation, continuous improvement, and contributing to the open source community.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <Card
              key={index}
              className={`transition-all duration-500 hover:scale-105 hover:shadow-lg ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 text-center">
                <skill.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold">{skill.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
