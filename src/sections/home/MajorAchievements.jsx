import React, { useEffect, useMemo, useRef, useState } from 'react';
import { achievements as ACH } from '../../data/achievements.data';

export default function MajorAchievements() {
    const trackRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [step, setStep] = useState(360 + 24);
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        const measure = () => {
            const first = el.querySelector('.ach__card');
            const style = window.getComputedStyle(el);
            const gap = parseInt(style.columnGap || style.gap || '24', 10) || 24;
            const width = first ? first.offsetWidth : 360;
            setStep(width + gap);
        };
        measure();
        const onScroll = () => {
            const max = el.scrollWidth - el.clientWidth;
            const p = max > 0 ? (el.scrollLeft / max) * 100 : 0;
            setProgress(p);
        };
        el.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', measure);
        onScroll();
        return () => { el.removeEventListener('scroll', onScroll); window.removeEventListener('resize', measure); };
    }, []);

    const pages = useMemo(() => Math.max(1, ACH.length), []);

    const nudge = (dir) => {
        const el = trackRef.current;
        if (!el) return;
        el.scrollBy({ left: dir * step, top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    };

    const atStart = () => {
        const el = trackRef.current; if (!el) return true; return el.scrollLeft <= 2;
    };
    const atEnd = () => {
        const el = trackRef.current; if (!el) return false; return el.scrollLeft >= el.scrollWidth - el.clientWidth - 2;
    };

    const discClass = (icon) => {
        if (icon === 'lion' || icon === 'trophy') return 'ach__disc ach__disc--accent';
        if (icon === 'river' || icon === 'butterfly' || icon === 'leaf') return 'ach__disc ach__disc--secondary';
        return 'ach__disc ach__disc--gold';
    };

    return (
        <section className="ach" role="region" aria-labelledby="achievements-title">
            <div className="container">
                <div className="ach__head">
                    <h2 id="achievements-title" className="ach__title">Major Achievements</h2>
                    <p className="ach__sub">Iconic milestones that define our journey in sculptural excellence and eco-cultural heritage.</p>
                </div>

                <div className="ach__wrap">
                    <button className="ach__nav ach__nav--left" aria-label="Scroll achievements left" aria-controls="achievements-track" onClick={() => nudge(-1)} disabled={atStart()}>‹</button>
                    <div id="achievements-track" ref={trackRef} className="ach__track">
                        {ACH.map((a) => (
                            <article key={a.id} className="ach__card" aria-label={`${a.year} — ${a.title}`} tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') { window.location.hash = '/about#work-timeline'; } }}>
                                <div className="ach__badge">{a.year}</div>
                                <div className={discClass(a.icon)} aria-hidden>
                                    {iconFor(a.icon)}
                                </div>
                                <div className="ach__title-sm">{a.title}</div>
                                <div className="ach__blurb">{a.blurb}</div>
                            </article>
                        ))}
                    </div>
                    <button className="ach__nav ach__nav--right" aria-label="Scroll achievements right" aria-controls="achievements-track" onClick={() => nudge(1)} disabled={atEnd()}>›</button>
                </div>

                <div className="ach__progress"><div className="ach__progress-thumb" style={{ width: `${progress}%` }} /></div>
                <div className="ach__dots" aria-hidden>
                    {ACH.map((_, i) => {
                        const idx = Math.round((progress / 100) * (ACH.length - 1));
                        const active = i === idx;
                        return <span key={i} className={`ach__dot${active ? ' ach__dot--active' : ''}`} />;
                    })}
                </div>

                <div style={{ textAlign: 'center', marginTop: 14 }}>
                    <a href="#/about#work-timeline" className="nav-link" style={{ borderBottom: '1px solid var(--neon-cyan)' }}>View Complete Timeline →</a>
                </div>
            </div>
        </section>
    );
}

function iconFor(kind) {
    switch (kind) {
        case 'lion':
            return '🦁';
        case 'river':
            return '🌊';
        case 'pillar':
            return '🏛️';
        case 'leaf':
            return '🐦';
        case 'gate':
            return '🚪';
        case 'butterfly':
            return '🦋';
        case 'statue':
            return '🗿';
        case 'trophy':
            return '🏆';
        default:
            return '✨';
    }
}


