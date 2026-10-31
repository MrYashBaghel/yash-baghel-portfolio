import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const SKILL_GROUPS = [
  {
    group: 'Cloud Platforms',
    items: ['AWS (EC2, S3, RDS, Lambda, VPC)', 'AWS EKS', 'GKE', 'Multi-AZ Deployments', 'IAM Policies', 'CloudWatch'],
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

const STATS = [
  { value: '5+', label: 'Years Experience', sub: 'DevOps & Cloud Systems' },
  { value: '75%', label: 'Faster Deployments', sub: '7-8h cut down to 2h' },
  { value: '85%', label: 'Downtime Slashed', sub: 'From 10/wk down to 1-2' },
  { value: '20-30%', label: 'Cost Reduction', sub: 'AWS Rightsizing' },
]

const RECOGNITION = [
  { value: 'AWS-CCP', label: 'Certified Cloud Practitioner', source: 'Amazon Web Services' },
  { value: 'TA-003', label: 'Terraform Associate', source: 'HashiCorp' },
  { value: '75% ↑', label: 'Pipeline Velocity', source: 'Maven Wave GitLab CI/CD' },
  { value: 'EKS Prod', label: 'Production K8s Clusters', source: 'MERN / MEAN / LAMP' },
]

const PILLARS = [
  {
    title: 'High-Availability Cloud Architecture',
    desc: 'Engineering fault-tolerant multi-region and multi-AZ environments on AWS (EC2, S3, RDS, Lambda, VPC) and GKE with automated failover and zero single point of failure.',
  },
  {
    title: 'Immutable Infrastructure as Code',
    desc: 'Codifying enterprise cloud topologies using modular HashiCorp Terraform and Ansible with remote DynamoDB state locking and strict security baselines.',
  },
  {
    title: 'Automated CI/CD & Production Reliability',
    desc: 'Designing end-to-end zero-touch delivery pipelines with GitLab CI/CD, Jenkins, Docker packaging, and proactive Prometheus & Grafana alerting.',
  },
]

export default function Profile() {
  return (
    <motion.main
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container">
        {/* ── 01. PROFILE HEAD ────────────────────────────────────────────── */}
        <section className="profile__head page-head">
          <div className="profile__intro scrim">
            <span className="eyebrow">Profile · Executive Overview</span>
            <h1 className="display profile__name">
              Yash <span className="grad-text">Baghel</span>
            </h1>
            <p className="profile__role mono">DevOps Engineer · Cloud Infrastructure & Automation Specialist</p>
            <p className="lead profile__para">
              Certified <strong>AWS Cloud Practitioner</strong> and <strong>HashiCorp Terraform Associate</strong> with nearly 5 years of experience leading cloud infrastructure automation, Kubernetes orchestration, and resilient CI/CD delivery pipelines.
            </p>
            <div className="profile__actions">
              <Link to="/contact" className="btn btn-primary">
                Get in Touch
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link to="/experience" className="btn btn-ghost">
                View Career Experience
              </Link>
            </div>
          </div>

          {/* Key Achievements Grid */}
          <div className="profile__recog">
            {RECOGNITION.map((rec) => (
              <div key={rec.label} className="profile__recogcard glass">
                <span className="kpi__value" style={{ fontSize: '1.45rem' }}>{rec.value}</span>
                <span style={{ fontSize: '.88rem', fontWeight: 600 }}>{rec.label}</span>
                <em className="mono" style={{ color: 'var(--text-3)', fontSize: '.72rem', fontStyle: 'normal' }}>{rec.source}</em>
              </div>
            ))}
          </div>
        </section>

        {/* ── 02. STATS ROW ──────────────────────────────────────────────── */}
        <div className="profile__stats">
          {STATS.map((s) => (
            <div key={s.label} className="profile__stat">
              <span className="kpi__value">{s.value}</span>
              <span className="kpi__label" style={{ fontWeight: 600 }}>{s.label}</span>
              <span className="kpi__sub mono">{s.sub}</span>
            </div>
          ))}
        </div>

        {/* ── 03. EXECUTIVE SUMMARY & DOMAINS ───────────────────────────── */}
        <section className="section" style={{ padding: '3.5rem 0 2rem' }}>
          <div className="profile__summary">
            <span className="eyebrow">Professional Philosophy</span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', letterSpacing: '-0.025em' }}>
              Building reproducible, self-healing cloud ecosystems.
            </h2>
            <p className="lead profile__para">
              Currently driving infrastructure modernization as <strong>DevOps Engineer at Maven Wave (an Atos Company)</strong>. I specialize in bridging software development and enterprise IT operations—eliminating deployment friction, locking down infrastructure with immutable code, and establishing proactive observability meshes.
            </p>
            <p className="profile__para" style={{ color: 'var(--text-2)', lineHeight: 1.75 }}>
              My core background spans high-velocity GitLab CI/CD pipeline automation, orchestrating microservices on AWS EKS with Docker and Helm, and provisioning enterprise cloud topologies across AWS EC2, S3, RDS Multi-AZ, Lambda, and VPC with modular HashiCorp Terraform.
            </p>
          </div>

          <div style={{ marginTop: '2.5rem' }}>
            <span className="mono" style={{ fontSize: '.72rem', color: 'var(--text-3)', letterSpacing: '.12em', textTransform: 'uppercase', display: 'block', marginBottom: '0.8rem' }}>
              Core Competencies & Capabilities
            </span>
            <div className="tags">
              {COMPETENCIES.map((c) => (
                <span key={c} className="chip chip-dot">{c}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── 04. ARCHITECTURAL PILLARS ──────────────────────────────────── */}
        <section className="section" style={{ padding: '2rem 0 3.5rem' }}>
          <span className="eyebrow" style={{ marginBottom: '1.2rem' }}>Engineering Focus</span>
          <div className="card-grid card-grid--3">
            {PILLARS.map((p) => (
              <div key={p.title} className="card">
                <h3 className="profile__pillarh" style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '0.6rem' }}>
                  {p.title}
                </h3>
                <p className="muted" style={{ fontSize: '.9rem', lineHeight: 1.65 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 05. TECHNICAL TOOLCHAIN MATRIX ─────────────────────────────── */}
        <section className="section" style={{ padding: '2rem 0 3.5rem' }}>
          <span className="eyebrow" style={{ marginBottom: '1.2rem' }}>Technical Mastery</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginBottom: '1.6rem', letterSpacing: '-0.02em' }}>
            Comprehensive Skills & Toolchain
          </h2>
          <div className="profile__skills">
            {SKILL_GROUPS.map((sg) => (
              <div key={sg.group} className="card profile__skillcard">
                <h3 className="profile__skillhead" style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginBottom: '0.9rem', color: 'var(--text)' }}>
                  {sg.group}
                </h3>
                <div className="tags">
                  {sg.items.map((item) => (
                    <span key={item} className="chip" style={{ fontSize: '.76rem' }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 06. TRIPLE CARD SECTION (LANGUAGES, EDUCATION, CERTS) ─────── */}
        <section className="section" style={{ padding: '2rem 0 5rem' }}>
          <div className="profile__triple">
            {/* Languages */}
            <div className="card">
              <span className="eyebrow" style={{ marginBottom: '0.8rem' }}>Communication</span>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '1.2rem' }}>Languages</h3>
              <div className="profile__langs">
                <div>
                  <div className="lang__row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '.92rem' }}>English</span>
                    <span className="mono" style={{ fontSize: '.78rem', color: 'var(--text-3)' }}>Full Professional</span>
                  </div>
                  <div style={{ height: 4, background: 'var(--surface-2)', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ width: '92%', height: '100%', background: 'var(--grad-brand)' }} />
                  </div>
                </div>

                <div>
                  <div className="lang__row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '.92rem' }}>Hindi</span>
                    <span className="mono" style={{ fontSize: '.78rem', color: 'var(--text-3)' }}>Native</span>
                  </div>
                  <div style={{ height: 4, background: 'var(--surface-2)', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ width: '100%', height: '100%', background: 'var(--grad-brand)' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="card profile__edu">
              <span className="eyebrow" style={{ marginBottom: '0.8rem' }}>Academic</span>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.6rem' }}>Education</h3>
              <p className="profile__role mono" style={{ color: 'var(--primary)', fontSize: '.78rem', marginBottom: '0.4rem' }}>
                Graduated 2020
              </p>
              <h4 style={{ fontSize: '1.02rem', marginBottom: '0.3rem' }}>B.Tech. in Computer Science Engineering</h4>
              <p className="muted" style={{ fontSize: '.86rem', lineHeight: 1.5 }}>
                Manav Rachna College of Engineering, Faridabad, Haryana
              </p>
            </div>

            {/* Certifications */}
            <div className="card profile__pub">
              <span className="eyebrow" style={{ marginBottom: '0.8rem' }}>Credentials</span>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.6rem' }}>Certifications</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                <div>
                  <span className="mono" style={{ color: '#ff9900', fontSize: '.74rem', textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 600 }}>
                    AWS-CCP
                  </span>
                  <h4 style={{ fontSize: '.95rem', margin: '0.1rem 0' }}>AWS Certified Cloud Practitioner</h4>
                  <p className="muted" style={{ fontSize: '.78rem' }}>Amazon Web Services</p>
                </div>
                <div>
                  <span className="mono" style={{ color: '#9d82ff', fontSize: '.74rem', textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 600 }}>
                    TA-003
                  </span>
                  <h4 style={{ fontSize: '.95rem', margin: '0.1rem 0' }}>HashiCorp Certified: Terraform Associate</h4>
                  <p className="muted" style={{ fontSize: '.78rem' }}>HashiCorp</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </motion.main>
  )
}
