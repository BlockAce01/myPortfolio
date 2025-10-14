"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Star, ExternalLink } from "lucide-react"

const contributions = [
  {
    name: "kubernetes/kubernetes",
    description: "Production-Grade Container Orchestration",
    role: "Contributor",
    contributions: "Bug fixes in scheduler, documentation improvements",
    stars: "110k",
    language: "Go",
    tags: ["DevOps", "Cloud Native", "Orchestration"],
  },
  {
    name: "pytest-dev/pytest",
    description: "The pytest framework makes it easy to write tests",
    role: "Contributor",
    contributions: "Added new assertion helpers, improved test fixtures",
    stars: "12k",
    language: "Python",
    tags: ["Testing", "QA", "Python"],
  },
  {
    name: "mlflow/mlflow",
    description: "Open source platform for ML lifecycle",
    role: "Contributor",
    contributions: "Model deployment improvements, CI/CD integration",
    stars: "18k",
    language: "Python",
    tags: ["MLOps", "AI/ML", "Deployment"],
  },
  {
    name: "grafana/grafana",
    description: "The open observability platform",
    role: "Contributor",
    contributions: "Dashboard templates, monitoring plugins",
    stars: "64k",
    language: "TypeScript",
    tags: ["Monitoring", "DevOps", "Observability"],
  },
  {
    name: "jenkinsci/jenkins",
    description: "Leading open source automation server",
    role: "Plugin Developer",
    contributions: "Created custom pipeline plugins for QA automation",
    stars: "23k",
    language: "Java",
    tags: ["CI/CD", "Automation", "DevOps"],
  },
  {
    name: "terraform-providers/terraform",
    description: "Infrastructure as Code tool",
    role: "Contributor",
    contributions: "Provider improvements, documentation",
    stars: "42k",
    language: "Go",
    tags: ["IaC", "DevOps", "Cloud"],
  },
]

const stats = [
  { label: "Contributions", value: "500+" },
  { label: "Projects", value: "25+" },
  { label: "Pull Requests", value: "150+" },
  { label: "Issues Resolved", value: "80+" },
]

export default function OpenSourceSection() {
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
    <section id="opensource" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px] -z-10" />

      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Github className="w-10 h-10 text-primary" />
            <h2 className="text-4xl lg:text-5xl font-bold text-balance">
              Open Source{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Contributions
              </span>
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Giving back to the community by contributing to projects that power modern DevOps, testing frameworks, and
            ML infrastructure.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={`text-center transition-all duration-500 hover:scale-105 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contributions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contributions.map((project, index) => (
            <Card
              key={index}
              className={`transition-all duration-500 hover:scale-105 hover:shadow-xl group ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${(index + 4) * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Github className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                  <Badge variant="secondary" className="text-xs">
                    {project.role}
                  </Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">{project.name}</CardTitle>
                <CardDescription className="text-sm">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{project.contributions}</p>

                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {project.stars}
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    {project.language}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  asChild
                >
                  <a href={`https://github.com/${project.name}`} target="_blank" rel="noopener noreferrer">
                    View on GitHub
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Let's Collaborate!</h3>
              <p className="text-muted-foreground mb-6 text-pretty">
                Always looking for interesting open source projects to contribute to, especially in DevOps, testing, and
                ML infrastructure.
              </p>
              <Button size="lg" asChild>
                <a href="https://github.com/yugankavinda" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 mr-2" />
                  Follow on GitHub
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
