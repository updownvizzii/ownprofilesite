'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiCode, FiCpu, FiCloud, FiDatabase, FiGlobe } from 'react-icons/fi'

export default function TechnicalSkills() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const skillCategories = [
    {
      title: 'Languages',
      icon: FiCode,
      skills: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'C++'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'AI/ML',
      icon: FiCpu,
      skills: ['PyTorch', 'TensorFlow', 'Transformers', 'Computer Vision', 'RAG Systems', 'LangChain'],
      color: 'from-blue-600 to-blue-800',
    },
    {
      title: 'Web',
      icon: FiGlobe,
      skills: ['React', 'Node.js', 'Express', 'FastAPI', 'Next.js', 'React Native'],
      color: 'from-cyan-500 to-blue-500',
    },
    {
      title: 'Cloud & Tools',
      icon: FiCloud,
      skills: ['Vercel', 'AWS', 'GCP', 'Docker', 'Git', 'Apache Spark', 'MongoDB', 'PostgreSQL'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Specialized',
      icon: FiDatabase,
      skills: ['Vector Databases (Pinecone, Chroma)', 'API Integration', 'Payment Gateways (Razorpay, Stripe)'],
      color: 'from-orange-500 to-red-500',
    },
  ]

  const languages = [
    { name: 'English', level: 'Fluent' },
    { name: 'Hindi', level: 'Fluent' },
    { name: 'Kannada', level: 'Fluent' },
  ]

  return (
    <section id="skills" ref={ref} className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6">
            <span className="text-gradient">Technical Skills</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass glass-hover rounded-xl p-4 sm:p-6"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-3 sm:mb-4`}>
                <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gradient mb-3 sm:mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-2 sm:px-3 py-1 bg-white/10 rounded-lg text-xs sm:text-sm text-gray-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass rounded-2xl p-8 max-w-2xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-gradient mb-6 text-center">Languages</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {languages.map((lang, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-lg font-semibold text-cyan-400">{lang.name}</div>
                <div className="text-sm text-gray-300">{lang.level}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

