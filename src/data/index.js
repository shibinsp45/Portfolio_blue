import beatCover from '../assets/beat-cover.png';
import eventCover from '../assets/event-cover.png';

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
    title: "Invoice Generator Mobile App",
    desc: "A mobile invoice app – create bills faster, manage your shop better.",
    img: "https://raw.githubusercontent.com/shibinsp45/Lovable-Portfolio/main/public/projects/invoice-generator.jpg",
    type: "ux", year: "2025",
    behance: "https://www.behance.net/gallery/243058217/Invoice-Generator-Mobile-App-Case-Study",
    role: "UI/UX Designer", tools: ["Figma", "FigJam", "Prototyping"],
    tags: ["Mobile App", "FinTech", "Case Study"],
    challenge: "Small shop owners struggle with slow, paper-based invoicing. The goal was to design a fast, intuitive mobile app that lets them generate and manage invoices in seconds.",
    outcome: "A streamlined 3-step invoice flow reducing creation time by 70%, with smart templates and a clean dashboard for tracking payments.",
    highlights: [
      { title: "User Research", desc: "Interviewed 12 small business owners to map pain points in current invoicing workflows." },
      { title: "Smart Templates", desc: "Designed reusable invoice templates with auto-fill for repeat clients." },
      { title: "Dashboard", desc: "Created a payment tracking dashboard with visual status indicators." },
      { title: "Prototype Testing", desc: "5 rounds of usability testing with real users to refine the flow." },
    ],
  },
  {
    title: "Tools - Service App",
    desc: "On-demand tools and repair service app – we are here to help you.",
    img: "https://raw.githubusercontent.com/shibinsp45/Lovable-Portfolio/main/public/projects/tools-app.png",
    type: "ux", year: "2025",
    behance: "https://www.behance.net/gallery/245113395/Tools",
    role: "UI/UX Designer", tools: ["Figma", "Maze", "Notion"],
    tags: ["Mobile App", "On-Demand", "Services"],
    challenge: "Finding reliable home repair professionals is stressful and time-consuming. Users needed a single app to browse, book, and track service providers nearby.",
    outcome: "A service marketplace with real-time booking, technician profiles, and live job tracking — reducing average booking time to under 2 minutes.",
    highlights: [
      { title: "Discovery Research", desc: "Mapped user journeys from service need to booking completion." },
      { title: "Booking Flow", desc: "Simplified the booking to 3 taps with smart location detection." },
      { title: "Technician Profiles", desc: "Rich profiles with ratings, skills, and availability calendar." },
      { title: "Live Tracking", desc: "Real-time map tracking for technician arrival and job status." },
    ],
  },
  {
    title: "Fudit - AI Food Delivery App",
    desc: "AI-powered food delivery app – satisfy your cravings, delivered to your home.",
    img: "https://raw.githubusercontent.com/shibinsp45/Lovable-Portfolio/main/public/projects/fudit-app.png",
    type: "ux", year: "2024",
    behance: "https://www.behance.net/gallery/197536833/AI-powered-Food-Delivery-App-Fudit",
    role: "UI/UX Designer", tools: ["Figma", "ChatGPT", "FigJam"],
    tags: ["Mobile App", "AI", "Food Delivery"],
    challenge: "Food delivery apps suffer from decision fatigue — too many choices with no smart guidance. The brief was to leverage AI to make ordering personal and effortless.",
    outcome: "An AI-driven food app with preference learning, mood-based suggestions, and a one-tap reorder — boosting simulated user satisfaction by 40%.",
    highlights: [
      { title: "AI Recommendations", desc: "Designed an AI feed that learns from order history and meal time patterns." },
      { title: "Mood-Based Search", desc: "Created a mood selector UI to suggest meals matching the user's current vibe." },
      { title: "One-Tap Reorder", desc: "Smart reorder widget on the home screen for frequent meals." },
      { title: "Visual Menu", desc: "Rich restaurant cards with immersive food photography and quick-add." },
    ],
  },
  {
    title: "GetFit - Fitness Tracking App",
    desc: "Fitness tracking app case study – where fitness meets passion.",
    img: "https://raw.githubusercontent.com/shibinsp45/Lovable-Portfolio/main/public/projects/fitness-app.jpg",
    type: "ux", year: "2024",
    behance: "https://www.behance.net/gallery/202932045/Fitness-Tracking-App-Case-Study",
    role: "UI/UX Designer", tools: ["Figma", "Maze", "Miro"],
    tags: ["Mobile App", "Health", "Gamification"],
    challenge: "Most fitness apps are intimidating for beginners and boring for regulars. The challenge was to design an experience that motivates users to stay consistent.",
    outcome: "A gamified fitness tracker with streak rewards, adaptive workout plans, and social challenges — with a 68% simulated 30-day retention rate.",
    highlights: [
      { title: "Streak System", desc: "Designed a visual streak and reward system to reinforce daily habits." },
      { title: "Adaptive Plans", desc: "Workout plans that adjust difficulty based on user performance data." },
      { title: "Social Challenges", desc: "Friend challenges and leaderboards to drive accountability." },
      { title: "Progress Visuals", desc: "Body progress charts and animated achievement badges." },
    ],
  },
  {
    title: "GroPlan - Smart Grocery App",
    desc: "Smart grocery & meal planning app – your smart kitchen buddy.",
    img: "https://raw.githubusercontent.com/shibinsp45/Lovable-Portfolio/main/public/projects/grocery-app.jpg",
    type: "ux", year: "2025",
    behance: "https://www.behance.net/gallery/240581883/Smart-Grocery-Meal-Planning-App-UX-Case-Study",
    role: "UI/UX Designer", tools: ["Figma", "FigJam", "Notion"],
    tags: ["Mobile App", "Productivity", "Meal Planning"],
    challenge: "People waste food and money due to unplanned grocery shopping. The goal was an app that connects meal planning to smart shopping lists automatically.",
    outcome: "A meal-to-cart pipeline that auto-generates shopping lists from weekly meal plans, with pantry tracking to reduce food waste.",
    highlights: [
      { title: "Meal Planning", desc: "Weekly meal planner with a drag-and-drop calendar interface." },
      { title: "Auto Shopping List", desc: "One-click list generation from selected meals for the week." },
      { title: "Pantry Tracker", desc: "Track pantry items and get alerts before ingredients expire." },
      { title: "Recipe Discovery", desc: "Swipeable recipe cards filtered by pantry items on hand." },
    ],
  },
  {
    title: "Event Management Website Design",
    desc: "Crafting unforgettable user experiences for event management.",
    img: eventCover,
    type: "web", year: "2024",
    behance: "https://www.behance.net/gallery/224965571/Event-Management-Website-Design",
    role: "UI Designer", tools: ["Figma", "Framer", "Notion"],
    tags: ["Web Design", "Events", "Landing Page"],
    challenge: "Event companies need websites that convert visitors into clients fast. The brief required a visually impactful site that communicates scale and professionalism.",
    outcome: "A bold, dark-themed event website with cinematic visuals, smooth scroll animations, and a streamlined event inquiry flow.",
    highlights: [
      { title: "Hero Section", desc: "Full-bleed video hero with animated text overlay for immediate impact." },
      { title: "Event Gallery", desc: "Masonry photo grid showcasing past events with hover effects." },
      { title: "Service Cards", desc: "Interactive service tiles with subtle 3D tilt on hover." },
      { title: "Inquiry Flow", desc: "Multi-step event booking form with real-time validation." },
    ],
  },
  {
    title: "ElitePath Student Management Dashboard",
    desc: "Student management dashboard with progress tracking and achievements.",
    img: "https://raw.githubusercontent.com/shibinsp45/Lovable-Portfolio/main/public/projects/elitepath.png",
    type: "web", year: "2024",
    behance: "https://www.behance.net/gallery/219268503/ElitePath-Student-Management-Dashboard",
    role: "UI/UX Designer", tools: ["Figma", "FigJam", "Lottie"],
    tags: ["Dashboard", "EdTech", "Web App"],
    challenge: "Educators lacked a single place to track student progress, assignments, and achievements. The dashboard needed to surface insights without information overload.",
    outcome: "A clean admin dashboard with at-a-glance KPIs, individual student profiles, and a gamified achievement system to keep students motivated.",
    highlights: [
      { title: "KPI Overview", desc: "At-a-glance cards for attendance, grades, and assignment completion." },
      { title: "Student Profiles", desc: "Detailed individual profiles with historical performance graphs." },
      { title: "Achievement Badges", desc: "Animated badge system rewarding milestones and streaks." },
      { title: "Data Tables", desc: "Sortable, filterable data tables for bulk class management." },
    ],
  },
  {
    title: "Beat Landing Page",
    desc: "Education platform landing page – launch your career with India's leading educator.",
    img: beatCover,
    type: "web", year: "2024",
    behance: "https://www.behance.net/gallery/215987973/Beat-Landing-Page",
    role: "UI Designer", tools: ["Figma", "CSS", "Framer"],
    tags: ["Landing Page", "EdTech", "Marketing"],
    challenge: "Beat needed a high-converting landing page that communicated credibility and drove course enrollments. The design had to work for both mobile and desktop.",
    outcome: "A conversion-focused landing page with social proof sections, feature highlights, and a sticky CTA — achieving a clean, modern EdTech aesthetic.",
    highlights: [
      { title: "Hero CTA", desc: "Above-the-fold hero with benefit-driven headline and enroll button." },
      { title: "Social Proof", desc: "Testimonials, stats counter, and instructor credentials section." },
      { title: "Course Showcase", desc: "Visual course cards with curriculum previews and pricing." },
      { title: "Responsive Design", desc: "Pixel-perfect layouts for mobile, tablet, and desktop viewports." },
    ],
  },
  {
    title: "TeaTym Product Website",
    desc: "Product website for a tea brand – a cup of tea is a cup of peace.",
    img: "https://raw.githubusercontent.com/shibinsp45/Lovable-Portfolio/main/public/projects/teatym.jpg",
    type: "web", year: "2024",
    behance: "https://www.behance.net/gallery/202930537/TeaTym-Product-Website",
    role: "UI Designer", tools: ["Figma", "HTML/CSS", "Webflow"],
    tags: ["Product Website", "Branding", "E-commerce"],
    challenge: "TeaTym wanted a website that felt as calming and premium as their tea — earthy tones, minimal layout, and a smooth shopping experience.",
    outcome: "A serene product website with a nature-inspired palette, parallax hero, product showcase with variants, and a seamless cart experience.",
    highlights: [
      { title: "Brand Identity", desc: "Warm, earthy color palette and organic typography to match brand values." },
      { title: "Product Showcase", desc: "Immersive product pages with flavor notes and ingredient highlights." },
      { title: "Parallax Hero", desc: "Layered parallax scroll effect with botanical imagery." },
      { title: "Cart Flow", desc: "Smooth add-to-cart animation and a minimal checkout experience." },
    ],
  },
  {
    title: "Happy Cart Branding",
    desc: "Branding design for a shopping cart – vibrant and playful identity.",
    img: "https://raw.githubusercontent.com/shibinsp45/Lovable-Portfolio/main/public/projects/happy-cart.png",
    type: "brand", year: "2024",
    behance: "https://www.behance.net/gallery/197538045/Happy-Cart-Branding",
    role: "Brand Designer", tools: ["Illustrator", "Figma", "Photoshop"],
    tags: ["Branding", "Logo", "Identity"],
    challenge: "Happy Cart needed a brand identity that felt friendly, energetic, and memorable — appealing to families and everyday shoppers.",
    outcome: "A complete brand system with a playful logo, vibrant colour palette, custom iconography, and packaging mockups ready for print and digital.",
    highlights: [
      { title: "Logo Design", desc: "Custom wordmark and icon mark combining a cart with a smiling motif." },
      { title: "Colour System", desc: "Vibrant primary palette with warm secondary tones for accessibility." },
      { title: "Iconography", desc: "Custom icon set consistent with the brand's playful personality." },
      { title: "Brand Mockups", desc: "Applied branding across bags, tags, and digital media templates." },
    ],
  },
  {
    title: "Perfume Branding Collections",
    desc: "AI-generated perfume branding with elegant bottle designs and luxury aesthetics.",
    img: "https://raw.githubusercontent.com/shibinsp45/Lovable-Portfolio/main/public/projects/perfume-branding.png",
    type: "ai", year: "2025",
    behance: "https://www.behance.net/gallery/228929049/Perfume-Branding-Collections",
    role: "AI Art Director", tools: ["Midjourney", "Adobe Firefly", "Photoshop"],
    tags: ["AI Art", "Luxury", "Branding"],
    challenge: "Create a luxury perfume brand identity using AI generative tools — demonstrating how AI can accelerate high-end creative production without sacrificing artistry.",
    outcome: "A full AI-generated brand collection with 12 unique bottle concepts, brand stories, and lifestyle visuals — completed in a fraction of traditional timelines.",
    highlights: [
      { title: "AI Ideation", desc: "100+ bottle concepts generated and curated down to 12 hero designs." },
      { title: "Luxury Aesthetics", desc: "Dark, moody lighting with gold and pearl material exploration." },
      { title: "Brand Stories", desc: "Each scent given a unique narrative expressed through visual language." },
      { title: "Lifestyle Shots", desc: "AI-generated lifestyle imagery for social media and ad campaigns." },
    ],
  },
  {
    title: "ProMedic - Medicine Vending Machine",
    desc: "Medicine vending machine case study – access medicines faster during emergencies.",
    img: "https://raw.githubusercontent.com/shibinsp45/Lovable-Portfolio/main/public/projects/medicine-vending.png",
    type: "ux", year: "2024",
    behance: "https://www.behance.net/gallery/197536455/Medicine-Vending-Machine-Case-Study",
    role: "UI/UX Designer", tools: ["Figma", "Maze", "FigJam"],
    tags: ["Kiosk UI", "HealthTech", "Case Study"],
    challenge: "Medicine access during off-hours and emergencies is a critical gap. The brief was to design a touch-screen kiosk interface for an automated medicine vending machine.",
    outcome: "An accessible kiosk UI with guided prescription upload, symptom-based search, and emergency medicine fast-track — designed for all age groups.",
    highlights: [
      { title: "Kiosk UX", desc: "Large-touch optimized interface designed for physical kiosk hardware." },
      { title: "Prescription Upload", desc: "Camera-based prescription scanning with AI verification flow." },
      { title: "Symptom Search", desc: "Guided symptom-to-medicine search for over-the-counter purchases." },
      { title: "Accessibility", desc: "High contrast mode, large fonts, and voice guidance for elderly users." },
    ],
  },
  {
    title: "Smiley Desktop Wallpaper Design",
    desc: "Desktop wallpaper design with a cheerful smiley theme.",
    img: "https://raw.githubusercontent.com/shibinsp45/Lovable-Portfolio/main/public/projects/smiley-wallpaper.png",
    type: "brand", year: "2024",
    behance: "https://www.behance.net/gallery/197538631/Smiley-Desktop-Wallpaper-Design",
    role: "Graphic Designer", tools: ["Illustrator", "Figma"],
    tags: ["Illustration", "Wallpaper", "Graphic Design"],
    challenge: "Create a set of desktop wallpapers that spread positivity — using bold smiley motifs in a modern, minimal illustration style suitable for all screen sizes.",
    outcome: "A collection of 6 wallpaper designs in multiple resolutions, mixing flat illustration with bold typography for a playful, desktop-ready aesthetic.",
    highlights: [
      { title: "Illustration Style", desc: "Bold, flat-style smiley illustrations with thick outlines and pastel fills." },
      { title: "Typography", desc: "Expressive type pairings integrated into each wallpaper composition." },
      { title: "Colour Variants", desc: "Each design shipped in light, dark, and vibrant colour modes." },
      { title: "Multi-Resolution", desc: "Exported at 1080p, 1440p, and 4K for all screen sizes." },
    ],
  },
];

