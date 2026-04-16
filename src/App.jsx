import { useState, useEffect } from 'react';
import './index.css';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import SoulChatbot from './components/SoulChatbot';
import { Marquee, Skills, About, Career, Why, Testimonials, Contact, Footer } from './components/Sections';

export default function App() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <div style={{ minHeight: '100vh' }}>
      <ScrollProgress />
      <Navbar dark={dark} toggleTheme={() => setDark(d => !d)} />
      <Hero />
      <Marquee />
      <Skills />
      <Projects />
      <About />
      <Career />
      <Why />
      <Testimonials />
      <Contact />
      <Footer />
      <SoulChatbot />
    </div>
  );
}
