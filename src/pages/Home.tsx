import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import ThreeHeroCanvas from '../components/ThreeHeroCanvas'
import SideSceneRail from '../components/SideSceneRail'
import Counter from '../components/Counter'

/* ─── Stats / KPIs ──────────────────────────────────────────────────────── */
const KPIS = [
  { value: 5, suffix: '+ Yrs', label: 'DevOps & Cloud Experience', sub: 'AWS, Kubernetes & Terraform' },
  { value: 75, suffix: '%', label: 'Faster Deployments', sub: 'Cut cycle from 7-8h down to 2h' },
  { value: 85, suffix: '%', label: 'Downtime Incident Reduction', sub: 'From 10/wk down to 1-2 incidents' },
  { value: 30, prefix: '20-', suffix: '%', label: 'Cloud Cost Optimization', sub: 'Rightsizing & Open-source tooling' },
]

/* ─── Core Skill Groups with Exact Tags ──────────────────────────────────── */
const SKILL_GROUPS = [
  {
    group: 'Cloud Platforms',
    items: ['AWS (EC2, S3, RDS, Lambda, VPC)', 'AWS EKS', 'GKE', 'Multi-AZ Architecture', 'IAM Policies', 'CloudWatch'],
  },
  {
    group: 'DevOps Tools & IaC Automation',
    items: ['Terraform', 'GitLab CI/CD', 'Jenkins', 'Ansible', 'Chef', 'Git', 'Concourse', 'Shell Scripting'],
  },
  {
    group: 'Containerization & Orchestration',
    items: ['Docker', 'Kubernetes', 'Helm', 'Vagrant', 'MERN Stack on K8s', 'MEAN Stack on K8s', 'LAMP on K8s'],
  },
  {
    group: 'Monitoring & Site Reliability (SRE)',
    items: ['Prometheus', 'Grafana', 'SolarWinds', 'Nagios', 'ELK Stack', 'SLI / SLO Telemetry'],
  },
  {
    group: 'Security, Secrets & Governance',
    items: ['HashiCorp Vault', 'OKTA SSO', 'ServiceNow ITSM', 'JIRA Agile', 'Role-Based Access Control (RBAC)'],
  },
  {
    group: 'Web Servers, Networking & OS',
    items: ['Nginx', 'Apache', 'Ubuntu Linux', 'VPC Peering', 'Load Balancing', 'Disaster Recovery & Backup'],
  },
]

/* ─── Core Competencies ─────────────────────────────────────────────────── */
const COMPETENCIES = [
  'Cloud Infrastructure Management',
  'DevOps Automation',
  'Infrastructure as Code (IaC)',
  'IT Service Management',
  'Containerization & Orchestration',
  'Cloud Architecture Design',
  'Disaster Recovery & Backup',
  'Load Balancing & Traffic Management',
  'Application Deployment',
  'Scripting & Automation',
  'Security & Access Management',
]

/* ─── Architectural Pillars ─────────────────────────────────────────────── */
const PILLARS = [
  {
    icon: '☁️',
    title: 'Cloud Infrastructure & AWS',
    desc: 'Architecting high-availability cloud environments on AWS (EC2, S3, RDS, Lambda, VPC, EKS) and GKE with multi-region failover and security baselines.',
    tags: ['AWS EKS', 'VPC Peering', 'RDS Multi-AZ', 'Lambda', 'GKE'],
  },
  {
    icon: '⚡',
    title: 'CI/CD Pipeline Automation',
    desc: 'Designing zero-touch automated delivery pipelines using GitLab CI/CD, Jenkins, and Concourse. Accelerated release velocity by 75% with automated testing gates.',
    tags: ['GitLab CI/CD', 'Jenkins', 'Concourse', 'GitOps', 'Shell Scripting'],
  },
  {
    icon: '📦',
    title: 'Containerization & Kubernetes',
    desc: 'Production-grade container orchestration with Docker, Kubernetes, and Helm. Proven experience scaling MERN, MEAN, and LAMP microservices with rolling updates.',
    tags: ['Docker', 'Kubernetes', 'Helm', 'MERN / MEAN', 'LAMP'],
  },
  {
    icon: '📜',
    title: 'Infrastructure as Code (IaC)',
    desc: 'Declarative infrastructure provisioning with HashiCorp Terraform, Ansible, and Chef. Enabling reproducible, drift-free environments and automated state management.',
    tags: ['Terraform', 'Ansible', 'Chef', 'Modular IaC'],
  },
  {
    icon: '📊',
    title: 'Observability & Monitoring',
    desc: 'Comprehensive telemetry and alert meshes using Prometheus, Grafana, SolarWinds, and Nagios. Proactive monitoring that reduced weekly incidents from 10 to 1-2.',
    tags: ['Prometheus', 'Grafana', 'Alertmanager', 'Nagios', 'ELK'],
  },
  {
    icon: '🔒',
    title: 'Security, Secrets & Identity',
    desc: 'Enterprise secret lifecycle management with HashiCorp Vault. Centralized authentication with OKTA SSO, paired with ServiceNow and JIRA workflows for Agile IT governance.',
    tags: ['HashiCorp Vault', 'OKTA', 'ServiceNow', 'JIRA'],
  },
]

