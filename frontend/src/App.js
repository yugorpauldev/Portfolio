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

  const technologies = [
    { name: 'Python', icon: '🐍', category: 'Backend' },
    { name: 'Django', icon: '🔗', category: 'Framework' },
    { name: 'Flask', icon: '⚡', category: 'Framework' },
    { name: 'JavaScript', icon: '📜', category: 'Language' },
    { name: 'Dart', icon: '🎯', category: 'Language' },
    { name: 'Flutter', icon: '💙', category: 'Mobile' },
    { name: 'SQL', icon: '🗄️', category: 'Database' },
    { name: 'Oracle DB', icon: '🏛️', category: 'Database' },
    { name: 'Docker', icon: '🐳', category: 'DevOps' },
    { name: 'Kubernetes', icon: '☸️', category: 'DevOps' },
    { name: 'Statistics', icon: '📊', category: 'Data Science' },
    { name: 'Data Analysis', icon: '📈', category: 'Data Science' },
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
      <div className="fixed inset-0 bg-dark-green/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-light-gray rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-light-gray p-6 border-b border-blue-gray/20 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-dark-green">{project.title}</h2>
            <button 
              onClick={onClose}
              className="text-blue-gray hover:text-dark-green text-2xl"
            >
              ✕
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            
            <div>
              <h3 className="text-xl font-semibold text-dark-green mb-3">Project Overview</h3>
              <p className="text-blue-gray leading-relaxed">{project.fullDescription}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-dark-green mb-3">Implementation Details</h3>
              <p className="text-blue-gray mb-4">{project.implementation.overview}</p>
              
              <h4 className="font-semibold text-dark-green mb-2">Key Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-blue-gray mb-4">
                {project.implementation.keyFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              <h4 className="font-semibold text-dark-green mb-2">Technical Challenges:</h4>
              <ul className="list-disc list-inside space-y-1 text-blue-gray mb-4">
                {project.implementation.technicalChallenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>

              <h4 className="font-semibold text-dark-green mb-2">Deployment:</h4>
              <p className="text-blue-gray">{project.implementation.deployment}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-dark-green mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="bg-steel-blue/10 text-steel-blue px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <a 
                href={project.github}
                className="bg-dark-green text-light-gray px-6 py-3 rounded-lg hover:bg-steel-blue transition-colors flex items-center"
              >
                <span className="mr-2">📁</span>
                View Code
              </a>
              <a 
                href={project.demo}
                className="bg-olive-green text-dark-green px-6 py-3 rounded-lg hover:bg-steel-blue hover:text-light-gray transition-colors flex items-center"
              >
                <span className="mr-2">🚀</span>
                Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-dark-green/95 backdrop-blur-sm z-40 transition-all duration-300">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-light-gray">
              Yugor Paulo
            </div>
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'contact'].map(section => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all duration-300 hover:text-olive-green ${
                    activeSection === section ? 'text-olive-green border-b-2 border-olive-green' : 'text-light-gray'
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
      <section 
        id="home" 
        className="min-h-screen flex items-center justify-center bg-dark-green relative overflow-hidden"
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-olive-green rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-steel-blue rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 left-40 w-20 h-20 border border-blue-gray rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className={`text-center text-light-gray transform transition-all duration-1000 ${
          isVisible.home ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-light mb-4">
              Hi, I'm
            </h1>
            <h1 className="text-6xl md:text-8xl font-bold text-olive-green mb-4">
              Yugor Paulo.
            </h1>
            <p className="text-xl md:text-2xl text-steel-blue font-light">
              Nice to meet you.
            </p>
          </div>
          
          <div className="mt-12">
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed text-light-gray/80">
              Backend Developer & Data Analyst specializing in Python, Django, and data-driven solutions
            </p>
            <button
              onClick={() => scrollToSection('about')}
              className="bg-olive-green text-dark-green px-8 py-4 rounded-full text-lg font-medium hover:bg-steel-blue hover:text-light-gray transition-all duration-300 transform hover:scale-105"
            >
              Explore My Work
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-light-gray/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-olive-green rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-light-gray">
        <div className="container mx-auto px-6">
          <div className={`transform transition-all duration-1000 ${
            isVisible.about ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-4xl font-bold text-center mb-16 text-dark-green">
              About Me
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-blue-gray leading-relaxed">
                  I'm a passionate junior backend developer and data analyst with expertise in 
                  Python, Django, Flask, and modern mobile development with Flutter. My work combines 
                  robust backend architecture with data-driven insights.
                </p>
                <p className="text-lg text-blue-gray leading-relaxed">
                  With a Stanford certification in Data Science for Bioengineering, I bring statistical 
                  rigor and analytical thinking to software development. I specialize in building scalable 
                  APIs, managing complex databases, and creating data analytics solutions.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <div className="bg-olive-green/10 p-4 rounded-lg border-l-4 border-olive-green">
                    <h4 className="font-semibold text-dark-green mb-2">Backend Development</h4>
                    <p className="text-blue-gray text-sm">API Design, Database Optimization, DevOps</p>
                  </div>
                  <div className="bg-steel-blue/10 p-4 rounded-lg border-l-4 border-steel-blue">
                    <h4 className="font-semibold text-dark-green mb-2">Data Science</h4>
                    <p className="text-blue-gray text-sm">Statistical Analysis, Data Visualization</p>
                  </div>
                  <div className="bg-blue-gray/10 p-4 rounded-lg border-l-4 border-blue-gray">
                    <h4 className="font-semibold text-dark-green mb-2">Mobile Development</h4>
                    <p className="text-blue-gray text-sm">Flutter, Cross-platform Apps</p>
                  </div>
                  <div className="bg-dark-green/10 p-4 rounded-lg border-l-4 border-dark-green">
                    <h4 className="font-semibold text-dark-green mb-2">Certified Expertise</h4>
                    <p className="text-blue-gray text-sm">Stanford Data Science Certification</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-dark-green to-steel-blue p-8 rounded-2xl text-light-gray">
                  <h3 className="text-2xl font-bold mb-6">Certifications</h3>
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex items-center space-x-4 mb-4">
                      <span className="text-3xl">{cert.icon}</span>
                      <div>
                        <h4 className="font-semibold">{cert.name}</h4>
                        <p className="text-light-gray/80 text-sm">{cert.issuer} • {cert.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-olive-green/10 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-dark-green mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-blue-gray">Projects Completed</span>
                      <span className="font-bold text-dark-green">15+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-gray">Technologies Mastered</span>
                      <span className="font-bold text-dark-green">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-gray">Years Learning</span>
                      <span className="font-bold text-dark-green">3+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gradient-to-br from-dark-green to-steel-blue">
        <div className="container mx-auto px-6">
          <div className={`transform transition-all duration-1000 ${
            isVisible.skills ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-4xl font-bold text-center mb-16 text-light-gray">
              Technical Skills
            </h2>
            
            {/* Group technologies by category */}
            {['Backend', 'Framework', 'Language', 'Mobile', 'Database', 'DevOps', 'Data Science'].map(category => {
              const categoryTechs = technologies.filter(tech => tech.category === category);
              if (categoryTechs.length === 0) return null;
              
              return (
                <div key={category} className="mb-12">
                  <h3 className="text-2xl font-semibold text-center mb-8 text-olive-green">
                    {category}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {categoryTechs.map((tech, index) => (
                      <div 
                        key={tech.name}
                        className="bg-light-gray p-6 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="text-4xl mb-3">{tech.icon}</div>
                        <h4 className="text-lg font-semibold text-dark-green">{tech.name}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-light-gray">
        <div className="container mx-auto px-6">
          <div className={`transform transition-all duration-1000 ${
            isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-4xl font-bold text-center mb-16 text-dark-green">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              {projects.map((project, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-dark-green/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-light-gray font-medium mb-2">Click to view details</p>
                        <div className="text-light-gray text-sm">Implementation • Challenges • Deployment</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-dark-green">{project.title}</h3>
                    <p className="text-blue-gray mb-4 leading-relaxed">{project.shortDescription}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="bg-steel-blue/10 text-steel-blue px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="bg-olive-green/10 text-olive-green px-3 py-1 rounded-full text-sm font-medium">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                    <div className="text-steel-blue text-sm font-medium">
                      Click to view implementation details →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-dark-green via-steel-blue to-blue-gray">
        <div className="container mx-auto px-6 text-center">
          <div className={`transform transition-all duration-1000 ${
            isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-4xl font-bold mb-8 text-light-gray">
              Let's Build Something Together
            </h2>
            <p className="text-xl mb-12 text-light-gray/90 max-w-2xl mx-auto">
              I'm always interested in new opportunities and exciting projects. 
              Let's discuss how we can work together!
            </p>
            <div className="flex justify-center space-x-8">
              <a 
                href="mailto:krismiidtv@gmail.com"
                className="bg-olive-green text-dark-green px-8 py-4 rounded-full font-semibold hover:bg-light-gray transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
              >
                <span className="mr-2">📧</span>
                Email Me
              </a>
              <a 
                href="https://linkedin.com/in/krismiid"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-steel-blue text-light-gray px-8 py-4 rounded-full font-semibold hover:bg-olive-green hover:text-dark-green transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
              >
                <span className="mr-2">💼</span>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-green text-light-gray py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-light-gray/70">
            © 2025 Yugor Paulo. Crafted with React, Flutter & Data Science expertise.
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