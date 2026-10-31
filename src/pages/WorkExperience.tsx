import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'

const EXPERIENCES = [
  {
    company: 'Maven Wave (an Atos Company)',
    role: 'Associate Consultant · DevOps Engineer',
    period: 'May 2022 — Present',
    location: 'Gurugram / Noida, India',
    current: true,
    summary: 'Leading cloud-based application deployment, Kubernetes container orchestration, and continuous process automation. Driving high availability, operational reliability, and strategic infrastructure cost reduction.',
    highlights: [
      'Managing Docker containers and orchestrating with Kubernetes on AWS EKS to ensure application scalability, automated rollouts, and peak performance.',
      'Automating AWS infrastructure provisioning with Terraform to streamline deployments and improve operational efficiency across environments.',
      'Optimizing CI/CD pipelines with GitLab CI/CD, reducing deployment turnaround times from 7-8 hours to 2 hours with automated quality and security checks.',
      'Deploying MERN, MEAN, and LAMP stacks on Kubernetes to enhance scalability and fault tolerance with rolling zero-downtime updates.',
      'Integrating OKTA for secure identity access management and utilizing JIRA for Agile project tracking and cross-functional team collaboration.',
      'Implementing proactive monitoring and logging systems using Prometheus and Grafana, slashing weekly downtime incidents from 10 to 1-2.',
      'Achieved a 20-30% AWS cost reduction through resource rightsizing, spot instances, and strategic adoption of open-source DevOps tools.',
    ],
    domains: ['Cloud Architecture', 'AWS EKS', 'GitLab CI/CD', 'Terraform IaC', 'SRE Telemetry'],
    stack: ['AWS EKS', 'Kubernetes', 'Terraform', 'Docker', 'GitLab CI/CD', 'Prometheus', 'Grafana', 'OKTA SSO', 'JIRA Agile', 'MERN / MEAN', 'Shell Scripting'],
  },
  {
    company: 'Stefanini India',
    role: 'Network & Cloud Engineer',
    period: 'April 2021 — April 2022',
    location: 'Noida, Uttar Pradesh, India',
    current: false,
    summary: 'Managed enterprise AWS cloud infrastructure, automated configuration management, and maintained secure secret storage and CI/CD delivery pipelines.',
    highlights: [
      'Managed AWS cloud infrastructure, optimizing core services including EC2, S3, RDS, Lambda, and VPC for peak performance and high uptime.',
      'Leveraged Terraform to codify and manage cloud infrastructure resources across multi-account topologies.',
      'Managed secrets using HashiCorp Vault to secure, store, and tightly control access to tokens, passwords, certificates, and API keys.',
      'Integrated ServiceNow for IT service management, JIRA for issue tracking, and GitLab for project delivery workflows.',
      'Containerized applications with Docker and orchestrated deployments using Kubernetes for scalable, efficient application delivery.',
      'Created, implemented, and maintained CI/CD pipelines with Jenkins and Concourse to optimize code integration and delivery.',
      'Automated routine operational tasks and streamlined system configurations using advanced Shell scripting and Chef.',
    ],
    domains: ['AWS Cloud', 'HashiCorp Vault', 'Jenkins CI/CD', 'ServiceNow ITSM', 'Configuration Management'],
    stack: ['AWS (EC2, S3, RDS, Lambda, VPC)', 'Terraform', 'HashiCorp Vault', 'Jenkins', 'Concourse', 'Docker', 'Chef', 'ServiceNow', 'Ubuntu Linux'],
  },
]

const EARLY_ROLES = [
  {
    role: 'Graduate Cloud & DevOps Trainee',
    company: 'Academic & Industry Projects · Faridabad',
    period: '2020 — 2021',
    note: 'Built foundational CI/CD workflows, automated Linux server configuration, and completed AWS Cloud Practitioner certification.',
  },
  {
    role: 'B.Tech. in Computer Science Engineering',
    company: 'Manav Rachna College of Engineering',
    period: '2016 — 2020',
    note: 'Core coursework in Operating Systems, Computer Networks, Distributed Computing, Database Management Systems, and Cloud Foundations.',
  },
]

