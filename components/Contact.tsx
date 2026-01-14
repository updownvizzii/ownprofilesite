'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiExternalLink } from 'react-icons/fi'

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const contactMethods = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'vgbofficial333@gmail.com',
      href: 'mailto:vgbofficial333@gmail.com',
      color: 'from-blue-600 to-blue-800',
    },
    {
      icon: FiPhone,
      label: 'Phone',
      value: '+91 9663873834',
      href: 'tel:+919663873834',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: FiGithub,
      label: 'GitHub',
      value: 'github.com/updownvizzii',
      href: 'https://github.com/updownvizzii',
      color: 'from-gray-500 to-gray-700',
    },
    {
      icon: FiLinkedin,
      label: 'LinkedIn',
      value: 'justanothervizzard',
      href: 'https://www.linkedin.com/in/justanothervizzard/',
      color: 'from-blue-500 to-cyan-500',
    },
  ]

  return (
    <section id="contact" ref={ref} className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6">
            <span className="text-gradient">Let's Connect</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-4">
            Ready to build something amazing? Let's discuss your next project.
          </p>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {contactMethods.map((method, index) => (
            <motion.a
              key={index}
              href={method.href}
              target={method.href.startsWith('http') ? '_blank' : undefined}
              rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass glass-hover rounded-xl p-4 sm:p-6 group"
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gradient-to-br ${method.color} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                <method.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gradient mb-2">{method.label}</h3>
              <p className="text-xs sm:text-sm text-gray-300 break-all">{method.value}</p>
              {method.href.startsWith('http') && (
                <FiExternalLink className="w-4 h-4 text-cyan-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400">
            © {new Date().getFullYear()} Vignesh Ganaraja Bhat. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

