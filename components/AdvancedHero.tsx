'use client'

import { useEffect, useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Text, MeshDistortMaterial, Float } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import * as THREE from 'three'
import { useInView } from 'react-intersection-observer'
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiArrowDown } from 'react-icons/fi'

function AnimatedText3D({ text, delay = 0 }: { text: string; delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  useFrame((state) => {
    if (meshRef.current && mounted) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + delay) * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.1
    }
  })

  if (!mounted) return null

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Text
        ref={meshRef}
        position={[0, 0, 0]}
        fontSize={0.7}
        color="#0ea5e9"
        anchorX="center"
        anchorY="middle"
      >
        {text}
        <MeshDistortMaterial
          attach="material"
          distort={0.2}
          speed={1.5}
          color="#0ea5e9"
          emissive="#0ea5e9"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </Text>
    </Float>
  )
}

function ParticleSystem() {
  const particlesRef = useRef<THREE.Points>(null)
  const [count, setCount] = useState(500)
  
  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 640) {
        setCount(200) // Mobile
      } else if (window.innerWidth < 1024) {
        setCount(300) // Tablet
      } else {
        setCount(500) // Desktop
      }
    }
    updateCount()
    window.addEventListener('resize', updateCount)
    return () => window.removeEventListener('resize', updateCount)
  }, [])
  
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20
    positions[i + 1] = (Math.random() - 0.5) * 20
    positions[i + 2] = (Math.random() - 0.5) * 20
    
    const color = new THREE.Color()
    color.setHSL(0.55 + Math.random() * 0.1, 0.7, 0.5 + Math.random() * 0.3)
    colors[i] = color.r
    colors[i + 1] = color.g
    colors[i + 2] = color.b
  }
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.05
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.8} />
    </points>
  )
}

function Scene({ displayText }: { displayText: string }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#0ea5e9" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#1e40af" />
      <directionalLight position={[0, 10, 5]} intensity={0.5} />
      <ParticleSystem />
      <AnimatedText3D text={displayText} />
    </>
  )
}

export default function AdvancedHero() {
  const { ref, inView } = useInView({ threshold: 0.1 })
  const [mounted, setMounted] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const lines = ["Hey, I'm Vignesh", "I love to deploy projects"]
    let lineIndex = 0
    let charIndex = 0
    let currentText = ''
    let timeoutId: NodeJS.Timeout

    const typeInterval = setInterval(() => {
      if (lineIndex < lines.length) {
        if (charIndex < lines[lineIndex].length) {
          currentText += lines[lineIndex][charIndex]
          setDisplayText(currentText)
          charIndex++
        } else {
          clearInterval(typeInterval)
          timeoutId = setTimeout(() => {
            lineIndex++
            if (lineIndex < lines.length) {
              currentText = lines[0] + '\n'
              setDisplayText(currentText)
              charIndex = 0
              const secondInterval = setInterval(() => {
                if (charIndex < lines[1].length) {
                  currentText += lines[1][charIndex]
                  setDisplayText(currentText)
                  charIndex++
                } else {
                  clearInterval(secondInterval)
                }
              }, 100)
            }
          }, 1000)
        }
      }
    }, 100)

    return () => {
      clearInterval(typeInterval)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f172a] to-[#0a0a0f]" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left: 3D Scene */}
          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="h-[250px] xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[550px] order-2 lg:order-1 relative"
          >
            {mounted && (
              <div className="absolute inset-0 rounded-3xl overflow-hidden border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
                <Canvas className="bg-transparent">
                  <Scene displayText={displayText || "Hey, I'm Vignesh"} />
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
              </div>
            )}
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl -z-10" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
              className="space-y-6 sm:space-y-8 order-1 lg:order-2 text-center lg:text-left"
          >
            {/* Profile Image & Name */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 lg:justify-start justify-center"
            >
              <motion.div
                className="relative w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-cyan-400/50 shadow-2xl shadow-cyan-500/50"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/imgs/vigneshbhat.png"
                  alt="Vignesh Ganaraja Bhat"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent" />
              </motion.div>
              <div>
                <motion.h1 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 }}
                >
                  <span className="text-gradient block">Vignesh</span>
                  <span className="text-white block">Ganaraja Bhat</span>
                </motion.h1>
              </div>
            </motion.div>

            {/* Title & Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="space-y-4"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl text-cyan-400 font-bold">
                Full-Stack AI/ML Engineer
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Architecting production-grade AI systems that transform businesses. 
                Specializing in transformer models, computer vision, and scalable RAG architectures.
              </p>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              {[
                { label: '15+', sub: 'Projects' },
                { label: '95%', sub: 'Accuracy' },
                { label: '100K+', sub: 'Vectors' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1 + i * 0.1, type: "spring" }}
                  className="glass rounded-xl px-6 py-3 text-center"
                >
                  <div className="text-xl sm:text-2xl font-bold text-gradient">{stat.label}</div>
                  <div className="text-xs sm:text-sm text-gray-400">{stat.sub}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              {[
                { icon: FiGithub, href: 'https://github.com/updownvizzii', label: 'GitHub', color: 'from-gray-600 to-gray-800' },
                { icon: FiLinkedin, href: 'https://www.linkedin.com/in/justanothervizzard/', label: 'LinkedIn', color: 'from-blue-600 to-blue-800' },
                { icon: FiMail, href: 'mailto:vgbofficial333@gmail.com', label: 'Email', color: 'from-cyan-500 to-blue-600' },
                { icon: FiPhone, href: 'tel:+919663873834', label: 'Call', color: 'from-green-500 to-emerald-600' },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`group relative overflow-hidden rounded-xl px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-gradient-to-br ${item.color} text-white font-semibold flex items-center gap-2 text-xs sm:text-sm md:text-base`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1.2 + i * 0.1 }}
                >
                  <item.icon size={18} className="sm:w-5 sm:h-5" />
                  <span>{item.label}</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.a
          href="#summary"
          className="flex flex-col items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm font-medium">Scroll</span>
          <FiArrowDown size={24} />
        </motion.a>
      </motion.div>
    </section>
  )
}

