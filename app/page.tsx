import AdvancedHero from '@/components/AdvancedHero'
import ProfessionalSummary from '@/components/ProfessionalSummary'
import EnhancedProjects from '@/components/EnhancedProjects'
import ProfessionalExperience from '@/components/ProfessionalExperience'
import Recognition from '@/components/Recognition'
import Education from '@/components/Education'
import TechnicalSkills from '@/components/TechnicalSkills'
import Contact from '@/components/Contact'
import Navigation from '@/components/Navigation'
import BackgroundEffects from '@/components/BackgroundEffects'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <BackgroundEffects />
      <Navigation />
      <AdvancedHero />
      <ProfessionalSummary />
      <EnhancedProjects />
      <ProfessionalExperience />
      <Recognition />
      <Education />
      <TechnicalSkills />
      <Contact />
    </main>
  )
}

