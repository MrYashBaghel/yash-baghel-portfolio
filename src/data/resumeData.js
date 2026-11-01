export const profileData = {
  name: "Yash Baghel",
  firstName: "Yash",
  role: "DevOps Engineer · Cloud Infrastructure & Automation Leader",
  shortRole: "DevOps Engineer",
  tagline: "Automating cloud infrastructure, orchestrating containers & optimizing CI/CD pipelines.",
  pitch: "Nearly 5 years of hands-on experience in DevOps, specializing in AWS Cloud Infrastructure, Kubernetes orchestration, Terraform IaC, and zero-downtime CI/CD automation — reducing deployment times by 75% and boosting system reliability.",
  location: "Noida / Delhi NCR, India (Open to Remote)",
  email: "yash.baghel@outlook.com",
  linkedin: "https://www.linkedin.com/in/yash-baghel",
  github: "https://github.com/MrYashBaghel",
  availability: "Faridabad, Haryana, INDIA · AVAILABLE",
  experienceYears: "5+ Years"
};

export const recognitions = [
  { value: "AWS Certified", label: "Cloud Practitioner", source: "Amazon Web Services" },
  { value: "Terraform", label: "HashiCorp Associate", source: "HashiCorp Certified" },
  { value: "Top Performer", label: "Deployment Optimization", source: "Maven Wave" },
  { value: "SRE Specialist", label: "Kubernetes & EKS", source: "AWS Cloud Infrastructure" }
];

export const stats = [
  { value: "5+", label: "Years DevOps Experience", suffix: "" },
  { value: "75%", label: "Deployment Lead Time Reduction", suffix: "" },
  { value: "80%", label: "Incident Reduction", suffix: "" },
  { value: "30%", label: "AWS Cloud Cost Savings", suffix: "" }
];

export const overview = {
  headline: "Cloud Infrastructure × Container Orchestration × Infrastructure as Code × SRE & Observability",
  paragraphs: [
    "With nearly 5 years specializing in DevOps and Cloud Engineering, I lead cloud-based application deployment, automated infrastructure provisioning, and continuous integration workflows for high-availability enterprise environments.",
    "My engineering practice centers on Infrastructure as Code (IaC) with HashiCorp Terraform and microservices orchestration using AWS EKS and Docker — replacing manual provisioning bottlenecks with self-healing, scalable infrastructure.",
    "I design proactive monitoring and logging strategies using Prometheus, Grafana, and automated ServiceNow/JIRA integrations — slashing weekly production incidents by 80% and maintaining peak uptime."
  ]
};

export const competencies = [
  { title: "Cloud Infrastructure Management", detail: "Multi-cloud architecture design, provisioning, and scaling across AWS, Azure, and GCP." },
  { title: "Infrastructure as Code (IaC)", detail: "Automated, version-controlled cloud environments using HashiCorp Terraform, Ansible, and Chef." },
  { title: "Containerization & Orchestration", detail: "Docker container lifecycle and enterprise Kubernetes cluster management on AWS EKS, GKE, and AKS." },
  { title: "Continuous Delivery & CI/CD Pipelines", detail: "High-throughput build pipelines with GitLab CI/CD, Jenkins, and Concourse for zero-downtime rollouts." },
  { title: "Monitoring & Observability", detail: "Metrics, dashboards, and log aggregation using Prometheus, Grafana, ELK, SolarWinds, and Nagios." },
  { title: "Security & Secret Governance", detail: "Automated identity, token rotation, and secret management with HashiCorp Vault, OKTA, and ServiceNow." }
];

export const skillsGrouped = [
  {
    group: "Cloud Platforms & Infrastructure",
    items: ["AWS (EKS, EC2, S3, RDS, Lambda, VPC)", "Azure", "GCP", "EKS", "GKE", "AKS"]
  },
  {
    group: "DevOps Tools & Automation",
    items: ["HashiCorp Terraform", "Git", "GitLab CI/CD", "Jenkins", "Ansible", "Chef", "Concourse", "Shell Scripting"]
  },
  {
    group: "Containerization & Orchestration",
    items: ["Docker", "Kubernetes", "Helm", "Vagrant", "Microservices Architecture"]
  },
  {
    group: "Monitoring & Observability",
    items: ["Prometheus", "Grafana", "ELK Stack", "SolarWinds", "Nagios", "System Alerting"]
  },
  {
    group: "Web Servers & OS",
    items: ["Nginx", "Apache", "Ubuntu Linux", "Bash / Shell Automation"]
  },
  {
    group: "ITSM & Security Governance",
    items: ["HashiCorp Vault", "ServiceNow", "JIRA Workflow", "OKTA SSO", "Access Management"]
  }
];

