import React from 'react';
import { ArrowUp, Terminal } from 'lucide-react';
import { profileData } from '../data/resumeData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        paddingTop: '50px',
        paddingBottom: '40px',
        background: 'var(--bg-2)',
        position: 'relative',
        zIndex: 1
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '30px'
          }}
        >
          {/* Brand Mark */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'var(--grad-brand)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#06101f',
                fontWeight: 800,
                fontFamily: 'var(--font-display)'
              }}
            >
              YB
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem' }}>
                {profileData.name}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)' }}>
                {profileData.role}
              </div>
            </div>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '999px',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              color: 'var(--text-2)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
          >
            <span>Back to Top</span>
            <ArrowUp size={16} />
          </button>
        </div>

        {/* Copyright & Tech Note */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.82rem',
            color: 'var(--text-3)',
            borderTop: '1px solid var(--border)',
            paddingTop: '20px'
          }}
        >
          <div>
            © {new Date().getFullYear()} Yash Baghel. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)' }}>
            <Terminal size={14} style={{ color: 'var(--accent)' }} />
            <span>Built with React, Vite, Three.js & Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
