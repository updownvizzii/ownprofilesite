'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiCalendar, FiGlobe, FiTrendingUp, FiCheckCircle } from 'react-icons/fi'

export default function ProfessionalExperience() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const experiences = [
    {
      title: 'Freelance Full-Stack & AI Engineer',
      company: 'Remote',
      period: '2022 - Present',
      achievements: [
        'Built AI-driven content automation pipelines for international NGO, reducing content production time by 60%',
        'Integrated Razorpay, Stripe, and third-party APIs for 5+ online education platforms, processing ₹50L+ in transactions',
        'Delivered 15+ production-ready websites for US, EU, and Indian clients (fortimark.co, rajadhaniholidays.in, kaizenworkspace.com)',
        'Maintained 98% client satisfaction rate with average project turnaround of 3-4 weeks',
      ],
    },
  ]

  const websites = [
    { name: 'fortimark.co', url: 'https://fortimark.co' },
    { name: 'rajadhaniholidays.in', url: 'https://rajadhaniholidays.in' },
    { name: 'kaizenworkspace.com', url: 'https://kaizenworkspace.com' },
  ]

  return (
    <section id="experience" ref={ref} className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6">
            <span className="text-gradient">Professional Experience</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="glass rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient mb-2">
                    {exp.title}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-300">
                    <div className="flex items-center gap-2">
                      <FiGlobe className="text-cyan-400" />
                      <span>{exp.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-blue-400" />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                </div>
              </div>

              <ul className="space-y-4 mb-6">
                {exp.achievements.map((achievement, achievementIndex) => (
                  <motion.li
                    key={achievementIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + achievementIndex * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <FiCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-200 leading-relaxed">{achievement}</span>
                  </motion.li>
                ))}
              </ul>

              {index === 0 && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h4 className="text-lg font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                    <FiTrendingUp />
                    Featured Websites
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {websites.map((site, siteIndex) => (
                      <a
                        key={siteIndex}
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 glass rounded-lg hover:bg-cyan-500/20 transition-all text-sm"
                      >
                        {site.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

