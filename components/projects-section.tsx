"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "CI/CD Pipeline Automation",
    description: "Automated testing and deployment pipeline for microservices with comprehensive QA checks",
    image: "/devops-pipeline-dashboard.jpg",
    tags: ["Jenkins", "Docker", "Kubernetes", "Python"],
    demo: "#",
    source: "#",
  },
  {
    title: "ML Model Testing Framework",
    description: "Custom testing framework for validating ML model performance, bias, and drift detection",
    image: "/machine-learning-testing-dashboard.jpg",
    tags: ["Python", "TensorFlow", "MLflow", "Pytest"],
    demo: "#",
    source: "#",
  },
  {
    title: "Infrastructure as Code",
    description: "Terraform modules for provisioning cloud infrastructure with automated testing",
    image: "/cloud-infrastructure-diagram.png",
    tags: ["Terraform", "AWS", "Azure", "GCP"],
    demo: "#",
    source: "#",
  },
  {
    title: "Monitoring & Observability",
    description: "Complete observability stack with custom dashboards for application and infrastructure monitoring",
    image: "/monitoring-dashboard-metrics.jpg",
    tags: ["Grafana", "Prometheus", "ELK", "Datadog"],
    demo: "#",
    source: "#",
  },
]

export default function ProjectsSection() {
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
    <section id="projects" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">My Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            A selection of DevOps and QA automation projects I've built
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={`overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden group">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="default" size="sm" asChild>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-primary hover:text-[var(--color-devops-qa)]" asChild>
                  <a href={project.source} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    Source Code
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
