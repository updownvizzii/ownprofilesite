'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

export default function TechnicalProjects() {
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
    },
  ]

  return (
    <section id="projects" ref={ref} className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Technical Projects</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-8 sm:space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="glass glass-hover rounded-2xl overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-8">
                {project.image && (
                  <div className="relative h-64 sm:h-80 md:h-full min-h-[250px] sm:min-h-[300px] rounded-xl overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className={project.image ? '' : 'md:col-span-2'}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient">
                      {project.title}
                    </h3>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <FiGithub size={24} />
                      </a>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 sm:px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs sm:text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <ul className="space-y-2 sm:space-y-3">
                    {project.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="flex items-start gap-2 sm:gap-3">
                        <span className="text-cyan-400 mt-1 flex-shrink-0">▸</span>
                        <span className="text-sm sm:text-base text-gray-200 leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

