import React, { useState } from 'react';
import {
    FiUser,
    FiAward,
    FiHome,
    FiUsers,
    FiMapPin,
    FiStar,
    FiBriefcase,
    FiFilter
} from 'react-icons/fi';

const About = () => {
    const [timelineFilter, setTimelineFilter] = useState('All');

    const timelineData = [
        {
            year: '2023',
            title: 'Lion Pride Sculpture World Record',
            description: 'Created the world\'s largest lion pride sculpture installation, recognized by international records.',
            category: 'Achievements',
            location: 'Gujarat',
            type: 'Major Project'
        },
        {
            year: '2022',
            title: 'Namami Gange Project',
            description: 'Comprehensive river interpretation center with interactive displays and educational installations.',
            category: 'Government',
            location: 'Uttarakhand',
            type: 'Infrastructure'
        },
        {
            year: '2021',
            title: 'CMS COP-13 Wildlife Installation',
            description: 'Official art installation for the Convention on Migratory Species conference.',
            category: 'Achievements',
            location: 'Gandhinagar',
            type: 'International'
        },
        {
            year: '2020',
            title: 'Statue of Unity Collaboration',
            description: 'Contributing artist for supplementary installations at the world\'s tallest statue.',
            category: 'Government',
            location: 'Gujarat',
            type: 'Monument'
        },
        {
            year: '2019',
            title: 'Gir Forest Interpretation Center',
            description: 'Comprehensive wildlife education center with interactive displays and bronze lion sculptures.',
            category: 'Private',
            location: 'Gir Forest',
            type: 'Eco-Tourism'
        },
        {
            year: '2018',
            title: 'Saputara Hill Station Development',
            description: 'Eco-trail development with artistic installations and visitor interpretation systems.',
            category: 'Government',
            location: 'Saputara',
            type: 'Trail System'
        },
        {
            year: '2017',
            title: 'Nalsarovar Bird Sanctuary Center',
            description: 'Educational facility design with bird observation installations and interactive displays.',
            category: 'Government',
            location: 'Nalsarovar',
            type: 'Wildlife Center'
        },
        {
            year: '2016',
            title: 'Polo Forest Heritage Trail',
            description: 'Historical trail system with interpretive installations celebrating ancient heritage.',
            category: 'Private',
            location: 'Polo Forest',
            type: 'Heritage'
        },
        {
            year: '2015',
            title: 'Shoolpaneshwar Wildlife Sanctuary',
            description: 'Visitor center and trail development with educational bronze installations.',
            category: 'Government',
            location: 'Shoolpaneshwar',
            type: 'Sanctuary'
        },
        {
            year: '2014',
            title: 'Banni Grasslands Project',
            description: 'Conservation awareness installations and visitor education systems.',
            category: 'Private',
            location: 'Kutch',
            type: 'Conservation'
        }
    ];

    const teamMembers = [
        {
            name: 'Anand Tike',
            role: 'Founder & Principal Sculptor',
            description: 'Post Diploma in Sculpture (2002). 20+ years of experience in monumental sculptures and eco-tourism infrastructure.',
            image: '/assets/about/Anandtike.jpg'
        }
    ];

    const empanelments = [
        'Lalit Kala Academy',
        'iNDEXTb (India Tourism Board)',
        'Heritage Authority of Rajasthan',
        'GEER Foundation',
        'Wildlife Institute of India',
        'Forest Department Gujarat'
    ];

    const privateClients = [
        'Pugmark Qmulus',
        'Smruti Gardens',
        'Dhruvi Enterprise',
        'Shree Somnath Trust',
        'GKSF',
        'Radiant Media',
        'Viewfinder Marcom'
    ];

    const filteredTimeline = timelineFilter === 'All'
        ? timelineData
        : timelineData.filter(item => item.category === timelineFilter);

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Achievements':
                return 'badge-accent';
            case 'Government':
                return 'badge-forest';
            case 'Private':
                return 'badge-earth';
            default:
                return 'badge-outline';
        }
    };

    return (
        <div className="about-page">
            {/* Header */}
            <section className="about-hero">
                <div className="container">
                    <div className="about-hero__content">
                        <h1 className="about-hero__title">
                            About Amit Fibre Decor
                        </h1>
                        <p className="about-hero__subtitle">
                            Partnering with agencies and communities to create tourism experiences that protect nature while celebrating India's rich cultural heritage.
                        </p>
                    </div>
                </div>
            </section>

            {/* Founder & Studio */}
            <section className="about-founder">
                <div className="container">
                    <div className="about-founder__grid">
                        <div className="about-founder__left">
                            <h2 className="about-founder__title">
                                Founder & Studio Legacy
                            </h2>
                            <div className="about-founder__text">
                                <p>
                                    <strong>Anand Tike</strong> established Amit Fibre Decor with a vision to merge artistic excellence with environmental consciousness. With a Post Diploma in Sculpture from 2002 and over two decades of hands-on experience, he has pioneered innovative approaches to eco-tourism infrastructure.
                                </p>
                                <p>
                                    Our studio specializes in creating immersive experiences that tell stories—whether it's the majesty of wildlife through bronze sculptures, the richness of Indian mythology through monumental installations, or the delicate balance of ecosystems through interpretive centers.
                                </p>
                                <p>
                                    Each project is a collaboration between art, science, and community, ensuring that every installation not only captivates visitors but also contributes to conservation awareness and cultural preservation.
                                </p>
                            </div>
                        </div>
                        <div className="about-founder__right">
                            <div className="about-founder__image">
                                <img
                                    src="/assets/about/anand-tike.jpg"
                                    alt="Anand Tike, Founder of Amit Fibre Decor"
                                    className="about-founder__img"
                                />
                                <div className="about-founder__overlay"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Conservation Impact */}
            <section className="about-conservation">
                <div className="container">
                    <div className="about-conservation__header">
                        <h2 className="about-conservation__title">
                            Conservation & Education Impact
                        </h2>
                        <p className="about-conservation__subtitle">
                            Our work extends beyond art to create lasting positive impact on wildlife conservation and environmental education.
                        </p>
                    </div>

                    <div className="about-conservation__grid">
                        <div className="about-conservation__card">
                            <div className="about-conservation__icon bg-gradient-nature">
                                <FiStar size={32} />
                            </div>
                            <h3 className="about-conservation__card-title">
                                Wildlife Interpretation Centers
                            </h3>
                            <p className="about-conservation__card-text">
                                15+ centers designed to educate visitors about local ecosystems, wildlife behavior, and conservation efforts.
                            </p>
                        </div>

                        <div className="about-conservation__card">
                            <div className="about-conservation__icon bg-gradient-earth">
                                <FiUsers size={32} />
                            </div>
                            <h3 className="about-conservation__card-title">
                                Scientific Collaborations
                            </h3>
                            <p className="about-conservation__card-text">
                                Working with IFS officers, ornithologists, and Wildlife Institute of India experts for accurate representations.
                            </p>
                        </div>

                        <div className="about-conservation__card">
                            <div className="about-conservation__icon bg-gradient-nature">
                                <FiHome size={32} />
                            </div>
                            <h3 className="about-conservation__card-title">
                                Sustainable Infrastructure
                            </h3>
                            <p className="about-conservation__card-text">
                                All installations use eco-friendly materials and construction methods that minimize environmental impact.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="about-timeline">
                <div className="container">
                    <div className="about-timeline__header">
                        <h2 className="about-timeline__title">
                            Work Timeline
                        </h2>
                        <p className="about-timeline__subtitle">
                            Two decades of impactful projects across India
                        </p>

                        {/* Filters */}
                        <div className="about-timeline__filters">
                            {['All', 'Achievements', 'Government', 'Private'].map((filter) => (
                                <button
                                    key={filter}
                                    className={`about-timeline__filter ${timelineFilter === filter ? 'about-timeline__filter--active' : ''}`}
                                    onClick={() => setTimelineFilter(filter)}
                                >
                                    <FiFilter size={16} />
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Timeline Items */}
                    <div className="about-timeline__container">
                        {/* Vertical Line */}
                        <div className="about-timeline__line"></div>

                        <div className="about-timeline__items">
                            {filteredTimeline.map((item, index) => (
                                <div
                                    key={index}
                                    className={`about-timeline__item ${index % 2 === 0 ? 'about-timeline__item--left' : 'about-timeline__item--right'}`}
                                >
                                    {/* Year Marker */}
                                    <div className="about-timeline__year">
                                        {item.year}
                                    </div>

                                    {/* Content Card */}
                                    <div className="about-timeline__card">
                                        <div className="about-timeline__card-header">
                                            <span className={`badge ${getCategoryColor(item.category)}`}>
                                                {item.category}
                                            </span>
                                            <div className="about-timeline__location">
                                                <FiMapPin size={14} />
                                                {item.location}
                                            </div>
                                        </div>

                                        <h3 className="about-timeline__card-title">
                                            {item.title}
                                        </h3>

                                        <p className="about-timeline__card-description">
                                            {item.description}
                                        </p>

                                        <span className="badge badge-outline badge-sm">
                                            {item.type}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Empanelments */}
            <section className="about-empanel">
                <div className="container">
                    <div className="about-empanel__header">
                        <h2 className="about-empanel__title">
                            Empanelments & Recognitions
                        </h2>
                        <p className="about-empanel__subtitle">
                            Trusted partnerships with leading institutions and organizations
                        </p>
                    </div>

                    <div className="about-empanel__grid">
                        {empanelments.map((org, index) => (
                            <div key={index} className="about-empanel__card">
                                <FiAward size={32} className="about-empanel__icon" />
                                <p className="about-empanel__name">{org}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Private Sector Work */}
            <section className="about-private">
                <div className="container">
                    <div className="about-private__header">
                        <h2 className="about-private__title">
                            Private Sector Collaborations
                        </h2>
                        <p className="about-private__subtitle">
                            Trusted by leading private organizations for specialized projects
                        </p>
                    </div>

                    <div className="about-private__grid">
                        {privateClients.map((client, index) => (
                            <div key={index} className="about-private__card">
                                <FiBriefcase size={24} className="about-private__icon" />
                                <p className="about-private__name">{client}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="about-team">
                <div className="container">
                    <div className="about-team__header">
                        <h2 className="about-team__title">
                            Meet Our Team
                        </h2>
                        <p className="about-team__subtitle">
                            Passionate professionals dedicated to sustainable tourism and artistic excellence
                        </p>
                    </div>

                    <div className="about-team__grid">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="about-team__card">
                                <div className="about-team__image">
                                    {member.image ? (
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="about-team__img"
                                        />
                                    ) : (
                                        <div className="about-team__icon-placeholder bg-gradient-nature">
                                            <FiUser size={48} />
                                        </div>
                                    )}
                                </div>

                                <h3 className="about-team__name">
                                    {member.name}
                                </h3>

                                <p className="about-team__role">
                                    {member.role}
                                </p>

                                <p className="about-team__description">
                                    {member.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
