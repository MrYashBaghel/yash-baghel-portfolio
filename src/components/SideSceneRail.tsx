import { useState, useEffect } from 'react'

const SCENES = [
  { id: 'hero', label: 'Overview' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
]

export default function SideSceneRail() {
  const [activeScene, setActiveScene] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220
      for (let i = SCENES.length - 1; i >= 0; i--) {
        const el = document.getElementById(SCENES[i].id)
        if (el && el.offsetTop <= scrollPos) {
          setActiveScene(SCENES[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const yOffset = -80
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className="landing__scenes" style={{ zIndex: 40 }}>
      {SCENES.map(({ id, label }) => {
        const isActive = activeScene === id
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={`landing__scene${isActive ? ' is-active' : ''}`}
            aria-label={`Scroll to ${label}`}
          >
            <i />
            <em>{label}</em>
          </button>
        )
      })}
    </div>
  )
}
