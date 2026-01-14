import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vignesh Ganaraja Bhat | Full-Stack AI/ML Engineer',
  description: 'Computer Science student specializing in AI/ML building production systems for international clients.',
  keywords: ['AI/ML Engineer', 'Full-Stack Developer', 'Computer Vision', 'RAG Systems', 'Transformer Models'],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}

