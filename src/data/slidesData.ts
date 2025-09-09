import { LucideIcon, AlertTriangle, Lightbulb, Zap, Workflow, Target, Shield, Code, Calendar, DollarSign, TrendingUp, Users, Rocket } from 'lucide-react';

export interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  content: string[];
  icon: LucideIcon;
  visual?: {
    title: string;
    description: string;
  };
  chart?: {
    title: string;
    data: Array<{
      label: string;
      value: string;
      percentage: number;
    }>;
  };
  metrics?: Array<{
    value: string;
    label: string;
  }>;
  cta?: string;
}

export const slides: Slide[] = [
  {
    id: 1,
    title: "The Data Visualization Problem",
    subtitle: "Excel files are everywhere, but insights are buried",
    icon: AlertTriangle,
    content: [
      "Businesses generate massive amounts of Excel data daily",
      "Manual chart creation is time-consuming and error-prone",
      "Static visualizations don't reveal dynamic insights",
      "No AI-powered analysis to uncover hidden patterns",
      "Limited sharing and collaboration capabilities"
    ],
    metrics: [
      { value: "80%", label: "Use Excel Daily" },
      { value: "60%", label: "Struggle with Viz" }
    ],
    visual: {
      title: "Excel Overwhelm",
      description: "Users spend hours creating basic charts instead of analyzing insights"
    }
  },
  {
    id: 2,
    title: "DataViz Pro Solution",
    subtitle: "Transform Excel data into intelligent visualizations",
    icon: Lightbulb,
    content: [
      "One-click Excel file upload (.xls/.xlsx) with instant parsing",
      "Generate interactive 2D/3D charts automatically",
      "AI-powered insights and data summaries",
      "Dynamic axis selection and real-time customization",
      "Professional export options (PNG/PDF) for presentations"
    ],
    visual: {
      title: "Smart Platform",
      description: "Upload, visualize, and gain insights in minutes, not hours"
    },
    cta: "See Live Demo"
  },
  {
    id: 3,
    title: "Key Features & Benefits",
    subtitle: "Everything you need for data visualization",
    icon: Zap,
    content: [
      "Multi-format Excel support with intelligent data parsing",
      "Interactive 2D charts: Bar, Line, Pie, Scatter plots",
      "Stunning 3D visualizations with Three.js integration",
      "AI-powered insights using advanced analytics APIs",
      "User dashboard with upload history and project management",
      "Admin panel for user management and usage monitoring"
    ],
    chart: {
      title: "Feature Impact",
      data: [
        { label: "Time Saved", value: "90%", percentage: 90 },
        { label: "Accuracy Increase", value: "95%", percentage: 95 },
        { label: "User Satisfaction", value: "98%", percentage: 98 }
      ]
    }
  },
  {
    id: 4,
    title: "How It Works",
    subtitle: "Simple 4-step workflow",
    icon: Workflow,
    content: [
      "Step 1: Upload Excel file through drag-and-drop interface",
      "Step 2: Automatic data parsing and structure recognition",
      "Step 3: Choose chart type and configure X/Y axes dynamically",
      "Step 4: Generate interactive visualization with AI insights",
      "Bonus: Export, share, and save to dashboard for future access"
    ],
    visual: {
      title: "Streamlined Process",
      description: "From Excel to insights in under 2 minutes"
    }
  },
  {
    id: 5,
    title: "Market Opportunity",
    subtitle: "Massive addressable market",
    icon: Target,
    content: [
      "Global data visualization market: $8.8B (growing 9.2% annually)",
      "750M+ Excel users worldwide need better visualization tools",
      "Target segments: SMBs, enterprise analysts, consultants",
      "Underserved market: AI-powered Excel visualization platforms",
      "First-mover advantage in Excel-to-3D visualization space"
    ],
    metrics: [
      { value: "$8.8B", label: "Market Size" },
      { value: "750M+", label: "Excel Users" },
      { value: "9.2%", label: "Growth Rate" },
      { value: "$2.1B", label: "TAM by 2027" }
    ]
  },
  {
    id: 6,
    title: "Competitive Advantage",
    subtitle: "What makes us unique",
    icon: Shield,
    content: [
      "Only platform combining Excel parsing + 3D visualization + AI insights",
      "No-code solution - anyone can create professional visualizations",
      "Real-time collaboration and sharing capabilities",
      "Advanced Three.js integration for immersive 3D experiences",
      "Modern tech stack ensuring scalability and performance",
      "AI-first approach providing actionable insights, not just charts"
    ],
    visual: {
      title: "Unique Position",
      description: "The only Excel-to-AI-3D visualization platform in the market"
    }
  },
  {
    id: 7,
    title: "Tech Stack & Innovation",
    subtitle: "Built with cutting-edge technology",
    icon: Code,
    content: [
      "Frontend: React.js + Redux Toolkit for responsive UI",
      "Visualization: Chart.js for 2D + Three.js for stunning 3D",
      "Styling: Tailwind CSS for modern, responsive design",
      "Backend: Node.js + Express.js for scalable API",
      "Database: MongoDB for flexible data storage",
      "AI Integration: OpenAI/Claude APIs for intelligent insights"
    ],
    chart: {
      title: "Technology Advantages",
      data: [
        { label: "Performance", value: "Fast", percentage: 95 },
        { label: "Scalability", value: "High", percentage: 90 },
        { label: "Security", value: "Enterprise", percentage: 98 }
      ]
    }
  },
  {
    id: 8,
    title: "Development Roadmap",
    subtitle: "12-week delivery timeline",
    icon: Calendar,
    content: [
      "Weeks 1-3: Core platform development (upload, parsing, basic charts)",
      "Weeks 4-6: Advanced visualization features (3D charts, customization)",
      "Weeks 7-9: AI integration and insights engine implementation",
      "Weeks 10-11: User dashboard, admin panel, and authentication",
      "Week 12: Testing, deployment, and performance optimization",
      "Post-launch: Mobile app, advanced AI features, enterprise integrations"
    ],
    visual: {
      title: "Agile Development",
      description: "MVP ready in 12 weeks with continuous iteration"
    }
  },
  {
    id: 9,
    title: "Business Model & Revenue",
    subtitle: "Multiple revenue streams",
    icon: DollarSign,
    content: [
      "Freemium Model: Basic features free, premium for advanced capabilities",
      "Subscription Tiers: Individual ($9/mo), Pro ($29/mo), Enterprise ($99/mo)",
      "Usage-based pricing for AI insights and high-volume processing",
      "White-label solutions for enterprise clients",
      "API access for developers and third-party integrations"
    ],
    metrics: [
      { value: "$50K", label: "MRR Target (Year 1)" },
      { value: "$500K", label: "ARR Target (Year 2)" },
      { value: "25%", label: "Conversion Rate" },
      { value: "$45", label: "ARPU" }
    ]
  },
  {
    id: 10,
    title: "Early Traction",
    subtitle: "Validation and initial success",
    icon: TrendingUp,
    content: [
      "50+ beta users testing the MVP with positive feedback",
      "Average session time: 18 minutes (industry avg: 8 minutes)",
      "92% user satisfaction score in initial surveys",
      "3 potential enterprise clients in pilot discussions",
      "Social proof: Featured in 2 industry publications",
      "Early partnerships with data consulting firms"
    ],
    chart: {
      title: "User Engagement",
      data: [
        { label: "Daily Active Users", value: "45", percentage: 75 },
        { label: "Feature Adoption", value: "88%", percentage: 88 },
        { label: "Retention Rate", value: "67%", percentage: 67 }
      ]
    }
  },
  {
    id: 11,
    title: "Team & Expertise",
    subtitle: "Experienced team with proven track record",
    icon: Users,
    content: [
      "CEO: 8+ years in SaaS, previous startup exit ($12M acquisition)",
      "CTO: Ex-Google engineer, expertise in data visualization platforms",
      "Lead Developer: Full-stack expert with AI/ML background",
      "Advisors: Industry veterans from Tableau, Microsoft, and Salesforce",
      "Combined 25+ years in data analytics and visualization",
      "Previous successful B2B SaaS launches with $50M+ in revenue"
    ],
    visual: {
      title: "Proven Team",
      description: "The right expertise to execute and scale this vision"
    }
  },
  {
    id: 12,
    title: "Investment Opportunity",
    subtitle: "Join us in revolutionizing data visualization",
    icon: Rocket,
    content: [
      "Seeking $500K seed funding for 18-month runway",
      "Use of funds: 60% development, 25% marketing, 15% operations",
      "Projected 10x ROI within 3 years based on market growth",
      "Clear path to Series A with enterprise traction milestones",
      "Opportunity for strategic partnerships and white-label deals",
      "Ready to scale with proven team and validated market demand"
    ],
    metrics: [
      { value: "$500K", label: "Funding Goal" },
      { value: "18 mo", label: "Runway" },
      { value: "10x", label: "Projected ROI" },
      { value: "Q2 2026", label: "Series A Target" }
    ],
    cta: "Let's Discuss Partnership"
  }
];
