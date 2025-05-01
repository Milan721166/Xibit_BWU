import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { FiArrowRight, FiCheck, FiGithub, FiLinkedin, FiTwitter, FiExternalLink } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaPython, FaFigma } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiOpenai, SiFirebase, SiSupabase, SiTypescript, SiJest, SiPrisma } from 'react-icons/si';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Type definitions
type TeamMember = {
  id: number;
  name: string;
  role: string;
  avatar: string;
  skills: string[];
  social: {
    github: string;
    linkedin: string;
    twitter?: string;
  };
};

type Feature = {
  title: string;
  description: string;
  icon: string;
  details: string[];
  image: string;
};

const AnimatedFeatureCard = ({ children }: { children: React.ReactNode }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

const MindMateLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState<string>('scheduler');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  // Team members data
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Rimanshu",
      role: "Frontend Wizard",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      skills: ["React", "TypeScript", "UI/UX", "Animations"],
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 2,
      name: "Arman Mondol",
      role: "AI Engineer",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      skills: ["Python", "LLMs", "NLP", "ML Ops"],
      social: {
        github: "#",
        linkedin: "#"
      }
    },
    {
      id: 3,
      name: "Malay Maity",
      role: "Backend Developer",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      skills: ["Node.js", "Database", "APIs", "DevOps"],
      social: {
        github: "#",
        linkedin: "#"
      }
    },
    {
      id: 4,
      name: "Milan Sahoo",
      role: "UX Designer",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      skills: ["Figma", "User Research", "Prototyping", "UI Design"],
      social: {
        github: "#",
        linkedin: "#"
      }
    }
  ];

  // Feature details
  const features: Record<string, Feature> = {
    scheduler: {
      title: "Smart Academic Scheduler",
      description: "Never miss a deadline again. Our AI creates personalized study schedules based on your syllabus, deadlines, and optimal focus times.",
      icon: "📅",
      details: [
        "Personalized timetable generation from syllabus and deadlines", 
        "Adaptive scheduling with focus-rest optimization",
        "Calendar integration + reminder notifications"
      ],
      image: "https://source.unsplash.com/random/540x400/?planner"
    },
    mental: {
      title: "Daily Mental Health Check-ins",
      description: "Quick, anonymous mood check-ins that help track your mental well-being and connect you with campus resources when needed.",
      icon: "😊",
      details: [
        "1-minute anonymous mood check-ins", 
        "Sentiment analysis from journals or chat entries",
        "Tips, resources, and access to campus support"
      ],
      image: "https://source.unsplash.com/random/540x400/?mental-health"
    },
    academic: {
      title: "AI Academic Buddy",
      description: "Your personal AI study companion that helps simplify complex topics, summarize notes, and generate quizzes to test your knowledge.",
      icon: "🤖",
      details: [
        "24/7 doubt-solving using ChatGPT", 
        "Note summarization, PDF simplification",
        "Quiz generation from study material"
      ],
      image: "https://source.unsplash.com/random/540x400/?ai"
    },
    career: {
      title: "Career Clarity Dashboard",
      description: "Discover career paths aligned with your interests, personality, and current skills. Get personalized learning roadmaps.",
      icon: "🎯",
      details: [
        "Career suggestions based on interests, personality, and current profile", 
        "Trending roles with learning paths and free resources"
      ],
      image: "https://source.unsplash.com/random/540x400/?career"
    },
    analytics: {
      title: "Self-Improvement Analytics",
      description: "Track your mood, productivity, and habits over time with beautiful visualizations that help you understand your patterns.",
      icon: "📊",
      details: [
        "Mood and productivity tracking", 
        "Weekly performance & engagement reports",
        "Habit tracker with motivational streaks"
      ],
      image: "https://source.unsplash.com/random/540x400/?analytics"
    }
  };

  // Tech stack icons with more details
  const techStack = [
    { 
      name: "Next.js", 
      icon: <SiNextdotjs className="text-gray-700" />,
      description: "React framework for server-side rendering and static site generation",
      color: "hover:text-gray-700"
    },
    { 
      name: "Tailwind CSS", 
      icon: <SiTailwindcss className="text-cyan-500" />,
      description: "Utility-first CSS framework for rapid UI development",
      color: "hover:text-cyan-500"
    },
    { 
      name: "TypeScript", 
      icon: <SiTypescript className="text-blue-600" />,
      description: "Typed JavaScript superset for more robust code",
      color: "hover:text-blue-600"
    },
    { 
      name: "React", 
      icon: <FaReact className="text-blue-500" />,
      description: "JavaScript library for building user interfaces",
      color: "hover:text-blue-500"
    },
    { 
      name: "Node.js", 
      icon: <FaNodeJs className="text-green-500" />,
      description: "JavaScript runtime for server-side development",
      color: "hover:text-green-500"
    },
    { 
      name: "OpenAI", 
      icon: <SiOpenai className="text-purple-500" />,
      description: "Powerful AI models for natural language processing",
      color: "hover:text-purple-500"
    },
    { 
      name: "Supabase", 
      icon: <SiSupabase className="text-emerald-500" />,
      description: "Open source Firebase alternative with PostgreSQL",
      color: "hover:text-emerald-500"
    },
    { 
      name: "Firebase", 
      icon: <SiFirebase className="text-yellow-500" />,
      description: "Google's platform for app development and hosting",
      color: "hover:text-yellow-500"
    },
    { 
      name: "Jest", 
      icon: <SiJest className="text-red-500" />,
      description: "JavaScript testing framework",
      color: "hover:text-red-500"
    },
    { 
      name: "Prisma", 
      icon: <SiPrisma className="text-blue-800" />,
      description: "Next-generation ORM for Node.js and TypeScript",
      color: "hover:text-blue-800"
    },
    { 
      name: "Python", 
      icon: <FaPython className="text-blue-700" />,
      description: "Versatile programming language for AI/ML",
      color: "hover:text-blue-700"
    },
    { 
      name: "Figma", 
      icon: <FaFigma className="text-purple-600" />,
      description: "Collaborative interface design tool",
      color: "hover:text-purple-600"
    }
  ];

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white font-sans text-gray-800 overflow-x-hidden">
      {/* Header/Navigation */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-indigo-600 font-bold text-2xl">MindMate</div>
            <div className="bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded-full ml-2">BETA</div>
          </motion.div>
          
          <nav className="hidden md:flex space-x-8">
            {['features', 'tech-stack', 'team', 'contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item}`}
                className="text-gray-600 hover:text-indigo-600 transition relative group"
                whileHover={{ scale: 1.05 }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1).replace('-', ' ')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </nav>
          
          <button 
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <motion.div 
            className="hidden md:block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button 
              onClick={() => navigate('/signup')}
              className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition shadow-md hover:shadow-lg"
            >
              Go to our project <FiExternalLink className="inline ml-1" />
            </button>
          </motion.div>
        </div>
        
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-white/95 backdrop-blur-sm py-4 px-4 shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <nav className="flex flex-col space-y-3">
              {['features', 'tech-stack', 'team', 'contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item}`} 
                  className="text-gray-600 hover:text-indigo-600 transition py-2 px-3 rounded-lg hover:bg-indigo-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1).replace('-', ' ')}
                </a>
              ))}
              <button 
                onClick={() => {
                  navigate('/signup');
                  setMobileMenuOpen(false);
                }}
                className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition mt-2 shadow-md text-center"
              >
                Go to our project
              </button>
            </nav>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 mb-20 w-96 h-96 bg-purple-100 rounded-full opacity-50 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col-reverse md:flex-row items-center">
            <div className="md:w-1/2 mt-12 md:mt-0">
              <div className="max-w-auto md:pr-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-600 text-sm font-medium rounded-full mb-4"
                >
                  <span>AI-Powered Student Companion</span>
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                >
                  Boost Your <span className="text-indigo-600">Academic Success</span> & <span className="text-indigo-600">Mental Well-being</span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl text-gray-600 mb-8 leading-relaxed"
                >
                  MindMate combines personalized scheduling, mental health check-ins, academic assistance, and career insights—all through the power of AI and intuitive design.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                >
                  <button 
                    onClick={() => navigate('/signup')}
                    className="flex items-center justify-center px-8 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Go to Our Project <FiArrowRight className="ml-2" />
                  </button>
                </motion.div>
              </div>
            </div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <img 
                  src="https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-7688-622f-8dd6-102298c0d1a8/raw?se=2025-05-01T08%3A11%3A43Z&sp=r&sv=2024-08-04&sr=b&scid=a60312f7-846d-5871-8c3d-28f3ed5777bd&skoid=d958ec58-d47c-4d2f-a9f2-7f3e03fdcf72&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-01T03%3A46%3A31Z&ske=2025-05-02T03%3A46%3A31Z&sks=b&skv=2024-08-04&sig=e20JPlfASUCEum1L7tJoHKUDLLk75GqoNE38LAaCdL0%3D" 
                  alt="MindMate App Preview"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl border-8 border-white transform rotate-1"
                />
                <motion.div 
                  className="absolute -bottom-6 -right-6 bg-white p-3 rounded-xl shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="text-sm font-medium text-gray-700">AI-Powered Features</div>
                  <div className="flex space-x-1 mt-1">
                    {['🤖', '📊', '🎯'].map((emoji, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.9 + i * 0.1 }}
                        className="text-xl"
                      >
                        {emoji}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              MindMate combines cutting-edge AI technology with thoughtful design to support students in every aspect of their academic journey.
            </p>
          </motion.div>
          
          <div className="flex flex-wrap justify-center mb-12">
            <div className="flex flex-wrap justify-center gap-2">
              {Object.entries(features).map(([key, feature]) => (
                <motion.button
                  key={key}
                  onClick={() => setActiveFeature(key)}
                  className={`flex items-center px-5 py-3 rounded-full text-sm font-medium transition ${
                    activeFeature === key 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-2">{feature.icon}</span>
                  {feature.title}
                </motion.button>
              ))}
            </div>
          </div>
          
          <AnimatedFeatureCard>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 p-8 md:p-12">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="text-3xl mr-3">{features[activeFeature].icon}</span>
                    {features[activeFeature].title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {features[activeFeature].description}
                  </p>
                  <ul className="space-y-3">
                    {features[activeFeature].details.map((detail, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <FiCheck className="w-5 h-5 text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="md:w-1/2 bg-indigo-50 flex items-center justify-center p-8">
                  <motion.img 
                    src={features[activeFeature].image} 
                    alt={features[activeFeature].title} 
                    className="rounded-lg shadow-lg max-w-full h-auto"
                    loading="lazy"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </AnimatedFeatureCard>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech-stack" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Modern Tech Stack</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've built MindMate with cutting-edge technologies to ensure performance, scalability, and an exceptional user experience.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">
            {techStack.map((tech, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-default"
                whileHover={{ y: -5, scale: 1.05 }}
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className={`text-4xl mb-3 transition ${tech.color}`}>
                  {tech.icon}
                </div>
                <span className="text-gray-700 font-medium">{tech.name}</span>
                {hoveredTech === tech.name && (
                  <motion.div 
                    className="absolute mt-24 bg-white p-3 rounded-lg shadow-lg text-sm text-center max-w-xs z-10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    {tech.description}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16">
            <motion.h3 
              className="text-2xl font-bold text-gray-800 mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              AI & Machine Learning Capabilities
            </motion.h3>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-default"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-indigo-600 text-4xl mb-4">🧠</div>
                <h4 className="text-xl font-semibold mb-2">GPT-4 & GPT-3.5 Turbo</h4>
                <p className="text-gray-600">Powers academic Q&A, summarization, and personalized planning with advanced natural language understanding.</p>
              </motion.div>
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-default"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-indigo-600 text-4xl mb-4">😊</div>
                <h4 className="text-xl font-semibold mb-2">DistilBERT & Custom Models</h4>
                <p className="text-gray-600">Analyzes mood/sentiment from journal entries and check-ins with high accuracy and privacy.</p>
              </motion.div>
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-default"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="text-indigo-600 text-4xl mb-4">📊</div>
                <h4 className="text-xl font-semibold mb-2">Predictive Analytics</h4>
                <p className="text-gray-600">Custom ML models predict engagement patterns and identify wellness risk factors proactively.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Meet Team CodeNova Squad</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate minds behind MindMate, committed to improving student well-being through technology.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.id}
                className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative group">
                  <img 
                    src={member.avatar} 
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-indigo-100 object-cover group-hover:border-indigo-200 transition"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <div className="bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded-full absolute -bottom-2">
                      {member.role}
                    </div>
                  </div>
                </div>
                <h4 className="text-xl font-semibold mb-1 text-center">{member.name}</h4>
                <p className="text-indigo-600 mb-3 text-center">{member.role}</p>
                
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-gray-500 mb-2 text-center">Skills</h5>
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.skills.map((skill, i) => (
                      <span key={i} className="bg-indigo-50 text-indigo-600 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4 pt-3">
                  {member.social.github && (
                    <a 
                      href={member.social.github} 
                      className="text-gray-400 hover:text-gray-700 transition"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiGithub className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a 
                      href={member.social.linkedin} 
                      className="text-gray-400 hover:text-blue-600 transition"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiLinkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a 
                      href={member.social.twitter} 
                      className="text-gray-400 hover:text-blue-400 transition"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiTwitter className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Student Experience?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join thousands of students who are already boosting their academic performance and well-being with MindMate.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.button 
                onClick={() => navigate('/signup')}
                className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-100 transition shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Go to our project <FiExternalLink className="inline ml-1" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-indigo-400 font-bold text-2xl mb-2">MindMate</div>
              <p className="text-gray-400">Empowering students through AI</p>
            </div>
            
            <div className="flex space-x-6 mb-6 md:mb-0">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition transform hover:-translate-y-1"
                aria-label="Twitter"
              >
                <FiTwitter className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition transform hover:-translate-y-1"
                aria-label="GitHub"
              >
                <FiGithub className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition transform hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} MindMate. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white text-sm transition"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white text-sm transition"
              >
                Terms of Service
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white text-sm transition"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MindMateLandingPage;