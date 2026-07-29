import React, { useState } from 'react';
import {
  ArrowUpRight, ArrowRight, ArrowUp, Code2, Rocket, Globe, Database,
  Terminal, Cpu, Mail, Phone, MapPin, ExternalLink, Download,
  FileText, Menu, X, MessageSquare, CheckCircle2,
  Send
} from 'lucide-react';
import achutaPic from './assets/achuta.jpg';

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const Portfolio = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!formData.name || !formData.email || !formData.service || !formData.message) return;

    try {
      const response = await fetch('https://formsubmit.co/ajax/achutakumargouda@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          _subject: `New portfolio inquiry from ${formData.name}`
        })
      });

      if (!response.ok) throw new Error('Unable to send message right now.');

      setFormSubmitted(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setSubmitError('Unable to send your message right now. Please try again later or email directly.');
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resumePdfUrl = `${import.meta.env.BASE_URL}resume/Achut%20Kumar%20Gouda.pdf`;

  const handleResumeDownload = async (e) => {
    if (e) e.preventDefault();

    try {
      const response = await fetch(resumePdfUrl);
      if (!response.ok) throw new Error('Unable to download resume');

      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = 'Achut-Kumar-Gouda-Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error('Resume download failed:', error);
      window.open(resumePdfUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const projects = [
    {
      id: 1,
      title: 'LoyalKart E-commerce Website',
      category: 'Full Stack',
      year: '2025',
      description: 'Robust backend RESTful API service built with Python, Django & DRF. Features JWT Authentication, CRUD operations, CORS configuration, and MySQL database connection.',
      tech: ['Python', 'Django', 'DRF', 'JWT Auth', 'React', 'MySQL', 'Postman', 'Render'],
      image: 'img/e-com.jpg',
      demoUrl: 'https://e-commerce-1-ussz.onrender.com/',
      githubUrl: 'https://github.com/AchutaKumar/E-commerce'
    },
    {
      id: 2,
      title: 'Emmployee Management System',
      category: 'API & Backend',
      year: '2026',
      description: 'End-to-end full stack web application integrating a dynamic Django Template Language frontend with Django REST Framework API, MySQL storage implementing CRUD operations.',
      tech: ['Python', 'Django', 'Django Rest Framework', 'JWT Auth', 'HTML5/CSS3', 'DTL', 'Render'],
      image: 'img/employee-m.png',
      demoUrl: 'https://employee-management-system-3gkr.onrender.com/',
      githubUrl: 'https://github.com/AchutaKumar/Employee-Management-System'
    },
    {
      id: 3,
      title: 'Blog Application',
      category: 'Full Stack',
      year: '2026',
      description: 'Full-stack blogging platform built with Django and DTL, featuring complete CRUD capabilities for article management, dynamic user authentication, category filtering, and rich text rendering.',
      tech: ['Python', 'Django', 'JWT', 'Django Rest Framework', 'HTML5/CSS3', 'DTL', 'Render'],
      image: 'img/blog.png',
      demoUrl: '#',
      githubUrl: 'https://github.com/AchutaKumar/Blog-Application'
    },

  ];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const skillGroups = [
    {
      category: 'Languages & Core Web',
      items: ['Python', 'JavaScript', 'HTML5', 'CSS3', 'SQL']
    },
    {
      category: 'Frameworks & Libraries',
      items: ['Django', 'Django REST Framework (DRF)', 'Flask', 'React.js', 'MVT Architecture']
    },
    {
      category: 'Web & API Engineering',
      items: ['RESTful API Design', 'JSON', 'JWT Authentication', 'API Integration', 'CRUD Operations', 'CORS']
    },
    {
      category: 'Database Systems (DBMS)',
      items: ['MySQL', 'MongoDB', 'Relational Schemas', 'NoSQL Collections']
    },
    {
      category: 'Tools, IDEs & Deployment',
      items: ['Git', 'GitHub', 'Postman', 'VS Code', 'PyCharm', 'npm', 'pip', 'Render']
    },
    {
      category: 'Systems, Networking & Methodologies',
      items: ['Linux', 'Windows', 'TCP/IP', 'DNS', 'HTTP/HTTPS', 'VPN Basics', 'Responsive Design', 'Branching & PRs', 'Agile Development']
    }
  ];

  return (
    <div className="bg-[#131313] text-[#e2e2e2] font-sans overflow-x-hidden selection:bg-[#CCFF00] selection:text-black min-h-screen">

      {/* Header Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-16 py-5 bg-[#131313]/90 border-b border-[#1A1A1A] backdrop-blur-md">
        <a href="#" className="font-bold text-xl md:text-2xl text-white tracking-tighter uppercase font-mono flex items-center gap-2">
          <span className="w-3 h-3 bg-[#CCFF00] rounded-full inline-block animate-pulse"></span>
          ACHUTA<span className="text-[#CCFF00]">.DEV</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center text-xs uppercase tracking-widest font-mono">
          <a className="text-[#c4c9ac] hover:text-[#CCFF00] transition-colors duration-300" href="#about">About</a>
          <a className="text-[#c4c9ac] hover:text-[#CCFF00] transition-colors duration-300" href="#skills">Skills</a>
          <a className="text-[#c4c9ac] hover:text-[#CCFF00] transition-colors duration-300" href="#work">Work</a>
          <a className="text-[#c4c9ac] hover:text-[#CCFF00] transition-colors duration-300" href="#services">Services</a>
          <a className="text-[#c4c9ac] hover:text-[#CCFF00] transition-colors duration-300" href="#contact">Contact</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setShowResumeModal(true)}
            className="border border-[#CCFF00]/40 text-[#CCFF00] px-5 py-2 text-xs font-mono font-bold uppercase tracking-widest hover:bg-[#ccff00] hover:text-black transition-all duration-300 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" /> Resume
          </button>
          <a
            href="#contact"
            className="bg-[#CCFF00] text-black px-5 py-2 font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform duration-200"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#CCFF00]" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-[#131313] z-40 p-8 flex flex-col justify-between md:hidden border-b border-[#1A1A1A]">
          <nav className="flex flex-col gap-6 text-lg font-mono uppercase tracking-widest">
            <a onClick={() => setMobileMenuOpen(false)} href="#about" className="text-white hover:text-[#CCFF00]">About</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#skills" className="text-white hover:text-[#CCFF00]">Skills</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#work" className="text-white hover:text-[#CCFF00]">Work</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#services" className="text-white hover:text-[#CCFF00]">Services</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#contact" className="text-white hover:text-[#CCFF00]">Contact</a>
          </nav>

          <div className="flex flex-col gap-4 pt-6 border-t border-[#222]">
            <button
              onClick={() => { setMobileMenuOpen(false); setShowResumeModal(true); }}
              className="w-full border border-[#CCFF00] text-[#CCFF00] py-3 text-center font-mono font-bold uppercase text-xs flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" /> View Resume
            </button>
            <a
              onClick={() => setMobileMenuOpen(false)}
              href="#contact"
              className="w-full bg-[#CCFF00] text-black py-3 text-center font-bold uppercase tracking-widest text-xs"
            >
              Get In Touch
            </a>
          </div>
        </div>
      )}

      <main className="mt-20">
        {/* Hero Section */}
        <section className="min-h-[85vh] flex flex-col justify-center px-6 md:px-16 py-16 relative">
          <div className="absolute top-10 right-10 w-96 h-96 bg-[#CCFF00]/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1A1A] border border-[#CCFF00]/30 text-[#CCFF00] font-mono text-xs uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-ping"></span>
              Available for Opportunities
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-mono text-[#888] px-3 py-1 bg-[#1A1A1A] border border-[#262626]">
              <MapPin className="w-3 h-3 text-[#CCFF00]" /> Hyderabad, India
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-5xl sm:text-7xl lg:text-[90px] uppercase tracking-tighter mb-6 font-bold leading-none">
                ACHUTA KUMAR <br />
                <span className="text-[#CCFF00] italic">GOUDA</span>
              </h1>

              <div className="max-w-2xl mb-8">
                <p className="text-xl md:text-2xl text-[#a3a3a3] font-light leading-relaxed">
                  Python Full Stack Developer & React.js Engineer crafting scalable RESTful APIs, MVT web applications, and database solutions.
                </p>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2 mb-10 font-mono text-xs text-[#CCFF00]">
                {['Python', 'Django', 'Flask', 'DRF', 'React.js', 'REST APIs', 'MySQL', 'MongoDB', 'Linux', 'Render'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-[#1A1A1A] border border-[#2e2e2e]">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#work"
                  className="bg-[#CCFF00] text-black px-8 py-4 font-bold uppercase tracking-widest text-xs hover:translate-x-1 transition-transform flex items-center gap-3"
                >
                  Explore Work <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#contact"
                  className="border border-[#333] hover:border-[#CCFF00] text-white hover:text-[#CCFF00] px-8 py-4 font-mono uppercase tracking-widest text-xs transition-colors flex items-center gap-2"
                >
                  Contact Me <Mail className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setShowResumeModal(true)}
                  className="border border-[#262626] bg-[#161616] hover:bg-[#222] text-[#888] hover:text-white px-6 py-4 font-mono uppercase tracking-widest text-xs transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-[#CCFF00]" /> Resume
                </button>
              </div>
            </div>

            {/* Profile Card / Avatar */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="max-w-xs sm:max-w-sm w-full">
                <div className="bg-[#1A1A1A] rounded-lg overflow-hidden border border-[#262626] hover:border-[#3a3a3a] transition-all duration-300 hover:scale-[1.02]">
                  <div className="aspect-4/5 overflow-hidden relative">
                    <img
                      src={achutaPic}
                      alt="Achuta Kumar Gouda"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-90 p-5 flex flex-col justify-end">
                      <span className="text-[#CCFF00] font-mono text-[10px] uppercase tracking-widest">DEVELOPER PROFILE</span>
                      <h3 className="text-white font-bold text-lg">Achuta Kumar Gouda</h3>
                      <p className="text-[#aaa] text-xs font-mono">Python Full Stack Developer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[#1A1A1A] pt-12 mt-16">
            <div className="flex flex-col">
              <span className="text-4xl md:text-5xl font-bold text-[#CCFF00] font-mono">PYTHON</span>
              <span className="font-mono text-xs uppercase text-[#666666] mt-1">Django, Flask & DRF APIs</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl md:text-5xl font-bold text-white font-mono">REACT.JS</span>
              <span className="font-mono text-xs uppercase text-[#666666] mt-1">Responsive Frontend UI</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl md:text-5xl font-bold text-white font-mono">DBMS</span>
              <span className="font-mono text-xs uppercase text-[#666666] mt-1">MySQL & MongoDB</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl md:text-5xl font-bold text-white font-mono">TOOLS</span>
              <span className="font-mono text-xs uppercase text-[#666666] mt-1">Git, Linux & Render</span>
            </div>
          </div>
        </section>

        {/* Marquee Banner */}
        <div className="w-full bg-[#161616] py-4 border-y border-[#222] overflow-hidden flex whitespace-nowrap">
          <div className="flex animate-marquee">
            {Array(3).fill(null).map((_, groupIdx) => (
              <React.Fragment key={groupIdx}>
                <span className="text-xl font-mono font-bold text-white px-8 flex items-center">
                  PYTHON<span className="text-[#CCFF00] ml-6">/</span>
                </span>
                <span className="text-xl font-mono font-bold text-white px-8 flex items-center">
                  DJANGO & FLASK<span className="text-[#CCFF00] ml-6">/</span>
                </span>
                <span className="text-xl font-mono font-bold text-white px-8 flex items-center">
                  REACT.JS<span className="text-[#CCFF00] ml-6">/</span>
                </span>
                <span className="text-xl font-mono font-bold text-white px-8 flex items-center">
                  MYSQL & MONGODB DBMS <span className="text-[#CCFF00] ml-6">/</span>
                </span>
                <span className="text-xl font-mono font-bold text-white px-8 flex items-center">
                  JWT AUTH & REST APIS <span className="text-[#CCFF00] ml-6">/</span>
                </span>
                <span className="text-xl font-mono font-bold text-white px-8 flex items-center">
                  GIT & RENDER DEPLOYMENT <span className="text-[#CCFF00] ml-6">/</span>
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* About Section */}


        {/* Comprehensive Skills Section */}
        <section id="skills" className="px-6 md:px-16 py-24 bg-[#111111]">
          <div className="max-w-3xl mb-16">
            <span className="text-[#CCFF00] font-mono text-xs uppercase tracking-widest block mb-2">
              TECHNICAL EXPERTISE
            </span>
            <h2 className="text-4xl md:text-6xl font-bold uppercase">
              SKILLS & <span className="text-[#CCFF00] italic">COMPETENCIES</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillGroups.map((group, idx) => (
              <div key={group.category} className="bg-[#161616] p-8 border border-[#222] relative group hover:border-[#CCFF00]/40 transition-colors">
                <div className="text-[#CCFF00] font-mono text-sm mb-4 font-bold">0{idx + 1} /</div>
                <h3 className="text-xl font-bold uppercase text-white mb-6 font-mono flex items-center gap-3">
                  {idx === 0 && <Code2 className="w-5 h-5 text-[#CCFF00]" />}
                  {idx === 1 && <Terminal className="w-5 h-5 text-[#CCFF00]" />}
                  {idx === 2 && <Cpu className="w-5 h-5 text-[#CCFF00]" />}
                  {idx === 3 && <Database className="w-5 h-5 text-[#CCFF00]" />}
                  {idx === 4 && <Rocket className="w-5 h-5 text-[#CCFF00]" />}
                  {idx === 5 && <Globe className="w-5 h-5 text-[#CCFF00]" />}
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 bg-[#202020] hover:bg-[#CCFF00] text-[#ccc] hover:text-black transition-colors font-mono text-xs border border-[#2a2a2a]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Selected Projects Section */}
        <section id="work" className="px-6 md:px-16 py-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <span className="text-[#CCFF00] font-mono text-xs uppercase tracking-widest block mb-2">
                PORTFOLIO SHOWCASE
              </span>
              <h2 className="text-4xl md:text-6xl font-bold uppercase">
                FEATURED <span className="border-text italic">PROJECTS</span>
              </h2>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {['All', 'Full Stack', 'API & Backend', 'Frontend'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 uppercase border transition-all ${activeCategory === cat
                    ? 'bg-[#CCFF00] text-black border-[#CCFF00] font-bold'
                    : 'bg-[#161616] text-[#888] border-[#262626] hover:text-white hover:border-[#444]'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-[#161616] border border-[#222] hover:border-[#CCFF00]/40 transition-colors duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-[#131313]/80 backdrop-blur-md px-3 py-1 font-mono text-[10px] text-[#CCFF00] border border-[#CCFF00]/30 uppercase">
                      {project.category} • {project.year}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold uppercase text-white mb-3 group-hover:text-[#CCFF00] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#888] leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 mt-auto">
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-[#202020] text-[#aaa] text-[10px] font-mono border border-[#2a2a2a]">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#222] font-mono text-xs">
                    <a href={project.demoUrl} target='_blank' className="text-[#CCFF00] hover:underline flex items-center gap-1">
                      Live Demo <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    <a href={project.githubUrl} target='_blank' className="text-[#888] hover:text-white flex items-center gap-1">
                      <GithubIcon className="w-3.5 h-3.5" /> Source Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Development Services */}
        <section id="services" className="px-6 md:px-16 py-24 bg-[#111111] border-t border-[#1A1A1A]">
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-16">
            <div>
              <span className="text-[#CCFF00] font-mono text-xs uppercase tracking-widest block mb-2">
                WHAT I OFFER
              </span>
              <h2 className="text-4xl md:text-6xl font-bold uppercase">
                ENGINEERING <span className="border-text italic">SERVICES</span>
              </h2>
            </div>
            <p className="max-w-md text-[#888] leading-relaxed self-end">
              Delivering full stack solutions built with Python, Django, DRF, React, SQL/NoSQL databases, and cloud deployments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#161616] p-8 border border-[#222] hover:border-[#CCFF00]/40 transition-colors">
              <Server className="w-10 h-10 text-[#CCFF00] mb-6" />
              <h3 className="text-xl font-bold uppercase text-white mb-3">Django & DRF REST APIs</h3>
              <p className="text-sm text-[#888] leading-relaxed">
                Building scalable RESTful backend services using Python, Django, Django REST Framework, JWT authentication, and CORS policies.
              </p>
            </div>

            <div className="bg-[#161616] p-8 border border-[#222] hover:border-[#CCFF00]/40 transition-colors">
              <Globe className="w-10 h-10 text-[#CCFF00] mb-6" />
              <h3 className="text-xl font-bold uppercase text-white mb-3">React.js & Frontend UI</h3>
              <p className="text-sm text-[#888] leading-relaxed">
                Crafting clean, responsive user interfaces in React.js with HTML5, CSS3, JavaScript, and API integrations.
              </p>
            </div>

            <div className="bg-[#161616] p-8 border border-[#222] hover:border-[#CCFF00]/40 transition-colors">
              <Database className="w-10 h-10 text-[#CCFF00] mb-6" />
              <h3 className="text-xl font-bold uppercase text-white mb-3">Database Architecture & Render Deployment</h3>
              <p className="text-sm text-[#888] leading-relaxed">
                Designing MySQL relational schemas and MongoDB collections, backed by Git branching and hosting on Render.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="px-6 md:px-16 py-24 border-t border-[#1A1A1A]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <span className="text-[#CCFF00] font-mono text-xs uppercase tracking-widest block mb-2">
                LET'S WORK TOGETHER
              </span>
              <h2 className="text-4xl md:text-6xl font-bold uppercase mb-6 leading-none">
                CONNECT WITH <br />
                <span className="border-text italic">ACHUTA</span>
              </h2>
              <p className="text-[#888] text-lg mb-8 leading-relaxed">
                Looking for a Python/Django backend engineer or Full Stack developer? Get in touch directly via call or email.
              </p>

              {/* Direct Info */}
              <div className="flex flex-col gap-6 mb-10 font-mono text-sm">
                <a href="tel:+918917624469" className="flex items-center gap-4 text-white hover:text-[#CCFF00] transition-colors p-4 bg-[#161616] border border-[#222]">
                  <div className="p-3 bg-[#CCFF00] text-black rounded">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#666] uppercase block">Phone / Mobile</span>
                    <span className="font-bold text-base">+91 8917624469</span>
                  </div>
                </a>

                <a href="mailto:achutakumargouda@gmail.com" className="flex items-center gap-4 text-white hover:text-[#CCFF00] transition-colors p-4 bg-[#161616] border border-[#222]">
                  <div className="p-3 bg-[#CCFF00] text-black rounded">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#666] uppercase block">Email Address</span>
                    <span className="font-bold text-base">achutakumargouda@gmail.com</span>
                  </div>
                </a>

                <a href="https://github.com/AchutaKumar" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-white hover:text-[#CCFF00] transition-colors p-4 bg-[#161616] border border-[#222]">
                  <div className="p-3 bg-[#CCFF00] text-black rounded">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#666] uppercase block">GitHub</span>
                    <span className="font-bold text-base">Achuta Kumar Gouda</span>
                  </div>
                </a>

                <a href="https://www.linkedin.com/in/achuta-kumar/" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-white hover:text-[#CCFF00] transition-colors p-4 bg-[#161616] border border-[#222]">
                  <div className="p-3 bg-[#CCFF00] text-black rounded">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#666] uppercase block">LinkedIn</span>
                    <span className="font-bold text-base">Achuta Kumar Gouda</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-white p-4 bg-[#161616] border border-[#222]">
                  <div className="p-3 bg-[#CCFF00] text-black rounded">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#666] uppercase block">Location</span>
                    <span className="font-bold text-base">Hyderabad, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-[#161616] p-8 border border-[#222]">
              <h3 className="text-xl font-bold uppercase text-white mb-6 font-mono flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#CCFF00]" /> Send Message
              </h3>

              {formSubmitted ? (
                <div className="p-8 text-center bg-[#CCFF00]/10 border border-[#CCFF00] rounded">
                  <CheckCircle2 className="w-12 h-12 text-[#CCFF00] mx-auto mb-3" />
                  <h4 className="text-xl font-bold text-white uppercase mb-2">Message Sent!</h4>
                  <p className="text-xs font-mono text-[#ccc]">
                    Thank you, Achuta will contact you shortly at +91 8917624469.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] uppercase text-[#888]">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="bg-[#101010] border border-[#2a2a2a] px-4 py-3 text-sm text-white focus:border-[#CCFF00] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] uppercase text-[#888]">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="bg-[#101010] border border-[#2a2a2a] px-4 py-3 text-sm text-white focus:border-[#CCFF00] focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] uppercase text-[#888]">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91..."
                        className="bg-[#101010] border border-[#2a2a2a] px-4 py-3 text-sm text-white focus:border-[#CCFF00] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] uppercase text-[#888]">Inquiry Type</label>
                    <select
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="bg-[#101010] border border-[#2a2a2a] px-4 py-3 text-sm text-white focus:border-[#CCFF00] focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="">Select inquiry type</option>
                      <option value="Python & Django Backend">Python & Django Backend</option>
                      <option value="Django REST Framework API">Django REST Framework API</option>
                      <option value="React.js Frontend UI">React.js Frontend UI</option>
                      <option value="Full Stack Application">Full Stack Application</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] uppercase text-[#888]">Project Details / Message</label>
                    <textarea
                      rows={4}
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your requirement..."
                      className="bg-[#101010] border border-[#2a2a2a] px-4 py-3 text-sm text-white focus:border-[#CCFF00] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {submitError && (
                    <p className="text-sm text-red-400 font-mono">{submitError}</p>
                  )}

                  <button
                    type="submit"
                    className="bg-[#CCFF00] text-black py-4 font-bold uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 mt-2"
                  >
                    SEND MESSAGE <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Resume Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#161616] border border-[#333] max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-lg p-6 sm:p-8 relative text-white">
            <button
              onClick={() => setShowResumeModal(false)}
              className="absolute top-4 right-4 text-[#888] hover:text-[#CCFF00] p-2"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-4 border-b border-[#262626] pb-6 mb-6">
              <img src={achutaPic} alt="Achuta" className="w-16 h-16 rounded-full object-cover border-2 border-[#CCFF00]" />
              <div>
                <h3 className="text-2xl font-bold uppercase text-white font-mono">Achuta Kumar Gouda</h3>
                <p className="text-xs font-mono text-[#CCFF00]">Python, Django & React Developer</p>
                <p className="text-[11px] text-[#888] font-mono">Hyderabad, India • Mobile: +91 8917624469</p>
              </div>
            </div>

            <div className="space-y-6 text-sm">
              <div>
                <h4 className="font-mono text-xs text-[#CCFF00] uppercase tracking-widest mb-2 border-b border-[#262626] pb-1">Technical Skills Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono text-[#ccc]">
                  <div><strong className="text-white">Languages:</strong> Python, JavaScript, HTML5, CSS3, SQL</div>
                  <div><strong className="text-white">Frameworks:</strong> Django, Django REST Framework (DRF), React.js</div>
                  <div><strong className="text-white">Web & API:</strong> RESTful APIs, JSON, JWT Auth, CORS, CRUD</div>
                  <div><strong className="text-white">DBMS:</strong> MySQL, MongoDB</div>
                  <div><strong className="text-white">Tools & Deployment:</strong> Git, GitHub, Postman, PyCharm, VS Code, npm, pip, Render</div>
                  <div><strong className="text-white">Systems & Network:</strong> Linux, Windows, TCP/IP, DNS, HTTP/HTTPS, VPN</div>
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs text-[#CCFF00] uppercase tracking-widest mb-2 border-b border-[#262626] pb-1">Core Competencies & Concepts</h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[#bbb]">
                  <div>• Django MVT Architecture</div>
                  <div>• REST API Design & Postman</div>
                  <div>• Responsive Web Design</div>
                  <div>• Git Branching & Pull Requests</div>
                  <div>• JWT Auth & Security</div>
                  <div>• Agile Development Workflow</div>
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs text-[#CCFF00] uppercase tracking-widest mb-2 border-b border-[#262626] pb-1">Personal Details</h4>
                <div className="bg-[#101010] p-4 border border-[#222] text-xs font-mono text-[#aaa] space-y-1">
                  <p><strong className="text-white">DOB:</strong> 19 / 08 / 2004</p>
                  <p><strong className="text-white">Location:</strong> Hyderabad, India</p>
                  <p><strong className="text-white">Phone:</strong> +91 8917624469</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#262626] flex justify-between items-center">
              <span className="text-[10px] font-mono text-[#666]">Achuta Kumar Gouda Technical Resume</span>
              <button
                onClick={handleResumeDownload}
                className="bg-[#CCFF00] text-black px-4 py-2 font-mono text-xs font-bold uppercase flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full px-6 md:px-16 py-16 flex flex-col items-start gap-10 bg-black border-t border-[#1A1A1A]">
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="text-2xl font-bold text-white uppercase tracking-tighter font-mono">
              ACHUTA<span className="text-[#CCFF00]">.DEV</span>
            </div>
            <p className="text-xs text-[#666] font-mono mt-1">Python, Django & Full Stack Web Developer • Hyderabad, India</p>
          </div>

          <nav className="flex flex-wrap gap-6 font-mono uppercase text-[#888] text-xs">
            <a href="#about" className="hover:text-[#CCFF00] transition-colors">About</a>
            <a href="#skills" className="hover:text-[#CCFF00] transition-colors">Skills</a>
            <a href="#work" className="hover:text-[#CCFF00] transition-colors">Work</a>
            <a href="#contact" className="hover:text-[#CCFF00] transition-colors">Contact</a>
          </nav>
        </div>

        <div className="w-full pt-8 border-t border-[#1A1A1A] flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-[#666] gap-4">
          <span>© {new Date().getFullYear()} ACHUTA KUMAR GOUDA. ALL RIGHTS RESERVED.</span>
          <button onClick={scrollToTop} className="hover:text-[#CCFF00] uppercase flex items-center gap-1 cursor-pointer">
            BACK TO TOP <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;