import { useState, useRef, useEffect } from 'react';
import { quickQs, followUps } from '../data/index.js';
import logo from '../assets/logo.png';

function useSounds() {
  const ctx = useRef(null);
  const getCtx = () => {
    if (!ctx.current) try { ctx.current = new AudioContext(); } catch { return null; }
    if (ctx.current.state === 'suspended') ctx.current.resume();
    return ctx.current;
  };
  const tn = (f, d, tp = 'square', v = 0.05, dl = 0) => {
    const c = getCtx(); if (!c) return;
    const t = c.currentTime + dl, o = c.createOscillator(), g = c.createGain();
    o.type = tp; o.frequency.setValueAtTime(f, t);
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g).connect(c.destination); o.start(t); o.stop(t + d);
  };
  return {
    open: () => { 
      // Level start-ish
      tn(659, .1); tn(659, .1, 'square', .05, .15); tn(659, .1, 'square', .05, .3);
      tn(523, .1, 'square', .05, .45); tn(659, .1, 'square', .05, .6); tn(783, .1, 'square', .05, .75);
    },
    close: () => { tn(330, .1, 'sine'); tn(262, .15, 'sine', .05, .08); },
    send: () => { 
      // Small jump
      tn(200, .05, 'triangle'); tn(400, .1, 'triangle', .05, .05); tn(800, .1, 'triangle', .05, .1);
    },
    recv: () => { 
      // Coin sound
      tn(987, .08, 'sine', .06); tn(1318, .4, 'sine', .05, .08); 
    },
    bub: () => { tn(1174, .05, 'sine', .04); tn(1567, .2, 'sine', .03, .05); },
  };
}

function getSuggestions(last) {
  const l = last.toLowerCase();
  if (l.includes('project') || l.includes('fudit') || l.includes('invoice')) return followUps.projects;
  if (l.includes('figma') || l.includes('skill') || l.includes('design system')) return followUps.skills;
  if (l.includes('mail') || l.includes('email') || l.includes('whatsapp') || l.includes('contact')) return followUps.contact;
  if (l.includes('webcastle') || l.includes('nuren') || l.includes('kreative') || l.includes('work')) return followUps.work;
  if (l.includes('resume') || l.includes('drive.google')) return followUps.resume;
  return followUps.default;
}

function linkIcon(url) {
  if (url.includes('wa.me')) return <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>;
  if (url.includes('linkedin')) return <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>;
  if (url.includes('instagram')) return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /></svg>;
  if (url.includes('mailto')) return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>;
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>;
}

function renderMarkdown(text) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (match) {
      return (
        <a key={i} href={match[2]} target="_blank" rel="noopener noreferrer" className="inline-chip">
          {linkIcon(match[2])}{match[1]}
        </a>
      );
    }
    return part.split('\n').map((line, j) => (
      j === 0 ? line : [<br key={j} />, line]
    ));
  });
}

const SYSTEM = `You ARE Shibin. Reply in 1-2 SHORT sentences ONLY — max 30 words. Super casual, like texting a friend. No corporate language. No "feel free". Just answer directly.

CRITICAL: NEVER paste raw URLs or emails as visible text. ONLY markdown links:
- [Resume](https://drive.google.com/drive/folders/1FMTzFedlti8jhFb-k_y83SzHGbcjUjvF)
- [WhatsApp](https://wa.me/918606129072)
- [LinkedIn](https://linkedin.com/in/shibinsp45)
- [Instagram](https://instagram.com/shibin_sp45)
- [Email](mailto:shibinsp45@gmail.com)

About you: UI/UX Designer & Front-End Dev. 2.5+ yrs. Kerala, India. Currently at Webcastle (2025). Before: Kreative Sparkz (2024), Nuren AI (2023-24). Skills: Figma, Design Systems, UX, Prototyping, Web Dev, Mobile, AI tools. Projects: Billzy, Fudit, GetFit, GroPlan, Tools App, ElitePath, TeaTym, AJ Delight, Perfume Branding.`;

const SEED = [];

const contactChips = [
  { href: 'https://wa.me/918606129072', label: 'WhatsApp' },
  { href: 'https://linkedin.com/in/shibinsp45', label: 'LinkedIn' },
  { href: 'https://instagram.com/shibin_sp45', label: 'Instagram' },
  { href: 'mailto:shibinsp45@gmail.com', label: 'Email' },
  { href: 'https://drive.google.com/drive/folders/1FMTzFedlti8jhFb-k_y83SzHGbcjUjvF', label: 'Resume' },
];

