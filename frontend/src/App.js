import React, { useState, useEffect } from 'react';
import './App.css';
import gmailDashboardImg from './assets/gmail-image.jpg';
import certificateImg from './assets/certificate.png';
import blastImg from './assets/blast.png';
import perfectusImg from './assets/perfectus.png';
import foundryImg from './assets/foundry-logo.png';

const App = () => {
  const [isVisible, setIsVisible] = useState({});
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [typingComplete, setTypingComplete] = useState(false);
  const [showModeSelection, setShowModeSelection] = useState(false);
  const [currentMode, setCurrentMode] = useState(null);
  const [typedText, setTypedText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const fullText = "Hi, I'm Yugor Paulo.";

  // Typing animation effect
  useEffect(() => {
    if (currentMode) return; // Don't run if mode is already selected
    
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTypingComplete(true);
        setTimeout(() => setShowModeSelection(true), 1000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [currentMode]);

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

    if (currentMode) {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentMode]);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const handleModeSelection = (mode) => {
    setCurrentMode(mode);
    setShowModeSelection(false);
  };

  const getColorPalette = () => {
    // Distinct palettes for each mode and dark/light
    if (currentMode === 'recruiter') {
      return isDarkMode ? {
        primary: '#a3bffa',
        secondary: '#b794f4',
        accent: '#fbb6ce',
        text: '#f7fafc',
        background: '#18181b',
        surface: '#23232a'
      } : {
        primary: '#667eea',
        secondary: '#764ba2',
        accent: '#f093fb',
        text: '#4a5568',
        background: '#f7fafc',
        surface: '#ffffff'
      };
    }
    // Developer and Guest modes
    return isDarkMode ? {
      primary: '#b5c7c9',
      secondary: '#bfc99a',
      accent: '#cfd8cf',
      text: '#f7fafc',
      background: '#18181b',
      surface: '#23232a'
    } : {
      primary: '#657a7c',
      secondary: '#657348',
      accent: '#99a292',
      text: '#2f3d50',
      background: '#e0e1e1',
      surface: '#ffffff'
    };
  };

  const palette = getColorPalette();

  // SVG Icons for technologies
  const TechIcon = ({ name, children }) => (
    <div className="flex flex-col items-center group">
      <div
        className="w-16 h-16 mb-3 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 filter grayscale hover:grayscale-0"
        style={{
          background: isDarkMode ? '#23232a' : '#f3f4f6',
          border:'none',
          boxShadow: isDarkMode ? '0 2px 8px #18181b44' : '0 2px 8px #e0e1e144'
        }}
      >
        {children}
      </div>
      <span className="text-sm font-medium transition-colors" style={{color: palette.text}}>{name}</span>
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
          <path fill="#fff" d="M24 7c0.6 0 1.2 0.2 1.6 0.7L40.3 22.4c0.4 0.4 0.7 1 0.7 1.6s-0.2 1.2-0.7 1.6L25.6 40.3c-0.4 0.4-1 0.7-1.6 0.7s-1.2-0.2-1.6-0.7L7.7 25.6C7.2 25.2 7 24.6 7 24s0.2-1.2 0.7-1.6L22.4 7.7C22.8 7.2 23.4 7 24 7L24 7z"/>
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
      name: 'n8n',
      icon: (
        <svg viewBox="0 0 48 48" className="w-10 h-10">
          <circle cx="24" cy="24" r="22" fill="#fff"/>
          <g filter="url(#n8n-shadow)">
            <path d="M24 8a16 16 0 1 1 0 32a16 16 0 1 1 0-32zm0 2a14 14 0 1 0 0 28a14 14 0 1 0 0-28z" fill="#F37C1B"/>
            <circle cx="24" cy="24" r="7" fill="#F37C1B"/>
            <circle cx="24" cy="24" r="4" fill="#fff"/>
            <circle cx="24" cy="24" r="2" fill="#F37C1B"/>
          </g>
          <defs>
            <filter id="n8n-shadow" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.08"/>
            </filter>
          </defs>
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

  const getProjectsForMode = () => {
    const baseProjects = [
      {
        id: 1,
        title: 'E-Commerce API Platform',
        shortDescription: currentMode === 'developer' 
          ? 'Scalable REST API built with Django REST Framework, featuring JWT authentication, payment processing, and microservices architecture designed for high-traffic scenarios.'
          : 'Scalable REST API with Django REST Framework, JWT authentication, and payment processing.',
        fullDescription: 'A comprehensive e-commerce backend system built to handle high-traffic scenarios with robust security and performance optimization.',
        implementation: {
          overview: currentMode === 'developer' 
            ? 'Built a full-featured e-commerce API using Django REST Framework with microservices architecture. The system was designed with scalability in mind, implementing domain-driven design principles and following SOLID principles. The API follows RESTful conventions and includes comprehensive OpenAPI documentation.'
            : 'Built a full-featured e-commerce API using Django REST Framework with microservices architecture.',
          keyFeatures: [
            'JWT-based authentication and authorization system with refresh token rotation',
            'RESTful API endpoints for products, orders, users, and inventory management',
            'Integrated Stripe payment processing with comprehensive webhook handling',
            'Redis caching layer for improved performance and session management',
            'Celery distributed task queue for background job processing',
            'PostgreSQL database with optimized queries, proper indexing, and query analysis',
            ...(currentMode === 'developer' ? [
              'Custom middleware for request/response logging and monitoring',
              'Rate limiting implementation using Redis and sliding window algorithm',
              'Database connection pooling and query optimization techniques',
              'Comprehensive error handling with custom exception classes',
              'API versioning strategy with backward compatibility support'
            ] : [])
          ],
          technicalChallenges: [
            'Implemented advanced rate limiting and API throttling for DDoS protection',
            'Created comprehensive testing suite with 95% code coverage using pytest',
            'Set up CI/CD pipeline with Docker containers and automated deployment',
            'Designed scalable database schema with proper relationships and normalization',
            ...(currentMode === 'developer' ? [
              'Solved N+1 query problems using select_related and prefetch_related',
              'Implemented database query optimization reducing response time by 60%',
              'Created custom Django management commands for data migration',
              'Built monitoring and alerting system using Prometheus and Grafana',
              'Handled concurrent transaction issues using database-level locking'
            ] : [])
          ],
          deployment: currentMode === 'developer' 
            ? 'Deployed using Docker containers on AWS EC2 with Application Load Balancer, auto-scaling groups, and RDS for database. Implemented blue-green deployment strategy with zero downtime. Used CloudFormation for infrastructure as code and implemented comprehensive monitoring with CloudWatch metrics and alerts.'
            : 'Deployed using Docker containers on AWS EC2 with load balancing and auto-scaling capabilities.'
        },
        technologies: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
        image: 'https://images.pexels.com/photos/2061168/pexels-photo-2061168.jpeg',
        github: 'https://github.com/yugorpaulo/ecommerce-api',
        demo: 'https://api.yugorpaulo.dev/docs'
      },
      {
        id: 2,
        title: 'Bioengineering Data Analytics Platform',
        shortDescription: currentMode === 'developer'
          ? 'Real-time analytics platform for bioengineering data utilizing Flask, Oracle DB, advanced statistical modeling, and machine learning algorithms for predictive insights.'
          : 'Real-time analytics platform for bioengineering data using Flask, Oracle DB, and statistical modeling.',
        fullDescription: 'A sophisticated data analytics platform designed for bioengineering research, leveraging my Stanford Data Science certification.',
        implementation: {
          overview: currentMode === 'developer'
            ? 'Developed a comprehensive analytics platform for processing and analyzing bioengineering datasets using advanced statistical methods and machine learning algorithms learned from Stanford certification. The platform processes large-scale biological datasets, performs complex statistical analysis, and provides real-time insights through interactive visualizations.'
            : 'Developed a comprehensive analytics platform for processing and analyzing bioengineering datasets using statistical methods learned from Stanford certification.',
          keyFeatures: [
            'Real-time data processing pipeline with Flask and Oracle database',
            'Statistical analysis modules using Python scientific libraries (NumPy, SciPy, Pandas)',
            'Interactive data visualizations with Plotly, D3.js, and custom charting components',
            'Machine learning models for predictive bioengineering insights using scikit-learn',
            'Automated report generation with statistical significance testing',
            'RESTful API for data ingestion, processing, and retrieval',
            ...(currentMode === 'developer' ? [
              'Custom ETL pipelines for processing multi-format bioengineering data',
              'Implementation of statistical algorithms including ANOVA, regression analysis, and time-series forecasting',
              'Real-time data streaming using WebSockets for live dashboard updates',
              'Advanced data validation and quality assurance pipelines',
              'Custom machine learning pipeline with feature engineering and model selection'
            ] : [])
          ],
          technicalChallenges: [
            'Implemented complex statistical algorithms for bioengineering data analysis',
            'Optimized Oracle database queries for large-scale dataset processing',
            'Created robust data validation and cleaning pipelines',
            'Built responsive dashboard with real-time updates using WebSockets',
            ...(currentMode === 'developer' ? [
              'Solved memory optimization issues when processing datasets exceeding 100GB',
              'Implemented parallel processing using multiprocessing and concurrent.futures',
              'Created custom Oracle stored procedures for complex aggregation queries',
              'Built fault-tolerant data pipeline with automatic error recovery',
              'Optimized statistical computations reducing processing time by 75%'
            ] : [])
          ],
          deployment: currentMode === 'developer'
            ? 'Containerized with Docker and deployed on Kubernetes cluster with horizontal pod autoscaling for handling variable workloads. Implemented service mesh architecture using Istio for traffic management. Used Helm charts for application deployment and configured persistent volumes for data storage. Set up monitoring with ELK stack and implemented automated backup strategies.'
            : 'Containerized with Docker and deployed on Kubernetes cluster with horizontal scaling for handling large datasets.'
        },
        technologies: ['Python', 'Flask', 'Oracle', 'Pandas', 'NumPy', 'Plotly', 'Kubernetes'],
        image: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg',
        github: 'https://github.com/yugorpaulo/bioeng-analytics',
        demo: 'https://bioanalytics.yugorpaulo.dev'
      },
      {
        id: 3,
        title: 'Agent for HR Outsourcing Company',
        shortDescription: currentMode === 'developer'
          ? 'AI-powered n8n automation for HR: integrates Google Calendar, Sheets, Gmail, and GPT-4 to fully automate interview scheduling and candidate communication.'
          : 'AI agent that automates interview scheduling and candidate communication for HR teams using Google and OpenAI services.',
        fullDescription: 'An intelligent automation agent designed for HR outsourcing companies to streamline interview scheduling and candidate communication. Integrates Google Calendar, Google Sheets, Gmail, and GPT-4 to automate the entire process, from reading candidate data to sending personalized interview invites.',
        implementation: {
          overview: currentMode === 'developer'
            ? 'Developed an n8n workflow that monitors a Google Sheet for new candidate entries, selects the next available interview slot (Mon/Wed/Fri at 3 PM), creates a Google Calendar invite, and uses GPT-4 to generate and send a personalized email via Gmail. The workflow ensures no same-day interviews, handles time zone conflicts, and maintains professional communication.'
            : 'Automates interview scheduling and email communication for HR teams by integrating Google Calendar, Sheets, Gmail, and GPT-4 in a single n8n workflow.',
          keyFeatures: [
            'Monitors a Google Sheet for new candidate entries every minute',
            'Auto-selects the next available interview slot (Mon/Wed/Fri at 3 PM)',
            'Creates a calendar invite in Google Calendar',
            'Uses GPT-4 to generate personalized emails based on candidate data',
            'Sends the email invite with the interview link via Gmail',
            'Prevents same-day interviews',
            'Ensures AI-generated emails are concise, polite, and professionally formatted',
            'Keeps scheduling conflict-free and easy to manage'
          ],
          technicalChallenges: [
            'Integrating Google Calendar, Google Sheets, and Gmail APIs with n8n',
            'Prompt engineering for GPT-4 to generate professional emails',
            'Handling OAuth2 authentication for Google services',
            'Ensuring robust error handling and retry logic in automation',
            'Managing time zone conversions and calendar conflicts'
          ],
          deployment: currentMode === 'developer'
            ? 'Requires Google Calendar API credentials, a Google Sheet with candidate info (Name, Email, Background), a Gmail account with OAuth2, and Azure OpenAI API (GPT-4o recommended).'
            : 'Requires Google and OpenAI API credentials and a candidate spreadsheet.'
        },
        technologies: ['n8n', 'Google Calendar API', 'Google Sheets API', 'Gmail API', 'Azure OpenAI API'],
        image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
        github: '',
        demo: ''
      },
      {
        id: 4,
        title: 'Email Manager – Intelligent Gmail Classification',
        shortDescription: currentMode === 'developer'
          ? 'AI-powered n8n workflow for Gmail: monitors, analyzes, and classifies emails in real time using Claude Sonnet 4 and Gmail API.'
          : 'Automation that monitors Gmail, analyzes emails with AI, and applies smart labels for better organization and prioritization.',
        fullDescription: 'An automation flow that continuously monitors your Gmail inbox, analyzes email content and context using advanced AI, and intelligently classifies messages with appropriate labels for improved organization and prioritization.',
        implementation: {
          overview: currentMode === 'developer'
            ? 'Built an n8n workflow that polls Gmail for new messages every minute, extracts full email content and metadata, analyzes sender/recipient history, and uses Claude Sonnet 4 for context-aware classification. The workflow applies smart labels (To Respond, FYI, Notification, Marketing, Meeting Update, Comment) using the Gmail API and ensures consistent, structured output for reliable automation.'
            : 'Automatically monitors Gmail, analyzes emails with AI, and applies smart labels for better organization and prioritization.',
          keyFeatures: [
            'Real-time Gmail inbox monitoring and polling',
            'Extracts full email body, headers, sender/recipient info, and metadata',
            'Analyzes email history and conversation threads',
            'Uses Claude Sonnet 4 for advanced content and context analysis',
            'Detects cold vs. warm emails and intent/urgency',
            'Automatically applies smart Gmail labels (To Respond, FYI, Notification, Marketing, Meeting Update, Comment)',
            'Ensures consistent labeling with structured output parsing',
            'Handles automated vs. human-sent email detection',
            'Thread-aware conversation tracking'
          ],
          technicalChallenges: [
            'Integrating Gmail API for real-time monitoring and label management',
            'Prompt engineering for Claude Sonnet 4 to ensure accurate classification',
            'Parsing and structuring email content and metadata',
            'Maintaining classification accuracy across diverse email types',
            'Handling email threading and conversation context',
            'Ensuring reliable automation with error handling and retries'
          ],
          deployment: currentMode === 'developer'
            ? 'Requires Gmail API credentials, n8n instance, Anthropic Claude API access, and configuration of label IDs for Gmail integration.'
            : 'Requires Gmail and Anthropic Claude API credentials and n8n setup.'
        },
        technologies: ['n8n', 'Gmail API', 'Anthropic Claude', 'Structured Output Parser'],
        image: gmailDashboardImg,
        github: '',
        demo: ''
      }
    ];

    return baseProjects;
  };

  const getSoftSkills = () => [
    { name: 'Problem Solving', description: 'Analytical thinking and systematic approach to complex challenges' },
    { name: 'Team Collaboration', description: 'Effective communication and coordination in cross-functional teams' },
    { name: 'Adaptability', description: 'Quick learning and adaptation to new technologies and methodologies' },
    { name: 'Time Management', description: 'Efficient project planning and deadline management' },
    { name: 'Critical Thinking', description: 'Data-driven decision making and logical analysis' },
    { name: 'Communication', description: 'Clear technical documentation and stakeholder presentation' }
  ];

  const certifications = [
    {
      name: 'Stanford Data Science for Bioengineering',
      issuer: 'Stanford Data Ocean',
      icon: '🎓',
      year: '2025'
    }
  ];

  const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;
    const isAgentProject = project.title.toLowerCase().includes('agent') || project.title.toLowerCase().includes('email manager');

    // Scroll to project card by title
    const scrollToProjectCard = () => {
      onClose();
      setTimeout(() => {
        const cards = document.querySelectorAll('.group');
        for (const card of cards) {
          if (card.querySelector('h3')?.textContent === project.title) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            break;
          }
        }
      }, 300);
    };

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4">
        <div className="bg-white rounded-none max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          {/* Remove sticky for mobile, keep for md+ */}
          <div className={`p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row md:justify-between md:items-start ${window.innerWidth < 768 ? '' : 'sticky top-0 bg-white'}`}> 
            <div>
              <h2 className="text-2xl md:text-3xl font-light mb-2" style={{color: isDarkMode && window.innerWidth < 768 ? '#222' : palette.text}}>{project.title}</h2>
              <p className="text-gray-500 font-light">{project.shortDescription}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-3xl font-light leading-none mt-2 md:mt-0"
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
                <h3 className="text-xl font-light mb-4 border-b border-gray-100 pb-2" style={{color: palette.text}}>Overview</h3>
                <p className="text-gray-600 leading-relaxed font-light">{project.fullDescription}</p>
              </div>
              <div>
                <h3 className="text-xl font-light mb-4 border-b border-gray-100 pb-2" style={{color: palette.text}}>Implementation</h3>
                <p className="text-gray-600 mb-6 font-light">{project.implementation.overview}</p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium mb-3" style={{color: palette.text}}>Key Features</h4>
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
                    <h4 className="font-medium mb-3" style={{color: palette.text}}>Technical Challenges</h4>
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
                  <h4 className="font-medium mb-3" style={{color: palette.text}}>Deployment</h4>
                  <p className="text-gray-600 font-light">{project.implementation.deployment}</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-light mb-4 border-b border-gray-100 pb-2" style={{color: palette.text}}>Technologies</h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 text-sm font-light border rounded-none hover:bg-gray-50 transition-colors"
                      style={{color: palette.text, borderColor: palette.primary}}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              {/* Modal action buttons at the bottom */}
              {isAgentProject && (
                <div className="flex gap-6 pt-6 justify-end">
                  <a
                    href={project.title.toLowerCase().includes('agent') 
                      ? 'https://drive.google.com/file/d/1CWsXGG8csezq_79NSd2ilkcdV9xdSy3U/view' 
                      : 'https://drive.google.com/file/d/1q1p9zxCfrd_76t6TxMX0Rct7NXUzx10-/view'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 text-sm font-light border hover:bg-gray-900 hover:text-white transition-all duration-300 rounded-none"
                    style={{color: palette.text, borderColor: palette.text}}
                  >
                    Show Overview of Work
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DarkModeToggle = () => (
    <button
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setIsDarkMode(v => !v)}
      className={window.innerWidth <= 768 ? 'darkmode-toggle-mobile' : ''}
      style={{
        position: 'fixed',
        top: 20,
        left: 20,
        zIndex: 100,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        width: window.innerWidth <= 768 ? 28 : 40,
        height: window.innerWidth <= 768 ? 28 : 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isDarkMode ? (
        <svg width={window.innerWidth <= 768 ? 20 : 28} height={window.innerWidth <= 768 ? 20 : 28} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
      ) : (
        <svg width={window.innerWidth <= 768 ? 20 : 28} height={window.innerWidth <= 768 ? 20 : 28} viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
      )}
    </button>
  );

  const ModeSelector = () => (
    <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: palette.background}}>
      <DarkModeToggle />
      <div
        className="flex flex-col items-center justify-center fixed inset-0 z-50 overflow-auto"
        style={{backgroundColor: palette.background, maxHeight: '100vh'}}
      >
        <div className="text-center max-w-2xl mx-auto px-8">
          <div className="mb-16">
            <h1 className="text-7xl md:text-9xl font-extralight mb-8 leading-none" style={{color: palette.text}}>
              {typedText}
              <span className="animate-pulse">|</span>
            </h1>
            <p className="text-2xl md:text-3xl font-extralight mb-16 tracking-wide" style={{color: palette.primary}}>
              Nice to meet you.
            </p>
          </div>

          {showModeSelection && (
            <div className="space-y-8 animate-fade-in">
              <p className="text-lg font-light mb-12" style={{color: palette.text}}>
                I'd like to tailor your experience. You are a:
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <button
                  onClick={() => handleModeSelection('recruiter')}
                  className="p-8 border border-gray-300 hover:border-purple-400 transition-all duration-300 group rounded-none"
                >
                  <div className="text-4xl mb-4"></div>
                  <h3 className="text-xl font-light mb-2" style={{color: palette.text}}>Recruiter</h3>
                  <p className="text-sm font-light text-gray-500">Focus on skills, experience, and achievements</p>
                </button>
                <button
                  onClick={() => handleModeSelection('developer')}
                  className="p-8 border border-gray-300 hover:border-purple-400 transition-all duration-300 group rounded-none"
                >
                  <div className="text-4xl mb-4"></div>
                  <h3 className="text-xl font-light mb-2" style={{color: palette.text}}>Developer</h3>
                  <p className="text-sm font-light text-gray-500">Deep dive into technical implementations</p>
                </button>
                <button
                  onClick={() => handleModeSelection('guest')}
                  className="p-8 border border-gray-300 hover:border-purple-400 transition-all duration-300 group rounded-none bg-transparent"
                >
                  <div className="text-4xl mb-4"></div>
                  <h3 className="text-xl font-light mb-2" style={{color: palette.text}}>Guest</h3>
                  <p className="text-sm font-light text-gray-500">General overview and resume access</p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (!currentMode) {
    return <ModeSelector />;
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: palette.background}}>
      <DarkModeToggle />
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-sm z-40 border-b" 
           style={{backgroundColor: `${palette.surface}95`, borderColor: `${palette.primary}20`}}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center w-full md:w-auto justify-between">
            <div className="flex items-center w-full gap-4 md:gap-0">
              {/* Align toggles and reduce font size for mobile */}
              <div className="mr-8 md:mr-4 flex-shrink-0 flex items-center">
                <DarkModeToggle />
              </div>
              <select 
                value={currentMode} 
                onChange={(e) => setCurrentMode(e.target.value)}
                className="text-xs md:text-sm font-light border-none rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
                style={{
                  color: palette.text,
                  backgroundColor: isDarkMode ? palette.surface : '#fff',
                  boxShadow: isDarkMode ? '0 2px 8px #0004' : '0 2px 8px #0001',
                  minWidth: 120,
                  paddingRight: 32,
                  '--tw-ring-color': isDarkMode ? palette.primary : palette.primary,
                  '--tw-ring-offset-color': isDarkMode ? palette.surface : '#fff',
                  fontSize: '12px'
                }}
              >
                <option value="recruiter" style={{background: isDarkMode ? palette.surface : '#fff', color: palette.text}}>👔 Recruiter Mode</option>
                <option value="developer" style={{background: isDarkMode ? palette.surface : '#fff', color: palette.text}}>💻 Developer Mode</option>
                <option value="guest" style={{background: isDarkMode ? palette.surface : '#fff', color: palette.text}}>👋 Guest Mode</option>
              </select>
            </div>
            {/* Mobile menu icon */}
            <button 
              className="md:hidden ml-4" 
              onClick={() => setShowMobileNav(v => !v)} 
              aria-label="Toggle navigation"
            >
              <svg width="28" height="28" fill="none" stroke={palette.text} strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
          {/* Desktop nav */}
          <div className="hidden md:flex space-x-12">
            {['home', 'about', 'skills', 'projects', 'contact'].map(section => {
              if (currentMode === 'guest' && section === 'skills') {
                return (
                  <button
                    key="resume"
                    onClick={() => window.open('/resume.pdf', '_blank')}
                    className="text-xs md:text-sm font-light uppercase tracking-wider transition-all duration-300"
                    style={{color: palette.primary}}
                  >
                    Resume
                  </button>
                );
              }
              return (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-xs md:text-sm font-light uppercase tracking-wider transition-all duration-300 ${
                    activeSection === section 
                      ? 'border-b' 
                      : 'hover:opacity-70'
                  }`}
                  style={{
                    color: activeSection === section ? palette.text : palette.primary,
                    borderColor: activeSection === section ? palette.text : 'transparent',
                    fontSize: '12px'
                  }}
                >
                  {section}
                </button>
              );
            })}
          </div>
        </div>
        {/* Mobile Navigation Sidebar */}
        {showMobileNav && (
          <>
            {/* Fully opaque overlay that closes sidebar when clicked and hides background content */}
            <div
              className="mobile-sidebar-overlay"
              onClick={() => setShowMobileNav(false)}
            />
            {/* Sidebar Container - now on the right */}
            <div
              className="mobile-sidebar open"
            >
              {/* Sidebar Header */}
              <div className="mobile-sidebar-header">
                <h3 className="text-lg font-medium dark:text-white">Menu</h3>
                <button
                  onClick={() => setShowMobileNav(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="Close menu"
                >
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              {/* Navigation Links */}
              <div className="mobile-sidebar-links">
                {['home', 'about', 'skills', 'projects', 'contact'].map(section => (
                  <button
                    key={section}
                    onClick={() => {
                      setShowMobileNav(false);
                      scrollToSection(section);
                    }}
                    className={`text-left py-3 px-4 rounded-lg transition-colors ${
                      activeSection === section
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                        : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center" style={{backgroundColor: palette.surface}}>
        <div className="max-w-4xl mx-auto px-8 text-center">
          <div className={`transform transition-all duration-1000 ${
            isVisible.home ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h1 className="text-7xl md:text-9xl font-extralight mb-8 leading-none" style={{color: palette.text}}>
              {typedText}
            </h1>
            <p className="text-2xl md:text-3xl font-extralight mb-16 tracking-wide" style={{color: palette.primary}}>
              Nice to meet you.
            </p>
            
            <div className="space-y-8">
              <p className="text-lg font-light max-w-2xl mx-auto leading-relaxed" style={{color: palette.text}}>
                Backend Developer & Data Analyst specializing in Python, Django, and data-driven solutions
              </p>
              <button
                onClick={() => scrollToSection('projects')}
                className="inline-block px-12 py-4 text-sm font-light border transition-all duration-300 tracking-wider uppercase rounded-none"
                style={{
                  color: palette.text,
                  borderColor: palette.text,
                  ':hover': {backgroundColor: palette.text, color: palette.surface}
                }}
              >
                Explore Work
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32" style={{backgroundColor: palette.background}}>
        <div className="max-w-6xl mx-auto px-8">
          <div className={`transform transition-all duration-1000 ${
            isVisible.about ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-5xl font-extralight mb-20 text-center" style={{color: palette.text}}>
              About
            </h2>
            
            <div className="grid md:grid-cols-2 gap-20 items-start">
              <div className="space-y-8">
                <p className="about-description">
                  I'm a passionate backend developer and data analyst with expertise in 
                  Python, Django, Flask, and automation solutions. My work combines 
                  robust backend architecture, data-driven insights, and workflow automation for business efficiency.
                </p>
                <p className="about-description">
                  With a Stanford certification in Data Science for Bioengineering, I bring statistical 
                  rigor and analytical thinking to software development. I specialize in building scalable 
                  APIs, managing complex databases, creating data analytics solutions, and architecting automation workflows (n8n, Zapier) for end-to-end business processes.
                </p>

                <div className="grid grid-cols-1 gap-6 mt-12">
                  <div className="border-l-2 pl-6" style={{borderColor: palette.accent}}>
                    <h4 className="font-light mb-2" style={{color: palette.text}}>Backend Development</h4>
                    <p className="font-light text-sm" style={{color: palette.primary}}>API Design, Database Optimization, DevOps</p>
                  </div>
                  <div className="border-l-2 pl-6" style={{borderColor: palette.accent}}>
                    <h4 className="font-light mb-2" style={{color: palette.text}}>Data Science</h4>
                    <p className="font-light text-sm" style={{color: palette.primary}}>Statistical Analysis, Data Visualization</p>
                  </div>
                  <div className="border-l-2 pl-6" style={{borderColor: palette.accent}}>
                    <h4 className="font-light mb-2" style={{color: palette.text}}>Solutions Architecture</h4>
                    <p className="font-light text-sm" style={{color: palette.primary}}>n8n, Zapier, Automation Workflows</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="border p-8" style={{borderColor: palette.accent, backgroundColor: palette.surface}}>
                  <h3 className="text-xl font-light mb-6" style={{color: palette.text}}>Certification</h3>
                  {certifications.map((cert, index) => (
                    <div key={index} className="space-y-2 flex items-center gap-6">
                      <img src={certificateImg} alt="Certificate" className="w-24 h-24 object-contain" style={{background: 'none'}} />
                      <div>
                        <h4 className="font-light" style={{color: palette.text}}>{cert.name}</h4>
                        <p className="font-light text-sm" style={{color: palette.primary}}>{cert.issuer} • {cert.year}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-extralight mb-2" style={{color: palette.text}}>15+</div>
                    <div className="text-xs font-light uppercase tracking-wider" style={{color: palette.primary}}>Projects</div>
                  </div>
                  <div>
                    <div className="text-3xl font-extralight mb-2" style={{color: palette.text}}>12</div>
                    <div className="text-xs font-light uppercase tracking-wider" style={{color: palette.primary}}>Technologies</div>
                  </div>
                  <div>
                    <div className="text-3xl font-extralight mb-2" style={{color: palette.text}}>3+</div>
                    <div className="text-xs font-light uppercase tracking-wider" style={{color: palette.primary}}>Years</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Different for each mode */}
      <section id="skills" className="py-32" style={{backgroundColor: palette.surface}}>
        <div className="max-w-7xl mx-auto px-8">
          <div className={`transform transition-all duration-1000 ${
            isVisible.skills ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {currentMode === 'recruiter' ? (
              <>
                <h2 className="text-5xl font-extralight mb-12 text-center" style={{color: palette.text}}>
                  Skills & Competencies
                </h2>
                
                {/* Technical Skills */}
                <div className="mb-16">
                  <h3 className="text-2xl font-light mb-8 text-center" style={{color: palette.primary}}>
                    Technical Skills
                  </h3>
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                    {technologies.map((tech, index) => (
                      <TechIcon key={tech.name} name={tech.name}>
                        {tech.icon}
                      </TechIcon>
                    ))}
                  </div>
                </div>

                {/* Soft Skills */}
                <div>
                  <h3 className="text-2xl font-light mb-8 text-center" style={{color: palette.primary}}>
                    Soft Skills
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getSoftSkills().map((skill, index) => (
                      <div key={index} className="p-6 border" style={{borderColor: palette.accent, backgroundColor: palette.background}}>
                        <h4 className="font-medium mb-2" style={{color: palette.text}}>{skill.name}</h4>
                        <p className="text-sm font-light" style={{color: palette.primary}}>{skill.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-5xl font-extralight mb-20 text-center" style={{color: palette.text}}>
                  Technologies
                </h2>
                
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                  {technologies.map((tech, index) => (
                    <TechIcon key={tech.name} name={tech.name}>
                      {tech.icon}
                    </TechIcon>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32" style={{backgroundColor: palette.background}}>
        <div className="max-w-7xl mx-auto px-8">
          <div className={`transform transition-all duration-1000 ${
            isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-5xl font-extralight mb-20 text-center" style={{color: palette.text}}>
              Selected Work
            </h2>
            
            <div className="grid md:grid-cols-2 gap-16">
              {getProjectsForMode().map((project, index) => (
                <div 
                  key={index}
                  className="cursor-pointer group"
                  style={{backgroundColor: palette.surface}}
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
                    <h3 className="text-2xl font-light mb-4" style={{color: palette.text}}>{project.title}</h3>
                    <p className="font-light leading-relaxed mb-6" style={{color: palette.primary}}>{project.shortDescription}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="text-xs font-light px-3 py-1 border rounded-none"
                          style={{color: palette.primary, borderColor: palette.accent}}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs font-light px-3 py-1 border rounded-none" style={{color: palette.primary, borderColor: palette.accent}}>
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

      {/* Clients Section */}
      <section className="py-24" style={{backgroundColor: isDarkMode ? '#f3f4f6' : '#fff', transition: 'background 0.3s'}}>
        <div className="max-w-5xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-extralight mb-12" style={{color: isDarkMode ? '#222' : palette.text}}>
            Clients I've Worked With
          </h2>
          <div className="flex flex-row flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="flex flex-col items-center w-1/2 md:w-1/3">
              <img src={blastImg} alt="BLAST" className="h-32 w-auto object-contain mb-4" style={{background: 'none'}} />
              <span className="text-base font-light" style={{color: isDarkMode ? '#222' : palette.primary}}>BLAST</span>
            </div>
            <div className="flex flex-col items-center w-1/2 md:w-1/3">
              <img src={perfectusImg} alt="PERFECTUS" className="h-32 w-auto object-contain mb-4" style={{background: 'none'}} />
              <span className="text-base font-light" style={{color: isDarkMode ? '#222' : palette.primary}}>PERFECTUS</span>
            </div>
            <div className="flex flex-col items-center w-1/2 md:w-1/3">
              <img src={foundryImg} alt="Foundry Invest" className="h-32 w-auto object-contain mb-4" style={{background: 'none'}} />
              <span className="text-base font-light" style={{color: isDarkMode ? '#222' : palette.primary}}>Foundry Invest</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32" style={{backgroundColor: palette.surface}}>
        <div className="max-w-4xl mx-auto px-8 text-center">
          <div className={`transform transition-all duration-1000 ${
            isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-5xl font-extralight mb-8" style={{color: palette.text}}>
              Get In Touch
            </h2>
            <p className="text-lg font-light mb-16 max-w-2xl mx-auto leading-relaxed" style={{color: palette.primary}}>
              I'm always interested in new opportunities and exciting projects. 
              Let's discuss how we can work together.
            </p>
            
            <div className="flex justify-center gap-8">
              <a 
                href="mailto:nhantumboyugor@gmail.com"
                className="px-12 py-4 text-sm font-light border transition-all duration-300 tracking-wider uppercase rounded-none"
                style={{color: palette.text, borderColor: palette.text}}
              >
                Email
              </a>
              <a 
                href="https://www.linkedin.com/in/yugorpaul/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-12 py-4 text-sm font-light text-white transition-all duration-300 tracking-wider uppercase rounded-none"
                style={{backgroundColor: palette.primary}}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8" style={{borderColor: `${palette.primary}20`}}>
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="font-light text-sm tracking-wider" style={{color: palette.primary}}>
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