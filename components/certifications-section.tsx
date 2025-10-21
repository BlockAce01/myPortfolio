"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Award } from "lucide-react"

const certifications = [
  {
    title: "LFS101: Introduction to Linux",
    issuer: "The Linux Foundation",
    date: "October 2025",
    verifyLink: "https://www.credly.com/badges/42f0eac3-d264-4a2d-a869-6df1a86808ec/public_url",
  },
  {
    title: "Software Testing - Skill Up",
    issuer: "GeeksforGeeks",
    date: "October 2025",
    verifyLink: "https://media.geeksforgeeks.org/courses/certificates/fe0dd9d35a3421dd5a52689483ec70e6.pdf",
  },
  {
    title: "Introduction to Software Quality Assurance",
    issuer: "University of Moratuwa",
    date: "September 2025",
    verifyLink: "https://open.uom.lk/verify?code=FR5wKK8nnp&qrcode=1",
  },
  {
    title: "Cloud Computing For Absolute Beginners",
    issuer: "CoDeKu DevOps Academy",
    date: "August 2025",
    verifyLink: "https://www.linkedin.com/in/theekshana-yugan/details/certifications/1757912529886/single-media-viewer/?profileId=ACoAAD2FB5wBHtOLIS0Ivzd1SkK38D0o-RxVWo4",
  },
  {
    title: "Crash Course: Linux For Absolute Beginners",
    issuer: "KodeKloud",
    date: "August 2025",
    verifyLink: "https://learn.kodekloud.com/certificate/471f2e61-72b4-44a9-995b-78b054399ef8",
  },
  {
    title: "KodeKloud Engineer - Docker (Level 1)",
    issuer: "KodeKloud",
    date: "August 2025",
    verifyLink: "https://engineer.kodekloud.com/certificate-verification/69dd9b8b-4e09-4d9d-94a7-799601e4b171",
  },
  {
    title: "KodeKloud Engineer - Git (Level 1)",
    issuer: "KodeKloud",
    date: "August 2025",
    verifyLink: "https://engineer.kodekloud.com/certificate-verification/680792c1-2288-4495-afa0-207c11508f46",
  },
  {
    title: "IT Essentials",
    issuer: "Cisco",
    date: "July 2025",
    verifyLink: "https://www.credly.com/badges/0a68edc7-95d1-4d81-a564-2147032ed209/linked_in_profile",
  },
  {
    title: "Finetuning Large Language Models",
    issuer: "DeepLearning.AI",
    date: "August 2024",
    verifyLink: "https://learn.deeplearning.ai/accomplishments/07365e9e-ec8d-41d7-a76a-95e88b045536?usp=sharing",
  },
  {
    title: "Official ISC2 Certified in Cybersecurity Online Self-Paced Training - 1M",
    issuer: "ISC2",
    date: "August 2024",
    verifyLink: "https://www.linkedin.com/in/theekshana-yugan/details/certifications/1759405842861/single-media-viewer?type=DOCUMENT&profileId=ACoAAD2FB5wBHtOLIS0Ivzd1SkK38D0o-RxVWo4&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3Bj1rJObkaQcea0AdKu8GbUQ%3D%3D",
  },
  {
    title: "Front-End Web Development",
    issuer: "University of Moratuwa",
    date: "July 2022",
    verifyLink: "https://open.uom.lk/verify?code=G3OGbOG8TL&qrcode=1",
  },
  {
    title: "Web Design for Beginners",
    issuer: "University of Moratuwa",
    date: "June 2022",
    verifyLink: "https://open.uom.lk/verify?code=kBqtzvXai9&qrcode=1",
  },
  {
    title: "Python for Beginners",
    issuer: "University of Moratuwa",
    date: "May 2022",
    verifyLink: "https://open.uom.lk/verify?code=LyLo29npIF&qrcode=1",
  },
]

export default function CertificationsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndices, setCurrentIndices] = useState([0, 1, 2, 3])
  const [nextIndices, setNextIndices] = useState([4, 5, 6, 7])
  const [isFlipping, setIsFlipping] = useState([false, false, false, false])
  const [isPaused, setIsPaused] = useState(false)
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

  useEffect(() => {
    if (!isVisible || isPaused) return

    const interval = setInterval(() => {
      // Flip all cards sequentially
      for (let i = 0; i < 4; i++) {
        setTimeout(() => {
          // Start flipping
          setIsFlipping(prev => {
            const newFlipping = [...prev]
            newFlipping[i] = true
            return newFlipping
          })

          // After full flip (180deg), update indices and reset flip
          setTimeout(() => {
            setCurrentIndices(prev => {
              const newIndices = [...prev]
              newIndices[i] = (prev[i] + 4) % certifications.length
              return newIndices
            })
            setNextIndices(prev => {
              const newIndices = [...prev]
              newIndices[i] = (prev[i] + 4) % certifications.length
              return newIndices
            })
            
            setIsFlipping(prev => {
              const newFlipping = [...prev]
              newFlipping[i] = false
              return newFlipping
            })
          }, 600) // Full flip duration
        }, i * 300) // Stagger the flips
      }
    }, 4000) // Change cards every 5 seconds

    return () => clearInterval(interval)
  }, [isVisible, isPaused])

  return (
    <section id="certifications" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">Certifications</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Professional certifications that validate my expertise in DevOps, cloud technologies, and quality assurance
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {currentIndices.map((certIndex, i) => {
            const currentCert = certifications[certIndex]
            const nextCert = certifications[nextIndices[i] % certifications.length]
            
            return (
              <div
                key={i}
                className={`h-80 md:h-96 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  perspective: "1000px",
                  transitionDelay: `${i * 150}ms`,
                }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div
                  className="relative w-full h-full transition-transform duration-600"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipping[i] ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Front of card */}
                  <Card
                    className="absolute inset-0 w-full h-full backface-hidden hover:shadow-xl"
                    style={{
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div className="relative overflow-hidden group p-6 lg:block hidden">
                      <Award className="w-16 h-16 mx-auto text-primary mb-4" />
                    </div>
                    <CardHeader className="lg:pt-0 pt-6">
                      <CardTitle className="text-center text-base">{currentCert.title}</CardTitle>
                      <CardDescription className="text-center text-sm">
                        {currentCert.issuer}
                        <br />
                        {currentCert.date}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="justify-center">
                      <Button variant="secondary" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-colors" asChild>
                        <a href={currentCert.verifyLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Verify
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Back of card */}
                  <Card
                    className="absolute inset-0 w-full h-full backface-hidden hover:shadow-xl"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div className="relative overflow-hidden group p-6 lg:block hidden">
                      <Award className="w-16 h-16 mx-auto text-primary mb-4" />
                    </div>
                    <CardHeader className="lg:pt-0 pt-6">
                      <CardTitle className="text-center text-base">{nextCert.title}</CardTitle>
                      <CardDescription className="text-center text-sm">
                        {nextCert.issuer}
                        <br />
                        {nextCert.date}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="justify-center">
                      <Button variant="secondary" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-colors" asChild>
                        <a href={nextCert.verifyLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Verify
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}