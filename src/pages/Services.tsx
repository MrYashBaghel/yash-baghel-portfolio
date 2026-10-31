import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const SERVICES = [
  {
    icon: '☁️',
    title: 'Cloud Infrastructure Architecture & AWS Migration',
    desc: 'Designing highly available, secure, and resilient AWS topologies (VPC, EC2, S3, RDS Multi-AZ, Lambda). Migrating legacy monolithic applications to containerized microservices on AWS EKS and GKE.',
    deliverables: ['Multi-region AWS network topology', 'VPC peering & private subnets', 'Disaster recovery & automated backups', 'High-availability database failover'],
    tags: ['AWS EKS', 'VPC Peering', 'RDS Multi-AZ', 'Lambda', 'GKE'],
  },
  {
    icon: '⚡',
    title: 'CI/CD Pipeline Design & Delivery Acceleration',
    desc: 'Transforming fragile manual release procedures into rapid, deterministic GitLab CI/CD, Jenkins, and Concourse pipelines. Enforcing automated testing, container image builds, and zero-downtime rolling deployments.',
    deliverables: ['Automated build & test stages', 'Docker container packaging', 'Zero-downtime rolling rollouts', 'Rollback triggers on health failure'],
    tags: ['GitLab CI/CD', 'Jenkins', 'Docker', 'SonarQube', 'GitOps'],
  },
  {
    icon: '📦',
    title: 'Kubernetes Container Orchestration on AWS EKS',
    desc: 'Production-grade container orchestration with Docker, Kubernetes, and Helm. Proven experience scaling MERN, MEAN, and LAMP microservices with rolling updates, HPA autoscaling, and Nginx Ingress.',
    deliverables: ['AWS EKS cluster architecture', 'Helm chart packaging', 'Nginx Ingress with ACM SSL', 'Horizontal Pod Autoscalers (HPA)'],
    tags: ['Docker', 'Kubernetes', 'Helm', 'MERN / MEAN', 'LAMP'],
  },
  {
    icon: '📜',
    title: 'Infrastructure as Code (IaC) with Terraform',
    desc: 'Codifying cloud environments with modular HashiCorp Terraform modules. Eliminating configuration drift, enabling remote state locking with DynamoDB, and building reproducible environments.',
    deliverables: ['Modular Terraform blueprints', 'State locking & remote backend', 'Drift detection & plan-apply hooks', 'Environment standardization'],
    tags: ['Terraform', 'Ansible', 'Chef', 'DynamoDB', 'State Locking'],
  },
  {
    icon: '📊',
    title: 'Observability, SRE & Telemetry Mesh',
    desc: 'Deploying end-to-end monitoring using Prometheus, Grafana, SolarWinds, and Nagios. Slashed weekly incidents from 10 down to 1-2 through predictive threshold alerting and SLI/SLO dashboards.',
    deliverables: ['Prometheus cluster metrics collection', 'Grafana operational dashboards', 'Alertmanager on-call escalation routing', 'Log aggregation with ELK'],
    tags: ['Prometheus', 'Grafana', 'Alertmanager', 'ELK', 'SolarWinds'],
  },
  {
    icon: '🔒',
    title: 'Zero-Trust Secrets & Cloud FinOps Optimization',
    desc: 'Centralizing secret lifecycle management with HashiCorp Vault and optimizing AWS cloud spend by 20-30% through rightsizing, spot instances, and open-source tooling.',
    deliverables: ['HashiCorp Vault secret storage', 'Dynamic credential rotation', 'OKTA SSO identity integration', 'AWS Cost Explorer audits'],
    tags: ['HashiCorp Vault', 'OKTA SSO', 'FinOps', 'AWS Cost Explorer', 'ServiceNow'],
  },
]

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Assess & Audit',
    desc: 'Comprehensive review of your existing cloud topology, deployment bottlenecks, security configurations, and incident histories.',
  },
  {
    step: '02',
    title: 'Architect & Codify',
    desc: 'Translating business requirements into modular Terraform blueprints, Kubernetes manifests, and hardened IAM access boundaries.',
  },
  {
    step: '03',
    title: 'Automate & Deploy',
    desc: 'Building zero-touch GitLab CI/CD pipelines with integrated static code analysis, Docker image optimization, and staged rollout verification.',
  },
  {
    step: '04',
    title: 'Observe & Optimize',
    desc: 'Establishing proactive Prometheus & Grafana telemetry meshes, automated Alertmanager routing, and continuous cost optimization.',
  },
]