/* ─── Featured Architecture Implementations ─────────────────────────────── */
const ARCHITECTURE_PROJECTS = [
  {
    title: 'Enterprise AWS EKS Kubernetes Cluster Orchestration',
    type: 'Cloud Architecture · Maven Wave',
    description: 'Architected and deployed production Kubernetes clusters on AWS EKS supporting MERN, MEAN, and LAMP stack workloads. Configured ingress controllers, Horizontal Pod Autoscalers (HPA), and persistent storage with zero-downtime rolling upgrades.',
    stack: ['AWS EKS', 'Kubernetes', 'Docker', 'Helm', 'Nginx Ingress', 'CloudWatch'],
    accent: 'var(--grad-brand)',
  },
  {
    title: 'Multi-Environment Automated Terraform IaC Framework',
    type: 'Infrastructure as Code · Maven Wave & Stefanini',
    description: 'Provisioned enterprise cloud topologies (VPC, private subnets, security groups, RDS databases, S3 buckets, and IAM policies) using modular Terraform. Enforced remote state locking with DynamoDB and automated plan-apply checks.',
    stack: ['Terraform', 'AWS VPC', 'IAM', 'RDS Multi-AZ', 'S3', 'DynamoDB'],
    accent: 'var(--grad-accent)',
  },
  {
    title: 'High-Velocity GitLab CI/CD Pipeline Modernization',
    type: 'Automation & Delivery · Maven Wave',
    description: 'Re-engineered monolithic build and release pipelines into optimized GitLab CI/CD stages. Slashed end-to-end deployment runtime from 7-8 hours to 2 hours with automated linting, test suites, container builds, and deployment gates.',
    stack: ['GitLab CI/CD', 'Docker', 'Bash / Shell', 'SonarQube', 'OKTA SSO'],
    accent: 'linear-gradient(120deg, var(--neon-coral), var(--neon-violet))',
  },
  {
    title: 'Full-Stack Observability Mesh with Prometheus & Grafana',
    type: 'Site Reliability Engineering',
    description: 'Designed and deployed an enterprise monitoring strategy tracking node metrics, pod health, and error budgets. Slashed system downtime from 10 incidents/week down to 1-2 through predictive threshold alerts.',
    stack: ['Prometheus', 'Grafana', 'SolarWinds', 'Nagios', 'ServiceNow', 'Slack Webhooks'],
    accent: 'linear-gradient(120deg, var(--neon-teal), var(--primary))',
  },
]

