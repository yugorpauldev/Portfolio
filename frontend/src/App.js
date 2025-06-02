import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [isVisible, setIsVisible] = useState({});
  const [activeSection, setActiveSection] = useState('home');

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

  const skills = [
    { name: 'Python', level: 85, icon: '🐍' },
    { name: 'Django', level: 80, icon: '🔗' },
    { name: 'Flask', level: 75, icon: '⚡' },
    { name: 'JavaScript', level: 70, icon: '📜' },
    { name: 'Dart', level: 65, icon: '🎯' },
    { name: 'SQL', level: 80, icon: '🗄️' },
    { name: 'Oracle DB', level: 75, icon: '🏛️' },
    { name: 'Docker', level: 70, icon: '🐳' },
    { name: 'Kubernetes', level: 65, icon: '☸️' },
  ];

  const projects = [
    {
      title: 'E-Commerce API Platform',
      description: 'Built a scalable REST API using Django REST Framework with JWT authentication, payment processing, and order management. Implemented caching with Redis and deployed using Docker containers.',
      technologies: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Docker'],
      image: 'https://images.pexels.com/photos/2061168/pexels-photo-2061168.jpeg',
      github: '#',
      demo: '#'
    },
    {
      title: 'Data Analytics Dashboard',
      description: 'Developed a real-time analytics platform using Flask and Oracle database. Created automated data pipelines for processing large datasets and generating business insights with interactive visualizations.',
      technologies: ['Python', 'Flask', 'Oracle', 'Pandas', 'SQL'],
      image: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg',
      github: '#',
      demo: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-dark-green/95 backdrop-blur-sm z-50 transition-all duration-300">
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
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(37, 48, 33, 0.8), rgba(37, 48, 33, 0.8)), url('https://images.unsplash.com/photo-1498050108023-c5249f4df085')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className={`text-center text-light-gray transform transition-all duration-1000 ${
          isVisible.home ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-pulse">
            Yugor Paulo
          </h1>
          <h2 className="text-2xl md:text-3xl mb-8 text-olive-green font-light">
            Backend Developer & Data Analyst
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Crafting robust APIs and data solutions with Python, Django, and modern DevOps practices
          </p>
          <button
            onClick={() => scrollToSection('about')}
            className="bg-olive-green text-dark-green px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-gray hover:text-light-gray transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Explore My Work
          </button>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-light-gray rounded-full flex justify-center">
            <div className="w-1 h-3 bg-light-gray rounded-full mt-2 animate-pulse"></div>
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
                  I'm a passionate junior backend developer and data analyst with a strong foundation in 
                  Python ecosystem. I specialize in building scalable APIs, managing databases, and 
                  creating data-driven solutions that power modern applications.
                </p>
                <p className="text-lg text-blue-gray leading-relaxed">
                  My expertise spans across Django and Flask frameworks, with hands-on experience in 
                  containerization using Docker and Kubernetes. I'm constantly learning and adapting 
                  to new technologies to deliver efficient and maintainable solutions.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="bg-olive-green/10 p-4 rounded-lg border-l-4 border-olive-green">
                    <h4 className="font-semibold text-dark-green mb-2">Backend Focus</h4>
                    <p className="text-blue-gray">API Development, Database Design</p>
                  </div>
                  <div className="bg-blue-gray/10 p-4 rounded-lg border-l-4 border-blue-gray">
                    <h4 className="font-semibold text-dark-green mb-2">Data Analysis</h4>
                    <p className="text-blue-gray">SQL, Data Processing, Analytics</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-olive-green to-blue-gray p-8 rounded-2xl text-light-gray transform hover:scale-105 transition-transform duration-300">
                  <h3 className="text-2xl font-bold mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Projects Completed</span>
                      <span className="font-bold">10+</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Technologies Mastered</span>
                      <span className="font-bold">9</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Years Learning</span>
                      <span className="font-bold">2+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-dark-green">
        <div className="container mx-auto px-6">
          <div className={`transform transition-all duration-1000 ${
            isVisible.skills ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-4xl font-bold text-center mb-16 text-light-gray">
              Technical Skills
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {skills.map((skill, index) => (
                <div 
                  key={skill.name}
                  className="bg-light-gray p-6 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{skill.icon}</span>
                    <h3 className="text-xl font-semibold text-dark-green">{skill.name}</h3>
                  </div>
                  <div className="w-full bg-blue-gray/20 rounded-full h-3 mb-2">
                    <div 
                      className="bg-gradient-to-r from-olive-green to-blue-gray h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: isVisible.skills ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 100}ms`
                      }}
                    ></div>
                  </div>
                  <p className="text-blue-gray text-sm">{skill.level}% Proficiency</p>
                </div>
              ))}
            </div>
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
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-dark-green/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center">
                        <button className="bg-olive-green text-light-gray px-4 py-2 rounded-lg mr-2 hover:bg-blue-gray transition-colors">
                          View Code
                        </button>
                        <button className="bg-blue-gray text-light-gray px-4 py-2 rounded-lg hover:bg-olive-green transition-colors">
                          Live Demo
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-dark-green">{project.title}</h3>
                    <p className="text-blue-gray mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="bg-olive-green/10 text-olive-green px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-dark-green to-blue-gray">
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
                className="bg-blue-gray text-light-gray px-8 py-4 rounded-full font-semibold hover:bg-olive-green hover:text-dark-green transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
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
            © 2025 Yugor Paulo. Crafted with React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;