export const services = [
  {
    icon: "cloud",
    title: "AWS Cloud Infrastructure Design",
    desc: "Architecting scalable, resilient, and multi-AZ cloud infrastructures on AWS (EC2, S3, RDS, VPC, Lambda) optimized for cost and performance."
  },
  {
    icon: "layers",
    title: "Kubernetes & EKS Orchestration",
    desc: "Containerizing legacy applications and managing multi-tenant Kubernetes clusters with Helm charts and automated ingress controllers."
  },
  {
    icon: "code",
    title: "Terraform Infrastructure as Code",
    desc: "Writing modular, reusable Terraform configurations to automate cloud resource provisioning with automated security controls."
  },
  {
    icon: "cpu",
    title: "Zero-Downtime CI/CD Pipelines",
    desc: "Engineered automated build, test, and release pipelines using GitLab CI/CD, Jenkins, and Concourse for friction-free delivery."
  },
  {
    icon: "activity",
    title: "Observability & Incident Management",
    desc: "Building Prometheus metric collection, real-time Grafana dashboards, and automated incident routing via ServiceNow and JIRA."
  },
  {
    icon: "shield",
    title: "Vault Secrets & Cloud Security",
    desc: "Implementing centralized secret governance with HashiCorp Vault, identity provider integration with OKTA, and IAM least privilege."
  }
];

export const experience = [
  {
    company: "Maven Wave (an Atos Company)",
    role: "Associate Consultant — DevOps Engineer",
    period: "May 2022 — Present",
    duration: "2 yrs 3 mos+",
    location: "Gurugram / Remote",
    current: true,
    summary: "Leading cloud-based application deployment and infrastructure management across AWS EKS and Terraform, driving system reliability and deployment efficiency.",
    highlights: [
      "Orchestrate Docker containers using Kubernetes on AWS EKS to guarantee high availability and dynamic scalability.",
      "Automate AWS cloud infrastructure provisioning using HashiCorp Terraform, eliminating configuration drift.",
      "Optimized CI/CD pipelines with GitLab CI/CD, reducing deployment times from 7-8 hours to 2 hours (75% speed boost).",
      "Successfully deployed MERN, MEAN, and LAMP application stacks on production Kubernetes clusters.",
      "Integrated OKTA authentication for secure access control and streamlined team workflows using JIRA.",
      "Implemented a comprehensive monitoring strategy with Prometheus & Grafana, reducing weekly system downtime from 10 incidents to 1-2."
    ],
    stack: ["AWS EKS", "Kubernetes", "Docker", "Terraform", "GitLab CI/CD", "Prometheus", "Grafana", "OKTA", "JIRA", "MERN/MEAN"]
  },
  {
    company: "Stefanini India",
    role: "Network Engineer — Cloud & Infrastructure Specialist",
    period: "Apr 2021 — Apr 2022",
    duration: "1 yr 1 mo",
    location: "Noida, India",
    summary: "Managed AWS cloud infrastructure, secret management, CI/CD pipeline automation, and system configuration.",
    highlights: [
      "Managed AWS core services including EC2, S3, RDS, Lambda, and VPC for maximum operational efficiency.",
      "Provisioned multi-environment infrastructure with HashiCorp Terraform and managed version control with Git.",
      "Secured tokens, certificates, and API keys by deploying and managing HashiCorp Vault secret storage.",
      "Integrated ServiceNow for ITSM ticket automation, JIRA for sprint tracking, and GitLab for code collaboration.",
      "Containerized monolithic applications with Docker and automated build/release pipelines using Jenkins and Concourse.",
      "Automated routine Linux system administration and server setup tasks using Shell scripting and Chef configuration management."
    ],
    stack: ["AWS (EC2, S3, RDS)", "Terraform", "HashiCorp Vault", "Jenkins", "Concourse", "Chef", "Docker", "Shell Scripting", "ServiceNow"]
  }
];

