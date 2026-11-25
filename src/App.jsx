import { Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import SkillsUniverse from './components/SkillsUniverse'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Certifications from './components/Certifications'
import Journey from './components/Journey'
import ResumeSection from './components/ResumeSection'
import Services from './components/Services'
import Strengths from './components/Strengths'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AmbientBackdrop from './components/AmbientBackdrop'
import ScrollProgress from './components/ScrollProgress'
import BootScreen from './components/BootScreen'

export default function App() {
  return (
    <div className="relative min-h-screen bg-base text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-elev focus:px-5 focus:py-2 focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>

      <Suspense fallback={null}>
        <BootScreen />
      </Suspense>

      <AmbientBackdrop />
      <ScrollProgress />
      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <SkillsUniverse />
        <Projects />
        <Experience />
        <Certifications />
        <Journey />
        <ResumeSection />
        <Services />
        <Strengths />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
