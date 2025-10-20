"use client"

import { useRef, useMemo, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import * as THREE from "three"

interface DragonInfinityProps {
  isDark: boolean
}

export default function DragonInfinity({ isDark }: DragonInfinityProps) {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const timeRef = useRef(0)
  const [, setFrame] = useState(0)
  
  // Tech stack icons - orbiting around photo
  const techIcons = useMemo(() => {
    return [
      // DevOps Tools
      { name: 'Docker', image: '/icons/docker.png', position: 0, radius: 3, color: '#2496ED' },
      { name: 'Kubernetes', image: '/icons/kubernetes.png', position: 1, radius: 3.2, color: '#326CE5' },
      { name: 'Jenkins', image: '/icons/jenkins.png', position: 2, radius: 2.8, color: '#D24939' },
      { name: 'GitHub', image: '/icons/github.png', position: 3, radius: 3.5, color: '#181717' },
      
      // Cloud Platforms
      { name: 'AWS', image: '/icons/aws.png', position: 5, radius: 3.3, color: '#FF9900' },
      { name: 'Azure', image: '/icons/azure.png', position: 6, radius: 3.1, color: '#0078D4' },
      { name: 'GCP', image: '/icons/gcp.png', position: 7, radius: 3.4, color: '#4285F4' },
      
      // Testing Tools
      { name: 'Selenium', image: '/icons/selenium.png', position: 8, radius: 2.7, color: '#43B02A' },
      { name: 'Jest', image: '/icons/jest.png', position: 9, radius: 3.2, color: '#C21325' },
      { name: 'Cypress', image: '/icons/cypress.png', position: 10, radius: 2.8, color: '#17202C' },
      
      // Languages
      { name: 'Python', image: '/icons/python.png', position: 11, radius: 3.0, color: '#3776AB' },
      { name: 'JavaScript', image: '/icons/javascript.png', position: 12, radius: 3.3, color: '#F7DF1E' },
      { name: 'TypeScript', image: '/icons/typescript.png', position: 13, radius: 2.9, color: '#3178C6' },
      
      // Databases
      { name: 'MongoDB', image: '/icons/mongodb.png', position: 14, radius: 3.1, color: '#47A248' },
      { name: 'PostgreSQL', image: '/icons/postgresql.png', position: 15, radius: 3.4, color: '#4169E1' },
      { name: 'Redis', image: '/icons/redis.png', position: 16, radius: 2.8, color: '#DC382D' },
      
      // AI/ML
      { name: 'TensorFlow', image: '/icons/tensorflow.png', position: 17, radius: 3.2, color: '#FF6F00' },
      { name: 'PyTorch', image: '/icons/pytorch.png', position: 18, radius: 3.0, color: '#EE4C2C' },
      
      // Monitoring
      { name: 'Grafana', image: '/icons/grafana.png', position: 19, radius: 3.3, color: '#F46800' },
      { name: 'Prometheus', image: '/icons/prometheus.png', position: 20, radius: 2.9, color: '#E6522C' },
      
      // Additional DevOps & CI/CD
      { name: 'GitHub Actions', image: '/icons/github-actions.png', position: 21, radius: 3.1, color: '#2088FF' },
      { name: 'Git', image: '/icons/git.png', position: 22, radius: 3.4, color: '#F05032' },
      
      // Frameworks & Libraries
      { name: 'Node.js', image: '/icons/nodejs.png', position: 23, radius: 2.8, color: '#339933' },
      { name: 'React', image: '/icons/react.png', position: 24, radius: 3.2, color: '#61DAFB' },
      { name: 'Next.js', image: '/icons/nextjs.png', position: 25, radius: 3.0, color: '#000000' },
      { name: 'Express.js', image: '/icons/expressjs.png', position: 26, radius: 3.3, color: '#000000' },
      
      // Operating Systems
      { name: 'Linux', image: '/icons/linux.png', position: 27, radius: 2.9, color: '#FCC624' },
      
      // Additional Testing Tools
      { name: 'Postman', image: '/icons/postman.png', position: 28, radius: 3.1, color: '#FF6C37' },
      { name: 'Playwright', image: '/icons/playwright.png', position: 29, radius: 3.4, color: '#2EAD33' },
    ]
  }, [])

  // Orbiting paths for tech icons
  const orbitPositions = useMemo(() => {
    return techIcons.map((icon) => ({
      ...icon,
      offset: (icon.position / techIcons.length) * Math.PI * 2,
      speed: 0.1 + Math.random() * 0.1,
      verticalOffset: Math.sin(icon.position) * 0.5
    }))
  }, [techIcons])

  // Sparkle particles around icons
  const particles = useMemo(() => {
    const count = 200
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 2.5 + Math.random() * 1.5
      const height = (Math.random() - 0.5) * 2

      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = height
      positions[i * 3 + 2] = Math.sin(angle) * radius

      sizes[i] = Math.random() * 0.05 + 0.02

      // Random sparkle colors
      const sparkleColor = new THREE.Color()
      sparkleColor.setHSL(Math.random(), 0.7, isDark ? 0.7 : 0.5)
      colors[i * 3] = sparkleColor.r
      colors[i * 3 + 1] = sparkleColor.g
      colors[i * 3 + 2] = sparkleColor.b
    }

    return { positions, colors, sizes, count }
  }, [isDark])

  useFrame((state) => {
    timeRef.current = state.clock.elapsedTime

    // Animate sparkle particles
    if (particlesRef.current) {
      const sizes = particlesRef.current.geometry.attributes.size.array as Float32Array

      for (let i = 0; i < particles.count; i++) {
        // Twinkling effect
        sizes[i] = particles.sizes[i] * (0.5 + Math.sin(timeRef.current * 3 + i) * 0.5)
      }

      particlesRef.current.geometry.attributes.size.needsUpdate = true
    }

    // Force re-render to update icon positions
    setFrame(state.clock.elapsedTime)
  })

  return (
    <group ref={groupRef}>
      {/* Center Hub - Your Photo (STATIONARY - like the Sun) */}
      <Html 
        center 
        transform 
        distanceFactor={1.5}
        style={{
          transform: `translateY(${Math.sin(timeRef.current * 0.5) * 5}px)`, // Gentle floating
        }}
      >
        <div className="relative">
          {/* Glowing aura */}
          <div className="absolute inset-0 -m-20 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-2xl animate-pulse" />
          <div className="absolute inset-0 -m-16 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 opacity-25 blur-xl" />

          {/* Profile photo - BIGGER size - STAYS CENTERED */}
          <div className="relative w-75 h-75 sm:w-180 sm:h-180 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl backdrop-blur-sm">
            <img src="/me.jpg" alt="Yugan Kavinda" className="w-full h-full object-cover" />
          </div>
        </div>
      </Html>

      {/* Orbiting Tech Icons - Simple rotation around your photo */}
      {orbitPositions.map((tech, index) => {
        // Each icon orbits independently - continuous circular motion
        const angle = timeRef.current * tech.speed + tech.offset
        const x = Math.cos(angle) * tech.radius
        const z = Math.sin(angle) * tech.radius
        const y = tech.verticalOffset + Math.sin(timeRef.current * 0.5 + index) * 0.3

        return (
          <Html
            key={tech.name}
            position={[x, y, z]}
            transform
            distanceFactor={1.2}
            style={{
              transition: 'all 0.3s ease',
            }}
          >
            <div className="relative group cursor-pointer">
              {/* Icon container with glow - Simple, clean design */}
              <div 
                className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center transform hover:scale-110 transition-all duration-300 backdrop-blur-md border border-white/10 overflow-hidden"
                style={{
                  background: `radial-gradient(circle at center, ${tech.color}20, transparent)`,
                  boxShadow: `0 0 20px ${tech.color}40`,
                }}
              >
                {/* Tech icon image - stays upright */}
                <img 
                  src={tech.image} 
                  alt={tech.name}
                  className="w-10 h-10 sm:w-17 sm:h-17 object-contain drop-shadow-lg"
                  onError={(e) => {
                    // Fallback to gradient background if image fails to load
                    e.currentTarget.style.display = 'none'
                  }}
                />
                
                {/* Glow effect */}
                <div 
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-md"
                  style={{
                    background: `radial-gradient(circle at center, ${tech.color}60, transparent)`,
                  }}
                />
              </div>

              {/* Tooltip on hover */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                <div className="bg-black/90 backdrop-blur-sm px-4 py-2 rounded-lg whitespace-nowrap text-sm text-white border border-white/20 shadow-xl">
                  {tech.name}
                </div>
              </div>
            </div>
          </Html>
        )
      })}

      {/* Sparkle particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.count}
            array={particles.positions}
            itemSize={3}
            args={[particles.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particles.count}
            array={particles.colors}
            itemSize={3}
            args={[particles.colors, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            count={particles.count}
            array={particles.sizes}
            itemSize={1}
            args={[particles.sizes, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          sizeAttenuation
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Soft ambient lighting */}
      <ambientLight intensity={isDark ? 0.4 : 0.6} />
      <hemisphereLight args={[isDark ? "#6366f1" : "#93c5fd", isDark ? "#1e1b4b" : "#dbeafe", 0.5]} />
      
      {/* Subtle point lights for depth */}
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#a78bfa" />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#60a5fa" />
    </group>
  )
}