export default function SoulChatbot() {
  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [bubDismissed, setBubDismissed] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const msgsRef = useRef(null);
  const taRef = useRef(null);
  const lastSent = useRef(0);
  const snd = useSounds();

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.visualViewport) {
        setIsKeyboardOpen(window.visualViewport.height < window.innerHeight * 0.85);
      }
    };
    window.visualViewport?.addEventListener('resize', onResize);
    return () => window.visualViewport?.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (open && msgsRef.current) {
      setTimeout(() => msgsRef.current.scrollTop = msgsRef.current.scrollHeight, 100);
    }
  }, [isKeyboardOpen, open]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 600 && !bubDismissed && !open) {
        setShowBubble(true);
        snd.bub();
        setTimeout(() => { setShowBubble(false); setBubDismissed(true); }, 6000);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [bubDismissed, open]);

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [msgs]);

  useEffect(() => {
    if (taRef.current) {
      taRef.current.style.height = 'auto';
      taRef.current.style.height = Math.min(taRef.current.scrollHeight, 100) + 'px';
    }
  }, [input]);

  const openChat = () => { setOpen(true); setShowBubble(false); setBubDismissed(true); snd.open(); };
  const closeChat = () => { setOpen(false); snd.close(); };

  const sendMsg = async (text) => {
    if (!text.trim() || loading) return;
    const now = Date.now();
    if (now - lastSent.current < 1500) return;
    lastSent.current = now;

    snd.send();
    const userMsg = { role: 'user', content: text.trim() };
    const allMsgs = [...msgs, userMsg];
    setMsgs(allMsgs);
    setInput('');
    if (taRef.current) taRef.current.style.height = 'auto';
    setLoading(true);

    // Mock Response system specifically for the portfolio context
    let ans = "I'm Shibin's personal AI! I can tell you about his projects (like Fudit or Billzy), his experience at Webcastle, his design skills, or how to get his resume/contact him. What's on your mind?";
    const low = text.toLowerCase();
    
    if (low.includes('do you do') || low.includes('who are') || low.includes('about')) {
      ans = "I'm a UI/UX Designer & Product Designer focused on creating soulful digital experiences. I bridge the gap between complex tech and human needs. 🎨";
    } else if (low.includes('project') || low.includes('work') || low.includes('portfolio')) {
      ans = "I've built apps like Billzy (Invoices), Fudit (AI Food), and ProMedic. Most are UX case studies focused on solving real user problems. Want to hear about a specific one?";
    } else if (low.includes('skill') || low.includes('tech') || low.includes('use') || low.includes('tool')) {
      ans = "My toolkit includes Figma, React, Framer, and Adobe Suite. I specialize in Design Systems and Prototyping. I also use AI tools to speed up my design workflow! ⚡";
    } else if (low.includes('contact') || low.includes('reach') || low.includes('hire')) {
      ans = "You can reach me via [Email](mailto:shibinsp45@gmail.com) or [WhatsApp](https://wa.me/918606129072). Also active on [LinkedIn](https://linkedin.com/in/shibinsp45)!";
    } else if (low.includes('resume') || low.includes('cv')) {
      ans = "Sure! You can download/view my [Resume here](https://drive.google.com/drive/folders/1FMTzFedlti8jhFb-k_y83SzHGbcjUjvF).";
    } else if (low.includes('experience') || low.includes('role') || low.includes('where')) {
      ans = "Currently at Webcastle. Previously helped teams at Kreative Sparkz and Nuren AI. I have over 2.5 years of experience in product design.";
    } else if (low.includes('price') || low.includes('cost') || low.includes('budget')) {
      ans = "I'm always open to discussing new projects! Let's connect on [WhatsApp](https://wa.me/918606129072) to talk details.";
    } else if (low.includes('hi') || low.includes('hey') || low.includes('hello')) {
      ans = "Hey there! 👋 I'm Soul, Shibin's AI. Ask me anything about his work, skills, or just how he can help you!";
    } else if (low.length < 10 && !low.includes('?')) {
      ans = "Got it! Feel free to ask me anything about my design journey, specific projects, or how to work together. 😊";
    } else {
      ans = "That's a great question! As an AI, I'm mainly here to talk about Shibin's design work. If you have a specific project in mind, reach out to him directly: [Contact](mailto:shibinsp45@gmail.com)!";
    }

    // Simulate streaming

    // Simulate streaming
    for (let i = 0; i <= ans.length; i++) {
      await new Promise(r => setTimeout(r, 15 + Math.random() * 15));
      const current = ans.slice(0, i);
      setMsgs(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant' && last._streaming) {
          return prev.map((m, idx) => idx === prev.length - 1 ? { ...m, content: current } : m);
        }
        return [...prev, { role: 'assistant', content: current, _streaming: true }];
      });
    }
    
    setMsgs(prev => prev.map(m => m._streaming ? { ...m, _streaming: false } : m));
    snd.recv();
    setLoading(false);
  };

  const lastBotMsg = [...msgs].reverse().find(m => m.role === 'assistant' && !m._streaming);

  return (
    <>
      {/* Bubble */}
      {showBubble && (
        <div className="chat-bubble">
          <button className="bubble-dismiss" onClick={e => { e.stopPropagation(); setShowBubble(false); setBubDismissed(true); }}>✕</button>
          <p>hey 👋 I'm <strong>Soul</strong>, can I help?</p>
        </div>
      )}

      {/* FAB */}
      <button className="chat-fab" onClick={() => open ? closeChat() : openChat()} style={{ fontSize: '1.5rem' }}>
        {open
          ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          : <img src={logo} alt="Soul" className="chat-logo" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
        }
        {!open && <span className="fab-online" />}
      </button>

      {/* Chat window */}
      <div className={`chat-window${open ? ' open' : ''}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-avatar">
            <img src={logo} alt="Soul" className="chat-logo" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
            <span className="chat-avatar-online" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--fg)', letterSpacing: '-0.01em' }}>Soul</div>
            <div className="chat-header-status">Online now</div>
          </div>
          <button className="chat-close-btn" onClick={closeChat}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages" ref={msgsRef}>
          {msgs.length === 0 && (
            <div className="chat-empty">
              <div className="chat-empty-avatar"><img src={logo} alt="Soul" className="chat-logo" style={{ width: '64px', height: '64px', objectFit: 'contain' }} /></div>
              <div className="chat-empty-title">hey, I'm Soul 👋</div>
              <div className="chat-empty-sub">Shibin's AI assistant. Ask me anything about his work, skills, or how to reach him.</div>
              <div className="contact-chips">
                {contactChips.map(c => (
                  <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="contact-chip">
                    {linkIcon(c.href)}{c.label}
                  </a>
                ))}
              </div>
              <div className="quick-questions">
                {quickQs.map(q => (
                  <button key={q} className="quick-q" onClick={() => sendMsg(q)}>{q}</button>
                ))}
              </div>
            </div>
          )}

          {msgs.map((m, i) => (
            <div key={i} className={`msg-row${m.role === 'user' ? ' user' : ''}`}>
              {m.role === 'assistant' && <div className="msg-bot-icon"><img src={logo} alt="Soul" className="chat-logo" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /></div>}
              <div className={`msg-bubble ${m.role === 'assistant' ? 'bot' : 'user'}`}>
                {m.role === 'assistant' ? renderMarkdown(m.content) : m.content}
              </div>
            </div>
          ))}

          {loading && !msgs.find(m => m._streaming) && (
            <div className="msg-row">
              <div className="msg-bot-icon"><img src={logo} alt="Soul" className="chat-logo" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /></div>
              <div className="typing-indicator">
                <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
              </div>
            </div>
          )}

          {!loading && lastBotMsg && msgs.length > 0 && (
            <div className="followup-row">
              {getSuggestions(lastBotMsg.content).map(s => (
                <button key={s} className="followup-btn" onClick={() => sendMsg(s)}>{s}</button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="chat-input-area">
          <div className="chat-input-wrap">
            <textarea
              ref={taRef} value={input} rows={1}
              placeholder="Message Soul…"
              disabled={loading}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(input); } }}
            />
            <button className="chat-send-btn" disabled={!input.trim() || loading} onClick={() => sendMsg(input)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
            </button>
          </div>
          <div className="chat-disclaimer">Soul can make mistakes. Verify important info.</div>
        </div>
      </div>
    </>
  );
}
