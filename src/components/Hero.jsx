import { useEffect, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function generateStars(n) {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    dur: (Math.random() * 3 + 2).toFixed(1),
    delay: (Math.random() * 3).toFixed(1),
    opacity: Math.random() * 0.7 + 0.2,
  }));
}

export default function Hero() {
  const ref = useRef(null);
  const stars = useMemo(() => generateStars(140), []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} id="home" style={{
      minHeight: '100svh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '80px 2rem 0', position: 'relative', overflow: 'hidden',
      background: 'var(--bg)',
    }}>
      {/* Noise */}
      <div className="noise" />

      {/* Stars */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {stars.map(s => (
          <div key={s.id} style={{
            position: 'absolute', borderRadius: '50%', background: 'var(--fg)',
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.size, height: s.size,
            opacity: s.opacity,
            animation: `blink ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }} />
        ))}
      </div>

      {/* Ambient glows */}
      <div style={{ position: 'absolute', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,109,250,0.15) 0%, transparent 70%)', top: -150, right: -150, animation: 'drift 12s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)', bottom: -100, left: '5%', animation: 'drift 15s ease-in-out 2s infinite reverse', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)', bottom: '20%', right: '15%', animation: 'drift 18s ease-in-out 4s infinite', pointerEvents: 'none' }} />

      {/* Planet glow at bottom */}
      <div className="planet-glow" style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%) translateY(85%)', pointerEvents: 'none' }} />

      {/* Content */}
      <motion.div style={{ y, opacity, position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 860 }}>
        {/* Intro Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ 
            display: 'inline-flex', 
            flexDirection: 'row', 
            alignItems: 'center', 
            gap: '6px',
            padding: '8px 20px', 
            borderRadius: 999, 
            background: 'var(--surface2)', 
            border: '1px solid var(--border)',
            marginBottom: '2rem',
            backdropFilter: 'blur(12px)'
          }}
        >
          <span style={{ fontSize: '0.875rem', color: 'var(--fg2)', fontWeight: 500 }}>
            Hey there, I'm
          </span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: 'var(--fg)', fontWeight: 600, letterSpacing: '-0.01em' }}>
            Shibin S P
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.04em', color: 'var(--fg)', marginBottom: '1.5rem' }}
        >
          A Product Designer<br />
          with focus on<br />
          interactive experiences
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ fontSize: '1rem', color: 'var(--fg2)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 2.5rem' }}
        >
          Specializing in user-centred interfaces and front-end engineering. Currently at Webcastle, Kerala.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7, type: 'spring', stiffness: 100 }}
          style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'nowrap' }}
          className="hero-buttons"
        >
          <motion.a href="#work" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
            className="hero-btn primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', borderRadius: 999, background: 'var(--fg)', color: 'var(--bg)', fontSize: '1rem', fontWeight: 600, letterSpacing: '-0.01em', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap' }}>
            Explore works
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </motion.a>
          <motion.a href="https://drive.google.com/drive/folders/1FMTzFedlti8jhFb-k_y83SzHGbcjUjvF" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
            className="hero-btn secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', borderRadius: 999, background: 'transparent', color: 'var(--fg)', fontSize: '1rem', border: '1.5px solid var(--border2)', cursor: 'pointer', fontWeight: 600, fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap' }}>
            View Resume
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{ display: 'flex', gap: '3rem', justifyContent: 'center', marginTop: '3rem', flexWrap: 'wrap' }}
        >
          {[['4+', 'Years experience'], ['25+', 'Projects shipped'], ['500+', 'Students mentored']].map(([num, lbl]) => (
            <div key={lbl} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: '2.5rem', fontWeight: 300, color: 'var(--fg)', letterSpacing: '-0.03em', lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--fg3)', marginTop: 4, letterSpacing: '0.02em' }}>{lbl}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.35, zIndex: 10 }}>
        <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, var(--fg3), transparent)', animation: 'scroll-line 2s ease-in-out infinite' }} />
        <span style={{ fontSize: '0.7rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em', color: 'var(--fg3)' }}>scroll</span>
      </div>
    </section>
  );
}