export const education = [
  {
    school: "Manav Rachna College of Engineering",
    degree: "B.Tech in Computer Science Engineering",
    period: "2016 — 2020",
    location: "Faridabad, India",
    note: "Computer Science foundation providing deep knowledge in operating systems, networking protocols, algorithms, and distributed software engineering."
  }
];

export const certifications = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2022",
    verifyUrl: "https://aws.amazon.com/verification"
  },
  {
    title: "HashiCorp Certified: Terraform Associate",
    issuer: "HashiCorp",
    year: "2023",
    verifyUrl: "https://www.hashicorp.com/certifications/terraform-associate"
  }
];

export const projects = [
  {
    id: "eks-microservices",
    category: "Kubernetes & Cloud",
    title: "AWS EKS Microservices Kubernetes Orchestration",
    tagline: "Scalable container orchestration for enterprise MERN, MEAN & LAMP stacks on AWS EKS.",
    summary: "Engineered an automated Kubernetes deployment architecture on AWS EKS with custom Helm charts, ingress controllers, and auto-scaling rules.",
    impact: [
      { label: "Deployment Lead Time", prefix: "↓", value: 75, suffix: "%", before: "7-8 hrs", after: "2 hrs" },
      { label: "Weekly Incidents", prefix: "↓", value: 80, suffix: "%", before: "10/wk", after: "1-2/wk" },
      { label: "Cluster Uptime", prefix: "↑", value: 99.9, suffix: "%", before: "98.5%", after: "99.95%" }
    ],
    architecture: ["AWS EKS", "Docker", "Kubernetes", "Helm", "GitLab CI/CD", "Nginx Ingress"],
    details: {
      problem: "Legacy deployment workflows caused 7-8 hour deployment windows, frequent manual rollbacks, and high application downtime during peak traffic.",
      solution: "Containerized application microservices with Docker, created modular Helm charts, and deployed auto-scaling node groups on AWS EKS integrated with GitLab CI/CD.",
      highlights: [
        "Implemented zero-downtime rolling updates with automatic health checks and rollback triggers.",
        "Integrated OKTA authentication for secure cluster access control.",
        "Deployed MERN, MEAN, and LAMP stack applications with shared storage & ingress rules."
      ]
    }
  },
  {
    id: "terraform-vault-iac",
    category: "Infrastructure as Code",
    title: "Multi-Cloud IaC Automation with Terraform & Vault",
    tagline: "Automated, security-hardened infrastructure provisioning and secret governance.",
    summary: "Created modular HashiCorp Terraform scripts to provision VPCs, EC2 clusters, RDS databases, and S3 buckets with integrated HashiCorp Vault secret storage.",
    impact: [
      { label: "Provisioning Speed", prefix: "↑", value: 400, suffix: "%", before: "Days", after: "Minutes" },
      { label: "Config Drift Incidents", prefix: "↓", value: 100, suffix: "%", before: "Frequent", after: "Zero" },
      { label: "Secret Leakage Exposure", prefix: "↓", value: 100, suffix: "%", before: "Manual API Keys", after: "Vault Rotated" }
    ],
    architecture: ["HashiCorp Terraform", "HashiCorp Vault", "AWS VPC", "AWS RDS", "Git", "Chef"],
    details: {
      problem: "Manual cloud resource creation led to inconsistent environment states, configuration drift, and plain-text credentials stored in repository code.",
      solution: "Standardized infrastructure code using reusable Terraform modules with state locking in S3, and enforced dynamic secret generation via HashiCorp Vault.",
      highlights: [
        "Eliminated hardcoded keys by injecting Vault tokens during CI/CD execution.",
        "Automated routine server patching and configuration with Chef and Shell scripts.",
        "Created isolated Staging, QA, and Production environment blueprints."
      ]
    }
  },
  {
    id: "observability-stack",
    category: "Observability & SRE",
    title: "Enterprise Observability & Automated Incident Routing",
    tagline: "Real-time metric collection, Grafana visualization, and ServiceNow/JIRA workflow integration.",
    summary: "Designed a centralized monitoring and alerting ecosystem using Prometheus, Grafana, and ELK stack with automated incident dispatch to ServiceNow and JIRA.",
    impact: [
      { label: "Downtime Incidents", prefix: "↓", value: 85, suffix: "%", before: "10/wk", after: "1-2/wk" },
      { label: "Mean Time to Detect (MTTD)", prefix: "↓", value: 65, suffix: "%", before: "45 mins", after: "5 mins" },
      { label: "Mean Time to Resolve (MTTR)", prefix: "↓", value: 50, suffix: "%", before: "3 hrs", after: "45 mins" }
    ],
    architecture: ["Prometheus", "Grafana", "ELK Stack", "ServiceNow", "JIRA", "Nagios"],
    details: {
      problem: "Reactive incident discovery resulted in prolonged customer outages and high support ticket volume.",
      solution: "Deployed Prometheus node exporters across all cloud servers, built custom executive Grafana dashboards, and configured automatic Pager/ServiceNow alert triggers.",
      highlights: [
        "Configured early-warning alerts for CPU spikes, memory leaks, and disk space limits.",
        "Integrated ServiceNow for automated ticketing and SLA tracking.",
        "Centralized container logs with ELK stack for rapid forensic debugging."
      ]
    }
  },
  {
    id: "cost-optimization-cicd",
    category: "CI/CD & Optimization",
    title: "AWS Cloud Cost Optimization & High-Throughput CI/CD",
    tagline: "Achieving 20-30% cloud bill reduction while accelerating software delivery.",
    summary: "Refactored CI/CD build scripts in GitLab CI/CD and Jenkins while optimizing AWS resource allocation (Spot instances, S3 lifecycle rules, idle resource teardown).",
    impact: [
      { label: "AWS Infrastructure Cost", prefix: "↓", value: 30, suffix: "%", before: "100%", after: "70%" },
      { label: "Pipeline Build Time", prefix: "↓", value: 60, suffix: "%", before: "45 mins", after: "18 mins" },
      { label: "Resource Utilization Efficiency", prefix: "↑", value: 45, suffix: "%", before: "Low", after: "Optimized" }
    ],
    architecture: ["GitLab CI/CD", "Jenkins", "Concourse", "AWS Cost Explorer", "Docker Caching", "Shell Scripting"],
    details: {
      problem: "Over-provisioned cloud instances and inefficient CI/CD caching resulted in inflated monthly AWS bills and slow developer feedback loops.",
      solution: "Implemented automated instance right-sizing, auto-stopping non-prod environments outside business hours, and Docker layer caching in GitLab CI/CD.",
      highlights: [
        "Achieved 20-30% AWS cloud expenditure savings through open-source DevOps tooling.",
        "Optimized Docker build caches to cut pipeline runtime by more than half.",
        "Streamlined release pipelines with automated integration testing gates."
      ]
    }
  }
];

export const devopsPillars = [
  {
    id: "iac",
    name: "Infrastructure as Code",
    tagline: "Declarative, repeatable, version-controlled cloud environments.",
    description: "Manual infrastructure creation is error-prone. By defining resources in code using HashiCorp Terraform and Ansible, every environment is audited, testable, and reproducibly scalable."
  },
  {
    id: "k8s",
    name: "Container Orchestration",
    tagline: "Self-healing, microservice architecture on Kubernetes & AWS EKS.",
    description: "Applications run isolated in Docker containers, managed dynamically by Kubernetes to automatically recover from pod failures, handle traffic bursts, and execute zero-downtime updates."
  },
  {
    id: "sre",
    name: "Proactive Observability",
    tagline: "Real-time metrics, proactive alerting, and rapid incident response.",
    description: "System health shouldn't be a mystery. Continuous telemetry with Prometheus and Grafana identifies latency spikes before they reach end users, keeping SLA availability at 99.9%+."
  },
  {
    id: "cicd",
    name: "Continuous Delivery",
    tagline: "Automated testing, security scanning, and seamless deployments.",
    description: "Software release cycles should take minutes, not hours. Automated CI/CD pipelines with GitLab and Jenkins enforce automated tests and secret checks before shipping to production."
  }
];