import hciBlogImg from '../assets/hci-blog.jpg';

export const blogs = [
  {
    "title": "Why UI/UX Design Shapes How We Experience the World Today",
    "desc": "How UI/UX design decides whether we stay, trust, and return to digital products.",
    "img": "https://raw.githubusercontent.com/shibinsp45/Lovable-Portfolio/main/public/projects/uiux-blog.webp",
    "year": "2025",
    "behance": "https://uxbysoul.medium.com/why-ui-ux-design-shapes-how-we-experience-the-world-today-4bf289c4e09d"
  },
  {
    "title": "How Your Brain Shapes Your User Experience",
    "desc": "How cognitive psychology influences user experience without you even realizing it.",
    "img": "https://raw.githubusercontent.com/shibinsp45/Lovable-Portfolio/main/public/projects/brain-ux-blog.png",
    "year": "2025",
    "behance": "https://www.linkedin.com/pulse/how-your-brain-shapes-user-experience-without-you-even-realizing-elxec"
  },
  {
    "title": "Human-Computer Interaction",
    "desc": "The science, principles, and real-world applications of how humans and computers understand each other.",
    "img": hciBlogImg,
    "year": "2025",
    "behance": "https://gamma.app/docs/Human-Computer-Interaction-dshl6dqgiwm9lgk"
  }
];

export const experiences = [
  {
    role: 'UI/UX Designer and Mentor', company: 'Zoople Technologies', period: '2025 — Present',
    desc: 'Leading end-to-end product design, AI-driven social insights, and mentoring junior designers.',
    active: true, hoverColor: '#0e1614',
  },
  {
    role: 'UI/UX Designer and Mentor', company: 'Kreative Sparkz', period: '2024',
    desc: 'Designed user-centred UI/UX solutions. Led user research, developed interactive prototypes and wireframes.',
    active: false, hoverColor: '#1a1012',
  },
  {
    role: 'UI UX Designer', company: 'Nuren AI', period: '2023 — 2024',
    desc: 'Created web UI and interactions for a CRM platform. Conducted user research and developed prototypes.',
    active: false, hoverColor: '#0c121a',
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
