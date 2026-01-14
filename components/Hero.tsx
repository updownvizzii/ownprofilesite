'use client'

import { useEffect, useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Text, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import Image from 'next/image'
import * as THREE from 'three'
import { useInView } from 'react-intersection-observer'
import { FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi'

function TypingText3D({ text }: { text: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Text
      ref={meshRef}
      position={[0, 0, 0]}
      fontSize={0.6}
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
        emissiveIntensity={0.6}
      />
    </Text>
  )
}

function FloatingCube() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={[2, 0, 0]}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial
        color="#1e40af"
        emissive="#1e40af"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}

function Scene({ displayText }: { displayText: string }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#1e40af" intensity={0.5} />
      <TypingText3D text={displayText} />
      <FloatingCube />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
    </>
  )
}

export default function Hero() {
  const { ref, inView } = useInView({ threshold: 0.1 })
  const [mounted, setMounted] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const [currentLine, setCurrentLine] = useState(0)

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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left: 3D Scene */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] order-2 lg:order-1"
          >
            {mounted && (
              <Canvas className="rounded-2xl glass">
                <Scene displayText={displayText || "Hey, I'm Vignesh"} />
              </Canvas>
            )}
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 order-1 lg:order-2 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6 lg:justify-start justify-center"
            >
              <motion.div
                className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-cyan-400/50 shadow-lg shadow-cyan-500/50"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/imgs/vigneshbhat.png"
                  alt="Vignesh Ganaraja Bhat"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
                  <span className="text-gradient">Vignesh</span>
                  <br />
                  <span className="text-white">Ganaraja Bhat</span>
                </h1>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl text-cyan-400 font-semibold mb-4 sm:mb-6">
                Full-Stack AI/ML Engineer
              </h2>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Building production-grade AI systems that transform businesses. 
                Specializing in transformer models, computer vision, and scalable RAG architectures.
              </p>
            </motion.div>

            {/* Contact Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="https://github.com/updownvizzii"
                target="_blank"
                rel="noopener noreferrer"
                className="glass glass-hover px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg flex items-center gap-2 text-sm sm:text-base"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiGithub size={18} className="sm:w-5 sm:h-5" />
                <span>GitHub</span>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/justanothervizzard/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass glass-hover px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg flex items-center gap-2 text-sm sm:text-base"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiLinkedin size={18} className="sm:w-5 sm:h-5" />
                <span>LinkedIn</span>
              </motion.a>
              <motion.a
                href="mailto:vgbofficial333@gmail.com"
                className="glass glass-hover px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg flex items-center gap-2 text-sm sm:text-base"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiMail size={18} className="sm:w-5 sm:h-5" />
                <span>Email</span>
              </motion.a>
              <motion.a
                href="tel:+919663873834"
                className="glass glass-hover px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg flex items-center gap-2 text-sm sm:text-base"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiPhone size={18} className="sm:w-5 sm:h-5" />
                <span>Call</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

