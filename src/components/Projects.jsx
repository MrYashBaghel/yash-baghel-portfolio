import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, ExternalLink, ArrowUpRight, X, Check, ShieldAlert, Cpu, Layers } from 'lucide-react';
import { projects } from '../data/resumeData';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = ['All', 'Kubernetes & Cloud', 'Infrastructure as Code', 'Observability & SRE', 'CI/CD & Optimization'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="section-padding" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '3rem' }}>
          <div className="section-badge">
            <FolderGit2 size={14} />
            <span>DevOps Case Studies</span>
          </div>
          <h2 className="section-title">
            Featured <span className="gradient-text">Engineering Projects</span>
          </h2>
          <p className="section-subtitle">
            Real-world cloud infrastructure deployments, Kubernetes orchestration, and automated CI/CD pipelines delivering measurable business impact.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '2.5rem'
          }}
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '999px',
                  background: isActive ? 'var(--grad-brand)' : 'var(--surface-2)',
                  color: isActive ? '#06101f' : 'var(--text-2)',
                  border: isActive ? 'none' : '1px solid var(--border)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px'
          }}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="glass-card"
              style={{
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
              onClick={() => setActiveModalProject(project)}
            >
              <div>
                {/* Category Badge & Arrow Icon */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--accent)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em'
                    }}
                  >
                    {project.category}
                  </span>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'var(--surface-2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-2)'
                    }}
                  >
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3
                  className="font-display"
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    lineHeight: 1.3,
                    marginBottom: '8px',
                    color: 'var(--text)'
                  }}
                >
                  {project.title}
                </h3>
                <p style={{ color: 'var(--text-3)', fontSize: '0.88rem', marginBottom: '1.2rem', lineHeight: 1.5 }}>
                  {project.tagline}
                </p>

                {/* Impact Metrics Row */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '10px',
                    background: 'rgba(21, 96, 189, 0.08)',
                    padding: '12px',
                    borderRadius: '12px',
                    marginBottom: '1.5rem',
                    border: '1px solid var(--border)'
                  }}
                >
                  {project.impact.map((imp, idx) => (
                    <div key={idx} style={{ textAlign: 'center' }}>
                      <div
                        className="font-display"
                        style={{
                          fontSize: '1.1rem',
                          fontWeight: 800,
                          color: 'var(--accent)'
                        }}
                      >
                        {imp.prefix}{imp.value}{imp.suffix}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-3)', lineHeight: 1.2 }}>
                        {imp.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Architecture Tags */}
              <div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  {project.architecture.map((tech, tIdx) => (
                    <span key={tIdx} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--primary)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>View Technical Deep-Dive</span>
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Case Study Modal Drawer */}
        <AnimatePresence>
          {activeModalProject && (
            <div className="modal-overlay" onClick={() => setActiveModalProject(null)}>
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-card"
                style={{
                  maxWidth: '750px',
                  width: '100%',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  padding: '36px',
                  background: 'var(--surface-solid)',
                  border: '1px solid var(--border-strong)',
                  position: 'relative'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveModalProject(null)}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <X size={18} />
                </button>

                {/* Modal Title & Category */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: 'var(--accent)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em'
                    }}
                  >
                    {activeModalProject.category} Case Study
                  </span>
                  <h3
                    className="font-display"
                    style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '6px', marginBottom: '8px' }}
                  >
                    {activeModalProject.title}
                  </h3>
                  <p style={{ color: 'var(--text-2)', fontSize: '1rem' }}>
                    {activeModalProject.summary}
                  </p>
                </div>

                {/* Before vs After Impact Grid */}
                <div style={{ marginBottom: '2rem' }}>
                  <h4
                    className="font-display"
                    style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text)' }}
                  >
                    Quantifiable Impact Metrics
                  </h4>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                      gap: '14px'
                    }}
                  >
                    {activeModalProject.impact.map((imp, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: 'var(--surface-2)',
                          padding: '16px',
                          borderRadius: '12px',
                          border: '1px solid var(--border)'
                        }}
                      >
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-3)', marginBottom: '4px' }}>
                          {imp.label}
                        </div>
                        <div
                          className="font-display"
                          style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '6px' }}
                        >
                          {imp.prefix}{imp.value}{imp.suffix}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-2)' }}>
                          <span style={{ textDecoration: 'line-through', opacity: 0.6 }}>{imp.before}</span> →{' '}
                          <strong style={{ color: 'var(--accent)' }}>{imp.after}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Problem Statement */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <ShieldAlert size={18} style={{ color: 'var(--neon-coral)' }} />
                    <h4 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                      The Problem
                    </h4>
                  </div>
                  <p style={{ color: 'var(--text-2)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                    {activeModalProject.details.problem}
                  </p>
                </div>

                {/* Engineering Solution */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Cpu size={18} style={{ color: 'var(--accent)' }} />
                    <h4 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                      The Engineering Solution
                    </h4>
                  </div>
                  <p style={{ color: 'var(--text-2)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                    {activeModalProject.details.solution}
                  </p>
                </div>

                {/* Key Technical Highlights */}
                <div style={{ marginBottom: '2rem' }}>
                  <h4 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '10px' }}>
                    Technical Execution Highlights
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {activeModalProject.details.highlights.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem', color: 'var(--text-2)' }}>
                        <Check size={16} style={{ color: 'var(--accent)', marginTop: '3px', flexShrink: 0 }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div>
                  <h4 className="font-display" style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-3)' }}>
                    Architecture & Tools Used
                  </h4>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {activeModalProject.architecture.map((t, i) => (
                      <span key={i} className="tech-tag" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
