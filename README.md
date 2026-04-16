# Shibin S P — Portfolio

Personal portfolio website built with **React + Vite + Framer Motion**.

## ✨ Features

- **Hero section** — center-aligned with animated starfield, ambient glows & parallax
- **Glassmorphism Navbar** — frosted-glass effect on scroll, smooth transitions
- **Marquee ticker** — scrolling skills band
- **Skills cloud** — animated tag cloud with hover effects
- **Stacking scroll projects** — sticky card stack with parallax scale per project
- **About** — profile photo with live "Open to work" badge
- **Career timeline** — animated experience cards
- **Testimonials** — star-rated recommendation cards
- **Contact** — minimal CTA with direct links
- **Soul Chatbot** — AI assistant (Anthropic Claude Haiku) with streaming, sounds, follow-up suggestions, contact chips
- **Scroll progress bar**
- **Dark/Light mode toggle**
- **Fully responsive**

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

## 📦 Build for Production

```bash
npm run build
# Output in /dist folder
```

## 🌐 Deploy Options

### Netlify (Recommended — 30 seconds)
1. Run `npm run build`
2. Go to [netlify.com/drop](https://netlify.com/drop)
3. Drag & drop the `dist/` folder
4. Get instant live URL ✅

### Vercel
```bash
npm install -g vercel
vercel deploy
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
# Add to package.json scripts: "deploy": "gh-pages -d dist"
npm run build && npm run deploy
```

## 🤖 Soul Chatbot Setup

The chatbot uses the **Anthropic Claude API**. For production:

1. Create a backend proxy (Supabase Edge Function / Vercel API Route / Express)
2. Add your `ANTHROPIC_API_KEY` server-side
3. Update the fetch URL in `src/components/SoulChatbot.jsx`

**Current**: Direct browser call (works with CORS header — add API key for production)

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Glassmorphism nav
│   ├── Hero.jsx            # Center-aligned hero with starfield
│   ├── Projects.jsx        # Stacking scroll cards
│   ├── Sections.jsx        # Marquee, Skills, About, Career, Why, Testimonials, Contact, Footer
│   ├── SoulChatbot.jsx     # AI chatbot with streaming
│   └── ScrollProgress.jsx  # Top progress bar
├── data/
│   └── index.js            # All content data
├── App.jsx
├── main.jsx
└── index.css               # Global styles + CSS variables
```

## 🎨 Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 | UI framework |
| Vite 8 | Build tool |
| Framer Motion | Animations & scroll effects |
| Lucide React | Icons |
| Anthropic Claude API | Soul chatbot AI |
| Web Audio API | Chat notification sounds |
| CSS Variables | Theming system |

## 🖌️ Design Tokens

```css
--bg: #0a0a0f        /* Main background */
--bg2: #111118       /* Section alt background */
--bg3: #18181f       /* Card background */
--accent: #7c6dfa    /* Primary purple */
--accent2: #a78bfa   /* Light purple */
--fg: #f0f0f5        /* Primary text */
--fg2: #a0a0b0       /* Secondary text */
--fg3: #505060       /* Muted text */
--green: #4ade80     /* Online / live dot */
```

## 📝 Customisation

All content is in `src/data/index.js`:
- `projects` — your work
- `experiences` — career history  
- `testimonials` — recommendations
- `skills` — skill tags
- `marqueeItems` — ticker text

---

Built with ❤️ by [Shibin S P](https://linkedin.com/in/shibinsp45) · Kerala, India
