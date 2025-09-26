import React, { useMemo, useState } from 'react';
import { projects as DATA } from '../../data/projects.data';

const TYPE_CHIPS = [
    { key: 'all', label: 'All' },
    { key: 'tourism', label: 'Tourism' },
    { key: 'forest', label: 'Forest' }
];

const CATEGORY_CHIPS = [
    { key: 'all', label: 'All' },
    { key: 'interpretation-centre', label: 'Interpretation Centres' },
    { key: 'sculpture', label: 'Sculptures' },
    { key: 'infrastructure', label: 'Infrastructure' },
    { key: 'tableaux', label: 'Tableaux' },
    { key: 'achievement', label: 'Achievements' },
    { key: 'government', label: 'Government' },
    { key: 'private', label: 'Private' }
];

function getCategoryEmoji(category) {
    switch (category) {
        case 'interpretation-centre':
            return '🏛️';
        case 'sculpture':
            return '🗿';
        case 'infrastructure':
            return '🌉';
        case 'tableaux':
            return '🎭';
        case 'achievement':
            return '🏆';
        case 'government':
            return '🏢';
        case 'private':
            return '🤝';
        default:
            return '📌';
    }
}

export default function ProjectsGrid({ hideNonExecution = false }) {
    const [query, setQuery] = useState('');
    const [type, setType] = useState('all');
    const [category, setCategory] = useState('all');

    const list = useMemo(() => {
        const lowered = query.trim().toLowerCase();
        return DATA.filter((p) => {
            if (hideNonExecution && (p.category === 'achievement' || p.category === 'government' || p.category === 'private')) {
                return false;
            }
            if (type !== 'all' && p.type !== type) return false;
            if (category !== 'all' && p.category !== category) return false;
            if (!lowered) return true;
            const hay = `${p.title} ${p.location}`.toLowerCase();
            return hay.includes(lowered);
        });
    }, [query, type, category, hideNonExecution]);

    return (
        <section className="section" id="work-timeline">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Projects</h2>
                    <p className="section-subtitle">Search, filter, and explore our work</p>
                </div>

                <div className="controls" role="toolbar" aria-label="Projects filters">
                    <input
                        className="input"
                        type="search"
                        placeholder="Search by title or location..."
                        aria-label="Search projects"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    {TYPE_CHIPS.map((t) => (
                        <button
                            key={t.key}
                            className={`chip${type === t.key ? ' active' : ''}`}
                            onClick={() => setType(t.key)}
                            aria-pressed={type === t.key}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                <div className="controls" role="toolbar" aria-label="Category filters">
                    {CATEGORY_CHIPS.map((c) => (
                        <button
                            key={c.key}
                            className={`chip${category === c.key ? ' active' : ''}`}
                            onClick={() => setCategory(c.key)}
                            aria-pressed={category === c.key}
                        >
                            {c.label}
                        </button>
                    ))}
                </div>

                {list.length === 0 ? (
                    <div className="card" role="status" aria-live="polite">
                        <p style={{ margin: 0 }}>No results match your filters.</p>
                    </div>
                ) : (
                    <div className="grid">
                        {list.map((p) => (
                            <article key={p.id} className="card" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') { /* placeholder for Learn More */ } }}>
                                <div className="cover-img" style={{ display: 'grid', placeItems: 'center', fontSize: 40 }} aria-label="Project image placeholder">
                                    <span role="img" aria-label="category icon">{getCategoryEmoji(p.category)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                                    <h3 style={{ margin: 0 }}>{p.title}</h3>
                                    <span className="tag" aria-label={`Year ${p.year}`}>{p.year}</span>
                                </div>
                                <div className="project-meta">{p.location} • {p.type.charAt(0).toUpperCase() + p.type.slice(1)}</div>
                                <p className="clamp-2">{p.description}</p>
                                {p.features?.length ? (
                                    <ul style={{ margin: '10px 0 0', paddingLeft: 18 }}>
                                        {p.features.slice(0, 5).map((f, idx) => <li key={idx} className="footer-muted">{f}</li>)}
                                    </ul>
                                ) : null}
                                <div style={{ marginTop: 12 }}>
                                    <button className="btn btn-outline btn-sm" onClick={() => { }} aria-label={`Learn more about ${p.title}`}>Learn More</button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}


