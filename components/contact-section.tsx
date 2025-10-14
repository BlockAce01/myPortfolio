"use client"

import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/yugankavinda" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/yugankavinda" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/yugankavinda" },
  { icon: Mail, label: "Email", href: "mailto:yugan@example.com" },
]

export default function ContactSection() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">Get In Touch</h2>
          <p className="text-xl text-muted-foreground mb-12 text-pretty">
            I'm always open to discussing DevOps, QA automation, AI/ML infrastructure, or open source collaboration
            opportunities.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {socials.map((social, index) => (
              <Button
                key={index}
                variant="outline"
                size="lg"
                className="hover:scale-110 transition-transform bg-transparent hover:bg-primary"
                asChild
              >
                <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                  <social.icon className="w-6 h-6" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
