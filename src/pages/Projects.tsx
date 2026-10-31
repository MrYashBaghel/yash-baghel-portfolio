import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const PROJECTS = [
  {
    id: 'eks-k8s-platform',
    no: '01',
    year: '2022 — Present',
    tag: 'Kubernetes & AWS EKS',
    title: 'Enterprise Multi-Stack Kubernetes Platform on AWS EKS',
    client: 'Maven Wave (an Atos Company)',
    summary: 'Orchestrated containerized microservices for MERN, MEAN, and LAMP stacks on AWS EKS. Designed Helm charts, Nginx Ingress with ACM SSL, and HPA auto-scaling to achieve zero-downtime rolling updates.',
    kpis: [
      { value: 'Zero', label: 'Downtime Rollouts' },
      { value: '3 Stacks', label: 'MERN, MEAN & LAMP' },
      { value: 'Multi-AZ', label: 'EKS Worker Topology' },
    ],
    stack: ['AWS EKS', 'Kubernetes', 'Helm', 'Docker', 'AWS VPC', 'Nginx Ingress'],
    accent: '#14d6c4',
  },
  {
    id: 'terraform-iac-framework',
    no: '02',
    year: '2021 — Present',
    tag: 'Infrastructure as Code',
    title: 'Modular Automated Terraform IaC Architecture',
    client: 'Maven Wave & Stefanini',
    summary: 'Codified enterprise cloud topologies (VPC, private subnets, security groups, RDS Aurora databases, S3 buckets, and IAM roles) using reusable Terraform modules with S3 remote state locking via DynamoDB.',
    kpis: [
      { value: '100%', label: 'Codified Cloud' },
      { value: 'Zero', label: 'Config Drift' },
      { value: 'Multi-Env', label: 'Dev / Stage / Prod' },
    ],
    stack: ['Terraform', 'AWS VPC', 'IAM', 'RDS Multi-AZ', 'S3', 'DynamoDB'],
    accent: '#4a93f0',
  },
  {
    id: 'gitlab-cicd-modernization',
    no: '03',
    year: '2022 — Present',
    tag: 'CI/CD & Delivery',
    title: 'High-Velocity CI/CD Pipeline Automation',
    client: 'Maven Wave',
    summary: 'Engineered zero-touch delivery pipelines using GitLab CI/CD, Jenkins, and Shell automation. Integrated SonarQube static code analysis, Docker image build caching, and automated deployment verification gates.',
    kpis: [
      { value: '75%', label: 'Faster Deployments' },
      { value: '2 Hours', label: 'From 7-8h Cycle' },
      { value: 'Zero-Touch', label: 'Automated Rollouts' },
    ],
    stack: ['GitLab CI/CD', 'Jenkins', 'Docker', 'SonarQube', 'Bash / Shell', 'OKTA SSO'],
    accent: '#ff7d54',
  },
  {
    id: 'prometheus-grafana-sre',
    no: '04',
    year: '2022 — Present',
    tag: 'SRE & Observability',
    title: 'Production Telemetry & Observability Mesh',
    client: 'Maven Wave',
    summary: 'Implemented end-to-end telemetry across Kubernetes clusters and AWS infrastructure using Prometheus, Grafana, SolarWinds, and Nagios. Slashed weekly downtime incidents from 10 to 1-2 through proactive alerting.',
    kpis: [
      { value: '85%', label: 'Incident Reduction' },
      { value: '1-2 /wk', label: 'Down from 10 /wk' },
      { value: '99.9%', label: 'Availability SLO' },
    ],
    stack: ['Prometheus', 'Grafana', 'Alertmanager', 'SolarWinds', 'Nagios', 'ServiceNow'],
    accent: '#14d6c4',
  },
  {
    id: 'vault-okta-security',
    no: '05',
    year: '2021 — 2022',
    tag: 'Security & Secrets',
    title: 'Zero-Trust Secrets & Identity Governance',
    client: 'Stefanini India',
    summary: 'Deployed HashiCorp Vault for dynamic secret generation, automated database credential rotation, and centralized API token governance, integrated with OKTA SSO and ServiceNow incident management.',
    kpis: [
      { value: 'Zero', label: 'Hardcoded Secrets' },
      { value: 'Auto', label: 'Credential Rotation' },
      { value: 'RBAC', label: 'Role-Based Access' },
    ],
    stack: ['HashiCorp Vault', 'OKTA SSO', 'AWS IAM', 'Kubernetes RBAC', 'ServiceNow'],
    accent: '#7c5cff',
  },
  {
    id: 'cloud-cost-finops',
    no: '06',
    year: '2022 — 2023',
    tag: 'Cloud FinOps',
    title: 'AWS Cloud Cost Optimization & Rightsizing Initiative',
    client: 'Maven Wave',
    summary: 'Conducted comprehensive infrastructure audits across EC2 instances, EBS storage volumes, idle load balancers, and unattached S3 storage. Migrated workloads to open-source tooling and automated non-production schedules.',
    kpis: [
      { value: '20-30%', label: 'AWS Cost Reduction' },
      { value: '100%', label: 'Open-Source Tooling' },
      { value: 'Nightly', label: 'Auto-Shutdown' },
    ],
    stack: ['AWS Cost Explorer', 'Compute Optimizer', 'Spot Instances', 'CloudWatch', 'Shell'],
    accent: '#1560bd',
  },
]

