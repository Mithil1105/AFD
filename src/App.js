import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { HashRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiLinkedin, FiInstagram, FiMail, FiSun, FiMoon } from 'react-icons/fi';

import './styles/about.css';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';

function useScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
}


function Section({ title, subtitle, children, id }) {
  return (
    <section className="section" id={id}>
      <div className="container">
        {(title || subtitle) && (
          <div className="section-header">
            {title && <h2 className="section-title">{title}</h2>}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

// Removed unused Tag component to clear linter warnings


function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [theme, setTheme] = useState(() => (localStorage.getItem('theme') || document.documentElement.getAttribute('data-theme') || 'night'));
  const menuRef = useRef(null);
  const btnRef = useRef(null);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const focusable = menuRef.current?.querySelectorAll('a, button');
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];
    const handleKey = (e) => {
      if (e.key === 'Escape') { setOpen(false); btnRef.current?.focus(); }
      if (e.key === 'Tab' && focusable?.length) {
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', handleKey);
    first && first.focus();
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <header className={`site-header ${solid ? 'solid' : 'transparent'}`}>
      <div className="container nav">
        <NavLink to="/" className="brand">Amit Fibre Decor</NavLink>
        <nav className="nav-links" aria-label="Primary">
          <NavLink to="/" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>About</NavLink>
          <NavLink to="/projects" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Projects</NavLink>
          <NavLink to="/contact" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Contact</NavLink>
        </nav>
        <div className="nav-actions">
          <button
            className="icon-btn"
            aria-label="Toggle theme"
            onClick={() => {
              const next = theme === 'night' ? 'day' : 'night';
              setTheme(next);
              document.documentElement.setAttribute('data-theme', next);
              localStorage.setItem('theme', next);
            }}
            title="Toggle theme"
          >{theme === 'night' ? <FiSun /> : <FiMoon />}</button>

          <button className="hamburger" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)} ref={btnRef} aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
      <AnimatePresence>{open && (
        <motion.nav id="mobile-menu" className="mobile-menu" ref={menuRef}
          initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
        >
          <div className="container" style={{ paddingBottom: 12 }}>
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/about" className="nav-link">About</NavLink>
            <NavLink to="/projects" className="nav-link">Projects</NavLink>
            <NavLink to="/contact" className="nav-link">Contact</NavLink>
          </div>
        </motion.nav>
      )}</AnimatePresence>
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">Amit Fibre Decor</div>
          <p className="footer-muted">Sustainable Tourism & Forest Solutions</p>
          <div className="socials" aria-label="Social links">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FiInstagram /></a>
            <a href="mailto:hello@amitfibredecor.example" aria-label="Email"><FiMail /></a>
          </div>
          <div style={{ marginTop: 12 }}>
            <p className="footer-muted" style={{ margin: 0 }}>Contact: <a href="tel:+919898717128">9898717128</a></p>
            <p className="footer-muted" style={{ margin: 0 }}>Email: <a href="mailto:amitfibredecor@gmail.com">amitfibredecor@gmail.com</a></p>
            <p className="footer-muted" style={{ margin: 0 }}>Address: <a href="https://maps.app.goo.gl/csgbTebTWbqQv5EWA" target="_blank" rel="noopener noreferrer">Amit Fibre Decor, B/10 Sankalp estate, Rakhial, Ahmedabad, Gujarat</a></p>
          </div>
        </div>
        <div>
          <div className="footer-brand">Quick links</div>
          <nav aria-label="Footer">
            <ul>
              <li><NavLink to="/about" className="footer-muted">About</NavLink></li>
              <li><NavLink to="/projects" className="footer-muted">Projects</NavLink></li>
              <li><NavLink to="/contact" className="footer-muted">Contact</NavLink></li>
            </ul>
          </nav>
        </div>
        <div>
          <div className="footer-brand">Contact</div>
          <p className="footer-muted">Ahmedabad, Gujarat, India</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {year} Amit Fibre Decor</span>
        <span className="footer-muted">Designing journeys, preserving forests.</span>
      </div>
    </footer>
  );
}


function AboutPage() {
  return (
    <main id="main">
      <section className="about-hero" aria-labelledby="about-hero-title">
        <div className="about-hero__overlay"></div>
        <div className="container about-hero__inner">
          <h1 id="about-hero-title" className="about-hero__title">About Amit Fibre Decor</h1>
          <p className="about-hero__sub">Amit Fibre Decor partners with agencies and communities to create tourism experiences that protect nature while celebrating India’s rich cultural heritage.</p>
        </div>
      </section>

      <section className="about-founder">
        <div className="container about-founder__grid">
          <div>
            <h2>Anand Tike</h2>
            <p>With a Post Diploma in Sculpture earned in 2002, Anand Tike has dedicated over two decades to creating monumental works that bridge traditional Indian artistry with contemporary conservation needs.</p>
            <p>His vision extends beyond mere aesthetics—each sculpture, each interpretation centre, and each project serves as a bridge between human communities and the natural world, fostering understanding and respect for our shared environment.</p>
          </div>
          <div className="about-founder__right">
            <article className="about-card" aria-label="Conservation Impact">
              <div className="about-card__title">Conservation Impact</div>
              <p className="about-card__text">Contributed to wildlife interpretation centres across 15+ national parks and sanctuaries.</p>
            </article>
            <article className="about-card" aria-label="Scientific Collaboration">
              <div className="about-card__title">Scientific Collaboration</div>
              <p className="about-card__text">Works closely with IFS officers, ornithologists, and WII experts for accuracy.</p>
            </article>
            <article className="about-card" aria-label="Cultural Heritage">
              <div className="about-card__title">Cultural Heritage</div>
              <p className="about-card__text">Preserves traditional techniques while innovating for modern conservation needs.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="about-timeline">
        <div className="container">
          <div className="about-timeline__head">
            <h2 className="about-timeline__title">Major Achievements</h2>
            <p className="about-timeline__sub">A selection of landmark works underscoring our cultural and conservation impact.</p>
          </div>
          <div className="about-timeline__grid">
            {[
              { y: '2023', t: 'Lion Pride Sculpture — Ambardi', d: 'Record-setting ferro-cement wildlife composition commissioned by TCGL.', k: 'accent' },
              { y: '2022', t: 'Namami Gange Exhibits', d: 'Eco-education exhibits in collaboration with WII for river conservation.', k: 'secondary' },
              { y: '2019', t: 'Shivrajpur Beach Gates', d: 'Iconic coastal gateways enhancing visitor experience and identity.', k: 'gold' },
              { y: '2016', t: 'Pandit Deendayal Bronze', d: 'Reliance Circle civic landmark bronze statue in Gandhinagar.', k: 'gold' }
            ].map((a, i) => (
              <article key={i} className="about-timeline__card" aria-label={`${a.y} — ${a.t}`}>
                <div className="about-timeline__badge">{a.y}</div>
                <div className="about-timeline__disc" aria-hidden>✨</div>
                <div className="about-timeline__title-sm">{a.t}</div>
                <div className="about-timeline__blurb">{a.d}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-team">
        <div className="container">
          <div className="about-team__head">
            <h2 className="about-team__title">Meet Our Team</h2>
            <p className="about-team__sub">A dedicated team of artists, engineers, and cultural specialists committed to excellence in every project.</p>
          </div>
          <div className="about-team__grid">
            <article className="about-team__card" aria-labelledby="anand-heading">
              <h3 id="anand-heading">Anand Tike</h3>
              <div className="about-team__badge">Founder & Lead Sculptor</div>
              <p className="about-team__muted" style={{ marginTop: 8 }}>Qualification: Post Diploma in Sculpture (2002)</p>
              <p className="about-team__muted">Experience: 20+ years</p>
              <p><span className="about-team__label">Specialization:</span> Monumental sculpture, conservation-aligned design</p>
            </article>
            <article className="about-team__card" aria-labelledby="mayur-heading">
              <h3 id="mayur-heading">Mayur Vakani</h3>
              <div className="about-team__badge">Project Director</div>
              <p className="about-team__muted" style={{ marginTop: 8 }}>Qualification: Project Management</p>
              <p className="about-team__muted">Experience: 10+ years</p>
              <p><span className="about-team__label">Specialization:</span> Project leadership, forest conservation initiatives</p>
            </article>
            <article className="about-team__card" aria-labelledby="hemali-heading">
              <h3 id="hemali-heading">Hemali Vakani</h3>
              <div className="about-team__badge">Design Coordinator</div>
              <p className="about-team__muted" style={{ marginTop: 8 }}>Qualification: Diploma in Sculpture</p>
              <p className="about-team__muted">Experience: 15+ years</p>
              <p><span className="about-team__label">Specialization:</span> Cross-disciplinary design, cultural storytelling</p>
            </article>
          </div>
        </div>
      </section>

      <section className="about-empanel">
        <div className="container">
          <h2>Empanelments & Recognition</h2>
          <ul className="about-empanel__grid">
            <li className="about-pill"><span className="about-pill__dot"></span> Lalitkala Academy – Approved Sculptor</li>
            <li className="about-pill"><span className="about-pill__dot"></span> iNDEXTb – Registered Vendor</li>
            <li className="about-pill"><span className="about-pill__dot"></span> Heritage Authority of Rajasthan – Empanelled Artist</li>
            <li className="about-pill"><span className="about-pill__dot"></span> GEER Foundation – Conservation Partner</li>
            <li className="about-pill"><span className="about-pill__dot"></span> Ministry of Environment – Interpretation Centre Specialist</li>
          </ul>
        </div>
      </section>
    </main>
  );
}


function ContactPage() {
  return (
    <main id="main" className="container">
      <Section title="Let’s build responsibly.">
        <div className="two-col">
          <div className="contact-block">
            <h3 style={{ marginTop: 0 }}>Contact</h3>
            <p className="footer-muted">Phone: <a href="tel:+919898717128">9898717128</a></p>
            <p className="footer-muted">Email: <a href="mailto:amitfibredecor@gmail.com">amitfibredecor@gmail.com</a></p>
            <p className="footer-muted">Address: <a href="https://maps.app.goo.gl/csgbTebTWbqQv5EWA" target="_blank" rel="noopener noreferrer">Amit Fibre Decor, B/10 Sankalp estate, Rakhial, Ahmedabad, Gujarat</a></p>
          </div>
          <div className="contact-block" aria-label="Google Maps preview">
            <iframe
              title="Amit Fibre Decor location"
              src="https://www.google.com/maps?q=Amit%20Fibre%20Decor%20B%2F10%20Sankalp%20estate%20Rakhial%20Ahmedabad%20Gujarat&output=embed"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: 12 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Section>
    </main>
  );
}

function AppShell() {
  useScrollToTop();
  const location = useLocation();
  return (
    <div>
      <Header />
      <AnimatePresence mode="wait">
        <motion.div key={location.pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  );
}
