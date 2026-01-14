'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiBookOpen, FiFileText, FiCalendar } from 'react-icons/fi'

export default function Education() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const courses = [
    'Machine Learning',
    'Data Science',
    'DBMS',
    'Software Engineering',
  ]

  return (
    <section id="education" ref={ref} className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6">
            <span className="text-gradient">Education</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 max-w-4xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 mb-6">
            <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl w-fit">
              <FiBookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient mb-2">
                Bachelor of Engineering in Computer Science
              </h3>
              <p className="text-lg sm:text-xl text-cyan-400 mb-2">Global Academy of Technology, Bengaluru</p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-4 text-gray-300 mb-4">
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-yellow-400" />
                  <span>Expected May 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400 font-semibold">CGPA: 6.89/10</span>
                  <span className="text-sm">(6th Semester)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <h4 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center gap-2">
              <FiFileText />
              Relevant Coursework
            </h4>
            <div className="flex flex-wrap gap-3">
              {courses.map((course, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm"
                >
                  {course}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

