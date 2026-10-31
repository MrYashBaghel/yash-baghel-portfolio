import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navigation from './components/Navigation'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Psychology from './pages/Psychology'
import Projects from './pages/Projects'
import WorkExperience from './pages/WorkExperience'
import Services from './pages/Services'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <BrowserRouter>
      <div data-theme={theme}>
        <CustomCursor />
        <Navigation theme={theme} toggleTheme={toggleTheme} />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/psychology" element={<Psychology />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/experience" element={<WorkExperience />} />
            <Route path="/work" element={<WorkExperience />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </div>
    </BrowserRouter>
  )
}
