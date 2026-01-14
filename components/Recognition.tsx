'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiStar, FiYoutube } from 'react-icons/fi'

export default function Recognition() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="recognition" ref={ref} className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6">
            <span className="text-gradient">Recognition</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="p-3 sm:p-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl w-fit">
              <FiStar className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient">
                Lead Speaker - Startup Mahakumbh 2025
              </h3>
              <p className="text-gray-300 mt-1 text-sm sm:text-base">National Level</p>
            </div>
          </div>

          <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-6 sm:mb-8">
            Presented AI powered agritech software solution as <span className="text-cyan-400 font-semibold">Top 7 finalist</span> to{' '}
            <span className="text-blue-400 font-semibold">Hon'ble Commerce and Industry Minister of India</span>.
          </p>

          <div className="glass-dark rounded-xl p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <FiYoutube className="text-red-500 w-5 h-5 sm:w-6 sm:h-6" />
              <h4 className="text-lg sm:text-xl font-semibold">Watch the Presentation</h4>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/Yoqr_i04oI8?start=16426"
                title="Startup Mahakumbh 2025 Presentation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

