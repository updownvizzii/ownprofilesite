'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi'

export default function EnhancedProjects() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const projects = [
    {
      title: 'Agritech Disease Detection & Soil Analysis Platform',
      tech: ['React', 'Node.js', 'FastAPI', 'Gemini 2.0', 'Pinecone', 'MongoDB'],
      image: '/agritech.png',
      highlights: [
        'Architected cross-platform agri-AI system with Gemini 2.0 Flash RAG and Pinecone vector DB, enabling 3-second crop disease diagnosis across English, Hindi, and Kannada',
        'Engineered semantic search pipeline using Gemini-001 embeddings to query 100K+ disease vectors with 150ms latency, achieving 92% retrieval accuracy',
        'Developed ML recommendation engine processing 8 soil parameters (NPK/pH/CO2) via FastAPI, delivering 85%+ accuracy in crop-soil matching',
        'Built scalable backend with MongoDB JWT authentication, UploadThing CDN integration, and unified Express API gateway serving 1000+ concurrent users',
      ],
      gradient: 'from-green-500/20 to-emerald-500/20',
    },
    {
      title: 'FormFit - Transformer-Based Workout Form Analyzer',
      tech: ['PyTorch', 'MediaPipe', 'Flask', 'TensorFlow'],
      image: '/imgs/formfitdiagram.png',
      highlights: [
        'Engineered PoseFormer transformer architecture achieving 95% accuracy at 33 FPS, outperforming CNN/RNN baselines by 15% with 8x faster inference (18ms vs 144ms)',
        'Automated video-to-keypoint preprocessing pipeline to build 3,000+ sequence skeletal database, reducing data requirements by 60% through pose normalization and 2x augmentation',
        'Developed real-time correction system using 3D keypoint smoothing and TTS voice feedback, providing professional-grade form analysis at zero marginal cost',
        'Integrated Gemini API for personalized AI diet planning with SQL persistence, optimizing model convergence in 15-25 epochs',
      ],
      gradient: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      title: 'Additional Projects',
      tech: ['MERN', 'React Native', 'Computer Vision'],
      highlights: [
        'MERN E-commerce Platform: Full-stack marketplace with Stripe integration, 10K+ monthly users',
        'React Native Fitness Tracker: Cross-platform app with offline-first architecture, 5K+ downloads',
        'Computer Vision Labeling Tool: Automated data annotation pipeline reducing manual work by 70%',
      ],
      github: 'https://github.com/updownvizzii',
      gradient: 'from-blue-500/20 to-cyan-500/20',
    },
  ]

  return (
    <section id="projects" ref={ref} className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-gradient">Technical Projects</span>
          </motion.h2>
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: 128 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        <div className="space-y-12 sm:space-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2, type: "spring", stiffness: 100 }}
              className="group relative"
            >
              <div className={`absolute -inset-1 bg-gradient-to-r ${project.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative glass rounded-3xl overflow-hidden border border-white/10">
                <div className="grid lg:grid-cols-2 gap-0">
                    {project.image && (
                      <motion.div 
                        className="relative h-48 xs:h-56 sm:h-64 md:h-80 lg:h-full min-h-[200px] xs:min-h-[250px] sm:min-h-[300px] overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </motion.div>
                  )}
                  <div className={`p-6 sm:p-8 md:p-10 lg:p-12 ${project.image ? '' : 'lg:col-span-2'}`}>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient leading-tight">
                        {project.title}
                      </h3>
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
                          whileHover={{ x: 5 }}
                        >
                          <FiGithub size={24} />
                        </motion.a>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.3 + techIndex * 0.05 }}
                          className="px-3 py-1.5 bg-cyan-500/20 text-cyan-300 rounded-lg text-sm font-medium border border-cyan-500/30"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                    
                    <ul className="space-y-4">
                      {project.highlights.map((highlight, highlightIndex) => (
                        <motion.li
                          key={highlightIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.4 + highlightIndex * 0.1 }}
                          className="flex items-start gap-4 group/item"
                        >
                          <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0 group-hover/item:scale-150 transition-transform" />
                          <span className="text-sm sm:text-base text-gray-200 leading-relaxed">{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