export default function WorkExperience() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 70%', 'end 70%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.5 })

  return (
    <motion.main
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container">
        {/* ── 01. PAGE HEAD ──────────────────────────────────────────────── */}
        <div className="page-head scrim">
          <span className="eyebrow">Career · 2021 → Present</span>
          <h1 className="display" style={{ marginBottom: '0.6rem' }}>
            A cloud engineering <span className="grad-text">trajectory.</span>
          </h1>
          <p className="lead" style={{ maxWidth: '68ch' }}>
            Nearly five years compounding cloud infrastructure automation, Kubernetes container orchestration, and high-velocity CI/CD delivery across global consulting enterprises.
          </p>
        </div>

        {/* ── 02. TIMELINE ───────────────────────────────────────────────── */}
        <div className="timeline" ref={timelineRef}>
          <div className="timeline__line" aria-hidden="true">
            <motion.span className="timeline__progress" style={{ scaleY }} />
          </div>

          {EXPERIENCES.map((exp) => (
            <div key={exp.company} className="timeline__row">
              <div className="timeline__node" aria-hidden="true">
                <span className={`timeline__dot ${exp.current ? 'is-current' : ''}`} />
              </div>

              <article className="timeline__card card">
                <div className="timeline__head">
                  <div>
                    <h2 className="timeline__role" style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', letterSpacing: '-0.02em', margin: 0 }}>
                      {exp.role}
                    </h2>
                    <p className="timeline__company" style={{ fontSize: '1.05rem', margin: '0.3rem 0 0' }}>
                      {exp.company}
                      {exp.current && <span className="timeline__badge">Current</span>}
                    </p>
                  </div>

                  <div className="timeline__meta">
                    <span className="mono" style={{ fontSize: '.88rem', fontWeight: 600, color: 'var(--text)' }}>
                      {exp.period}
                    </span>
                    <span className="muted" style={{ fontSize: '.78rem' }}>
                      {exp.location}
                    </span>
                  </div>
                </div>

                <p className="timeline__summary" style={{ fontSize: '.92rem', lineHeight: 1.65, margin: '1rem 0' }}>
                  {exp.summary}
                </p>

                {/* Highlights List */}
                <div className="timeline__highlights">
                  <ul className="list-check">
                    {exp.highlights.map((h, i) => (
                      <li key={i} style={{ fontSize: '.88rem', lineHeight: 1.6 }}>{h}</li>
                    ))}
                  </ul>
                </div>

                {/* Domains */}
                <div className="timeline__clients" style={{ marginTop: '1.2rem' }}>
                  <span className="timeline__clientlabel mono" style={{ fontSize: '.68rem', color: 'var(--text-3)', letterSpacing: '.12em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                    Focus Areas
                  </span>
                  <div className="tags">
                    {exp.domains.map((d) => (
                      <span key={d} className="chip chip-dot" style={{ fontSize: '.74rem' }}>{d}</span>
                    ))}
                  </div>
                </div>

                {/* Stack Tags */}
                <div className="tags timeline__stack" style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                  {exp.stack.map((s) => (
                    <span key={s} className="chip" style={{ fontSize: '.74rem' }}>{s}</span>
                  ))}
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* ── 03. EARLY FOUNDATION & ACADEMICS ───────────────────────────── */}
        <section className="section" style={{ padding: '3rem 0 2rem' }}>
          <span className="eyebrow" style={{ marginBottom: '1rem' }}>Early Foundation</span>
          <div className="card-grid card-grid--2">
            {EARLY_ROLES.map((er) => (
              <div key={er.role} className="card">
                <span className="mono timeline__early-period" style={{ fontSize: '.75rem', color: 'var(--primary)', letterSpacing: '.1em', display: 'block', marginBottom: '0.4rem' }}>
                  {er.period}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', marginBottom: '0.3rem' }}>
                  {er.role}
                </h3>
                <p className="profile__role mono" style={{ fontSize: '.8rem', color: 'var(--text-3)', marginBottom: '0.6rem' }}>
                  {er.company}
                </p>
                <p className="muted" style={{ fontSize: '.86rem', lineHeight: 1.55 }}>
                  {er.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 04. CALL TO ACTION ─────────────────────────────────────────── */}
        <section className="section" style={{ padding: '1rem 0 5rem' }}>
          <div className="psy__cta glass">
            <div>
              <span className="eyebrow" style={{ marginBottom: '0.6rem' }}>Availability</span>
              <h2 className="h-lg" style={{ marginBottom: '0.6rem' }}>
                Looking for a dedicated <span className="grad-text">DevOps Engineer?</span>
              </h2>
              <p className="lead" style={{ fontSize: '1.05rem', margin: 0 }}>
                Targeting opportunities in Delhi NCR or remote. Let's talk about how I can bring automation and reliability to your team.
              </p>
            </div>
            <div className="psy__ctabtns">
              <Link to="/contact" className="btn btn-primary">
                Get in Touch
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link to="/services" className="btn btn-ghost">
                View Services & Offerings
              </Link>
            </div>
          </div>
        </section>
      </div>
    </motion.main>
  )
}
