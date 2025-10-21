"use client"

import { Github, Linkedin, Twitter, Mail, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/BlockAce01" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/theekshana-yugan/" },
  // { icon: Twitter, label: "Twitter", href: "https://twitter.com/yugankavinda" },
  { icon: Mail, label: "Email", href: "mailto:yugankavinda@gmail.com" },
]

const cvDownloads = [
  { label: "QA Engineer CV", href: "CV/Yugan Kavinda-QA Intern-CV.pdf" },
  { label: "DevOps Engineer CV", href: "CV/Yugan Kavinda-DevOps Intern-CV.pdf" },
]

export default function ContactSection() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent relative">
            Contact Me
          </h2>
          <p className="text-xl text-muted-foreground mb-12 text-pretty leading-relaxed max-w-xl mx-auto">
            I'm always open to discussing{" "}
            <span className="font-semibold text-primary">DevOps</span>,{" "}
            <span className="font-semibold text-primary">QA automation</span> &{" "}
            <span className="font-semibold text-primary">AI/ML</span>{" "}
            opportunities.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {cvDownloads.map((cv, index) => {
              const colors = [
                'hover:text-[var(--color-devops-qa)] hover:bg-[var(--color-devops-qa)]/10',
                'hover:text-[var(--color-devops-deploy)] hover:bg-[var(--color-devops-deploy)]/10'
              ]
              return (
                <Button
                  key={index}
                  variant="outline"
                  size="lg"
                  className={`hover:scale-110 transition-all duration-300 bg-transparent border-2 ${colors[index]}`}
                  asChild
                >
                  <a href={cv.href} download aria-label={`Download ${cv.label}`}>
                    <Download className="w-6 h-6 mr-2" />
                    {cv.label}
                  </a>
                </Button>
              )
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {socials.map((social, index) => {
              const colors = [
                'hover:text-[var(--color-devops-qa)] hover:bg-[var(--color-devops-qa)]/10',
                'hover:text-[var(--color-devops-deploy)] hover:bg-[var(--color-devops-deploy)]/10',
                'hover:text-[var(--color-devops-flow)] hover:bg-[var(--color-devops-flow)]/10',
                'hover:text-accent hover:bg-accent/10'
              ]
              return (
                <Button
                  key={index}
                  variant="outline"
                  size="lg"
                  className={`hover:scale-110 transition-all duration-300 bg-transparent border-2 h-10 w-10 md:h-20 md:w-20 ${colors[index]}`}
                  asChild
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                    <social.icon className="size-7 md:size-12" />
                  </a>
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
