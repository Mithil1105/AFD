import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiSearch, FiMapPin, FiCalendar, FiArrowRight, FiUsers, FiAward } from 'react-icons/fi';
import ProjectsMap from '../components/ProjectsMap';
import Modal from '../components/Modal';
import OptimizedImage from '../components/OptimizedImage';
import Lightbox from '../components/Lightbox';

const Projects = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [highlightedProject, setHighlightedProject] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectImages, setProjectImages] = useState({});
    const [showAllImages, setShowAllImages] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const projectRefs = useRef({});
    const location = useLocation();

    // Lazy load images only when modal is opened
    const loadProjectImages = (projectFolderName) => {
        if (!projectFolderName) return [];

        const imageMap = {
            'Ambardi Safari Park': [
                require('../assets/Project/Ambardi Safari Park/20231124_113559.jpg'),
                require('../assets/Project/Ambardi Safari Park/20231124_114152.jpg'),
                require('../assets/Project/Ambardi Safari Park/20231124_114305.jpg'),
                require('../assets/Project/Ambardi Safari Park/20231124_123816.jpg'),
                require('../assets/Project/Ambardi Safari Park/20240123_125022_Edit.jpg'),
                require('../assets/Project/Ambardi Safari Park/20240123_130928_Edit.jpg'),
                require('../assets/Project/Ambardi Safari Park/2bedabb3-4a65-4aea-99b2-11857e709eb8.jpg'),
                require('../assets/Project/Ambardi Safari Park/4d7dc588-de02-4833-b740-45dff8bfe8ab.jpg'),
                require('../assets/Project/Ambardi Safari Park/7baa6b21-c329-479c-8741-990e35cadaed.jpg'),
                require('../assets/Project/Ambardi Safari Park/82f99451-6047-45ea-9b61-afbfdbba98c8.jpg'),
                require('../assets/Project/Ambardi Safari Park/ARCHI.DESIGN SIGNAGE.jpg'),
                require('../assets/Project/Ambardi Safari Park/BRONZE LION.JPG'),
                require('../assets/Project/Ambardi Safari Park/Deer_Male-Female_nwnrtn.jpg'),
                require('../assets/Project/Ambardi Safari Park/Final_q8m6ta.jpg'),
                require('../assets/Project/Ambardi Safari Park/gate no.3.JPG'),
                require('../assets/Project/Ambardi Safari Park/interpretation_tbe5f1.jpg'),
                require('../assets/Project/Ambardi Safari Park/Layer 0 copy.jpg'),
                require('../assets/Project/Ambardi Safari Park/Layer 0 copy1.jpg'),
                require('../assets/Project/Ambardi Safari Park/Lion Family in Ferro cement.jpg'),
                require('../assets/Project/Ambardi Safari Park/Lion Family.jpg'),
                require('../assets/Project/Ambardi Safari Park/MARBLE LION 7.JPG'),
                require('../assets/Project/Ambardi Safari Park/P1010252.JPG'),
                require('../assets/Project/Ambardi Safari Park/P1010274.JPG'),
                require('../assets/Project/Ambardi Safari Park/P1010287.JPG'),
                require('../assets/Project/Ambardi Safari Park/P1010290.JPG'),
                require('../assets/Project/Ambardi Safari Park/P1010292_Edit.jpg'),
                require('../assets/Project/Ambardi Safari Park/P1010293.JPG'),
                require('../assets/Project/Ambardi Safari Park/P1010297.JPG'),
                require('../assets/Project/Ambardi Safari Park/P1010311.jpg'),
                require('../assets/Project/Ambardi Safari Park/P1034940_Edit.jpg'),
                require('../assets/Project/Ambardi Safari Park/P1036662.JPG'),
                require('../assets/Project/Ambardi Safari Park/P1036682.JPG'),
                require('../assets/Project/Ambardi Safari Park/P1036768.jpg'),
                require('../assets/Project/Ambardi Safari Park/P1036949.JPG')
            ],
            'Sasan Gir': [
                require('../assets/Project/Sasan Gir/IMG_1187.JPG'),
                require('../assets/Project/Sasan Gir/IMG_1190.JPG'),
                require('../assets/Project/Sasan Gir/IMG_1381.JPG'),
                require('../assets/Project/Sasan Gir/IMG_1428.JPG'),
                require('../assets/Project/Sasan Gir/IMG_1436.JPG'),
                require('../assets/Project/Sasan Gir/IMG_1438.JPG'),
                require('../assets/Project/Sasan Gir/IMG_1453.JPG'),
                require('../assets/Project/Sasan Gir/IMG_1461.JPG'),
                require('../assets/Project/Sasan Gir/IMG_1473.JPG'),
                require('../assets/Project/Sasan Gir/IMG_1476.JPG'),
                require('../assets/Project/Sasan Gir/IMG_1503.JPG'),
                require('../assets/Project/Sasan Gir/IMG_1517.JPG')
            ],
            'jim Corbett': [
                require('../assets/Project/jim Corbett/Diorama.jpg'),
                require('../assets/Project/jim Corbett/DSC01986.jpg'),
                require('../assets/Project/jim Corbett/DSC01994.jpg'),
                require('../assets/Project/jim Corbett/DSC01995.jpg'),
                require('../assets/Project/jim Corbett/IMG20230721172600.jpg'),
                require('../assets/Project/jim Corbett/IMG_3084.jpg'),
                require('../assets/Project/jim Corbett/IMG_9037.jpg'),
                require('../assets/Project/jim Corbett/IMG_9065.jpg'),
                require('../assets/Project/jim Corbett/IMG_9066.jpg'),
                require('../assets/Project/jim Corbett/Levels 1.jpg')
            ],
            'Kaziranga': [
                require('../assets/Project/Kaziranga/IMG_5541.jpg'),
                require('../assets/Project/Kaziranga/IMG_5557.jpg'),
                require('../assets/Project/Kaziranga/IMG_5558.jpg'),
                require('../assets/Project/Kaziranga/IMG_5572 copy.jpg'),
                require('../assets/Project/Kaziranga/IMG_5584.jpg'),
                require('../assets/Project/Kaziranga/IMG_5590.jpg'),
                require('../assets/Project/Kaziranga/IMG_5600.jpg'),
                require('../assets/Project/Kaziranga/IMG_5613.jpg'),
                require('../assets/Project/Kaziranga/IMG_5640.jpg'),
                require('../assets/Project/Kaziranga/IMG_5648.jpg'),
                require('../assets/Project/Kaziranga/IMG_5659.jpg'),
                require('../assets/Project/Kaziranga/Layer 0 copy.jpg')
            ],
            'Shivraj pur': [
                require('../assets/Project/Shivraj pur/04.jpg'),
                require('../assets/Project/Shivraj pur/10122.jpg'),
                require('../assets/Project/Shivraj pur/10123.jpg'),
                require('../assets/Project/Shivraj pur/10394.jpg'),
                require('../assets/Project/Shivraj pur/IMG_2245.JPG')
            ],
            'Butterfly Park': [
                require('../assets/Project/Butterfly Park/DSC07516.jpg'),
                require('../assets/Project/Butterfly Park/DSC07562.jpg'),
                require('../assets/Project/Butterfly Park/IMG_2602.jpg'),
                require('../assets/Project/Butterfly Park/IMG_2674 copy 2.jpg'),
                require('../assets/Project/Butterfly Park/IMG_2746.jpg')
            ],
            'Nature Park': [
                require('../assets/Project/Nature Park/Dinosaur Model.jpeg'),
                require('../assets/Project/Nature Park/DSC04285.JPG'),
                require('../assets/Project/Nature Park/DSC04300.JPG'),
                require('../assets/Project/Nature Park/DSC04306.JPG'),
                require('../assets/Project/Nature Park/DSC04307.JPG'),
                require('../assets/Project/Nature Park/DSC04308.JPG'),
                require('../assets/Project/Nature Park/DSC04310.JPG'),
                require('../assets/Project/Nature Park/DSC04313.JPG'),
                require('../assets/Project/Nature Park/DSC04315.JPG'),
                require('../assets/Project/Nature Park/DSC04316.JPG'),
                require('../assets/Project/Nature Park/DSC04317.JPG'),
                require('../assets/Project/Nature Park/DSC04793.JPG'),
                require('../assets/Project/Nature Park/Ground Sloth.jpeg'),
                require('../assets/Project/Nature Park/IMG_6889.JPG'),
                require('../assets/Project/Nature Park/IMG_6892.JPG'),
                require('../assets/Project/Nature Park/IMG_6894.JPG'),
                require('../assets/Project/Nature Park/IMG_6933.jpg'),
                require('../assets/Project/Nature Park/IMG_6943.jpg'),
                require('../assets/Project/Nature Park/IMG_6950.JPG'),
                require('../assets/Project/Nature Park/IMG_6959.JPG'),
                require('../assets/Project/Nature Park/IMG_6972.JPG'),
                require('../assets/Project/Nature Park/IMG_6974.JPG'),
                require('../assets/Project/Nature Park/IMG_6996.JPG'),
                require('../assets/Project/Nature Park/IMG_6997.JPG'),
                require('../assets/Project/Nature Park/Saber Toothed Lion.jpeg'),
                require('../assets/Project/Nature Park/WhatsApp Image 2021-06-09 at 5.45.13 PM.jpeg')
            ],
            'Fossil Park': [
                require('../assets/Project/Fossil Park/DSC01536.jpg'),
                require('../assets/Project/Fossil Park/DSC01541.jpg'),
                require('../assets/Project/Fossil Park/DSC01587.jpg'),
                require('../assets/Project/Fossil Park/DSC01621.jpg'),
                require('../assets/Project/Fossil Park/DSC01623.jpg'),
                require('../assets/Project/Fossil Park/DSC01657.jpg'),
                require('../assets/Project/Fossil Park/DSC01681.jpg'),
                require('../assets/Project/Fossil Park/DSC01707.jpg'),
                require('../assets/Project/Fossil Park/IMG_20220414_151146 00.jpg'),
                require('../assets/Project/Fossil Park/IMG_20220414_151146.jpg'),
                require('../assets/Project/Fossil Park/IMG_20220414_153308.jpg'),
                require('../assets/Project/Fossil Park/IMG_20220414_153346.jpg'),
                require('../assets/Project/Fossil Park/IMG_20220414_153435.jpg'),
                require('../assets/Project/Fossil Park/IMG_20220414_155545.jpg')
            ],
            'Arogya Van': [
                require('../assets/Project/Arogya Van/016.jpg'),
                require('../assets/Project/Arogya Van/104892976_155073506076504_8460713973819694584_n.jpg'),
                require('../assets/Project/Arogya Van/arogya-van (2).jpg'),
                require('../assets/Project/Arogya Van/arogya-van-2.jpg'),
                require('../assets/Project/Arogya Van/DJI_0156.JPG'),
                require('../assets/Project/Arogya Van/DJI_0159.JPG'),
                require('../assets/Project/Arogya Van/IMG-20191027-WA0045.jpg'),
                require('../assets/Project/Arogya Van/IMG-20210519-WA0000.jpg'),
                require('../assets/Project/Arogya Van/IMG-20210519-WA0010.jpg'),
                require('../assets/Project/Arogya Van/IMG_1231.JPG'),
                require('../assets/Project/Arogya Van/IMG_1234.JPG'),
                require('../assets/Project/Arogya Van/IMG_1240.JPG'),
                require('../assets/Project/Arogya Van/IMG_4464.JPG'),
                require('../assets/Project/Arogya Van/IMG_4472.JPG'),
                require('../assets/Project/Arogya Van/IMG_4476.JPG'),
                require('../assets/Project/Arogya Van/IMG_4496.JPG'),
                require('../assets/Project/Arogya Van/IMG_4497.JPG'),
                require('../assets/Project/Arogya Van/IMG_4499.JPG'),
                require('../assets/Project/Arogya Van/yoga-posture-in-yoga.jpg'),
                require('../assets/Project/Arogya Van/_MG_8609.JPG'),
                require('../assets/Project/Arogya Van/_MG_8610.JPG'),
                require('../assets/Project/Arogya Van/_MG_8611.JPG')
            ],
            'Vibrant Gujarat 2024': [
                require('../assets/Project/Vibrant Gujarat 2024/20240110_131310.jpg'),
                require('../assets/Project/Vibrant Gujarat 2024/20240109_010300.jpg'),
                require('../assets/Project/Vibrant Gujarat 2024/20240109_010318.jpg'),
                require('../assets/Project/Vibrant Gujarat 2024/20240109_010705.jpg'),
                require('../assets/Project/Vibrant Gujarat 2024/20240109_010716.jpg'),
                require('../assets/Project/Vibrant Gujarat 2024/20240111_100656.jpg'),
                require('../assets/Project/Vibrant Gujarat 2024/DSC09969.jpg'),
                require('../assets/Project/Vibrant Gujarat 2024/Layer 3.jpg'),
                require('../assets/Project/Vibrant Gujarat 2024/Levels 1.jpg'),
                require('../assets/Project/Vibrant Gujarat 2024/Levels 11.jpg'),
                require('../assets/Project/Vibrant Gujarat 2024/P1010029.jpg'),
                require('../assets/Project/Vibrant Gujarat 2024/P1010558.jpg'),
                require('../assets/Project/Vibrant Gujarat 2024/P1010632.jpg')
            ],
            'Tripura': [
                require('../assets/Project/Tripura/Birds Diorama.jpg'),
                require('../assets/Project/Tripura/Layer 3.jpg'),
                require('../assets/Project/Tripura/P4030193.jpg'),
                require('../assets/Project/Tripura/P4030241.jpg'),
                require('../assets/Project/Tripura/P4030264.jpg'),
                require('../assets/Project/Tripura/P4040398.jpg'),
                require('../assets/Project/Tripura/PSRV4338.JPG'),
                require('../assets/Project/Tripura/PSRV4345.JPG'),
                require('../assets/Project/Tripura/PSRV4351.JPG'),
                require('../assets/Project/Tripura/PSRV4387.JPG'),
                require('../assets/Project/Tripura/PSRV4404.JPG')
            ],
            'Rakshak Van': [
                require('../assets/Project/Rakshak Van/Aushadh manav.jpg'),
                require('../assets/Project/Rakshak Van/CAMEL FIBRE DECOR.jpg'),
                require('../assets/Project/Rakshak Van/DSC02129.jpg'),
                require('../assets/Project/Rakshak Van/DSC02138.jpg'),
                require('../assets/Project/Rakshak Van/DSC02143.jpg'),
                require('../assets/Project/Rakshak Van/DSC02147.jpg'),
                require('../assets/Project/Rakshak Van/DSC02167.jpg'),
                require('../assets/Project/Rakshak Van/DSC02199.jpg'),
                require('../assets/Project/Rakshak Van/DSC02208.jpg'),
                require('../assets/Project/Rakshak Van/DSC02247.jpg'),
                require('../assets/Project/Rakshak Van/Gazebo.jpg'),
                require('../assets/Project/Rakshak Van/Mural 1.jpg'),
                require('../assets/Project/Rakshak Van/RAKSHAK VAN WALL MURAL 01.jpg'),
                require('../assets/Project/Rakshak Van/RAKSHAK VAN WALL MURAL 02.jpg'),
                require('../assets/Project/Rakshak Van/RAKSHAK VAN WALL MURAL 03.jpg'),
                require('../assets/Project/Rakshak Van/RAKSHAK VAN WALL MURAL 04.jpg'),
                require('../assets/Project/Rakshak Van/RAKSHAK VAN WALL MURAL 05.jpg'),
                require('../assets/Project/Rakshak Van/RAKSHAK VAN WALL MURAL 06.jpg'),
                require('../assets/Project/Rakshak Van/RAKSHAK VAN WALL MURAL 07.jpg'),
                require('../assets/Project/Rakshak Van/Shurya shlip sculpture.jpg')
            ]
        };

        return imageMap[projectFolderName] || [];
    };

    // Load images only when modal opens
    const handleLearnMore = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
        setShowAllImages(false); // Reset to show only first 20 images

        // Load images for this specific project only
        const images = loadProjectImages(project.folderName);
        setProjectImages(prev => ({
            ...prev,
            [project.folderName]: images
        }));
    };

    const projects = [
        {
            id: 1,
            title: 'Ambardi Safari Park',
            type: 'Forest',
            year: '2023',
            location: 'Dhari, Amreli',
            description: 'World\'s largest Asiatic Lion Pride Sculpture installation with comprehensive wildlife interpretation center.',
            features: ['Ferro-cement construction', 'Wildlife interpretation center', 'TCGL commission', 'Limca 2025 record'],
            image: require('../assets/Project/Ambardi Safari Park/Lion Family.jpg'),
            folderName: 'Ambardi Safari Park'
        },
        {
            id: 2,
            title: 'Sasan Gir',
            type: 'Forest',
            year: '2019',
            location: 'Gir Forest, Gujarat',
            description: 'Comprehensive wildlife education center with interactive displays and bronze lion sculptures.',
            features: ['Interactive displays', 'Bronze sculptures', 'Wildlife education', 'AV systems'],
            image: require('../assets/Project/Sasan Gir/IMG_1187.JPG'),
            folderName: 'Sasan Gir'
        },
        {
            id: 3,
            title: 'Jim Corbett',
            type: 'Forest',
            year: '2019',
            location: 'Uttarakhand',
            description: 'Interpretation Centre & Exhibition at Corbett Tiger Reserve with educational installations.',
            features: ['Educational installations', 'Interactive displays', 'Wildlife education', 'Conservation awareness'],
            image: require('../assets/Project/jim Corbett/Diorama.jpg'),
            folderName: 'jim Corbett'
        },
        {
            id: 4,
            title: 'Kaziranga',
            type: 'Forest',
            year: '2021',
            location: 'Assam',
            description: 'Exhibition work at WTI Centre, Kaziranga Park with wildlife conservation focus.',
            features: ['Wildlife conservation', 'Educational exhibits', 'Interactive displays', 'Conservation awareness'],
            image: require('../assets/Project/Kaziranga/IMG_5541.jpg'),
            folderName: 'Kaziranga'
        },
        {
            id: 5,
            title: 'Shivraj Pur',
            type: 'Tourism',
            year: '2019',
            location: 'Dwarka, Gujarat',
            description: 'Iconic coastal gateway with two main gates and one entry gate enhancing visitor experience.',
            features: ['Coastal gateway', 'Visitor experience', 'Iconic design', 'Entry gates'],
            image: require('../assets/Project/Shivraj pur/04.jpg'),
            folderName: 'Shivraj pur'
        },
        {
            id: 6,
            title: 'Butterfly Park',
            type: 'Forest',
            year: '2018',
            location: 'Gandhinagar',
            description: 'Butterfly Park development at Aranya Park, GEER Foundation with interpretive design.',
            features: ['Interpretive design', 'Biodiversity education', 'Butterfly conservation', 'Educational displays'],
            image: require('../assets/Project/Butterfly Park/DSC07516.jpg'),
            folderName: 'Butterfly Park'
        },
        {
            id: 7,
            title: 'Nature Park',
            type: 'Tourism',
            year: '2021',
            location: 'Ahmedabad',
            description: 'Fibreglass installations and metal sculpture grill at Nature Park, Science City.',
            features: ['Fibreglass installations', 'Metal sculptures', 'Science education', 'Interactive displays'],
            image: require('../assets/Project/Nature Park/Dinosaur Model.jpeg'),
            folderName: 'Nature Park'
        },
        {
            id: 8,
            title: 'Fossil Park',
            type: 'Tourism',
            year: '2022',
            location: 'Jharkhand',
            description: 'Santhal tribal diorama at Rajmahal Fossil Park with educational installations.',
            features: ['Tribal diorama', 'Educational installations', 'Cultural heritage', 'Fossil education'],
            image: require('../assets/Project/Fossil Park/DSC01536.jpg'),
            folderName: 'Fossil Park'
        },
        {
            id: 9,
            title: 'Arogya Van',
            type: 'Forest',
            year: '2020',
            location: 'Gujarat',
            description: 'Comprehensive health and wellness themed park with yoga installations and medicinal plant displays.',
            features: ['Yoga installations', 'Medicinal plants', 'Health education', 'Wellness displays'],
            image: require('../assets/Project/Arogya Van/016.jpg'),
            folderName: 'Arogya Van'
        },
        {
            id: 10,
            title: 'Vibrant Gujarat 2024',
            type: 'Tourism',
            year: '2024',
            location: 'Gandhinagar',
            description: 'Exhibition stall design and installations for the Vibrant Gujarat Global Summit.',
            features: ['Exhibition design', 'Interactive displays', 'Brand installations', 'Event management'],
            image: require('../assets/Project/Vibrant Gujarat 2024/20240110_131310.jpg'),
            folderName: 'Vibrant Gujarat 2024'
        },
        {
            id: 11,
            title: 'Tripura',
            type: 'Tourism',
            year: '2021',
            location: 'Tripura',
            description: 'Birds diorama and educational installations for the state museum and cultural center.',
            features: ['Bird diorama', 'Cultural displays', 'Educational installations', 'Museum exhibits'],
            image: require('../assets/Project/Tripura/Birds Diorama.jpg'),
            folderName: 'Tripura'
        },
        {
            id: 12,
            title: 'Rakshak Van',
            type: 'Forest',
            year: '2020',
            location: 'Gujarat',
            description: 'Security and protection themed installations with murals and educational displays.',
            features: ['Security murals', 'Protection displays', 'Educational content', 'Interactive exhibits'],
            image: require('../assets/Project/Rakshak Van/DSC02129.jpg'),
            folderName: 'Rakshak Van'
        }
    ];


    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
        setShowAllImages(false);
    };

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

    // If navigated with a requested project, open its modal
    useEffect(() => {
        const requested = location.state && location.state.openProjectTitle;
        if (!requested) return;
        const match = projects.find(p => p.title.toLowerCase() === String(requested).toLowerCase());
        if (match) {
            handleLearnMore(match);
        }
    // only run when location.state changes
    }, [location.state]);

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
                                    <OptimizedImage
                                        src={project.image}
                                        alt={project.title}
                                        width={400}
                                        height={300}
                                        quality={85}
                                    />
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
                                    <button
                                        className="btn btn-outline btn-sm"
                                        onClick={() => handleLearnMore(project)}
                                    >
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

            {/* Project Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={selectedProject?.title}
            >
                {selectedProject && (
                    <div className="project-modal">
                        <div className="project-modal__header">
                            <h2 className="project-modal__title">{selectedProject.title}</h2>
                            <div className="project-modal__meta">
                                <div className="project-modal__meta-item">
                                    <FiMapPin size={16} />
                                    {selectedProject.location}
                                </div>
                                <div className="project-modal__meta-item">
                                    <FiCalendar size={16} />
                                    {selectedProject.year}
                                </div>
                                <div className="project-modal__meta-item">
                                    <span className={`badge badge-${selectedProject.type === 'Tourism' ? 'forest' : 'earth'}`}>
                                        {selectedProject.type}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <p className="project-modal__description">
                            {selectedProject.description}
                        </p>

                        <div className="project-modal__features">
                            <h3 className="project-modal__features-title">Key Features</h3>
                            <div className="project-modal__features-list">
                                {selectedProject.features.map((feature, index) => (
                                    <span key={index} className="project-modal__feature">
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {projectImages[selectedProject.folderName] && projectImages[selectedProject.folderName].length > 0 && (
                            <div className="project-modal__gallery">
                                <h3 className="project-modal__gallery-title">
                                    Project Gallery ({projectImages[selectedProject.folderName].length} images)
                                </h3>
                                <div className="project-modal__gallery-grid">
                                    {(showAllImages ? projectImages[selectedProject.folderName] : projectImages[selectedProject.folderName].slice(0, 24)).map((image, index) => (
                                        <div key={index} className="project-modal__gallery-item" onClick={() => { setLightboxIndex(index); setLightboxOpen(true); }}>
                                            <OptimizedImage
                                                src={image}
                                                alt={`${selectedProject.title} ${index + 1}`}
                                                width={300}
                                                height={225}
                                                quality={80}
                                                fit="contain"
                                                background="var(--background)"
                                            />
                                        </div>
                                    ))}
                                    {!showAllImages && projectImages[selectedProject.folderName].length > 24 && (
                                        <div className="project-modal__gallery-more">
                                            <p>+{projectImages[selectedProject.folderName].length - 24} more images</p>
                                            <button
                                                className="btn btn-outline"
                                                onClick={() => setShowAllImages(true)}
                                            >
                                                Load All Images
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
            {selectedProject && (
                <Lightbox
                    images={projectImages[selectedProject.folderName] || []}
                    startIndex={lightboxIndex}
                    isOpen={lightboxOpen}
                    onClose={() => setLightboxOpen(false)}
                />
            )}
        </main>
    );
};

export default Projects;
