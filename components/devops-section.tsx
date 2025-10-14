"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, GitBranch, TestTube, Package, Rocket, Activity, Brain, Database } from "lucide-react"

const devopsStages = [
  {
    icon: Code,
    title: "Plan & Code",
    description: "Requirements gathering, design, and development",
    color: "text-foreground",
    type: "software",
  },
  {
    icon: GitBranch,
    title: "Source Control",
    description: "Version control with Git, branching strategies",
    color: "text-foreground",
    type: "software",
  },
  {
    icon: TestTube,
    title: "QA & Testing",
    description: "Automated testing, quality assurance, validation",
    color: "text-[var(--color-devops-qa)]",
    highlight: true,
    type: "both",
  },
  {
    icon: Package,
    title: "Build & Package",
    description: "CI pipelines, artifact creation, containerization",
    color: "text-foreground",
    type: "software",
  },
  {
    icon: Rocket,
    title: "Deploy",
    description: "CD pipelines, staging, production deployment",
    color: "text-[var(--color-devops-deploy)]",
    highlight: true,
    type: "both",
  },
  {
    icon: Activity,
    title: "Monitor & Operate",
    description: "Observability, logging, performance tracking",
    color: "text-foreground",
    type: "software",
  },
]

const aimlStages = [
  {
    icon: Database,
    title: "Data Collection",
    description: "Gathering and preparing training datasets",
    color: "text-foreground",
  },
  {
    icon: Brain,
    title: "Model Training",
    description: "Training ML models, hyperparameter tuning",
    color: "text-foreground",
  },
  {
    icon: TestTube,
    title: "Model Validation",
    description: "Testing accuracy, bias detection, A/B testing",
    color: "text-[var(--color-devops-qa)]",
    highlight: true,
  },
  {
    icon: Package,
    title: "Model Packaging",
    description: "Containerizing models, versioning",
    color: "text-foreground",
  },
  {
    icon: Rocket,
    title: "Model Deployment",
    description: "Serving models, API endpoints, scaling",
    color: "text-[var(--color-devops-deploy)]",
    highlight: true,
  },
  {
    icon: Activity,
    title: "Model Monitoring",
    description: "Drift detection, performance metrics, retraining",
    color: "text-foreground",
  },
]

export default function DevOpsSection() {
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
    <section id="devops" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[100px] -z-10" />

      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">
            The DevOps{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Infinity Cycle
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Continuous integration and deployment for both software applications and AI/ML models, with emphasis on
            quality assurance and deployment excellence.
          </p>
        </div>

        {/* Software DevOps Cycle */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <h3 className="text-2xl font-bold">Software DevOps</h3>
            <Badge variant="secondary" className="text-sm">
              Traditional Pipeline
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devopsStages.map((stage, index) => (
              <Card
                key={index}
                className={`transition-all duration-500 hover:scale-105 hover:shadow-lg ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } ${stage.highlight ? "border-2 border-primary shadow-lg shadow-primary/20" : ""}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${stage.highlight ? "bg-primary/10" : "bg-secondary"}`}>
                      <stage.icon className={`w-6 h-6 ${stage.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        {stage.title}
                        {stage.highlight && (
                          <Badge variant="default" className="text-xs">
                            Focus
                          </Badge>
                        )}
                      </h4>
                      <p className="text-sm text-muted-foreground">{stage.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        

        {/* Key Insight */}
        <div className="mt-12 text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8">
              <p className="text-lg leading-relaxed text-pretty">
                <span className="font-semibold text-primary">Quality Assurance</span> and{" "}
                <span className="font-semibold text-accent">Deployment</span> are the critical stages where excellence
                is non-negotiable. Whether shipping software or ML models, these phases ensure reliability, performance,
                and user satisfaction in production.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
