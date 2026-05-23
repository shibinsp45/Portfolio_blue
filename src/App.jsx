import { useState, useEffect } from 'react';
import './index.css';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import SoulChatbot from './components/SoulChatbot';
import { Marquee, Skills, About, Career, Why, Testimonials, Blogs, Contact, Footer } from './components/Sections';

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      className={`back-to-top${visible ? ' visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      title="Back to top"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <div style={{ minHeight: '100vh' }}>
      <ScrollProgress />
      <Navbar dark={dark} toggleTheme={() => setDark(d => !d)} />
      <Hero dark={dark} />
      <About />
      <Projects />
      <Skills />
      <Career />
      <Blogs />
      <Testimonials dark={dark} />
      <Contact />
      <Footer />
      <BackToTop />
      <SoulChatbot />
    </div>
  );

}
