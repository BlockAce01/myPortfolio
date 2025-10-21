"use client"

import { useState, useEffect } from "react"
import { ExternalLink } from "lucide-react"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-lg shadow-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => scrollToSection("home")}
          className="w-10 h-10 rounded-full p-1 bg-gradient-to-r from-primary to-accent"
        >
          <img src="/logo.png" alt="YK Logo" className="w-full h-full rounded-full" />
        </button>

        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("about")}
            className="text-sm font-medium hover:text-[var(--color-devops-qa)] transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("opensource")}
            className="text-sm font-medium hover:text-[var(--color-devops-flow)] transition-colors"
          >
            Open Source
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="text-sm font-medium hover:text-accent transition-colors"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection("certifications")}
            className="text-sm font-medium hover:text-[var(--color-chart-3)] transition-colors"
          >
            Certifications
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Contact
          </button>
          <a
            href="https://blog.yugankavinda.me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:text-[var(--color-chart-2)] transition-colors flex items-center gap-1"
          >
            Blog
            <ExternalLink className="w-3 h-3" />
          </a>
        </nav>
      </div>
    </header>
  )
}
