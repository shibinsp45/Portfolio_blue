import { motion } from 'framer-motion';
import { skills, marqueeItems, experiences, testimonials } from '../data/index.js';

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

/* ─── Skills ─── */
export function Skills() {
  return (
    <section className="section" id="skills" style={{ background: 'var(--bg)' }}>
      <div className="max-w">
        <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp} transition={{ duration: 0.7 }}
            style={{ flex: 1, minWidth: 280 }}>
            <div className="eyebrow">Expertise</div>
            <h2 className="section-title">Design<br /><em>superpowers</em></h2>
            <p style={{ marginTop: '1.25rem', fontSize: '0.9rem', color: 'var(--fg2)', lineHeight: 1.7, maxWidth: 300 }}>
              I specialise in the full design-to-code pipeline.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp} transition={{ duration: 0.7, delay: 0.15 }}
            style={{ flex: 2, minWidth: 280, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {skills.map((s, i) => (
              <motion.span key={s.label} className={`skill-tag${s.featured ? ' featured' : ''}`}
                initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={vp} transition={{ duration: 0.4, delay: i * 0.04 }}
                whileHover={{ scale: 1.06 }}>
                {s.label}
              </motion.span>
            ))}
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
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontStyle: 'italic', fontWeight: 300, color: 'var(--fg)', lineHeight: 1.2, margin: 0, letterSpacing: '-0.02em' }}>
            "Craft by <em style={{ color: 'var(--accent2)', fontStyle: 'italic' }}>mind</em>,<br /> design with <em style={{ color: 'var(--accent2)', fontStyle: 'italic' }}>soul</em>."
          </h2>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── About ─── */
export function About() {
  return (
    <section className="section" id="about" style={{ background: 'var(--bg)' }}>
      <div className="max-w">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp} transition={{ duration: 0.7 }}>
          <div className="eyebrow">Who I'am</div>
          <h2 className="section-title">Engineer turned<br /><em>experience designer</em></h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start', marginTop: '3.5rem' }}
          className="about-layout">
          {/* Image */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp} transition={{ duration: 0.8, delay: 0.1 }}>
            <div style={{ borderRadius: 24, overflow: 'hidden', aspectRatio: '4/5', background: 'var(--bg2)', position: 'relative' }}>
              <img src="https://raw.githubusercontent.com/shibinsp45/Lovable-Portfolio/main/public/lovable-uploads/271586bf-e3ab-4edd-a6f9-6916bef817ff.jpg"
                alt="Shibin S P" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => e.target.parentElement.style.background = 'var(--bg3)'}
              />
              {/* Badge */}
              <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', background: 'rgba(10,10,15,0.82)', border: '1px solid var(--border2)', borderRadius: 12, padding: '0.875rem 1.25rem', display: 'flex', alignItems: 'center', gap: 10, backdropFilter: 'blur(12px)' }}>
                <span className="live-dot" />
                <div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--fg)' }}>Open to work</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--fg3)' }}>Kerala, India</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp} transition={{ duration: 0.8, delay: 0.2 }}>
            <p style={{ fontSize: '0.9375rem', color: 'var(--fg2)', lineHeight: 1.8, marginTop: '0.5rem' }}>
              Product designer & front-end developer crafting user-centred interfaces. USING AI AS A PARTNER IN DESIGN AND DEV ,
            </p>

            <div style={{ fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", color: 'var(--fg3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem', marginTop: '2rem' }}>Tools I use daily</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Figma', 'HTML / CSS', 'JavaScript', 'React', 'Framer', 'Webflow', 'Illustrator', 'After Effects'].map(t => (
                <span key={t} className="tool-pill">{t}</span>
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
    <section className="section section--alt" id="journey">
      <div className="max-w">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp} transition={{ duration: 0.7 }}>
          <div className="eyebrow">Career</div>
          <h2 className="section-title">My creative<br /><em>journey</em></h2>
        </motion.div>

        <div style={{ marginTop: '3.5rem' }}>
          {experiences.map((e, i) => (
            <motion.div key={e.role} className="exp-item"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={vp} transition={{ duration: 0.6, delay: i * 0.12 }}
              onMouseEnter={ev => ev.currentTarget.style.backgroundColor = e.hoverColor || 'var(--bg2)'}
              onMouseLeave={ev => ev.currentTarget.style.backgroundColor = 'transparent'}
              style={{ transition: 'background-color 0.4s ease', padding: '2rem' }}
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: '3rem' }} className="why-grid">
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
export function Testimonials() {
  return (
    <section className="section" style={{ background: 'var(--bg)' }}>
      <div className="max-w">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp} transition={{ duration: 0.7 }}>
          <div className="eyebrow">Recommendations</div>
          <h2 className="section-title">What people<br /><em>say</em></h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: '3rem' }} className="testi-grid">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} className="testi-card"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={vp} transition={{ duration: 0.6, delay: i * 0.12 }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {Array(5).fill(0).map((_, j) => <span key={j} style={{ color: 'var(--amber)', fontSize: 14 }}>★</span>)}
              </div>
              <p className="testi-text">"{t.quote}"</p>
              <div className="testi-author">
                <div className="testi-avatar">
                  <img src={t.avatar} alt={t.name} onError={e => e.target.parentElement.style.background = 'var(--bg3)'} />
                </div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.testi-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ─── Contact ─── */
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
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--fg)', lineHeight: 1.1, marginTop: '1.5rem' }}>
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
            style={{ marginTop: '3rem', fontFamily: "'Fraunces', serif", fontSize: 'clamp(1.25rem,2.5vw,1.75rem)', color: 'var(--fg3)', fontStyle: 'italic', transition: 'color 0.3s', display: 'inline-block' }}>
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
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: '1.125rem', fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--fg2)' }}>Shibin S P</div>
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
        <div style={{ fontSize: '0.75rem', color: 'var(--fg3)', fontFamily: "'JetBrains Mono', monospace" }}>© 2025 — Kerala, India</div>
      </div>
    </footer>
  );
}
