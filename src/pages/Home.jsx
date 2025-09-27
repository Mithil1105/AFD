import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiArrowRight, FiMapPin, FiUsers, FiAward, FiHeart, FiShield } from 'react-icons/fi';

const Home = () => {
    const achievements = [
        { year: '2023', title: 'Lion Pride Sculpture', type: 'Achievement' },
        { year: '2022', title: 'Namami Gange Project', type: 'Government' },
        { year: '2021', title: 'Modi Statue Commission', type: 'Achievement' },
        { year: '2020', title: 'CMS COP-13 Installation', type: 'Government' },
        { year: '2019', title: 'Shivrajpur Beach Gates', type: 'Private' },
        { year: '2018', title: 'GEER Butterfly Park', type: 'Government' },
        { year: '2016', title: 'Pandit Deendayal Bronze', type: 'Private' },
        { year: '2014', title: 'Republic Day First Prize', type: 'Achievement' }
    ];

    const organizations = [
        { name: 'Lalitkala Academy', initials: 'LA', type: 'accent' },
        { name: 'iNDEXTb', initials: 'iN', type: 'forest' },
        { name: 'Heritage Rajasthan', initials: 'HR', type: 'earth' },
        { name: 'GEER Foundation', initials: 'GF', type: 'accent' },
        { name: 'Somnath Trust', initials: 'ST', type: 'forest' },
        { name: 'Pugmark Qmulus', initials: 'PQ', type: 'earth' },
        { name: 'Smruti Gardens', initials: 'SG', type: 'accent' },
        { name: 'Gujarat Kidney', initials: 'GK', type: 'forest' }
    ];

    const getBadgeColor = (type) => {
        switch (type) {
            case 'Achievement': return 'accent';
            case 'Government': return 'forest';
            case 'Private': return 'earth';
            default: return 'accent';
        }
    };

    const getOrgBgColor = (type) => {
        switch (type) {
            case 'accent': return 'var(--accent)';
            case 'forest': return 'var(--forest)';
            case 'earth': return 'var(--earth)';
            default: return 'var(--accent)';
        }
    };

    return (
        <main className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-background">
                    <img src="/assets/hero-sculpture.jpg" alt="Sculpture in forest setting" />
                    <div className="hero-overlay"></div>
                </div>
                <div className="hero-content">
                    <div className="container">
                        <h1 className="hero-title">
                            Sustainable Tourism & <span className="gradient-text">Forest Solutions</span>
                        </h1>
                        <p className="hero-subtitle">
                            We design eco-tourism experiences and build forest infrastructure that respects habitats while celebrating India's rich cultural heritage.
                        </p>
                        <div className="hero-actions">
                            <button className="btn btn-primary btn-lg bg-gradient-nature">
                                View Projects <FiArrowRight style={{ marginLeft: '8px' }} size={20} />
                            </button>
                            <button className="btn btn-outline btn-lg">
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Studio Intro */}
            <section className="studio-intro">
                <div className="container">
                    <div className="studio-intro-content">
                        <div className="studio-icon">
                            <FiMapPin className="studio-icon-svg" size={32} />
                        </div>
                        <h2 className="studio-title">Welcome to Our Studio</h2>
                        <p className="studio-description">
                            Led by renowned sculptor Anand Tike, we design monumental sculptures, wildlife interpretation centres, and award-winning tableaux across India—over 20 years of cultural and conservation impact.
                        </p>
                    </div>
                </div>
            </section>

            {/* What We Do */}
            <section className="what-we-do">
                <div className="container">
                    <h2 className="section-title">What We Do</h2>
                    <div className="services-grid">
                        <div className="card service-card">
                            <div className="service-icon bg-gradient-nature">
                                <FiMapPin size={24} />
                            </div>
                            <h3>Eco-Tourism Planning</h3>
                            <p>Visitor journeys, capacity planning, route design, and interpretive storytelling.</p>
                        </div>
                        <div className="card service-card">
                            <div className="service-icon bg-gradient-earth">
                                <FiMapPin size={24} />
                            </div>
                            <h3>Forest Infrastructure</h3>
                            <p>Boardwalks, shelters, viewing decks, and low-impact amenities engineered for longevity.</p>
                        </div>
                        <div className="card service-card">
                            <div className="service-icon bg-gradient-nature">
                                <FiMapPin size={24} />
                            </div>
                            <h3>Restoration & Trails</h3>
                            <p>Trail building, erosion control, habitat buffers, and safety-first signage.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted Organizations */}
            <section className="trusted-orgs">
                <div className="container">
                    <h2 className="section-title">Trusted by Leading Organizations</h2>
                    <div className="orgs-grid">
                        {organizations.map((org, index) => (
                            <div key={index} className="card org-card">
                                <div
                                    className="org-avatar"
                                    style={{ backgroundColor: getOrgBgColor(org.type) }}
                                >
                                    {org.initials}
                                </div>
                                <span className="org-name">{org.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Major Achievements */}
            <section className="achievements">
                <div className="container">
                    <h2 className="section-title">Major Achievements</h2>
                    <p className="section-subtitle">Iconic milestones that define our journey in sculptural excellence and eco-cultural heritage.</p>
                    <div className="achievements-grid achievements-grid-1x3">
                        <div className="card achievement-card">
                            <div className="achievement-media">
                                <video
                                    className="achievement-video"
                                    controls
                                    poster="/assets/achievements/lion-sculpture-poster.jpg"
                                >
                                    <source src="/assets/videos/lion-sculpture.mp4" type="video/mp4" />
                                    <source src="/assets/videos/lion-sculpture.webm" type="video/webm" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div className="achievement-year">2023</div>
                            <h3 className="achievement-title">Lion Pride Sculpture</h3>
                            <p className="achievement-description">World's largest Asiatic Lion Pride Sculpture installation with comprehensive wildlife interpretation center.</p>
                            <span className="badge badge-accent">Achievement</span>
                        </div>
                        <div className="card achievement-card">
                            <div className="achievement-media">
                                <img
                                    src="/assets/achievements/namami-gange.jpg"
                                    alt="Namami Gange Project"
                                    className="achievement-image"
                                />
                            </div>
                            <div className="achievement-year">2022</div>
                            <h3 className="achievement-title">Namami Gange Project</h3>
                            <p className="achievement-description">Eco-tourism infrastructure for river conservation initiative with interactive displays and educational installations.</p>
                            <span className="badge badge-forest">Government</span>
                        </div>
                        <div className="card achievement-card">
                            <div className="achievement-media">
                                <video
                                    className="achievement-video"
                                    controls
                                    poster="/assets/achievements/modi-statue-poster.jpg"
                                >
                                    <source src="/assets/videos/modi-statue.mp4" type="video/mp4" />
                                    <source src="/assets/videos/modi-statue.webm" type="video/webm" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div className="achievement-year">2021</div>
                            <h3 className="achievement-title">Modi Statue Commission</h3>
                            <p className="achievement-description">Prestigious commission for national monument showcasing our expertise in monumental sculpture work.</p>
                            <span className="badge badge-accent">Achievement</span>
                        </div>
                    </div>
                    <div className="achievements-cta">
                        <button className="btn btn-outline">
                            View Full Timeline
                        </button>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="mission">
                <div className="container">
                    <div className="mission-content">
                        <div className="mission-text">
                            <h2 className="mission-title">Our Mission</h2>
                            <p className="mission-description">
                                We believe in creating sustainable tourism experiences that protect nature while celebrating India's rich cultural heritage. Our work bridges traditional artistry with contemporary conservation needs.
                            </p>
                        </div>
                        <div className="mission-features">
                            <div className="feature-item hover-scale">
                                <div className="feature-icon bg-gradient-nature">
                                    <FiHeart size={20} />
                                </div>
                                <span>Sustainability</span>
                            </div>
                            <div className="feature-item hover-scale">
                                <div className="feature-icon bg-gradient-earth">
                                    <FiAward size={20} />
                                </div>
                                <span>Culture</span>
                            </div>
                            <div className="feature-item hover-scale">
                                <div className="feature-icon bg-gradient-nature">
                                    <FiUsers size={20} />
                                </div>
                                <span>Community</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2 className="cta-title">Ready to Start Your Project?</h2>
                        <p className="cta-subtitle">
                            Let's work together to create sustainable tourism experiences that protect and celebrate our natural heritage.
                        </p>
                        <button className="btn btn-primary btn-lg bg-gradient-nature">
                            Start Your Project <FiArrowRight style={{ marginLeft: '8px' }} size={20} />
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
