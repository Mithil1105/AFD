import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { HashRouter, Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiLinkedin, FiInstagram, FiMail, FiSun, FiMoon } from 'react-icons/fi';
import { MdMap } from 'react-icons/md';
import { GiTreehouse } from 'react-icons/gi';
import { TbTrees } from 'react-icons/tb';

function useScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
}

function Button({ as: As = 'button', variant = 'primary', size = 'md', to, href, children, className = '', ...rest }) {
  const classes = ['btn', `btn-${variant}`, `btn-${size}`, className].join(' ').trim();
  if (As === 'a' || href) return <a className={classes} href={href || to} {...rest}>{children}</a>;
  if (As === NavLink && to) return <NavLink className={({ isActive }) => classes + (isActive ? ' active' : '')} to={to} {...rest}>{children}</NavLink>;
  if (As === 'link' && to) return <NavLink className={classes} to={to} {...rest}>{children}</NavLink>;
  return <As className={classes} {...rest}>{children}</As>;
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

function Modal({ isOpen, onClose, title, children, initialFocusRef }) {
  const backdropRef = useRef(null);
  const lastActive = useRef(null);
  useEffect(() => {
    if (!isOpen) return;
    lastActive.current = document.activeElement;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    if (initialFocusRef?.current) initialFocusRef.current.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      if (lastActive.current && lastActive.current.focus) lastActive.current.focus();
    };
  }, [isOpen, onClose, initialFocusRef]);

  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={title}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onMouseDown={(e) => { if (e.target === backdropRef.current) onClose(); }} ref={backdropRef}
      >
        <motion.div className="modal-dialog" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }}>
          <div className="modal-header">
            <h3 style={{ margin: 0 }}>{title}</h3>
            <button className="modal-close" onClick={onClose} aria-label="Close modal"><FiX /></button>
          </div>
          <div className="modal-body">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

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

function HomePage() {
  const navigate = useNavigate();
  return (
    <main id="main">
      <div className="hero">
        <span className="glow-sweep" aria-hidden="true"></span>
        <div className="stars" aria-hidden="true"></div>
        <div className="container">
          <h1>Amit Fibre Decor</h1>
          <h2>Sustainable Tourism & Forest Solutions</h2>
          <p>We design eco-tourism experiences and build forest infrastructure that respects habitats.</p>
          <div className="hero-ctas">
            <Button onClick={() => navigate('/projects')} variant="primary" size="lg">View Projects</Button>
            <Button as={'link'} to={'/contact'} variant="outline" size="lg">Contact Us</Button>
          </div>
        </div>
      </div>

      <Section title="What We Do">
        <div className="grid">
          <div className="card">
            <span className="icon" aria-hidden="true"><MdMap /></span>
            <h3>Eco-Tourism Planning</h3>
            <p>Visitor journeys, capacity planning, route design, and interpretive storytelling.</p>
          </div>
          <div className="card">
            <span className="icon" aria-hidden="true"><GiTreehouse /></span>
            <h3>Forest Infrastructure</h3>
            <p>Boardwalks, shelters, viewing decks, and low-impact amenities engineered for longevity.</p>
          </div>
          <div className="card">
            <span className="icon" aria-hidden="true"><TbTrees /></span>
            <h3>Restoration & Trails</h3>
            <p>Trail building, erosion control, habitat buffers, and safety-first signage.</p>
          </div>
        </div>
      </Section>
    </main>
  );
}

