'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiCode, FiDatabase, FiCpu, FiTrendingUp } from 'react-icons/fi'

export default function ProfessionalSummary() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  const stats = [
    { icon: FiCode, value: '15+', label: 'Production Websites' },
    { icon: FiDatabase, value: '100K+', label: 'Vectors Processed' },
    { icon: FiCpu, value: '95%', label: 'Model Accuracy' },
  ]

  return (
    <section id="summary" ref={ref} className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-gradient">Professional Summary</span>
          </motion.h2>
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: 128 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
          className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 mb-8 sm:mb-12 md:mb-16 border border-cyan-500/20"
        >
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed text-center font-light">
            Computer Science student specializing in AI/ML building production systems for international clients. 
            Architected transformer-based computer vision models achieving <span className="text-cyan-400 font-semibold">95% accuracy</span> and engineered scalable RAG systems processing <span className="text-cyan-400 font-semibold">100K+ vectors</span>. 
            Delivered <span className="text-cyan-400 font-semibold">15+ production websites</span> and AI-powered applications generating measurable business impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
              className="group relative glass glass-hover rounded-2xl p-6 sm:p-8 text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring" }}
                >
                  <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 mx-auto mb-4" />
                </motion.div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gradient mb-2">{stat.value}</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-300 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

