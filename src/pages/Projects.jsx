import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiSearch, FiMapPin, FiCalendar, FiArrowRight, FiUsers, FiAward } from 'react-icons/fi';
import ProjectsMap from '../components/ProjectsMap';

const Projects = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [highlightedProject, setHighlightedProject] = useState(null);
    const projectRefs = useRef({});

    const projects = [
        {
            id: 1,
            title: 'Eco Trail Signage – Gir Forest',
            type: 'Forest',
            year: '2024',
            location: 'Gir, Gujarat',
            description: 'Modular reflective wayfinding with habitat-safe anchors.',
            features: ['Reflective signage', 'Habitat-safe anchors', 'Low maintenance', 'Weatherproof'],
            image: '/assets/projects/gir-trail.jpg'
        },
        {
            id: 2,
            title: 'Visitor Centre Revamp – Saputara',
            type: 'Tourism',
            year: '2023',
            location: 'Saputara, Dang',
            description: 'Exhibit routing and shade-first queuing with native finishes.',
            features: ['Exhibit routing', 'Shade-first queuing', 'Native finishes'],
            image: '/assets/projects/saputara-centre.jpg'
        },
        {
            id: 3,
            title: 'Wetland Boardwalk – Nalsarovar',
            type: 'Forest',
            year: '2023',
            location: 'Nalsarovar, Gujarat',
            description: 'Elevated boardwalk with erosion control and bird-safe sightlines.',
            features: ['Elevated boardwalk', 'Erosion control', 'Bird-safe sightlines'],
            image: '/assets/projects/nalsarovar-boardwalk.jpg'
        },
        {
            id: 4,
            title: 'Heritage Trail – Polo Forest',
            type: 'Tourism',
            year: '2022',
            location: 'Vijaynagar, Gujarat',
            description: 'Interpretive nodes and emergency wayfinding.',
            features: ['Interpretive nodes', 'Emergency wayfinding', 'Low-impact materials'],
            image: '/assets/projects/polo-heritage.jpg'
        },
        {
            id: 5,
            title: 'Canopy Lookout – Shoolpaneshwar',
            type: 'Forest',
            year: '2022',
            location: 'Narmada, Gujarat',
            description: 'Lightweight lookout deck with FRP beams and wind-tested rails.',
            features: ['FRP beams', 'Wind-tested rails', 'Lightweight structure'],
            image: '/assets/projects/canopy-lookout.jpg'
        },
        {
            id: 6,
            title: 'Campsite Amenities – Banni Grasslands',
            type: 'Tourism',
            year: '2021',
            location: 'Kutch, Gujarat',
            description: 'Low-impact sanitation, night-safe lighting, and waste segregation points.',
            features: ['Low-impact sanitation', 'Night-safe lighting', 'Waste segregation'],
            image: '/assets/projects/banni-campsite.jpg'
        },
        {
            id: 7,
            title: 'Riverfront Trail Links',
            type: 'Tourism',
            year: '2021',
            location: 'Ahmedabad, Gujarat',
            description: 'Seating pods, native planting pockets, and cyclist-safe merge zones.',
            features: ['Seating pods', 'Native planting', 'Cyclist-safe merges'],
            image: '/assets/projects/riverfront-trail.jpg'
        },
        {
            id: 8,
            title: 'Habitat Buffer Fencing',
            type: 'Forest',
            year: '2020',
            location: 'Girnar, Gujarat',
            description: 'Non-intrusive fencing with animal corridors and maintenance gates.',
            features: ['Animal corridors', 'Maintenance gates', 'Non-intrusive design'],
            image: '/assets/projects/habitat-fencing.jpg'
        }
    ];

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilter === 'All' || project.type === activeFilter;
        return matchesSearch && matchesFilter;
    });

    const handleProjectClick = (projectId) => {
        setHighlightedProject(projectId);
        if (projectRefs.current[projectId]) {
            projectRefs.current[projectId].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
        setTimeout(() => setHighlightedProject(null), 2000);
    };

    const stats = [
        { icon: FiMapPin, value: '25+', label: 'Wildlife Centers' },
        { icon: FiMapPin, value: '75+', label: 'Trail Systems' },
        { icon: FiUsers, value: '1M+', label: 'Annual Visitors' },
        { icon: FiAward, value: '20+', label: 'Years Experience' }
    ];

    return (
        <main className="projects">
            {/* Hero Section */}
            <section className="projects-hero">
                <div className="hero-background">
                    <div className="hero-overlay"></div>
                </div>
                <div className="hero-content">
                    <div className="container">
                        <h1 className="hero-title">Our Projects</h1>
                        <p className="hero-subtitle">
                            Transforming natural spaces into sustainable tourism experiences that protect habitats while celebrating cultural heritage.
                        </p>
                    </div>
                </div>
            </section>

            {/* Search + Filter Bar */}
            <section className="search-filter-bar sticky">
                <div className="container">
                    <div className="search-filter-content">
                        <div className="search-input">
                            <FiSearch size={20} />
                            <input
                                type="search"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input"
                            />
                        </div>
                        <div className="filter-buttons">
                            {['All', 'Tourism', 'Forest'].map(filter => (
                                <button
                                    key={filter}
                                    className={`btn btn-${activeFilter === filter ? 'primary' : 'outline'} btn-sm ${activeFilter === filter ? 'bg-gradient-nature' : ''}`}
                                    onClick={() => setActiveFilter(filter)}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Map */}
            <section className="projects-map">
                <div className="container">
                    <ProjectsMap
                        projects={projects}
                        onProjectClick={handleProjectClick}
                    />
                </div>
            </section>

            {/* Projects Grid */}
            <section className="projects-grid-section">
                <div className="container">
                    <div className="projects-grid">
                        {filteredProjects.map(project => (
                            <div
                                key={project.id}
                                className={`card project-card ${highlightedProject === project.id ? 'highlighted' : ''}`}
                                ref={el => projectRefs.current[project.id] = el}
                            >
                                <div className="project-image">
                                    <img src={project.image} alt={project.title} />
                                    <div className="project-overlay">
                                        <span className={`badge badge-${project.type === 'Tourism' ? 'forest' : 'earth'}`}>
                                            {project.type}
                                        </span>
                                        <div className="project-year">{project.year}</div>
                                    </div>
                                </div>
                                <div className="project-content">
                                    <h3 className="project-title">{project.title}</h3>
                                    <div className="project-location">
                                        <FiMapPin size={16} />
                                        {project.location}
                                    </div>
                                    <p className="project-description">{project.description}</p>
                                    <div className="project-features">
                                        {project.features.slice(0, 3).map((feature, index) => (
                                            <span key={index} className="badge badge-outline badge-sm">
                                                {feature}
                                            </span>
                                        ))}
                                        {project.features.length > 3 && (
                                            <span className="badge badge-outline badge-sm">
                                                +{project.features.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                    <button className="btn btn-outline btn-sm">
                                        Learn More <FiArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Project Stats */}
            <section className="project-stats">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-item">
                                <div className="stat-icon bg-gradient-nature">
                                    <stat.icon size={24} />
                                </div>
                                <div className="stat-value">{stat.value}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="projects-cta">
                <div className="container">
                    <div className="cta-content">
                        <h2 className="cta-title">Ready to Create Your Project?</h2>
                        <p className="cta-subtitle">
                            Let's work together to design sustainable tourism experiences that protect and celebrate our natural heritage.
                        </p>
                        <button className="btn btn-primary btn-lg bg-gradient-nature">
                            <NavLink to="/contact">Get Started</NavLink>
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Projects;