export default function Projects() {
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
          <span className="eyebrow">Selected Engineering Work · Case Studies</span>
          <h1 className="display" style={{ marginBottom: '0.6rem' }}>
            Problems solved, <span className="grad-text">end to end.</span>
          </h1>
          <p className="lead" style={{ maxWidth: '68ch' }}>
            Selected engagements from Maven Wave & Stefanini — modular Terraform architectures, high-velocity GitLab CI/CD, Kubernetes orchestration on AWS EKS, and proactive SRE monitoring meshes.
          </p>
        </div>

        {/* ── 02. PROJECTS GALLERY (2-COLUMNS) ───────────────────────────── */}
        <section className="section" style={{ padding: '1rem 0 4rem' }}>
          <div className="pgallery">
            {PROJECTS.map((proj) => (
              <article
                key={proj.id}
                className="pcardx card"
                style={{ '--accent': proj.accent } as React.CSSProperties}
              >
                <span className="pcardx__ghostno" aria-hidden="true">
                  {proj.no}
                </span>

                <div className="pcardx__top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <span className="chip chip-dot">{proj.tag}</span>
                  <span className="pcardx__year mono">{proj.year}</span>
                </div>

                <h2 className="pcardx__title" style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', letterSpacing: '-0.02em', margin: '0.2rem 0' }}>
                  {proj.title}
                </h2>

                <p className="pcardx__client mono" style={{ fontSize: '.78rem', color: 'var(--primary)', marginBottom: '0.8rem' }}>
                  {proj.client}
                </p>

                <p className="pcardx__summary muted" style={{ fontSize: '.88rem', lineHeight: 1.65, marginBottom: '1.4rem' }}>
                  {proj.summary}
                </p>

                {/* KPIs Row */}
                <div className="pcardx__kpis" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem', borderTop: '1px solid var(--border)', paddingTop: '1rem', marginBottom: '1.2rem' }}>
                  {proj.kpis.map((kpi) => (
                    <div key={kpi.label} className="pcardx__kpi" style={{ display: 'flex', flexDirection: 'column' }}>
                      <b style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--text)' }}>{kpi.value}</b>
                      <em className="mono" style={{ fontSize: '.68rem', color: 'var(--text-3)', fontStyle: 'normal' }}>{kpi.label}</em>
                    </div>
                  ))}
                </div>

                {/* Stack Chips */}
                <div className="tags" style={{ marginTop: 'auto' }}>
                  {proj.stack.map((s) => (
                    <span key={s} className="chip" style={{ fontSize: '.72rem', padding: '.25rem .6rem' }}>{s}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── 03. CALL TO ACTION ─────────────────────────────────────────── */}
        <section className="section" style={{ padding: '1rem 0 5rem' }}>
          <div className="psy__cta glass">
            <div>
              <span className="eyebrow" style={{ marginBottom: '0.6rem' }}>Collaboration</span>
              <h2 className="h-lg" style={{ marginBottom: '0.6rem' }}>
                Need enterprise cloud <span className="grad-text">infrastructure automated?</span>
              </h2>
              <p className="lead" style={{ fontSize: '1.05rem', margin: 0 }}>
                Targeting DevOps Engineer roles in Delhi NCR and remote. Let's discuss your deployment roadmap.
              </p>
            </div>
            <div className="psy__ctabtns">
              <Link to="/contact" className="btn btn-primary">
                Get in Touch
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link to="/experience" className="btn btn-ghost">
                View Career Timeline
              </Link>
            </div>
          </div>
        </section>
      </div>
    </motion.main>
  )
}