function AboutPage() {
  return (
    <main id="main" className="container">
      <Section title="About">
        <p>
          Amit Fibre Decor partners with agencies and communities to create tourism experiences that protect nature.
        </p>
      </Section>
      <Section title="Our Values">
        <div className="grid">
          {[
            { t: 'Sustainability', d: 'Low-impact materials, circular design, long service life.' },
            { t: 'Community', d: 'Local jobs, local knowledge, shared stewardship.' },
            { t: 'Safety', d: 'Risk-assessed trails, compliant structures, clear wayfinding.' },
            { t: 'Compliance', d: 'Environmental clearances, standards adherence, transparent reporting.' }
          ].map((p) => (
            <div className="card" key={p.t}>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Meet our team" subtitle="The people who deliver.">
        <div className="team-grid">
          {[
            {
              n: 'Mayur Vakani',
              r: 'Project Lead',
              img: '/assets/about/mayur-vakani.jpeg',
              bio: 'Mayur brings strategic vision and project management expertise to every tourism and forest conservation initiative.',
              quote: 'Every project is an opportunity to create lasting positive impact on both communities and ecosystems.',
              achievements: ['10+ years project management', 'Forest conservation specialist', 'Community engagement expert']
            },
            {
              n: 'Hemali Vakani',
              r: 'Design & Community',
              img: '/assets/about/hemali.jpeg',
              bio: 'Born with an eye for detail and a heart drawn to textures and forms, Hemali guides our design philosophy with hands-on experience.',
              quote: 'I believe that design can make the invisible visible—giving form to emotions, memories, and ideas that exist beyond words.',
              achievements: ['Diploma in Sculpture', '15+ years cross-disciplinary practice', 'Featured in national exhibitions']
            },
            {
              n: 'Anand Tike',
              r: 'Engineering & Safety',
              img: 'https://source.unsplash.com/random/640x480?sig=23&portrait',
              bio: 'Anand ensures every structure meets the highest safety standards while maintaining harmony with natural environments.',
              quote: 'Engineering excellence means building not just for today, but for generations to come.',
              achievements: ['Civil Engineering degree', 'Safety compliance specialist', 'Sustainable construction expert']
            }
          ].map((m) => (
            <div className="team-card" key={m.n}>
              <div className="team-media">
                <img src={m.img} alt={`${m.n} portrait`} />
              </div>
              <div>
                <div className="team-header"><h3>{m.n}</h3></div>
                <p className="team-role">{m.r}</p>
                <p>{m.bio}</p>
                <div className="team-quote">{m.quote}</div>
                <ul className="team-list">
                  {m.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
                <div className="team-socials">
                  <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
                  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FiInstagram /></a>
                  <a href="mailto:amitfibredecor@gmail.com" aria-label="Email"><FiMail /></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}

const PROJECTS = [
  { id: 1, title: 'Eco Trail Signage – Gir Forest', category: 'Forest', year: 2024, location: 'Gir, Gujarat', desc: 'Modular reflective wayfinding with habitat-safe anchors.', details: 'A modular wayfinding system with reflective, low-energy materials and habitat-safe anchors.' },
  { id: 2, title: 'Visitor Centre Revamp – Saputara', category: 'Tourism', year: 2023, location: 'Saputara, Dang', desc: 'Exhibit routing and shade-first queuing with native finishes.', details: 'Exhibit routing, ticketing flow, and shade-first queuing with native material finishes.' },
  { id: 3, title: 'Wetland Boardwalk – Nalsarovar', category: 'Forest', year: 2023, location: 'Nalsarovar, Gujarat', desc: 'Elevated boardwalk with erosion control.', details: 'Elevated boardwalk with erosion control and bird-safe sightlines.' },
  { id: 4, title: 'Heritage Trail – Polo Forest', category: 'Tourism', year: 2022, location: 'Vijaynagar, Gujarat', desc: 'Interpretive nodes and emergency wayfinding.', details: 'Interpretive nodes, rest points, and emergency wayfinding integrated into ruins.' },
  { id: 5, title: 'Canopy Lookout – Shoolpaneshwar', category: 'Forest', year: 2022, location: 'Narmada, Gujarat', desc: 'Lightweight lookout with FRP beams.', details: 'Lightweight lookout deck with fibre-reinforced beams and wind-tested rails.' },
  { id: 6, title: 'Campsite Amenities – Banni Grasslands', category: 'Tourism', year: 2021, location: 'Kutch, Gujarat', desc: 'Low-impact sanitation and night-safe lighting.', details: 'Low-impact sanitation, night-safe lighting, and waste segregation points.' },
  { id: 7, title: 'Riverfront Trail Links', category: 'Tourism', year: 2021, location: 'Ahmedabad, Gujarat', desc: 'Seating pods and cyclist-safe merge zones.', details: 'Seating pods, native planting pockets, and cyclist-safe merge zones.' },
  { id: 8, title: 'Habitat Buffer Fencing', category: 'Forest', year: 2020, location: 'Girnar, Gujarat', desc: 'Non-intrusive fences with animal corridors.', details: 'Non-intrusive fencing with animal corridors and maintenance gates.' }
];

function ProjectsPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [openId, setOpenId] = useState(null);

  const filtered = PROJECTS.filter((p) =>
    (filter === 'All' || p.category === filter) && p.title.toLowerCase().includes(query.toLowerCase())
  );

  const current = PROJECTS.find((p) => p.id === openId);

  return (
    <main id="main" className="container">
      <Section title="Projects">
        <div className="controls">
          <input className="input" type="search" placeholder="Search by title..." aria-label="Search projects"
            value={query} onChange={(e) => setQuery(e.target.value)} />
          <Button className={filter === 'All' ? 'filter active' : 'filter'} variant="outline" size="sm" onClick={() => setFilter('All')} aria-pressed={filter === 'All'}>All</Button>
          <Button className={filter === 'Tourism' ? 'filter active' : 'filter'} variant="outline" size="sm" onClick={() => setFilter('Tourism')} aria-pressed={filter === 'Tourism'}>Tourism</Button>
          <Button className={filter === 'Forest' ? 'filter active' : 'filter'} variant="outline" size="sm" onClick={() => setFilter('Forest')} aria-pressed={filter === 'Forest'}>Forest</Button>
        </div>

        <div className="grid">
          <AnimatePresence>
            {filtered.map((p) => (
              <motion.div key={p.id} className="card project-card"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <img className="cover-img" alt="Project cover placeholder" src={`https://source.unsplash.com/random/640x360?sig=${p.id}&nature,forest`} />
                <h3 style={{ marginBottom: 4 }}>{p.title}</h3>
                <div className="project-meta">{p.location} • {p.year} • {p.category}</div>
                <p className="clamp-2">{p.desc}</p>
                <div style={{ marginTop: 12 }}>
                  <Button variant="outline" size="sm" onClick={() => setOpenId(p.id)}>Learn more</Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Section>

      <Modal isOpen={!!openId} onClose={() => setOpenId(null)} title={current?.title} initialFocusRef={{ current: null }}>
        {current && (
          <div>
            <img className="cover-img" alt="Project cover large" src={`https://source.unsplash.com/random/960x540?sig=${current.id}&landscape`} />
            <p style={{ marginTop: 0 }}>{current.details}</p>
          </div>
        )}
      </Modal>
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
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
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
