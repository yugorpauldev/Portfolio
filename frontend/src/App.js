import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [isVisible, setIsVisible] = useState({});
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollY = window.scrollY;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isInView = rect.top <= window.innerHeight * 0.6 && rect.bottom >= 0;
          
          setIsVisible(prev => ({
            ...prev,
            [section]: isInView
          }));

          if (isInView && rect.top <= 200) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  // SVG Icons for technologies
  const TechIcon = ({ name, children }) => (
    <div className="flex flex-col items-center group">
      <div className="w-16 h-16 mb-3 flex items-center justify-center rounded-xl bg-gray-100 group-hover:bg-gray-200 transition-all duration-300 group-hover:scale-110 filter grayscale hover:grayscale-0">
        {children}
      </div>
      <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">{name}</span>
    </div>
  );

  const technologies = [
    {
      name: 'Python',
      icon: (
        <svg viewBox="0 0 48 48" className="w-10 h-10">
          <path fill="#0277BD" d="M24.047,5c-1.555,0.005-2.633,0.142-3.936,0.367c-3.848,0.67-4.549,2.077-4.549,4.67V14h9v2H15.22c-2.65,0-4.944,1.59-5.665,4.615C8.967,23.092,8.967,24.908,9.555,27.385c0.588,2.477,1.993,4.615,4.643,4.615h3.003v-4.462c0-3.016,2.605-5.677,5.665-5.677h8.953c2.496,0,4.498-2.044,4.498-4.572V10.037c0-2.404-2.027-4.196-4.498-4.667C30.453,5.18,25.597,4.995,24.047,5z"/>
          <path fill="#FFC107" d="M23.078,9c0.753,0,1.365-0.612,1.365-1.365S23.831,6.27,23.078,6.27s-1.365,0.612-1.365,1.365S22.325,9,23.078,9z"/>
          <path fill="#FFC107" d="M23.953,43c1.555-0.005,2.633-0.142,3.936-0.367c3.848-0.67,4.549-2.077,4.549-4.67V34h-9v-2h9.343c2.65,0,4.944-1.59,5.665-4.615C39.033,24.908,39.033,23.092,38.445,20.615C37.857,18.138,36.452,16,33.802,16h-3.003v4.462c0,3.016-2.605,5.677-5.665,5.677h-8.953c-2.496,0-4.498,2.044-4.498,4.572v7.965c0,2.404,2.027,4.196,4.498,4.667C17.547,42.82,22.403,43.005,23.953,43z"/>
          <path fill="#0277BD" d="M24.922,39c-0.753,0-1.365,0.612-1.365,1.365s0.612,1.365,1.365,1.365s1.365-0.612,1.365-1.365S25.675,39,24.922,39z"/>
        </svg>
      )
    },
    {
      name: 'Django',
      icon: (
        <svg viewBox="0 0 48 48" className="w-10 h-10">
          <path fill="#004d40" d="M18.974,31.5c0,0.828-0.671,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-14c0-0.653,0.423-1.231,1.045-1.43l18.552-5.932c0.902-0.288,1.858,0.209,2.146,1.111c0.288,0.902-0.209,1.858-1.111,2.146l-17.632,5.635V31.5z"/>
          <path fill="#004d40" d="M36.974,20.5c0,0.828-0.671,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-3c0-0.828,0.671-1.5,1.5-1.5s1.5,0.672,1.5,1.5V20.5z"/>
        </svg>
      )
    },
    {
      name: 'JavaScript',
      icon: (
        <svg viewBox="0 0 48 48" className="w-10 h-10">
          <path fill="#ffd600" d="M6,42V6h36v36H6z"/>
          <path fill="#000001" d="M29.538 32.947c.692 1.124 1.444 2.201 3.037 2.201 1.338 0 2.04-.665 2.04-1.585 0-1.101-.726-1.492-2.198-2.133l-.807-.344c-2.329-.988-3.878-2.226-3.878-4.841 0-2.41 1.845-4.244 4.728-4.244 2.053 0 3.528.711 4.592 2.573l-2.514 1.607c-.553-.988-1.151-1.377-2.078-1.377-.946 0-1.545.597-1.545 1.377 0 .964.6 1.354 1.985 1.951l.807.344C36.452 29.645 38 30.839 38 33.523 38 36.415 35.716 38 32.65 38c-2.999 0-4.702-1.505-5.65-3.368L29.538 32.947z"/>
          <path fill="#000001" d="M17.952 33.029c.506.906 1.275 1.603 2.381 1.603 1.058 0 1.667-.418 1.667-2.043V22h3.333v11.101c0 3.367-1.953 4.899-4.805 4.899-2.577 0-4.437-1.746-5.195-3.368L17.952 33.029z"/>
        </svg>
      )
    },
    {
      name: 'Flutter',
      icon: (
        <svg viewBox="0 0 48 48" className="w-10 h-10">
          <polygon fill="#40c4ff" points="13.4,42 29,26.4 21.4,18.8 5.8,34.4"/>
          <polygon fill="#40c4ff" points="13.4,6 29,21.6 21.4,29.2 5.8,13.6"/>
          <polygon fill="#29b6f6" points="21.4,18.8 29,26.4 21.4,34 13.8,26.4"/>
          <polygon fill="#01579b" points="21.4,34 29,41.6 37.6,50.2 21.4,34"/>
          <polygon fill="#084994" points="13.4,42 21,34.4 21.4,34 13.8,26.4"/>
        </svg>
      )
    },
    {
      name: 'SQL',
      icon: (
        <svg viewBox="0 0 48 48" className="w-10 h-10">
          <path fill="#00796b" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"/>
          <path fill="#fff" d="M28 19v-6a4 4 0 0 0-8 0v6H17v10a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V19H28z M22 13a2 2 0 0 1 4 0v6h-4V13z M29 29a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2V21h10V29z"/>
        </svg>
      )
    },
    {
      name: 'Docker',
      icon: (
        <svg viewBox="0 0 48 48" className="w-10 h-10">
          <path fill="#0288d1" d="M24,9.604c-6.4,0-10.4,3.199-12,9.597c2.4-3.199,5.2-4.398,8.4-3.599 c1.826,0.456,3.131,1.781,4.576,3.247C27.328,21.236,30.051,23.2,36,23.2c6.4,0,10.4-3.199,12-9.598 C45.6,16.801,42.8,18.001,39.6,17.202c-1.825-0.456-3.13-1.781-4.575-3.247C32.672,11.563,29.949,9.604,24,9.604z"/>
          <path fill="#0288d1" d="M12,23.2c-6.4,0-10.4,3.199-12,9.598c2.4-3.199,5.2-4.399,8.4-3.599 c1.825,0.457,3.13,1.781,4.575,3.246c2.353,2.388,5.077,4.347,11.025,4.347c6.4,0,10.4-3.198,12-9.597 C33.6,30.394,30.8,31.594,27.6,30.795c-1.826-0.456-3.131-1.781-4.576-3.246C20.672,25.161,17.949,23.2,12,23.2z"/>
        </svg>
      )
    },
    {
      name: 'React',
      icon: (
        <svg viewBox="0 0 48 48" className="w-10 h-10">
          <path fill="#80deea" d="M24,34C11.1,34,1,29.5,1,24c0-5.5,10.1-10,23-10c12.9,0,23,4.5,23,10C47,29.5,36.9,34,24,34z M24,16 c-12.6,0-21,4.1-21,8c0,3.9,8.4,8,21,8s21-4.1,21-8C45,20.1,36.6,16,24,16z"/>
          <path fill="#80deea" d="M15.1,44.6c-1,0-1.8-0.2-2.6-0.7C7.6,41.1,8.9,30.2,15.3,19l0,0c3.4-6.2,6.9-11.6,10.14-15.7 c3.24-4.1,6.39-6.7,9.06-7.9c2.67-1.2,4.76-0.8,6.24,1.2c1.48,2,1.76,5.9-0.28,11.75c-2.04,5.85-5.84,12.85-10.84,19.75 c-6.4,8.8-12.1,15.3-16.5,18.7C19.7,43.5,17.2,44.6,15.1,44.6z M32.9,5.4c-1.6,0-3.15,0.34-4.51,0.99 c-2.66,1.27-5.26,4.08-8.45,8.99c-3.19,4.91-6.45,10.17-9.65,15.90c-6.05,10.8-6.3,18.6-3.4,21.9c1.4,1.6,3.6,2.1,6.4,1.2 c2.7-0.8,6.2-3.2,10.1-6.9c3.9-3.7,8.5-9.1,12.8-15.7c4.3-6.6,7.8-13.5,9.7-19.1c1.9-5.6,2.3-10.7,1.1-14.7 C36.4,6.0,34.8,5.4,32.9,5.4L32.9,5.4z"/>
          <circle fill="#80deea" cx="24" cy="24" r="4"/>
        </svg>
      )
    },
    {
      name: 'Node.js',
      icon: (
        <svg viewBox="0 0 48 48" className="w-10 h-10">
          <path fill="#388e3c" d="M17.204,19.122l-4.907,2.715C12.113,21.938,12,22.126,12,22.329v5.433c0,0.203,0.113,0.39,0.297,0.492l4.908,2.717c0.183,0.101,0.41,0.101,0.593,0l4.907-2.717C22.887,28.152,23,27.965,23,27.762v-5.433c0-0.203-0.113-0.39-0.297-0.492l-4.906-2.715C17.615,19.021,17.385,19.021,17.204,19.122"/>
          <path fill="#37474f" d="M35.67,36.508C35.67,36.785,35.447,37.008,35.17,37.008c-0.277,0-0.5-0.223-0.5-0.5V11.853c0-0.277,0.223-0.5,0.5-0.5c0.277,0,0.5,0.223,0.5,0.5V36.508z"/>
        </svg>
      )
    },
    {
      name: 'Git',
      icon: (
        <svg viewBox="0 0 48 48" className="w-10 h-10">
          <path fill="#F4511E" d="M42.2,22.1L25.9,5.8C25.4,5.3,24.7,5,24,5c0,0,0,0,0,0c-0.7,0-1.4,0.3-1.9,0.8L5.8,22.1 C5.3,22.6,5,23.3,5,24c0,0.7,0.3,1.4,0.8,1.9l16.3,16.3c0,0,0,0,0,0c0.5,0.5,1.2,0.8,1.9,0.8s1.4-0.3,1.9-0.8L42.2,25.9 c0.5-0.5,0.8-1.2,0.8-1.9C43,23.3,42.7,22.6,42.2,22.1z"/>
          <path fill="#fff" d="M24 7c0.6 0 1.2 0.2 1.6 0.7L40.3 22.4c0.4 0.4 0.7 1 0.7 1.6s-0.2 1.2-0.7 1.6L25.6 40.3c-0.4 0.4-1 0.7-1.6 0.7s-1.2-0.2-1.6-0.7L7.7 25.6C7.2 25.2 7 24.6 7 24s0.2-1.2 0.7-1.6L22.4 7.7C22.8 7.2 23.4 7 24 7M24 5c-0.7 0-1.4 0.3-1.9 0.8L5.8 22.1C5.3 22.6 5 23.3 5 24c0 0.7 0.3 1.4 0.8 1.9l16.3 16.3c0.5 0.5 1.2 0.8 1.9 0.8s1.4-0.3 1.9-0.8l16.3-16.3c0.5-0.5 0.8-1.2 0.8-1.9c0-0.7-0.3-1.4-0.8-1.9L25.9 5.8C25.4 5.3 24.7 5 24 5L24 5z"/>
        </svg>
      )
    },
    {
      name: 'Kubernetes',
      icon: (
        <svg viewBox="0 0 48 48" className="w-10 h-10">
          <path fill="#326ce5" d="M24,9.7l-8.2,14.2L24,38.3l8.2-14.4L24,9.7z M24,12.6l5.9,10.2L24,33l-5.9-10.2L24,12.6z"/>
          <path fill="#fff" d="M15.8,23.9L24,9.7l8.2,14.2L24,38.3L15.8,23.9z M18.1,24l5.9,10.2L30,24l-5.9-10.2L18.1,24z"/>
        </svg>
      )
    },
    {
      name: 'Statistics',
      icon: (
        <svg viewBox="0 0 48 48" className="w-10 h-10">
          <path fill="#37474f" d="M40,40H8c-2.2,0-4-1.8-4-4V8c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4v28C44,38.2,42.2,40,40,40z"/>
          <path fill="#fff" d="M12,32V16h4v16H12z M20,32V12h4v20H20z M28,32V20h4v12H28z M36,32V24h4v8H36z"/>
        </svg>
      )
    },
    {
      name: 'Data Analysis',
      icon: (
        <svg viewBox="0 0 48 48" className="w-10 h-10">
          <path fill="#1e88e5" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5 V37z"/>
          <path fill="#fff" d="M13 30L18 25 23 30 30 23 35 28"/>
          <circle fill="#fff" cx="18" cy="25" r="2"/>
          <circle fill="#fff" cx="23" cy="30" r="2"/>
          <circle fill="#fff" cx="30" cy="23" r="2"/>
          <circle fill="#fff" cx="35" cy="28" r="2"/>
        </svg>
      )
    }
  ];

  const projects = [
    {
      id: 1,
      title: 'E-Commerce API Platform',
      shortDescription: 'Scalable REST API with Django REST Framework, JWT authentication, and payment processing.',
      fullDescription: 'A comprehensive e-commerce backend system built to handle high-traffic scenarios with robust security and performance optimization.',
      implementation: {
        overview: 'Built a full-featured e-commerce API using Django REST Framework with microservices architecture.',
        keyFeatures: [
          'JWT-based authentication and authorization system',
          'RESTful API endpoints for products, orders, and user management',
          'Integrated Stripe payment processing with webhook handling',
          'Redis caching for improved performance and session management',
          'Celery task queue for background job processing',
          'PostgreSQL database with optimized queries and indexing'
        ],
        technicalChallenges: [
          'Implemented rate limiting and API throttling for security',
          'Created automated testing suite with 95% code coverage',
          'Set up CI/CD pipeline with Docker containers',
          'Designed scalable database schema with proper relationships'
        ],
        deployment: 'Deployed using Docker containers on AWS EC2 with load balancing and auto-scaling capabilities.'
      },
      technologies: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
      image: 'https://images.pexels.com/photos/2061168/pexels-photo-2061168.jpeg',
      github: 'https://github.com/yugorpaulo/ecommerce-api',
      demo: 'https://api.yugorpaulo.dev/docs'
    },
    {
      id: 2,
      title: 'Bioengineering Data Analytics Platform',
      shortDescription: 'Real-time analytics platform for bioengineering data using Flask, Oracle DB, and statistical modeling.',
      fullDescription: 'A sophisticated data analytics platform designed for bioengineering research, leveraging my Stanford Data Science certification.',
      implementation: {
        overview: 'Developed a comprehensive analytics platform for processing and analyzing bioengineering datasets using statistical methods learned from Stanford certification.',
        keyFeatures: [
          'Real-time data processing pipeline with Flask and Oracle DB',
          'Statistical analysis modules using Python scientific libraries',
          'Interactive data visualizations with Plotly and D3.js',
          'Machine learning models for predictive bioengineering insights',
          'Automated report generation with statistical significance testing',
          'RESTful API for data ingestion and retrieval'
        ],
        technicalChallenges: [
          'Implemented complex statistical algorithms for bioengineering data',
          'Optimized Oracle database queries for large-scale dataset processing',
          'Created data validation and cleaning pipelines',
          'Built responsive dashboard with real-time updates using WebSockets'
        ],
        deployment: 'Containerized with Docker and deployed on Kubernetes cluster with horizontal scaling for handling large datasets.'
      },
      technologies: ['Python', 'Flask', 'Oracle', 'Pandas', 'NumPy', 'Plotly', 'Kubernetes'],
      image: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg',
      github: 'https://github.com/yugorpaulo/bioeng-analytics',
      demo: 'https://bioanalytics.yugorpaulo.dev'
    }
  ];

  const certifications = [
    {
      name: 'Stanford Data Science for Bioengineering',
      issuer: 'Stanford University',
      icon: '🎓',
      year: '2024'
    }
  ];

  const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-none max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="sticky top-0 bg-white p-8 border-b border-gray-100 flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-2">{project.title}</h2>
              <p className="text-gray-500 font-light">{project.shortDescription}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-3xl font-light leading-none"
            >
              ×
            </button>
          </div>
          
          <div className="p-8 space-y-12">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-64 object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
            />
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-light text-gray-900 mb-4 border-b border-gray-100 pb-2">Overview</h3>
                <p className="text-gray-600 leading-relaxed font-light">{project.fullDescription}</p>
              </div>

              <div>
                <h3 className="text-xl font-light text-gray-900 mb-4 border-b border-gray-100 pb-2">Implementation</h3>
                <p className="text-gray-600 mb-6 font-light">{project.implementation.overview}</p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Key Features</h4>
                    <ul className="space-y-2 text-gray-600 font-light">
                      {project.implementation.keyFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Technical Challenges</h4>
                    <ul className="space-y-2 text-gray-600 font-light">
                      {project.implementation.technicalChallenges.map((challenge, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-medium text-gray-900 mb-3">Deployment</h4>
                  <p className="text-gray-600 font-light">{project.implementation.deployment}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-light text-gray-900 mb-4 border-b border-gray-100 pb-2">Technologies</h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 text-sm font-light text-gray-700 border border-gray-200 rounded-none hover:bg-gray-50 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-6 pt-6">
                <a 
                  href={project.github}
                  className="px-8 py-3 text-sm font-light text-gray-900 border border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 rounded-none"
                >
                  View Source Code
                </a>
                <a 
                  href={project.demo}
                  className="px-8 py-3 text-sm font-light text-white bg-gray-900 hover:bg-gray-700 transition-all duration-300 rounded-none"
                >
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-light text-gray-900 tracking-wide">
              Yugor Paulo
            </div>
            <div className="hidden md:flex space-x-12">
              {['home', 'about', 'skills', 'projects', 'contact'].map(section => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-light uppercase tracking-wider transition-all duration-300 ${
                    activeSection === section 
                      ? 'text-gray-900 border-b border-gray-900' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <div className={`transform transition-all duration-1000 ${
            isVisible.home ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h1 className="text-7xl md:text-9xl font-extralight text-gray-900 mb-8 leading-none">
              Hi, I'm
            </h1>
            <h1 className="text-7xl md:text-9xl font-light text-gray-900 mb-8 leading-none">
              Yugor Paulo.
            </h1>
            <p className="text-2xl md:text-3xl font-extralight text-gray-600 mb-16 tracking-wide">
              Nice to meet you.
            </p>
            
            <div className="space-y-8">
              <p className="text-lg font-light text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Backend Developer & Data Analyst specializing in Python, Django, and data-driven solutions
              </p>
              <button
                onClick={() => scrollToSection('about')}
                className="inline-block px-12 py-4 text-sm font-light text-gray-900 border border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 tracking-wider uppercase rounded-none"
              >
                Explore Work
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8">
          <div className={`transform transition-all duration-1000 ${
            isVisible.about ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-5xl font-extralight text-gray-900 mb-20 text-center">
              About
            </h2>
            
            <div className="grid md:grid-cols-2 gap-20 items-start">
              <div className="space-y-8">
                <p className="text-lg font-light text-gray-600 leading-relaxed">
                  I'm a passionate junior backend developer and data analyst with expertise in 
                  Python, Django, Flask, and modern mobile development with Flutter. My work combines 
                  robust backend architecture with data-driven insights.
                </p>
                <p className="text-lg font-light text-gray-600 leading-relaxed">
                  With a Stanford certification in Data Science for Bioengineering, I bring statistical 
                  rigor and analytical thinking to software development. I specialize in building scalable 
                  APIs, managing complex databases, and creating data analytics solutions.
                </p>

                <div className="grid grid-cols-1 gap-6 mt-12">
                  <div className="border-l-2 border-gray-200 pl-6">
                    <h4 className="font-light text-gray-900 mb-2">Backend Development</h4>
                    <p className="text-gray-500 font-light text-sm">API Design, Database Optimization, DevOps</p>
                  </div>
                  <div className="border-l-2 border-gray-200 pl-6">
                    <h4 className="font-light text-gray-900 mb-2">Data Science</h4>
                    <p className="text-gray-500 font-light text-sm">Statistical Analysis, Data Visualization</p>
                  </div>
                  <div className="border-l-2 border-gray-200 pl-6">
                    <h4 className="font-light text-gray-900 mb-2">Mobile Development</h4>
                    <p className="text-gray-500 font-light text-sm">Flutter, Cross-platform Apps</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="border border-gray-200 p-8">
                  <h3 className="text-xl font-light text-gray-900 mb-6">Certification</h3>
                  {certifications.map((cert, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-light text-gray-900">{cert.name}</h4>
                      <p className="text-gray-500 font-light text-sm">{cert.issuer} • {cert.year}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-extralight text-gray-900 mb-2">15+</div>
                    <div className="text-xs font-light text-gray-500 uppercase tracking-wider">Projects</div>
                  </div>
                  <div>
                    <div className="text-3xl font-extralight text-gray-900 mb-2">12</div>
                    <div className="text-xs font-light text-gray-500 uppercase tracking-wider">Technologies</div>
                  </div>
                  <div>
                    <div className="text-3xl font-extralight text-gray-900 mb-2">3+</div>
                    <div className="text-xs font-light text-gray-500 uppercase tracking-wider">Years</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className={`transform transition-all duration-1000 ${
            isVisible.skills ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-5xl font-extralight text-gray-900 mb-20 text-center">
              Technologies
            </h2>
            
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {technologies.map((tech, index) => (
                <TechIcon key={tech.name} name={tech.name}>
                  {tech.icon}
                </TechIcon>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className={`transform transition-all duration-1000 ${
            isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-5xl font-extralight text-gray-900 mb-20 text-center">
              Selected Work
            </h2>
            
            <div className="grid md:grid-cols-2 gap-16">
              {projects.map((project, index) => (
                <div 
                  key={index}
                  className="bg-white cursor-pointer group"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-80 object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="text-white text-center">
                        <p className="font-light text-sm uppercase tracking-wider">View Details</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-light text-gray-900 mb-4">{project.title}</h3>
                    <p className="text-gray-600 font-light leading-relaxed mb-6">{project.shortDescription}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="text-xs font-light text-gray-500 px-3 py-1 border border-gray-200 rounded-none"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs font-light text-gray-500 px-3 py-1 border border-gray-200 rounded-none">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <div className={`transform transition-all duration-1000 ${
            isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-5xl font-extralight text-gray-900 mb-8">
              Get In Touch
            </h2>
            <p className="text-lg font-light text-gray-600 mb-16 max-w-2xl mx-auto leading-relaxed">
              I'm always interested in new opportunities and exciting projects. 
              Let's discuss how we can work together.
            </p>
            
            <div className="flex justify-center gap-8">
              <a 
                href="mailto:krismiidtv@gmail.com"
                className="px-12 py-4 text-sm font-light text-gray-900 border border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 tracking-wider uppercase rounded-none"
              >
                Email
              </a>
              <a 
                href="https://linkedin.com/in/krismiid"
                target="_blank"
                rel="noopener noreferrer"
                className="px-12 py-4 text-sm font-light text-white bg-gray-900 hover:bg-gray-700 transition-all duration-300 tracking-wider uppercase rounded-none"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-gray-400 font-light text-sm tracking-wider">
            © 2025 Yugor Paulo — Backend Developer & Data Analyst
          </p>
        </div>
      </footer>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
};

export default App;