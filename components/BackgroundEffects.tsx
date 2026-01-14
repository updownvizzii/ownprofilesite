'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Stars } from '@react-three/drei'
import * as THREE from 'three'

function ParticleField() {
  const meshRef = useRef<THREE.Points>(null)
  const particles = useRef<Float32Array | null>(null)
  const [count, setCount] = useState(2000)

  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 640) {
        setCount(500) // Mobile - reduce particles
      } else if (window.innerWidth < 1024) {
        setCount(1000) // Tablet
      } else {
        setCount(2000) // Desktop
      }
    }
    updateCount()
    window.addEventListener('resize', updateCount)
    return () => window.removeEventListener('resize', updateCount)
  }, [])

  useEffect(() => {
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 50
    }
    
    particles.current = positions
  }, [count])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.05
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  if (!particles.current) return null

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.current.length / 3}
          array={particles.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#0ea5e9" transparent opacity={0.6} />
    </points>
  )
}

function FloatingOrbs() {
  const orb1Ref = useRef<THREE.Mesh>(null)
  const orb2Ref = useRef<THREE.Mesh>(null)
  const orb3Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (orb1Ref.current) {
      orb1Ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 10
      orb1Ref.current.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 5
    }
    if (orb2Ref.current) {
      orb2Ref.current.position.x = Math.cos(state.clock.elapsedTime * 0.4) * -8
      orb2Ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 6
    }
    if (orb3Ref.current) {
      orb3Ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.7) * 12
      orb3Ref.current.position.y = Math.cos(state.clock.elapsedTime * 0.5) * -7
    }
  })

  return (
    <>
      <mesh ref={orb1Ref} position={[0, 0, -5]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#0ea5e9"
          emissiveIntensity={0.3}
          transparent
          opacity={0.1}
        />
      </mesh>
      <mesh ref={orb2Ref} position={[0, 0, -8]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#1e40af"
          emissive="#1e40af"
          emissiveIntensity={0.3}
          transparent
          opacity={0.1}
        />
      </mesh>
      <mesh ref={orb3Ref} position={[0, 0, -6]}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#0ea5e9"
          emissiveIntensity={0.3}
          transparent
          opacity={0.1}
        />
      </mesh>
    </>
  )
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#0ea5e9" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#1e40af" />
      <Stars 
        radius={50} 
        depth={50} 
        count={typeof window !== 'undefined' && window.innerWidth < 640 ? 2000 : 5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1} 
      />
      <ParticleField />
      <FloatingOrbs />
    </>
  )
}

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 -z-10 opacity-40">
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  )
}