/* ─── Certifications ─────────────────────────────────────────────────────── */
const CERTS = [
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    code: 'AWS-CCP',
    type: 'aws',
    desc: 'Validated expertise in overall AWS Cloud concepts, architecture, security, compliance, core services, and billing models.',
  },
  {
    name: 'HashiCorp Certified: Terraform Associate',
    issuer: 'HashiCorp',
    code: 'TA-003',
    type: 'hashi',
    desc: 'Demonstrated command of Infrastructure as Code principles, Terraform CLI, modules, state management, and enterprise cloud provisioning.',
  },
]

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  return (
    <motion.main
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* 3D Kinetic Background with 5-Waypoint Camera Rail */}
      <ThreeHeroCanvas theme="dark" />

      {/* Floating Side Rail for smooth scene navigation */}
      <SideSceneRail />

      {/* ── 01. HERO SECTION ────────────────────────────────────────────── */}
      <section
        id="hero"
        ref={heroRef}
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          paddingBottom: '4rem',
        }}
      >
        <motion.div
          className="container"
          style={{ y: heroY, opacity: heroOpacity, position: 'relative', zIndex: 2 }}
        >
          {/* Status Badge */}
          <motion.div
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.4rem' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="glow-dot" />
            <span className="chip chip-dot">
              <span className="mono" style={{ fontSize: '.74rem', color: 'var(--text-2)', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                Open to DevOps Opportunities · Delhi NCR / Remote
              </span>
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="display"
            style={{
              marginBottom: '1.2rem',
              maxWidth: '16ch',
            }}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Yash Baghel
            <br />
            <span className="gradient-text">Cloud & DevOps</span>
            <br />
            Engineer
          </motion.h1>

          {/* Subtitle / Objective */}
          <motion.p
            className="lead"
            style={{ marginBottom: '2.2rem', maxWidth: '58ch' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Certified <strong>AWS Cloud Practitioner</strong> & <strong>HashiCorp Terraform Associate</strong> with nearly 5 years of experience automating scalable cloud infrastructure, orchestrating Kubernetes on AWS EKS, and building high-velocity CI/CD pipelines.
          </motion.p>

          {/* CTA Actions */}
          <motion.div
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <a href="#about" className="btn btn-primary">
              View Profile & Skills
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>

            <a href="#experience" className="btn btn-ghost">
              Explore Work Experience
            </a>

            <a href="mailto:yash.baghel@outlook.com" className="btn btn-ghost" style={{ color: 'var(--text-2)' }}>
              yash.baghel@outlook.com
            </a>
          </motion.div>

          {/* Interactive 3D Model Hint */}
          <motion.div
            style={{ marginTop: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span style={{ fontSize: '.78rem', color: 'var(--accent)', background: 'var(--surface-2)', padding: '.35rem .8rem', borderRadius: '99px', border: '1px solid var(--border-strong)', display: 'inline-flex', alignItems: 'center', gap: '.4rem' }}>
              <span>🧍 3D Avatar:</span>
              <span style={{ color: 'var(--text-2)' }}>Move mouse to track gaze · Scroll down to orbit the camera!</span>
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll down indicator */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
            zIndex: 2,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <span className="mono" style={{ fontSize: '.65rem', color: 'var(--text-3)', letterSpacing: '.14em', textTransform: 'uppercase' }}>scroll</span>
          <motion.div
            style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, var(--primary), transparent)' }}
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>

      {/* ── 02. KPI / METRICS STATS ─────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
        <div className="container">
          <div className="grid grid-4">
            {KPIS.map((kpi, i) => (
              <motion.div
                key={kpi.label}
                className="card kpi"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="kpi__value gradient-text">
                  <Counter value={kpi.value} prefix={kpi.prefix} suffix={kpi.suffix} />
                </div>
                <div className="kpi__label">{kpi.label}</div>
                <div className="kpi__sub">{kpi.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <hr className="hr" />

      {/* ── 03. PROFILE SUMMARY & COMPREHENSIVE SKILL TAGS ──────────────── */}
      <section id="about" className="section">
        <div className="container">
          <SectionHeading
            label="Profile & Technical Summary"
            title="Engineering Cloud Infrastructure & Automation"
            subtitle="Certified AWS Cloud Practitioner & HashiCorp Terraform Associate with nearly 5 years of experience."
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {/* Left Column: Executive Summary & Core Competencies */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
              <div className="card" style={{ padding: '2rem' }}>
                <span className="mono" style={{ fontSize: '.72rem', color: 'var(--primary)', letterSpacing: '.12em', textTransform: 'uppercase' }}>
                  Job Objective & Focus
                </span>
                <h3 style={{ fontSize: '1.25rem', letterSpacing: '-0.02em', margin: '0.4rem 0 1rem' }}>
                  DevOps Opportunities · Delhi NCR / Remote
                </h3>
                <p style={{ color: 'var(--text-2)', fontSize: '.92rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                  Targeting DevOps engineering roles to leverage deep expertise in <strong>Cloud Infrastructure</strong>, <strong>DevOps Automation</strong>, and <strong>CI/CD Pipelines</strong>. Skilled in AWS, Docker, Kubernetes, Terraform, and Jenkins, with proven capability in Security Integration and Monitoring using ServiceNow and JIRA.
                </p>
                <p style={{ color: 'var(--text-2)', fontSize: '.92rem', lineHeight: 1.75 }}>
                  Currently working as <strong>DevOps Engineer at Maven Wave</strong>, leading cloud-based application deployment, Kubernetes container orchestration, and continuous infrastructure automation.
                </p>
              </div>

              {/* Core Competencies Tag Cloud */}
              <div className="card" style={{ padding: '1.8rem' }}>
                <span className="mono" style={{ fontSize: '.72rem', color: 'var(--accent)', letterSpacing: '.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.8rem' }}>
                  Core Competencies
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {COMPETENCIES.map(comp => (
                    <span key={comp} className="chip chip-dot" style={{ fontSize: '.78rem' }}>
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Academic Foundation Card */}
              <div className="card" style={{ padding: '1.6rem' }}>
                <span className="mono" style={{ fontSize: '.72rem', color: 'var(--text-3)', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                  Academic Foundation
                </span>
                <h4 style={{ fontSize: '1.1rem', letterSpacing: '-0.02em', marginTop: '0.3rem' }}>
                  B.Tech. in Computer Science Engineering
                </h4>
                <p style={{ color: 'var(--text-2)', fontSize: '.88rem', marginTop: '0.2rem' }}>
                  Manav Rachna College of Engineering, Faridabad · Graduated 2020
                </p>
              </div>
            </div>

            {/* Right Column: Categorized Technical Skill Groups */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              {SKILL_GROUPS.map((sg, i) => (
                <motion.div
                  key={sg.group}
                  className="card"
                  style={{ padding: '1.4rem 1.6rem' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                    <h4 style={{ fontSize: '.96rem', letterSpacing: '-0.01em', fontWeight: 600 }}>{sg.group}</h4>
                    <span className="mono" style={{ fontSize: '.68rem', color: 'var(--text-3)' }}>{sg.items.length} skills</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {sg.items.map(item => (
                      <span key={item} className="chip" style={{ fontSize: '.74rem', padding: '.25rem .65rem' }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="hr" />

      {/* ── 04. CORE ARCHITECTURE PILLARS ───────────────────────────────── */}
      <section id="pillars" className="section">
        <div className="container">
          <SectionHeading
            label="Domain Pillars"
            title="System Capabilities & Practice Areas"
            subtitle="Engineered for high availability, security governance, automated delivery, and cloud cost efficiency."
          />

          <div className="grid grid-3">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                className="card pillar-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="pillar-card__icon">{pillar.icon}</div>
                <h3 style={{ fontSize: '1.18rem', letterSpacing: '-0.02em', marginTop: '0.4rem' }}>{pillar.title}</h3>
                <p style={{ color: 'var(--text-2)', fontSize: '.88rem', lineHeight: 1.65 }}>{pillar.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: 'auto' }}>
                  {pillar.tags.map(tag => (
                    <span key={tag} className="chip" style={{ fontSize: '.72rem', padding: '.25rem .65rem' }}>{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <hr className="hr" />

      {/* ── 05. WORK EXPERIENCE TIMELINE ─────────────────────────────────── */}
      <section id="experience" className="section">
        <div className="container">
          <SectionHeading
            label="Career Trajectory"
            title="Work Experience"
            subtitle="Hands-on DevOps engineering and cloud infrastructure leadership."
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Maven Wave */}
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ borderLeft: '3px solid var(--primary)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '0.8rem' }}>
                <div>
                  <span className="mono" style={{ fontSize: '.72rem', color: 'var(--primary)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Present Role</span>
                  <h3 style={{ fontSize: '1.35rem', letterSpacing: '-0.02em', marginTop: '0.2rem' }}>Associate Consultant (DevOps Engineer)</h3>
                  <p style={{ color: 'var(--text)', fontWeight: 600, fontSize: '.95rem' }}>Maven Wave · Gurugram, India</p>
                </div>
                <span className="chip" style={{ background: 'var(--surface-2)' }}>Since May 2022 — Present</span>
              </div>

              <p style={{ color: 'var(--text-2)', fontSize: '.92rem', lineHeight: 1.65, marginBottom: '1.2rem' }}>
                Leading cloud-based application deployment, Kubernetes container orchestration, and continuous automation. Driving operational resilience and cloud cost optimization across mission-critical services.
              </p>

              <div style={{ background: 'var(--surface)', padding: '1.2rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.2rem' }}>
                <strong style={{ fontSize: '.84rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.06em', display: 'block', marginBottom: '0.6rem' }}>Key Result Areas & Achievements</strong>
                <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-2)', fontSize: '.88rem', lineHeight: 1.7 }}>
                  <li><strong>Kubernetes Orchestration:</strong> Managing Docker containers on AWS EKS to ensure application scalability, self-healing, and peak performance.</li>
                  <li><strong>Infrastructure as Code:</strong> Automated AWS infrastructure provisioning with Terraform, standardizing multi-tier environments and eliminating configuration drift.</li>
                  <li><strong>CI/CD Optimization:</strong> Streamlined GitLab CI/CD pipelines, slashing release deployment turnaround times from 7-8 hours to 2 hours with automated testing.</li>
                  <li><strong>Multi-Stack Delivery:</strong> Deployed high-scale MERN, MEAN, and LAMP stacks on Kubernetes with rolling zero-downtime releases.</li>
                  <li><strong>Observability & SRE:</strong> Configured Prometheus and Grafana monitoring meshes; reduced system downtime incidents from 10/week down to 1-2.</li>
                  <li><strong>Cloud Economics:</strong> Integrated cost-effective AWS services and open-source DevOps tooling, securing a 20-30% infrastructure cost reduction.</li>
                  <li><strong>Security & Workflows:</strong> Integrated OKTA authentication and JIRA for Agile project tracking and cross-functional team delivery.</li>
                </ul>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {['AWS EKS', 'Kubernetes', 'Terraform', 'Docker', 'GitLab CI/CD', 'Prometheus', 'Grafana', 'OKTA', 'JIRA', 'MERN / MEAN', 'Cost Optimization'].map(t => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </motion.div>

            {/* Stefanini */}
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ borderLeft: '3px solid var(--neon-teal)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '0.8rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.35rem', letterSpacing: '-0.02em' }}>Network Engineer</h3>
                  <p style={{ color: 'var(--text)', fontWeight: 600, fontSize: '.95rem' }}>Stefanini · Noida, India</p>
                </div>
                <span className="chip" style={{ background: 'var(--surface-2)' }}>April 2021 — April 2022</span>
              </div>

              <div style={{ background: 'var(--surface)', padding: '1.2rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.2rem' }}>
                <strong style={{ fontSize: '.84rem', color: 'var(--neon-teal)', textTransform: 'uppercase', letterSpacing: '.06em', display: 'block', marginBottom: '0.6rem' }}>Key Result Areas & Achievements</strong>
                <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-2)', fontSize: '.88rem', lineHeight: 1.7 }}>
                  <li>Managed and tuned AWS cloud infrastructure across EC2, S3, RDS, Lambda, and VPC for peak performance and 99.9% uptime.</li>
                  <li>Leveraged Terraform to codify and automate cloud resource provisioning.</li>
                  <li>Managed enterprise secrets with HashiCorp Vault to secure access to tokens, certificates, and API keys.</li>
                  <li>Configured CI/CD pipelines using Jenkins and Concourse with automated Shell scripting.</li>
                  <li>Integrated ServiceNow for IT service management and JIRA for proactive issue tracking.</li>
                </ul>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {['AWS EC2/S3/RDS/VPC', 'Terraform', 'HashiCorp Vault', 'Jenkins', 'Concourse', 'Docker', 'Chef', 'Shell Scripting', 'ServiceNow'].map(t => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <hr className="hr" />

      {/* ── 06. ARCHITECTURAL DEPLOYMENTS & PROJECTS ─────────────────────── */}
      <section id="projects" className="section">
        <div className="container">
          <SectionHeading
            label="Infrastructure In Action"
            title="Selected Cloud Deployments"
            subtitle="Real-world implementations of cloud architectures, automation workflows, and observability meshes."
          />

          <div className="grid grid-2">
            {ARCHITECTURE_PROJECTS.map((project, i) => (
              <motion.div
                key={project.title}
                className="card"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div style={{
                  height: 4,
                  borderRadius: 99,
                  background: project.accent,
                  marginBottom: '1.4rem',
                  marginInline: '-1.6rem',
                  marginTop: '-1.6rem',
                }} />

                <span className="mono" style={{ fontSize: '.7rem', color: 'var(--text-3)', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                  {project.type}
                </span>
                <h3 style={{ fontSize: '1.25rem', letterSpacing: '-0.02em', margin: '0.4rem 0 0.8rem' }}>
                  {project.title}
                </h3>
                <p style={{ color: 'var(--text-2)', fontSize: '.88rem', lineHeight: 1.65, marginBottom: '1.2rem' }}>
                  {project.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: 'auto' }}>
                  {project.stack.map(s => (
                    <span key={s} className="chip" style={{ fontSize: '.72rem' }}>{s}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
            <Link to="/projects" className="btn btn-ghost">
              Explore All Architecture Specs
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <hr className="hr" />

      {/* ── 07. CERTIFICATIONS & CREDENTIALS ─────────────────────────────── */}
      <section id="certifications" className="section">
        <div className="container">
          <SectionHeading
            label="Verified Credentials"
            title="Certifications & Education"
            subtitle="Industry-standard validations in Cloud Architecture and Infrastructure as Code."
          />

          <div className="grid grid-2" style={{ marginBottom: '2.5rem' }}>
            {CERTS.map((cert, i) => (
              <motion.div
                key={cert.name}
                className={`card cert-card cert-card--${cert.type}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="cert-card__badge">{cert.type === 'aws' ? 'AWS' : 'TF'}</div>
                <div>
                  <span className="mono" style={{ fontSize: '.72rem', color: 'var(--primary)', letterSpacing: '.08em', textTransform: 'uppercase' }}>{cert.issuer}</span>
                  <h3 style={{ fontSize: '1.2rem', letterSpacing: '-0.02em', margin: '0.2rem 0 0.4rem' }}>{cert.name}</h3>
                  <p style={{ color: 'var(--text-2)', fontSize: '.86rem', lineHeight: 1.55 }}>{cert.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Education Card */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}
          >
            <div>
              <span className="mono" style={{ fontSize: '.72rem', color: 'var(--text-3)', letterSpacing: '.08em', textTransform: 'uppercase' }}>Academic Foundation</span>
              <h3 style={{ fontSize: '1.2rem', letterSpacing: '-0.02em', marginTop: '0.2rem' }}>B.Tech. in Computer Science Engineering</h3>
              <p style={{ color: 'var(--text-2)', fontSize: '.9rem' }}>Manav Rachna College of Engineering, Faridabad</p>
            </div>
            <span className="chip">Graduated 2020</span>
          </motion.div>
        </div>
      </section>

      <hr className="hr" />

      {/* ── 08. CONTACT SECTION ──────────────────────────────────────────── */}
      <section id="contact" className="section">
        <div className="container center" style={{ maxWidth: 740 }}>
          <SectionHeading
            label="Get in Touch"
            title="Let's build reliable cloud infrastructure"
            subtitle="Targeting DevOps and Cloud Engineering roles in Delhi NCR or remote. Let's discuss how I can scale your cloud delivery."
            center
          />

          <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', textAlign: 'left', marginBottom: '2rem' }}>
              <div>
                <span className="mono" style={{ fontSize: '.72rem', color: 'var(--text-3)', textTransform: 'uppercase' }}>Email</span>
                <p style={{ fontWeight: 600, fontSize: '.95rem', marginTop: '0.3rem' }}>
                  <a href="mailto:yash.baghel@outlook.com" style={{ color: 'var(--primary)' }}>yash.baghel@outlook.com</a>
                </p>
              </div>

              <div>
                <span className="mono" style={{ fontSize: '.72rem', color: 'var(--text-3)', textTransform: 'uppercase' }}>Location</span>
                <p style={{ fontWeight: 600, fontSize: '.95rem', marginTop: '0.3rem' }}>Noida, Uttar Pradesh, 201301</p>
              </div>

              <div>
                <span className="mono" style={{ fontSize: '.72rem', color: 'var(--text-3)', textTransform: 'uppercase' }}>Availability</span>
                <p style={{ fontWeight: 600, fontSize: '.95rem', marginTop: '0.3rem', color: 'var(--accent)' }}>Immediate / Standard Notice</p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="mailto:yash.baghel@outlook.com" className="btn btn-primary">
                Send an Email
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>

              <a href="#experience" className="btn btn-ghost">
                Review Career Experience
              </a>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  )
}
