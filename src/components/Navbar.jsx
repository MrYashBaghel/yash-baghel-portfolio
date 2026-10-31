import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sun, Moon, Menu, X, Send } from 'lucide-react';

export default function Navbar({ activeSection, soundEnabled, toggleSound, theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Home', index: '01' },
    { id: 'philosophy', label: 'Philosophy', index: '02' },
    { id: 'projects', label: 'Projects', index: '03' },
    { id: 'experience', label: 'Experience', index: '04' },
    { id: 'skills', label: 'Skills', index: '05' },
    { id: 'services', label: 'Services', index: '06' },
    { id: 'contact', label: 'Contact', index: '07' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--nav-h)',
        zIndex: 900,
        background: scrolled ? 'var(--glass-strong)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <div
          onClick={() => scrollToSection('hero')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer'
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'var(--grad-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#06101f',
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              boxShadow: '0 4px 15px var(--brand-glow)'
            }}
          >
            YB
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', lineHeight: 1.2 }}>
              Yash Baghel
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: '0.04em' }}>
              DevOps Engineer
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            background: 'var(--surface-2)',
            padding: '6px 16px',
            borderRadius: '999px',
            border: '1px solid var(--border)'
          }}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isActive ? 'var(--accent)' : 'var(--text-2)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', opacity: 0.6 }}>{link.index}</span>
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Disable Ambient Audio' : 'Enable Ambient Audio'}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              color: soundEnabled ? 'var(--accent)' : 'var(--text-3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title="Toggle Light/Dark Theme"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              color: 'var(--text-2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Contact Action Button */}
          <button
            onClick={() => scrollToSection('contact')}
            className="btn-primary"
            style={{ padding: '8px 18px', fontSize: '0.85rem' }}
          >
            <Send size={15} />
            <span>Get in Touch</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            className="mobile-burger-btn"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 'var(--nav-h)',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--bg)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            zIndex: 899
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              style={{
                background: 'none',
                border: 'none',
                color: activeSection === link.id ? 'var(--accent)' : 'var(--text)',
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 700,
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', opacity: 0.6 }}>{link.index}</span>
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('contact')}
            className="btn-primary"
            style={{ marginTop: '1rem', width: '100%' }}
          >
            Get in Touch
          </button>
        </div>
      )}
    </header>
  );
}
