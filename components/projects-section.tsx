"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "MyBlog - Full stack Deployment",
    description: "This isn't just another blogging platform; it's a testament to building a modern, secure, and scalable full-stack application using cutting-edge technologies and best-in-class DevOps practices.",
    image: "projects/MyBlog - Full stack Deployment.png",
    tags: ["DevOps", "Docker", "AWS", "CI/CD", "MERN Stack"],
    demo: "https://blog.yugankavinda.me/post/my-blog-a-full-stack-journey-with-mern-and-devops-practices",
    source: "https://github.com/BlockAce01/MyBlog",
  },
  {
    title: "E2E E-commerce Test Automation",
    description: "It is built with Python and Selenium WebDriver and demonstrates a professional automation structure using the Page Object Model (POM).",
    image: "projects/E2E E-commerce Test Automation.png",
    tags: ["Python", "Selenium", "Test Automation", "Pytest"],
    demo: "https://www.linkedin.com/posts/theekshana-yugan_qualityassurance-qa-testautomation-activity-7380228317989232640-FaWs?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD2FB5wBHtOLIS0Ivzd1SkK38D0o-RxVWo4",
    source: "https://github.com/BlockAce01/e2e-Test_Automation",
  },
  {
    title: "Day to Day Task Scheduler with n8n and Google Calendar",
    description: "As a student, keeping my personal calendar perfectly synchronized with my academic schedule is essential. Information comes from various sources; we start the semester with a comprehensive PDF timetable, and throughout the term, updates about rescheduled lectures or location changes are communicated via email. I found that the manual process of tracking these updates and updating my calendar took a significant amount of my time each day.",
    image: "projects/Day to Day Task Scheduler with n8n and Google Calendar.png",
    tags: ["n8n", "AWS", "Google Calendar", "Telegram API", "Automation"],
    demo: "https://blog.yugankavinda.me/post/day-to-day-task-scheduler-with-n8n",
  },
  {
    title: "Examind - Learning & Competitive platform for Sri Lankan A/L Students",
    description: "Examind brings students, teachers, and administrators together in a collaborative environment with AI-powered assistance, gamification, and discussion forums. Specially designed to support Sri Lankan Advanced Level (A/L) students in their academic journey. ",
    image: "projects/Examind - Learning & Competitive platform for Sri Lankan AL Students.png",
    tags: ["React", "Node.js", "PostgreSQL", "n8n", "Docker", "TeamWork"],
    demo: "https://www.linkedin.com/posts/theekshana-yugan_webdevelopment-fullstack-reactjs-activity-7381017968094339073-pUa6?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD2FB5wBHtOLIS0Ivzd1SkK38D0o-RxVWo4",
    source: "https://github.com/BlockAce01/Examind",
  },
  {
    title: "ReportEase - University Issue Management System",
    description: "A comprehensive web application for managing and tracking issues within a university environment. Built with Laravel 8, ReportEase provides role-based access control, image management, and real-time issue tracking capabilities.",
    image: "projects/ReportEase - University Issue Management System.png",
    tags: ["Laravel", "PHP", "MySQL", "Community Support", "TeamWork"],
    demo: "#",
    source: "https://github.com/KavinduAluthwaththa/ReportEase"
  },
  {
    title: "IGSR - Integrated Government Service Registry",
    description: "The proposed system will be a web-based application. It is accessible through any internet browser on desktop computers, laptops, and mobile devices. The application will be provided in Sinhala, Tamil, and English  to meet the target audience's with the varied linguistic.",
    image: "projects/IGSR - Integrated Government Service Registry.png",
    tags: ["PHP", "MySQL", "Web Development" , "Community Support", "TeamWork"],
    demo: "#",
    source: "https://github.com/BlockAce01/Integrated_Government_Service_Registry",
  },
  {
    title: "Black Mirror Web",
    description: "This site is a fan made project by me as my 1st academic web assignment and is not affiliated with the creators or producers of Black Mirror.",
    image: "projects/Black Mirror Web.png",
    tags: ["HTML", "CSS"],
    demo: "https://black-mirror-fanmade-tyk.netlify.app/",
    source: "https://github.com/BlockAce01/Black-Mirror-Web",
  },
  {
    title: "AR Digital Poson Kalapaya",
    description: "🛠️ With the power of Blender for 3D modeling and animation, Zappar's Mattercraft for AR deployment, and VPS(Visual Positioning System) maps of Immersal, we recreated the serenity of Poson in an immersive digital space.",
    image: "projects/AR Digital Poson Kalapaya.png",
    tags: ["Blender", "Zappar", "Immersal", "TeamWork" ,"Augmented Reality"],
    demo: "https://www.linkedin.com/posts/theekshana-yugan_ardigitalkalapaya-posonar-3dmodeling-activity-7339114066960859137-XGec?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD2FB5wBHtOLIS0Ivzd1SkK38D0o-RxVWo4",
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
            A selection of DevOps, QA automation projects and Full-stack applications I've built
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
