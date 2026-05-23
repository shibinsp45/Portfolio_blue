import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { skills, marqueeItems, experiences, testimonials, blogs } from '../data/index.js';
import { Gravity, MatterBody } from './ui/gravity';
import { GlowCard } from './ui/spotlight-card';
import { TestimonialCard } from './ui/testimonial-cards';
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

/* ─── Skills (Gravity physics) ─── */
export function Skills() {
  // Assign a colour palette that matches the portfolio accent system
  const palette = [
    '#7c6dfa', '#a78bfa', '#c4b5fd',
    '#6ee7b7', '#34d399', '#fbbf24',
    '#f472b6', '#60a5fa', '#fb923c',
    '#4ade80', '#e879f9', '#38bdf8',
    '#facc15', '#f87171',
  ];

  // Spread positions so pills start staggered across the sandbox
  const positions = [
    { x: '15%', y: '5%'  }, { x: '40%', y: '2%'  }, { x: '65%', y: '8%'  },
    { x: '85%', y: '3%'  }, { x: '25%', y: '18%' }, { x: '55%', y: '15%' },
    { x: '75%', y: '20%' }, { x: '10%', y: '30%' }, { x: '45%', y: '28%' },
    { x: '70%', y: '35%' }, { x: '20%', y: '45%' }, { x: '50%', y: '42%' },
    { x: '80%', y: '40%' }, { x: '35%', y: '55%' },
  ];

  return (
    <section className="section" id="skills" style={{ background: 'var(--bg)', overflow: 'hidden' }}>
      <div className="max-w">
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>

          {/* ── Left: heading ── */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={vp} transition={{ duration: 0.7 }}
            style={{ flex: '1 1 260px' }}
          >
            <div className="eyebrow">Expertise</div>
            <h2 className="section-title">Design<br /><em>superpowers</em></h2>
            <p style={{ marginTop: '1.25rem', fontSize: '0.9rem', color: 'var(--fg2)', lineHeight: 1.7, maxWidth: 300 }}>
              I specialise in the full design-to-code pipeline. Grab a skill and toss it around!
            </p>
          </motion.div>

          {/* ── Right: physics sandbox ── */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={vp} transition={{ duration: 0.7, delay: 0.15 }}
            className="flex-[2] min-w-[280px] min-h-[420px] relative rounded-[20px]"
          >
            <GlowCard customSize className="w-full h-full overflow-hidden" glowColor="purple" style={{ borderRadius: 20 }}>
            <Gravity gravity={{ x: 0, y: 1 }} className="w-full h-full">
              {skills.map((skill, i) => {
                const palette = ['#7c6dfa', '#4ade80', '#fbbf24', '#f472b6', '#38bdf8'];
                
                const getSkillIcon = (label) => {
                  switch (label) {
                    case 'User Interface Design': return <Layout size={14} />;
                    case 'UX Research': return <Search size={14} />;
                    case 'Prototyping': return <Layers size={14} />;
                    case 'Design Systems': return <Component size={14} />;
                    case 'Figma': return <PenTool size={14} />;
                    case 'Front-end Dev': return <Code size={14} />;
                    case 'React': return <Atom size={14} />;
                    case 'Branding': return <Sparkles size={14} />;
                    case 'Visual Design': return <Palette size={14} />;
                    case 'Gamification': return <Gamepad2 size={14} />;
                    case 'Game UI/UX': return <MonitorPlay size={14} />;
                    case 'Interaction Design': return <MousePointerClick size={14} />;
                    case 'AI Integration': return <Bot size={14} />;
                    case 'Motion Design': return <PlaySquare size={14} />;
                    default: return <Zap size={14} />;
                  }
                };

                return (
                  <MatterBody
                    key={skill.label}
                    matterBodyOptions={{ friction: 0.1, restitution: 0.8, density: 0.001 }}
                    x={`${20 + Math.random() * 60}%`}
                    y={`${10 + Math.random() * 40}%`}
                    angle={Math.random() * 20 - 10}
                  >
                  <div style={{
                    padding: '10px 20px',
                    borderRadius: 999,
                    background: skill.featured
                      ? palette[i % palette.length]
                      : 'var(--surface)',
                    border: skill.featured
                      ? 'none'
                      : '1px solid var(--border2)',
                    color: skill.featured ? '#fff' : 'var(--fg2)',
                    fontSize: '0.82rem',
                    fontWeight: skill.featured ? 600 : 500,
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: '0.01em',
                    whiteSpace: 'nowrap',
                    cursor: 'grab',
                    userSelect: 'none',
                    boxShadow: skill.featured
                      ? `0 4px 20px ${palette[i % palette.length]}55`
                      : '0 2px 8px rgba(0,0,0,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    {getSkillIcon(skill.label)}
                    {skill.label}
                  </div>
                </MatterBody>
              )})}
            </Gravity>
            </GlowCard>
          </motion.div>

        </div>
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
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(2.25rem, 6vw, 4rem)', fontStyle: 'italic', fontWeight: 300, color: 'var(--fg)', lineHeight: 1.2, margin: 0, letterSpacing: '-0.02em' }}>
            "Craft by <em style={{ color: 'var(--accent2)', fontStyle: 'italic' }}>mind</em>,<br className="mobile-only" /> design with <em style={{ color: 'var(--accent2)', fontStyle: 'italic' }}>soul</em>."
          </h2>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── About ─── */
export function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const rawImgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const imgY    = useSpring(rawImgY, { stiffness: 60, damping: 20 });

  return (
    <section ref={sectionRef} className="section" id="about" style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      {/* Background orbs */}
      <ParallaxOrb color="rgba(124,109,250,0.08)" size={500} top="-100px" right="-150px" speed={0.4} />
      <ParallaxOrb color="rgba(167,139,250,0.06)" size={350} bottom="-80px" left="-100px" speed={0.25} />

      <div className="max-w" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp} transition={{ duration: 0.7 }}>
          <div className="eyebrow">Who I'am</div>
          <h2 className="section-title">Engineer turned<br /><em>experience designer</em></h2>
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
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: '1.5rem', 
              justifyContent: 'space-between',
              marginBottom: '3rem'
            }}>
              {[['4+', 'Years experience'], ['25+', 'Projects shipped'], ['500+', 'Students mentored']].map(([num, lbl]) => (
                <StatCard key={lbl} num={num} label={lbl} />
              ))}
            </div>

            {/* Why work with me / What makes me different */}
            <div style={{ fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", color: 'var(--fg3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>What makes me different</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { title: 'Efficient workflow', desc: 'Streamlined process for rapid delivery — tight deadlines without cutting corners on quality.' },
                { title: 'Deeply collaborative', desc: 'I work closely with you, listening first. Your feedback shapes every iteration.' },
                { title: 'Attention to detail', desc: 'Meticulous care for every pixel, interaction, and edge case.' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.5rem', fontFamily: "'Inter', sans-serif", fontStyle: 'italic', color: 'var(--accent2)', fontWeight: 300, minWidth: '28px', lineHeight: 1 }}>
                    0{idx + 1}
                  </span>
                  <div>
                    <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--fg)', marginBottom: '0.25rem' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--fg2)', lineHeight: 1.65 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`@media(max-width:900px){.about-layout{grid-template-columns:1fr!important;gap:2.5rem!important}}`}</style>
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
          <h2 className="section-title">My creative<br /><em>journey</em></h2>
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
    { n: '01', title: 'Efficient workflow', desc: 'Streamlined process for rapid delivery — tight deadlines without cutting corners on quality or craft.' },
    { n: '02', title: 'Deeply collaborative', desc: 'I work closely with you, listening first. Your feedback shapes every iteration until the design exceeds expectations.' },
    { n: '03', title: 'Attention to detail', desc: 'Meticulous care for every pixel, interaction, and edge case. The small things are what make great products.' },
  ];
  return (
    <section className="section" style={{ background: 'var(--bg)' }}>
      <div className="max-w">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp} transition={{ duration: 0.7 }}>
          <div className="eyebrow">Why work with me</div>
          <h2 className="section-title">What makes me<br /><em>different</em></h2>
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
      <style>{`@media(max-width:900px){.why-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ─── Testimonials ─── */
export function Testimonials({ dark }) {
  const [positions, setPositions] = useState(["front", "middle", "back"]);

  const handleShuffle = () => {
    const newPositions = [...positions];
    newPositions.unshift(newPositions.pop());
    setPositions(newPositions);
  };

  return (
    <section className="section" style={{ background: 'var(--bg)', overflow: 'hidden' }}>
      <div className="max-w">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp} transition={{ duration: 0.7 }}>
          <div className="eyebrow">Recommendations</div>
          <h2 className="section-title" style={{ marginBottom: '4.5rem' }}>What people<br /><em>say</em></h2>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid place-content-center"
        >
          <div className="relative h-64 w-64 md:h-80 md:w-80 mx-auto mt-8 mb-16" style={{ perspective: 1000 }}>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.name}
                testimonial={testimonial.quote}
                author={`${testimonial.name} - ${testimonial.role}`}
                avatar={testimonial.avatar}
                handleShuffle={handleShuffle}
                position={positions[index]}
              />
            ))}
          </div>
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
          {blogs.map((blog, idx) => (
            <motion.div key={idx} initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp} transition={{ duration: 0.5, delay: idx * 0.1 }}>
              <GlowCard customSize className="w-full h-full overflow-hidden" glowColor="blue">
              <a 
                href="#"
                className="blog-card"
                style={{ display: 'block', borderRadius: '1.5rem', overflow: 'hidden', background: 'var(--surface)', textDecoration: 'none', height: '100%', border: '1px solid var(--border)' }}
              >
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                  <img src={blog.img} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--surface)', padding: '0.25rem 0.75rem', borderRadius: 99, fontSize: '0.75rem', fontWeight: 600, color: 'var(--fg)', border: '1px solid var(--border)' }}>
                    {blog.year}
                  </div>
                </div>
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--fg)', marginBottom: '1rem', fontWeight: 600 }}>{blog.title}</h3>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--fg2)', lineHeight: 1.6 }}>{blog.desc}</p>
                  <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent2)', fontSize: '0.875rem', fontWeight: 500 }}>
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
    { href: 'mailto:shibinsp45@gmail.com', label: 'Email', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 18, height: 18 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg> },
    { href: 'https://wa.me/8606129072', label: 'WhatsApp', icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg> },
    { href: 'https://www.linkedin.com/in/shibinsp45/', label: 'LinkedIn', icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg> },
  ];
  return (
    <section className="section" id="contact" style={{ background: 'var(--bg)', textAlign: 'center' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp} transition={{ duration: 0.7 }}>
          <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: 0 }}>Let's connect</div>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--fg)', lineHeight: 1.1, marginTop: '1.5rem' }}>
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
    <footer style={{ padding: '3rem 2rem', borderTop: '1px solid var(--border)', background: 'var(--bg2)' }}>
      <div className="max-w" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.125rem', fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--fg2)' }}>Shibin S P</div>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
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
