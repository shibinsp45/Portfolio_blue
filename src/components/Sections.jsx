import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { skills, marqueeItems, experiences, testimonials, blogs } from '../data/index.js';
import { Gravity, MatterBody } from './ui/gravity';
import { GlowCard } from './ui/spotlight-card';
import { Testimonials as UniqueTestimonials } from './ui/unique-testimonial';
import { Calendar, Award, Users, ShieldCheck, ThumbsUp, Layout, Search, Layers, Component, PenTool, Code, Atom, Sparkles, Palette, Gamepad2, MonitorPlay, MousePointerClick, Bot, PlaySquare, Zap } from 'lucide-react';
import { TextScramble } from './ui/text-scramble';

/* ── Stat card with hover-triggered scramble ── */
function StatCard({ num, label }) {
  const [trigger, setTrigger] = useState(false);
  return (
    <div
      style={{ textAlign: 'center', cursor: 'default', userSelect: 'none' }}
      onMouseEnter={() => setTrigger(true)}
    >
      <TextScramble
        as="div"
        trigger={trigger}
        onScrambleComplete={() => setTrigger(false)}
        duration={0.6}
        speed={0.03}
        characterSet="0123456789"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 'clamp(2rem, 4vw, 2.5rem)',
          fontWeight: 300,
          color: 'var(--fg)',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          transition: 'color 0.2s',
        }}
      >
        {num}
      </TextScramble>
      <div style={{
        fontSize: '0.75rem',
        color: 'var(--fg3)',
        marginTop: 8,
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
      }}>
        {label}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   ParallaxOrb — decorative floating orb that
   drifts at `speed` relative to section scroll.
   Disabled on mobile (max-width < 900px).
────────────────────────────────────────────── */
function ParallaxOrb({ color = 'rgba(124,109,250,0.12)', size = 400, top, left, right, bottom, speed = 0.3 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rawY = useTransform(scrollYProgress, [0, 1], [speed * 120, -(speed * 120)]);
  const y    = useSpring(rawY, { stiffness: 60, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{
        position: 'absolute',
        width: size, height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        top, left, right, bottom,
        pointerEvents: 'none',
        zIndex: 0,
        y,
      }}
    />
  );
}

const fadeUp = { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0 } };
const vp = { once: true, margin: '-60px' };

/* ─── Marquee ─── */
export function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {items.map((t, i) => (
          <div key={i} className="marquee-item">
            <span className="marquee-dot" />{t}
          </div>
        ))}
      </div>
    </div>
  );
}

