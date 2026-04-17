export const marqueeItems = [
  'UI/UX Design','Figma','Prototyping','Design Systems',
  'Front-end Dev','React','User Research','Branding',
  'Interaction Design','Case Studies','AI Integration','Visual Design'
];

export const skills = [
  { label: 'User Interface Design', featured: true },
  { label: 'UX Research', featured: true },
  { label: 'Prototyping', featured: false },
  { label: 'Design Systems', featured: true },
  { label: 'Figma', featured: false },
  { label: 'Front-end Dev', featured: true },
  { label: 'React', featured: false },
  { label: 'Branding', featured: false },
  { label: 'Visual Design', featured: false },
  { label: 'Gamification', featured: false },
  { label: 'Game UI/UX', featured: false },
  { label: 'Interaction Design', featured: true },
  { label: 'AI Integration', featured: false },
  { label: 'Motion Design', featured: false },
];

export const projects = [
  {
    title: 'Billzy — Invoice Generator App',
    desc: 'Mobile invoice app – create bills faster, manage your shop smarter.',
    img: 'https://raw.githubusercontent.com/shibinsp45/Lovable-Portfolio/main/public/projects/invoice-generator.jpg',
    type: 'ux', year: '2025', color: '#7c6dfa',
  },
  {
    title: 'Fudit — AI Food Delivery App',
    desc: 'AI-powered food delivery – satisfy your cravings, delivered to your door.',
    img: 'https://raw.githubusercontent.com/shibinsp45/Lovable-Portfolio/main/public/projects/fudit-app.png',
    type: 'ux', year: '2024', color: '#a78bfa',
  },
  {
    title: 'AJ Delight Point Branding',
    desc: 'Complete brand identity for a bakery — packaging, logo, visual system.',
    img: 'https://raw.githubusercontent.com/shibinsp45/Lovable-Portfolio/main/public/projects/aj-delight-point.png',
    type: 'brand', year: '2026', color: '#fbbf24',
  },
  {
    title: 'GetFit — Fitness Tracker',
    desc: 'Fitness tracking app — where passion meets performance.',
    img: 'https://raw.githubusercontent.com/shibinsp45/Lovable-Portfolio/main/public/projects/fitness-app.jpg',
    type: 'ux', year: '2024', color: '#4ade80',
  },
  {
    title: 'ElitePath Dashboard',
    desc: 'Student progress tracking dashboard with gamified achievements.',
    img: 'https://raw.githubusercontent.com/shibinsp45/Lovable-Portfolio/main/public/projects/elitepath.png',
    type: 'web', year: '2024', color: '#38bdf8',
  },
  {
    title: 'Tools — Emergency Service App',
    desc: 'On-demand tools and repair service. We are here to help.',
    img: 'https://raw.githubusercontent.com/shibinsp45/Lovable-Portfolio/main/public/projects/tools-app.png',
    type: 'ux', year: '2025', color: '#fb7185',
  },
  {
    title: 'GroPlan — Grocery Planner',
    desc: 'Smart grocery and meal planning — your intelligent kitchen companion.',
    img: 'https://raw.githubusercontent.com/shibinsp45/Lovable-Portfolio/main/public/projects/grocery-app.jpg',
    type: 'ux', year: '2025', color: '#34d399',
  },
  {
    title: 'Perfume Branding Collections',
    desc: 'AI-generated perfume branding with luxury bottle aesthetics.',
    img: 'https://raw.githubusercontent.com/shibinsp45/Lovable-Portfolio/main/public/projects/perfume-branding.png',
    type: 'ai', year: '2025', color: '#f472b6',
  },
];

export const experiences = [
  {
    role: 'UI/UX Designer and Mentor', company: 'Zoople Technologies', period: '2025 — Present',
    desc: 'Leading end-to-end product design, AI-driven social insights, and mentoring junior designers.',
    active: true, hoverColor: '#000000',
  },
  {
    role: 'UI/UX Designer and Mentor', company: 'Kreative Sparkz', period: '2024',
    desc: 'Designed user-centred UI/UX solutions. Led user research, developed interactive prototypes and wireframes.',
    active: false, hoverColor: '#ef4444',
  },
  {
    role: 'UI UX Designer', company: 'Nuren AI', period: '2023 — 2024',
    desc: 'Created web UI and interactions for a CRM platform. Conducted user research and developed prototypes.',
    active: false, hoverColor: '#3b82f6',
  },
];

export const testimonials = [
  {
    quote: "Shibin's ability to create intuitive user experiences and solve complex problems with ease is commendable. He consistently brings energy and positivity to every project.",
    name: 'Dr. Libin P Oommen', role: 'HOD at PRC',
    avatar: 'https://raw.githubusercontent.com/shibinsp45/Lovable-Portfolio/main/src/assets/libin.png',
  },
  {
    quote: "Skilled with Figma and AI-based UI/UX design tools, Shibin collaborates seamlessly with dynamic teams. A strong designer with both creativity and adaptability.",
    name: 'Adarsh Sharma', role: 'CEO — Nuren AI',
    avatar: 'https://raw.githubusercontent.com/shibinsp45/Lovable-Portfolio/main/src/assets/adarsh.png',
  },
  {
    quote: "Shibin excels at problem-solving and brings a creative approach to every challenge. His design skills are second to none — elegant solutions for complex problems.",
    name: 'Jestin Sabu', role: 'Application Developer — IBM',
    avatar: 'https://raw.githubusercontent.com/shibinsp45/Lovable-Portfolio/main/src/assets/jestin.png',
  },
];

export const quickQs = [
  'What do you do?', 'Tell me about your projects',
  'What are your skills?', 'How to contact you?',
  'Where have you worked?', 'Show his resume',
];

export const followUps = {
  default: ['Your skills?', 'Show resume', 'Contact info'],
  projects: ['Tell me more', 'Which is your fav?', 'Any recent work?'],
  skills: ['Your projects?', 'Where did you work?', 'Show resume'],
  contact: ['WhatsApp?', 'LinkedIn?', 'Instagram?'],
  work: ['Current role?', 'Your projects?', 'Skills you use?'],
  resume: ['Your projects?', 'Contact info', 'Tell me about yourself'],
};

export const typeColors = {
  ux: { bg: 'rgba(124,109,250,.12)', color: '#a78bfa' },
  web: { bg: 'rgba(74,222,128,.1)', color: '#4ade80' },
  brand: { bg: 'rgba(251,191,36,.1)', color: '#fbbf24' },
  ai: { bg: 'rgba(251,113,133,.12)', color: '#fb7185' },
  blog: { bg: 'rgba(56,189,248,.1)', color: '#38bdf8' },
};

export const typeLabels = { ux: 'UI/UX', web: 'Web', brand: 'Brand', ai: 'AI', blog: 'Blog' };
