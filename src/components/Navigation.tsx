import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { to: '/', label: 'Home', index: '01' },
  { to: '/profile', label: 'Profile', index: '02' },
  { to: '/psychology', label: 'Philosophy', index: '03' },
  { to: '/projects', label: 'Projects', index: '04' },
  { to: '/experience', label: 'Experience', index: '05' },
  { to: '/services', label: 'Services', index: '06' },
  { to: '/contact', label: 'Contact', index: '07' },
]

interface Props {
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

export default function Navigation({ theme, toggleTheme }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <div className="nav__inner container">
          <NavLink to="/" className="nav__brand">
            <div className="nav__brandtext">
              <strong>Yash Baghel</strong>
              <em>DevOps Engineer</em>
            </div>
          </NavLink>

          {/* Desktop pill links */}
          <div className="nav__links">
            {NAV_LINKS.map(({ to, label, index }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) => `nav__link${isActive ? ' active' : ''}`}
              >
                <span className="nav__index">{index}</span>
                {label}
              </NavLink>
            ))}
          </div>

          <div className="nav__right">
            {/* Theme toggle */}
            <button
              className={`theme-toggle is-${theme}`}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <span className="theme-toggle__track">
                <span className="theme-toggle__thumb">
                  <svg className="theme-toggle__icon sun" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                  <svg className="theme-toggle__icon moon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                </span>
              </span>
            </button>

            {/* Hamburger */}
            <button
              className={`nav__burger${menuOpen ? ' is-open' : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="nav__menu">
              {NAV_LINKS.map(({ to, label, index }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) => `nav__menulink${isActive ? ' active' : ''}`}
                  >
                    <span className="nav__menuindex">{index}</span>
                    {label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
