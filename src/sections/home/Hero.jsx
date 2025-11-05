import React from 'react';

export default function Hero() {
    return (
        <section className="hero-landing" style={{ minHeight: '88vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
            <img
                src="/assets/background.jpg"
                alt="Stone heritage archway in a forest setting representing Amit Fibre Decor's sculptural eco-tourism work."
                loading="eager"
                fetchpriority="high"
                decoding="async"
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 0
                }}
            />
            <div className="hero-overlay" aria-hidden="true"></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ maxWidth: 800 }}>
                    <h1 style={{ fontSize: 44, margin: 0, letterSpacing: '.5px' }}>Amit Fibre Decor</h1>
                    <p className="footer-muted" style={{ marginTop: 8, fontSize: 20 }}>Sculptural Heritage & Eco-Tourism Infrastructure</p>
                    <p className="footer-muted" style={{ marginTop: 12 }}>
                        Led by renowned sculptor Anand Tike, we design monumental sculptures, wildlife interpretation centres, and award-winning tableaux across India—over 20 years of cultural and conservation impact.
                    </p>

                    <div style={{ marginTop: 22, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        <a href="#/projects" aria-label="Explore our heritage projects" className="btn btn-primary btn-lg">Explore Our Heritage</a>
                        <a href="#/about" aria-label="View our timeline" className="btn btn-outline btn-lg">View Timeline</a>
                    </div>

                    <div className="grid" style={{ marginTop: 22 }}>
                        <div className="card">
                            <div style={{ fontSize: 22, fontWeight: 600 }}><span style={{ color: 'var(--neon-cyan)' }}>20+</span> Years of Excellence</div>
                        </div>
                        <div className="card">
                            <div style={{ fontSize: 22, fontWeight: 600 }}><span style={{ color: 'var(--neon-magenta)' }}>100+</span> Sculptures Created</div>
                        </div>
                        <div className="card">
                            <div style={{ fontSize: 22, fontWeight: 600 }}><span style={{ color: 'var(--accent-amber)' }}>50+</span> Awards & Recognition</div>
                        </div>
                    </div>

                    <div style={{ marginTop: 22, display: 'none' }} aria-hidden="true">
                        <div style={{ width: 32, height: 56, borderRadius: 999, border: '1.5px solid var(--neon-cyan)', position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 8, width: 6, height: 6, borderRadius: 999, background: 'var(--neon-cyan)' }}></span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


