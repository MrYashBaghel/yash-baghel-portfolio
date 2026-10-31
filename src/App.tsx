import { useState, useEffect, useRef } from 'react';
import ThreeHeroCanvas from './components/ThreeHeroCanvas';
import SideSceneRail from './components/SideSceneRail';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Web Audio Synth for Ambient Sound Effect
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthOscsRef = useRef<OscillatorNode[]>([]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleSound = () => {
    if (!soundEnabled) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        // Ambient frequencies: A chord (A2, E3, A3, C#4)
        const freqs = [110.00, 164.81, 220.00, 277.18];
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.03, ctx.currentTime);

        // Lowpass filter for smooth ambient warmth
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, ctx.currentTime);

        gainNode.connect(filter);
        filter.connect(ctx.destination);

        const oscs = freqs.map((freq) => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.connect(gainNode);
          osc.start();
          return osc;
        });

        synthOscsRef.current = oscs;
        setSoundEnabled(true);
      } catch (err) {
        console.error('Audio initialization failed:', err);
      }
    } else {
      if (synthOscsRef.current.length > 0) {
        synthOscsRef.current.forEach((osc) => osc.stop());
        synthOscsRef.current = [];
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setSoundEnabled(false);
    }
  };

  // Scroll Active Section Observer
  useEffect(() => {
    const sections = ['hero', 'philosophy', 'projects', 'experience', 'skills', 'services', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sections[i]);
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div data-theme={theme} style={{ minHeight: '100vh', position: 'relative' }}>
      <CustomCursor />

      {/* 3D Kinetic Background Canvas with Camera Rail & Interactive Character */}
      <ThreeHeroCanvas theme={theme} />

      {/* Side Scene Navigation Rail */}
      <SideSceneRail />

      {/* Navigation Header */}
      <Navbar
        activeSection={activeSection}
        soundEnabled={soundEnabled}
        toggleSound={toggleSound}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Section Content */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <Philosophy />
        <Projects />
        <Experience />
        <Skills />
        <Services />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