function SwipeableSkillRow({ row, rowIndex }) {
  const rowRef = useRef(null);
  return (
    <div ref={rowRef} style={{ width: '100%', overflow: 'hidden', position: 'relative', cursor: 'grab' }} className="active:cursor-grabbing">
      <motion.div 
        drag="x"
        dragConstraints={rowRef}
        dragElastic={0.2}
        style={{ display: 'flex', gap: '0.75rem', width: 'max-content', padding: '0.25rem 0' }}
      >
        {row.map((skill, idx) => {
          const playfulColors = [
            '#ffb703', '#ff477e', '#00f5d4', '#b5179e', '#4cc9f0', 
            '#9ef01a', '#ffba08', '#ff8fa3', '#c77dff', '#34d399', 
            '#38bdf8', '#a78bfa', '#fb7185', '#2dd4bf', '#fbbf24'
          ];
          const color = playfulColors[(idx + rowIndex * 10) % playfulColors.length];
          return (
            <motion.div 
              key={skill.label}
              whileTap={{ scale: 0.93, y: -1 }}
              style={{
                padding: '9px 18px',
                borderRadius: '999px',
                background: color,
                border: `1px solid ${color}`,
                color: '#111118', // dark text for high contrast on bright pills
                fontSize: '0.8rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                boxShadow: `0 4px 14px ${color}50`,
                userSelect: 'none'
              }}
            >
              {skill.label}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ─── Skills (Gravity Sandbox) ─── */
export function Skills() {
  const vp = { once: true, amount: 0.2 };
  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const superpowerSkills = [
    { label: "Design Systems",        x: "15%",  y: "10%" },
    { label: "Gamification",          x: "55%",  y: "8%"  },
    { label: "Experience Design",     x: "85%",  y: "14%" },
    { label: "Design Research",       x: "30%",  y: "22%" },
    { label: "User Interface Design", x: "75%",  y: "25%" },
    { label: "Prototyping",           x: "10%",  y: "38%" },
    { label: "Branding",              x: "50%",  y: "35%" },
    { label: "Game UI/UX",            x: "88%",  y: "40%" },
    { label: "Visual Design",         x: "38%",  y: "52%" },
    { label: "Interaction Design",    x: "18%",  y: "55%" },
    { label: "Motion Design",         x: "70%",  y: "55%" },
    { label: "Usability Testing",     x: "25%",  y: "68%" },
    { label: "Information Architecture", x: "60%", y: "65%" },
    { label: "User Journey Mapping",  x: "12%",  y: "80%" },
    { label: "Wireframing",           x: "45%",  y: "78%" },
    { label: "Accessibility",         x: "80%",  y: "75%" },
    { label: "Design Thinking",       x: "35%",  y: "88%" },
    { label: "Figma",                 x: "65%",  y: "88%" },
    { label: "HTML/CSS",              x: "20%",  y: "2%" },
    { label: "React",                 x: "40%",  y: "5%" },
    { label: "Webflow",               x: "70%",  y: "2%" },
    { label: "Illustrator",           x: "5%",   y: "25%" },
    { label: "After Effects",         x: "95%",  y: "20%" },
    { label: "UX Writing",            x: "40%",  y: "20%" },
    { label: "Typography",            x: "60%",  y: "30%" },
    { label: "Agile",                 x: "25%",  y: "45%" },
    { label: "User Flows",            x: "80%",  y: "48%" },
    { label: "A/B Testing",           x: "50%",  y: "65%" },
    { label: "Service Design",        x: "5%",   y: "70%" },
    { label: "Persona Creation",      x: "95%",  y: "85%" },
  ];

  const mapCoordinates = (xPct, yPct) => {
    if (!isMobile) return { x: xPct, y: yPct };
    // Map to a safer inner range on mobile to prevent wall collision/ejection:
    const xVal = parseFloat(xPct);
    const yVal = parseFloat(yPct);
    const newX = 22 + (xVal / 100) * 56; // Maps [0, 100] to [22, 78]
    const newY = 15 + (yVal / 100) * 70; // Maps [0, 100] to [15, 85]
    return { x: `${newX}%`, y: `${newY}%` };
  };

  return (
    <section
      id="skills"
      style={{
        background: 'var(--bg)',
        overflow: 'hidden',
        padding: '6rem 1.25rem',
        position: 'relative',
      }}
    >
      <style>{`
        .skills-layout {
          display: flex;
          flex-direction: row;
          gap: 3rem;
          align-items: stretch;
          max-width: 1200px;
          margin: 0 auto;
        }
        .skills-heading {
          flex: 0 0 280px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1.5rem;
        }
        .skills-sandbox {
          flex: 1 1 0;
          height: 560px;
          position: relative;
          overflow: hidden;
        }
        .skills-sandbox-inner {
          width: 100%;
          height: 100%;
          position: relative;
        }
        .skill-pill {
          padding: 10px 22px;
          border-radius: 999px;
          background: var(--pill-color, var(--bg3));
          border: 1px solid var(--pill-color, var(--border2));
          color: #ffffff;
          font-size: 0.85rem;
          font-weight: 500;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.02em;
          white-space: nowrap;
          cursor: grab;
          user-select: none;
          box-shadow: 0 2px 12px rgba(0,0,0,0.15);
          transition: background 0.25s, border-color 0.25s, color 0.25s, transform 0.25s, box-shadow 0.25s;
          -webkit-tap-highlight-color: transparent;
        }
        .skill-pill:hover {
          background: var(--pill-color, var(--accent));
          color: #ffffff !important;
          border-color: var(--pill-color, var(--accent));
          box-shadow: 0 8px 24px var(--pill-color-glow, rgba(124,109,250,0.35));
          transform: scale(1.08);
        }

        @media (max-width: 1024px) {
          .skills-layout {
            flex-direction: column;
            gap: 2rem;
          }
          .skills-heading {
            flex: none;
            width: 100%;
          }
          .skills-sandbox {
            width: 100%;
            height: 480px;
            border-radius: 20px;
            border: 1px solid var(--border2);
            background: var(--bg2);
          }
          .skills-mobile-container {
            width: 100%;
            background: transparent;
          }
          .skill-pill {
            padding: 9px 18px;
            font-size: 0.78rem;
          }
          .sandbox-hint {
            display: flex !important;
          }
        }

        .sandbox-hint {
          display: none;
          position: absolute;
          bottom: 14px;
          left: 50%;
          transform: translateX(-50%);
          align-items: center;
          gap: 6px;
          font-size: 0.7rem;
          color: var(--fg3);
          font-family: 'JetBrains Mono', monospace;
          pointer-events: none;
          letter-spacing: 0.06em;
          white-space: nowrap;
        }
        .sandbox-hint-desk {
          position: absolute;
          bottom: 14px;
          right: 18px;
          font-size: 0.7rem;
          color: var(--fg3);
          font-family: 'JetBrains Mono', monospace;
          pointer-events: none;
          letter-spacing: 0.06em;
        }
        @media (max-width: 1024px) {
          .sandbox-hint-desk { display: none; }
        }
      `}</style>

      <div className="skills-layout">

        {/* ── Heading ── */}
        <motion.div
          className="skills-heading"
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={vp} transition={{ duration: 0.7 }}
        >
          {/* diamond icon */}
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            border: '1px solid rgba(124,109,250,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(124,109,250,0.12)',
            boxShadow: '0 0 20px rgba(124,109,250,0.2)',
          }}>
            <div style={{
              width: 13, height: 13,
              background: 'var(--accent)',
              transform: 'rotate(45deg)',
              boxShadow: '0 0 8px rgba(124,109,250,0.6)',
            }} />
          </div>

          <div className="eyebrow">Expertise</div>

          <h2 style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', 'Inter', sans-serif",
            fontSize: 'clamp(2rem, 3vw, 3rem)',
            fontWeight: 500,
            color: 'var(--fg)',
            lineHeight: 1.15, margin: 0,
          }}>
            My Design<br /><span style={{ color: 'var(--accent2)', fontStyle: 'normal' }}>Superpowers</span>
          </h2>

          <p style={{ fontSize: '0.875rem', color: 'var(--fg2)', lineHeight: 1.75, maxWidth: 240 }}>
            Grab any skill and toss it around — the playground is yours.
          </p>
        </motion.div>

        {/* ── Gravity Playground ── */}
        <motion.div
          className="skills-sandbox"
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={vp} transition={{ duration: 0.7, delay: 0.15 }}
        >
          <Gravity gravity={{ x: 0, y: 0 }} className="w-full h-full">
            {superpowerSkills.map((skill, idx) => {
              const coords = mapCoordinates(skill.x, skill.y);
              const playfulColors = [
                '#ffb703', '#ff477e', '#00f5d4', '#b5179e', '#4cc9f0', 
                '#9ef01a', '#ffba08', '#ff8fa3', '#c77dff', '#34d399', 
                '#38bdf8', '#a78bfa', '#fb7185', '#2dd4bf', '#fbbf24'
              ];
              const color = playfulColors[idx % playfulColors.length];
              return (
                <MatterBody
                  key={skill.label}
                  matterBodyOptions={{ friction: 0.05, frictionAir: 0.008, restitution: 0.85, density: 0.001 }}
                  x={coords.x} y={coords.y}
                  angle={Math.random() * 16 - 8}
                >
                  <div className="skill-pill" style={{ '--pill-color': color, '--pill-color-glow': `${color}59` }}>
                    {skill.label}
                  </div>
                </MatterBody>
              );
            })}
          </Gravity>
        </motion.div>

      </div>
    </section>
  );
}



/* ─── Quote Section ─── */
export function QuoteSection() {
  return (
    <section className="section" style={{ background: 'var(--bg)', padding: '4rem 2rem', textAlign: 'center' }}>
      <div className="max-w">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp} transition={{ duration: 0.8 }}>
          <h2 style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', 'Inter', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 500, color: 'var(--fg)', lineHeight: 1.2, margin: 0, letterSpacing: '-0.02em' }}>
            "Craft by <span style={{ color: 'var(--accent2)' }}>mind</span>,<br className="mobile-only" /> design with <span style={{ color: 'var(--accent2)' }}>soul</span>."
          </h2>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── About ─── */
export function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'start start'] });
  const rawImgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const imgY    = useSpring(rawImgY, { stiffness: 60, damping: 20 });

  const sectionScale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);

  return (
    <section ref={sectionRef} className="section" id="about" style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      {/* Background orbs */}
      <ParallaxOrb color="rgba(124,109,250,0.08)" size={500} top="-100px" right="-150px" speed={0.4} />
      <ParallaxOrb color="rgba(167,139,250,0.06)" size={350} bottom="-80px" left="-100px" speed={0.25} />

      <motion.div className="max-w" style={{ position: 'relative', zIndex: 1, scale: sectionScale, opacity: sectionOpacity }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp} transition={{ duration: 0.7 }}>
          <div className="eyebrow">Who I'am</div>
          <h2 className="section-title">Engineer turned<br /><em style={{ fontStyle: 'normal' }}>experience designer</em></h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start', marginTop: '3.5rem' }}
          className="about-layout">
          {/* Image — subtle float parallax */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp} transition={{ duration: 0.8, delay: 0.1 }}>
            <motion.div style={{ borderRadius: 24, overflow: 'hidden', aspectRatio: '4/5', background: 'var(--bg2)', position: 'relative', y: imgY }}>
              <img src="https://raw.githubusercontent.com/shibinsp45/Lovable-Portfolio/main/public/lovable-uploads/271586bf-e3ab-4edd-a6f9-6916bef817ff.jpg"
                alt="Shibin S P" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => e.target.parentElement.style.background = 'var(--bg3)'}
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp} transition={{ duration: 0.8, delay: 0.2 }}>
            <p style={{ fontSize: '0.9375rem', color: 'var(--fg2)', lineHeight: 1.8, marginTop: '0.5rem' }}>
              Product designer & front-end developer crafting user-centred interfaces. Using AI as a partner in design and development.
            </p>

            <div style={{ fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", color: 'var(--fg3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem', marginTop: '2rem' }}>Tools I use daily</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '2.5rem' }}>
              {['Figma', 'HTML / CSS', 'JavaScript', 'React', 'Framer', 'Webflow', 'Illustrator', 'After Effects'].map(t => (
                <span key={t} className="tool-pill">{t}</span>
              ))}
            </div>

            {/* Stats */}
            <div className="about-stats-grid">
              {[
                ['3+', 'Years experience'],
                ['15+', 'Projects shipped'],
                ['500+', 'Students mentored']
              ].map(([num, lbl]) => (
                <StatCard key={lbl} num={num} label={lbl} />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        .about-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        @media (max-width: 900px) {
          .about-layout {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
        @media (max-width: 480px) {
          .about-stats-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.75rem;
          }
        }
      `}</style>
    </section>
  );
}


/* ─── Career ─── */
export function Career() {
  return (
    <section className="section section--alt" id="journey" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Parallax orbs */}
      <ParallaxOrb color="rgba(124,109,250,0.09)" size={600} top="-200px" left="-200px"  speed={0.35} />
      <ParallaxOrb color="rgba(74,222,128,0.06)"  size={400} bottom="-100px" right="-100px" speed={0.2} />

      <div className="max-w" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp} transition={{ duration: 0.7 }}>
          <div className="eyebrow">Career</div>
          <h2 className="section-title">My creative<br /><em style={{ fontStyle: 'normal' }}>journey</em></h2>
        </motion.div>

        <div style={{ marginTop: '3.5rem' }}>
          {experiences.map((e, i) => (
            <motion.div key={`${e.role}-${e.company}`} className="exp-item"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={vp} transition={{ duration: 0.6, delay: i * 0.12 }}
              onMouseEnter={ev => ev.currentTarget.style.backgroundColor = e.hoverColor || 'var(--bg2)'}
              onMouseLeave={ev => ev.currentTarget.style.backgroundColor = 'transparent'}
              style={{ transition: 'background-color 0.4s ease' }}
            >
              <div>
                <div className="exp-period">{e.period}</div>
                {e.active && <div className="exp-status">Current</div>}
              </div>
              <div>
                <div className="exp-role">{e.role}</div>
                <div className="exp-company">{e.company}</div>
                <p className="exp-desc">{e.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Why ─── */
export function Why() {
  const cards = [
    { n: '01', title: 'Efficient workflow', desc: 'Streamlined process for rapid delivery — tight deadlines without cutting corners on quality.' },
    { n: '02', title: 'Deeply collaborative', desc: 'I work closely with you, listening first. Your feedback shapes every iteration.' },
    { n: '03', title: 'Attention to detail', desc: 'Meticulous care for every pixel, interaction, and edge case.' },
  ];
  return (
    <section className="section" style={{ background: 'var(--bg)' }}>
      <div className="max-w">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp} transition={{ duration: 0.7 }}>
          <div className="eyebrow">Why work with me</div>
          <h2 className="section-title">What makes me<br /><em style={{ fontStyle: 'normal' }}>different</em></h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginTop: '3rem' }} className="why-grid">
          {cards.map((c, i) => (
            <motion.div key={c.n} className="why-card"
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={vp} transition={{ duration: 0.6, delay: i * 0.12 }}>
              <div className="why-num">{c.n}</div>
              <div className="why-card-title">{c.title}</div>
              <p className="why-card-desc">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .why-grid {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            gap: 16px !important;
            padding: 10px 2px 20px 2px !important;
            scrollbar-width: none;
            -ms-overflow-style: none;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
          }
          .why-grid::-webkit-scrollbar {
            display: none;
          }
          .why-card {
            flex: 0 0 250px !important;
            scroll-snap-align: start;
            padding: 1.5rem !important;
          }
          .why-num {
            font-size: 2.25rem !important;
            margin-bottom: 1rem !important;
          }
          .why-card-title {
            font-size: 1.1rem !important;
          }
          .why-card-desc {
            font-size: 0.8rem !important;
            line-height: 1.6 !important;
          }
        }
      `}</style>
    </section>
  );
}

export function Testimonials({ dark }) {
  return (
    <section className="section" id="testimonials" style={{ background: 'var(--bg)', overflow: 'hidden' }}>
      <div className="max-w">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp} transition={{ duration: 0.7 }}>
          <div className="eyebrow">Recommendations</div>
          <h2 className="section-title">What people<br /><em style={{ fontStyle: 'normal' }}>say</em></h2>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <UniqueTestimonials />
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Blogs ─── */
export function Blogs() {
  const vp = { once: true, amount: 0.2 };
  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

  return (
    <section id="blogs" className="section" style={{ background: 'var(--bg)' }}>
      <div className="max-w">
        <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp} transition={{ duration: 0.7 }}>
          <div className="eyebrow">Articles & Insights</div>
          <h2 className="section-title">Featured Writing</h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '2rem', marginTop: '4rem' }}>
          {blogs.map((blog, idx) => (
            <motion.div key={idx} initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp} transition={{ duration: 0.5, delay: idx * 0.1 }}>
              <GlowCard customSize className="w-full h-full overflow-hidden" glowColor="blue">
              <a 
                href={blog.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="blog-card group"
              >
                {/* Full Card Image Background */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                  <img 
                    src={blog.img} 
                    alt={blog.title} 
                    className="transition-transform duration-500 group-hover:scale-105"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>

                {/* Dark Gradient Overlay */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 20%, rgba(10, 10, 15, 0.4) 50%, rgba(10, 10, 15, 0.95) 100%)', zIndex: 1 }} />

                {/* Year Badge */}
                <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: 'rgba(10, 10, 15, 0.65)', backdropFilter: 'blur(8px)', padding: '0.25rem 0.75rem', borderRadius: 99, fontSize: '0.75rem', fontWeight: 600, color: 'var(--fg)', border: '1px solid var(--border)', zIndex: 2 }}>
                  {blog.year}
                </div>

                {/* Card Content Overlay */}
                <div className="blog-card-content">
                  <h3 className="blog-card-title">{blog.title}</h3>
                  <p className="blog-card-desc">{blog.desc}</p>
                  <div 
                    className="transition-all duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                    style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#a78bfa', fontSize: '0.875rem', fontWeight: 500 }}
                  >
                    Read Article <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                  </div>
                </div>
              </a>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const links = [
    { href: 'mailto:shibinsp45@gmail.com', label: 'Email', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 16, height: 16 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg> },
    { href: 'https://wa.me/8606129072', label: 'WhatsApp', icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg> },
    { href: 'https://www.linkedin.com/in/shibinsp45/', label: 'LinkedIn', icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg> },
  ];

  return (
    <section className="section" id="contact" style={{ background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6rem 1.5rem' }}>
      <div className="max-w" style={{ width: '100%', maxWidth: '640px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp} transition={{ duration: 0.7 }} style={{ width: '100%', textAlign: 'center' }}>
          <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: '1rem' }}>Let's connect</div>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--fg)', lineHeight: 1.1, marginBottom: '2.5rem' }}>
            Got a project<br />in <em style={{ fontStyle: 'italic', color: 'var(--accent2)' }}>mind?</em>
          </h2>
          <p style={{ color: 'var(--fg2)', margin: '1.5rem auto', maxWidth: 400, lineHeight: 1.7, fontSize: '0.9375rem' }}>
            Whether it's a new product, a redesign, or just a chat about design — I'm always happy to connect.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginTop: '2.5rem' }}>
            {links.map(l => (
              <motion.a key={l.label} href={l.href} target={l.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
                className="contact-link" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                {l.icon}{l.label}
              </motion.a>
            ))}
          </div>
          <motion.a href="mailto:shibinsp45@gmail.com"
            whileHover={{ color: 'var(--accent2)' }}
            style={{ marginTop: '3rem', fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1.25rem,2.5vw,1.75rem)', color: 'var(--fg3)', fontStyle: 'italic', transition: 'color 0.3s', display: 'inline-block' }}>
            shibinsp45@gmail.com →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
export function Footer() {
  return (
    <footer style={{ padding: '3rem 2rem', background: 'var(--bg2)' }}>
      <style>{`
        .footer-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        @media (max-width: 600px) {
          .footer-content {
            flex-direction: column;
            text-align: center;
            align-items: center;
            gap: 1.25rem;
          }
          .footer-links {
            justify-content: center;
          }
        }
      `}</style>
      <div className="max-w footer-content">
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.125rem', fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--fg2)' }}>Shibin S P</div>
        <div className="footer-links" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {[['#work', 'Work'], ['#about', 'About'], ['#journey', 'Journey'], ['https://linkedin.com/in/shibinsp45', 'LinkedIn']].map(([href, label]) => (
            <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
              style={{ fontSize: '0.8125rem', color: 'var(--fg3)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--fg)'}
              onMouseLeave={e => e.target.style.color = 'var(--fg3)'}>
              {label}
            </a>
          ))}
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--fg3)', fontFamily: "'JetBrains Mono', monospace" }}>© 2025 — Shibin S P</div>
      </div>
    </footer>
  );
}
