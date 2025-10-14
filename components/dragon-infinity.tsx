"use client"

import { useRef, useMemo } from "react"
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

  const infinityPath = useMemo(() => {
    const scale = 2.5
    const points: THREE.Vector3[] = []
    for (let i = 0; i <= 400; i++) {
      const t = (i / 400) * Math.PI * 2
      const x = (scale * Math.cos(t)) / (1 + Math.sin(t) ** 2)
      const y = (scale * Math.sin(t) * Math.cos(t)) / (1 + Math.sin(t) ** 2)
      const z = Math.sin(t * 2) * 0.3
      points.push(new THREE.Vector3(x, y, z))
    }
    return new THREE.CatmullRomCurve3(points, true)
  }, [])

  const particles = useMemo(() => {
    const count = 200
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const progress = new Float32Array(count)

    const qaColor = new THREE.Color(isDark ? "#5b9fff" : "#4a7fc7")
    const deployColor = new THREE.Color(isDark ? "#ff9b5b" : "#e67e3c")
    const accentColor = new THREE.Color(isDark ? "#d95bff" : "#b84ad6")

    for (let i = 0; i < count; i++) {
      progress[i] = Math.random()
      sizes[i] = Math.random() * 0.08 + 0.02

      const colorChoice = Math.random()
      const color = colorChoice < 0.33 ? qaColor : colorChoice < 0.66 ? deployColor : accentColor

      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return { positions, colors, sizes, progress, count }
  }, [isDark])

  useFrame((state) => {
    timeRef.current = state.clock.elapsedTime

    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      const progressArray = particles.progress

      for (let i = 0; i < particles.count; i++) {
        progressArray[i] = (progressArray[i] + 0.001) % 1
        const point = infinityPath.getPointAt(progressArray[i])

        const offset = Math.sin(timeRef.current + i) * 0.3
        positions[i * 3] = point.x + Math.sin(i + timeRef.current) * offset
        positions[i * 3 + 1] = point.y + Math.cos(i + timeRef.current) * offset
        positions[i * 3 + 2] = point.z + Math.sin(i * timeRef.current * 0.5) * 0.2
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = timeRef.current * 0.15
    }
  })

  const qaColor = isDark ? "#5b9fff" : "#4a7fc7"
  const deployColor = isDark ? "#ff9b5b" : "#e67e3c"
  const accentColor = isDark ? "#d95bff" : "#b84ad6"

  return (
    <group ref={groupRef}>
      <Html center transform distanceFactor={1.5}>
        <div className="relative">
          {/* Glowing rings around photo */}
          <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-r from-primary via-[var(--color-devops-flow)] to-accent opacity-30 blur-xl animate-pulse" />
          <div className="absolute inset-0 -m-4 rounded-full bg-gradient-to-r from-accent via-primary to-[var(--color-devops-flow)] opacity-20 blur-lg" />

          {/* Profile photo */}
                        <div className="relative w-150 h-150 rounded-full overflow-hidden border-4 border-primary/50 shadow-2xl">
            <img src="/me.jpg" alt="Yugan Kavinda" className="w-full h-full object-cover" />
          </div>
        </div>
      </Html>

      <mesh position={[-2, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={qaColor}
          emissive={qaColor}
          emissiveIntensity={isDark ? 1.2 : 0.6}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh position={[-2, 0, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color={qaColor} emissive={qaColor} emissiveIntensity={0.3} transparent opacity={0.2} />
      </mesh>

      <mesh position={[2, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={deployColor}
          emissive={deployColor}
          emissiveIntensity={isDark ? 1.2 : 0.6}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh position={[2, 0, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color={deployColor}
          emissive={deployColor}
          emissiveIntensity={0.3}
          transparent
          opacity={0.2}
        />
      </mesh>

      <mesh>
        <tubeGeometry args={[infinityPath, 400, 0.02, 8, true]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.5}
          transparent
          opacity={0.4}
        />
      </mesh>

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
          size={0.05}
          vertexColors
          sizeAttenuation
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <pointLight position={[0, 0, 2]} intensity={0.5} color={accentColor} />
      <pointLight position={[-2, 0, 0]} intensity={1} color={qaColor} />
      <pointLight position={[2, 0, 0]} intensity={1} color={deployColor} />
    </group>
  )
}
