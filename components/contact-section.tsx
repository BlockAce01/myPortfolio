"use client"

import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/BlockAce01" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/theekshana-yugan/" },
  // { icon: Twitter, label: "Twitter", href: "https://twitter.com/yugankavinda" },
  { icon: Mail, label: "Email", href: "mailto:yugankavinda@gmail.com" },
]

export default function ContactSection() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">Contact Me</h2>
          <p className="text-xl text-muted-foreground mb-12 text-pretty">
            I'm always open to discussing DevOps, QA automation & AI/ML
            opportunities.
          </p>

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
                  className={`hover:scale-110 transition-all duration-300 bg-transparent border-2 ${colors[index]}`}
                  asChild
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                    <social.icon className="w-6 h-6" />
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
