"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GraduationCap, ChevronDown, ChevronUp } from "lucide-react"

const education = [
  {
    institution: "Sabaragamuwa University of Sri Lanka",
    degree: "Bachelor of Science Honours in Computing & Information Systems",
    field: "Computer Science",
    duration: "2023 - 2027",
    description: "Focus on software development, algorithms, and data structures with specialization in DevOps practices.",
    achievements: ["GPA: 3.34"],
    tags: ["OOP", "DSA", "Quality Assurance", "Team Leadership", "Project Planning", "Sports",],
  },
]

export default function EducationSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({})
  const sectionRef = useRef<HTMLElement>(null)

  const toggleExpand = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

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
    <section id="education" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="w-10 h-10 text-primary" />
            <h2 className="text-4xl lg:text-5xl font-bold text-balance">Education</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            My academic background and professional certifications
          </p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {education.map((item, index) => (
            <Card
              key={index}
              className={`transition-all duration-500 hover:shadow-lg ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{item.degree}</CardTitle>
                    <CardDescription className="text-base">{item.institution}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold text-primary whitespace-nowrap">{item.duration}</div>
                    
                    {/* Mobile toggle button */}
                    <div className="md:hidden">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpand(index)}
                        className="flex items-center p-1"
                      >
                        {expandedItems[index] ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* <p className="text-muted-foreground mb-4">{item.description}</p> */}
                
                {/* Details section - hidden on mobile by default, always visible on desktop */}
                <div className={`grid md:grid-cols-2 gap-4 mb-4 ${expandedItems[index] ? 'block' : 'hidden'} md:grid`}>
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Achievements:</h4>
                    <ul className="space-y-1">
                      {item.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