export default function Services() {
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
          <span className="eyebrow">Capabilities & Offerings</span>
          <h1 className="display" style={{ marginBottom: '0.6rem' }}>
            Ways we can <span className="grad-text">work together.</span>
          </h1>
          <p className="lead" style={{ maxWidth: '68ch' }}>
            DevOps automation, cloud architecture, and site reliability engineering — whether you are setting up AWS cloud-native environments from scratch or modernizing mature enterprise systems.
          </p>
        </div>

        {/* ── 02. SERVICES GRID ──────────────────────────────────────────── */}
        <section className="section" style={{ padding: '1rem 0 3.5rem' }}>
          <div className="services__grid card-grid card-grid--3">
            {SERVICES.map((s) => (
              <article key={s.title} className="card services__card">
                <span className="icon-badge" style={{ fontSize: '1.25rem' }}>
                  {s.icon}
                </span>

                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.18rem', letterSpacing: '-0.02em', marginBottom: '0.6rem' }}>
                  {s.title}
                </h3>

                <p className="muted" style={{ fontSize: '.88rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                  {s.desc}
                </p>

                {/* Deliverables List */}
                <div style={{ marginBottom: '1.2rem', borderTop: '1px solid var(--border)', paddingTop: '0.9rem' }}>
                  <span className="mono" style={{ fontSize: '.68rem', color: 'var(--primary)', letterSpacing: '.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                    Key Deliverables
                  </span>
                  <ul className="list-check" style={{ gap: '0.45rem' }}>
                    {s.deliverables.map((d, di) => (
                      <li key={di} style={{ fontSize: '.8rem', color: 'var(--text-2)' }}>{d}</li>
                    ))}
                  </ul>
                </div>

                <div className="tags" style={{ marginTop: 'auto' }}>
                  {s.tags.map((t) => (
                    <span key={t} className="chip" style={{ fontSize: '.72rem' }}>{t}</span>
                  ))}
                </div>

                <span className="services__arrow" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </span>
              </article>
            ))}
          </div>
        </section>

        {/* ── 03. 4-STEP PROCESS WORKFLOW ────────────────────────────────── */}
        <section className="section" style={{ padding: '1rem 0 3.5rem' }}>
          <span className="eyebrow" style={{ marginBottom: '0.8rem' }}>Delivery Workflow</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', letterSpacing: '-0.025em', marginBottom: '1.8rem' }}>
            Structured 4-step engineering process
          </h2>

          <div className="services__process">
            {PROCESS_STEPS.map((ps) => (
              <div key={ps.step} className="services__processcard">
                <span className="services__processstep mono">{ps.step}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', margin: '.6rem 0 .5rem' }}>
                  {ps.title}
                </h3>
                <p className="muted" style={{ fontSize: '.88rem', lineHeight: 1.6 }}>
                  {ps.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 04. CALL TO ACTION ─────────────────────────────────────────── */}
        <section className="section" style={{ padding: '1rem 0 5rem' }}>
          <div className="services__cta glass">
            <div>
              <span className="eyebrow" style={{ marginBottom: '0.6rem' }}>Ready to Scale</span>
              <h2 className="h-lg" style={{ marginBottom: '0.6rem' }}>
                Let's modernize your <span className="grad-text">cloud delivery pipeline.</span>
              </h2>
              <p className="lead" style={{ fontSize: '1.05rem', margin: 0 }}>
                Targeting DevOps Engineer roles in Delhi NCR and remote. Let's discuss your roadmap.
              </p>
            </div>
            <Link to="/contact" className="btn btn-primary">
              Schedule a Discussion
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </section>
      </div>
    </motion.main>
  )
}
