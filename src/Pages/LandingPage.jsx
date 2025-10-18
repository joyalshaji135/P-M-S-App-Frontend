import React, { useState, useEffect } from 'react';
import { Menu, X, Check, Users, Calendar, FileText, List, BarChart2, ArrowRight } from 'lucide-react';
import dashboard from '../assets/Dashboard.png';
import notifications from '../assets/notifications.png';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navigate = useNavigate();
  
  const navigateToLogin = () => {
    console.log("Navigating to login");
    navigate('/login');
  };

  const features = [
    {
      title: "Task Assignment",
      description: "Easily assign tasks to team members with deadlines and priorities.",
      icon: <Check className="text-indigo-600" size={28} />
    },
    {
      title: "Project Collaboration",
      description: "Central hub for all project communications and file sharing.",
      icon: <Users className="text-indigo-600" size={28} />
    },
    {
      title: "Meeting Management",
      description: "Schedule and share video meeting links directly in projects.",
      icon: <Calendar className="text-indigo-600" size={28} />
    },
    {
      title: "Document Uploads",
      description: "Upload and organize all project documents in one place.",
      icon: <FileText className="text-indigo-600" size={28} />
    },
    {
      title: "Personal To-Do Lists",
      description: "Each team member gets their own organized task space.",
      icon: <List className="text-indigo-600" size={28} />
    },
    {
      title: "Progress Tracking",
      description: "Visual dashboards to track project and team progress.",
      icon: <BarChart2 className="text-indigo-600" size={28} />
    }
  ];

  const stats = [
    { value: "100%", label: "Free Forever" },
    { value: "10K+", label: "Teams Trust Us" },
    { value: "24/7", label: "Reliable Service" }
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.6 } }
  };

  const slideInFromLeft = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const slideInFromRight = {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className='w-full min-h-screen bg-amber-50 overflow-x-hidden'>
      <motion.header 
        className={`fixed top-0 w-full z-50 flex justify-between items-center text-black py-4 px-6 md:px-16 lg:px-32 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-white/80 backdrop-blur-sm'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <motion.h1 
            className='text-2xl md:text-3xl font-bold text-indigo-700'
            whileHover={{ scale: 1.05 }}
          >
            TaskFlow
          </motion.h1>
        </div>
        
        <nav className='hidden xl:flex items-center gap-8 font-semibold'>
          <motion.button 
            onClick={() => scrollToSection('hero')}
            className='text-sm font-medium hover:text-indigo-600 p-2 transition'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Home
          </motion.button>
          <motion.button 
            onClick={() => scrollToSection('features')}
            className='text-sm font-medium hover:text-indigo-600 p-2 transition'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Features
          </motion.button>
          <motion.button 
            onClick={() => scrollToSection('about')}
            className='text-sm font-medium hover:text-indigo-600 p-2 transition'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            About
          </motion.button>
          <motion.button 
            onClick={() => scrollToSection('contact')}
            className='text-sm font-medium hover:text-indigo-600 p-2 transition'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact
          </motion.button>
        </nav>
        
        <div className='hidden xl:flex items-center gap-4'>
          <motion.button 
            onClick={navigateToLogin}
            className='rounded-md px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 transition font-medium flex items-center gap-2'
            whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(79, 70, 229, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In <ArrowRight size={16} />
          </motion.button>
        </div>
        
        <motion.button 
          className='xl:hidden block focus:outline-none' 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className='xl:hidden fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-6 mt-16'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button 
              className='absolute top-6 right-6 focus:outline-none'
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>
            <nav className='flex flex-col items-center gap-6 font-medium'>
              <motion.button 
                onClick={() => scrollToSection('hero')}
                className='text-lg hover:text-indigo-600 transition'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Home
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('features')}
                className='text-lg hover:text-indigo-600 transition'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Features
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('about')}
                className='text-lg hover:text-indigo-600 transition'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                About
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('contact')}
                className='text-lg hover:text-indigo-600 transition'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact
              </motion.button>
            </nav>
            <motion.button 
              onClick={navigateToLogin}
              className='rounded-md px-6 py-2 bg-indigo-600 text-white hover:bg-indigo-700 transition font-medium flex items-center gap-2'
              whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(79, 70, 229, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className='pt-20'>
        <section id="hero" className='relative py-16 px-6 md:px-16 lg:px-32 flex flex-col md:flex-row items-center gap-8 min-h-[90vh]'>
          <div className='absolute -right-20 -top-20 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply opacity-70 animate-blob filter blur-xl'></div>
          <div className='absolute -bottom-20 -left-20 w-72 h-72 bg-amber-100 rounded-full mix-blend-multiply opacity-70 animate-blob animation-delay-2000 filter blur-xl'></div>
          
          <motion.div 
            className='relative z-10 md:w-1/2'
            initial="hidden"
            animate="show"
            variants={slideInFromLeft}
          >
            <motion.h1 
              className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Streamline Your Team's <span className='text-indigo-600'>Workflow</span>
            </motion.h1>
            <motion.p 
              className='text-md md:text-lg text-gray-600 mb-6'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              TaskFlow offers all the essential project management tools without the monthly fees.
              Perfect for teams tired of overpriced, bloated alternatives.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button 
                onClick={navigateToLogin}
                className='rounded-md px-6 py-3 bg-indigo-600 text-white hover:bg-indigo-700 transition font-medium flex items-center gap-2'
                whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(79, 70, 229, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started <ArrowRight size={18} />
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className='relative z-10 md:w-1/2 mt-8 md:mt-0'
            initial="hidden"
            animate="show"
            variants={slideInFromRight}
          >
            <div className='relative'>
              <motion.div 
                className='absolute -z-10 -top-4 -right-4 w-full h-full bg-indigo-200 rounded-xl'
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              ></motion.div>
              <motion.img 
                src={dashboard} 
                alt="TaskFlow Dashboard" 
                className='relative rounded-xl shadow-lg border-4 border-white'
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
            </div>
          </motion.div>
        </section>

        <section id="features" className='py-16 px-6 md:px-16 lg:px-32 bg-white'>
          <motion.div 
            className='text-center mb-12'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-3'>
              Everything Your Team Needs
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              All the essential tools without unnecessary complexity or costs
            </p>
          </motion.div>
          
          <motion.div 
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className='bg-amber-50 p-6 rounded-lg hover:shadow-md transition transform hover:-translate-y-1'
                variants={item}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className='flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-100'>
                  {feature.icon}
                </div>
                <h3 className='text-xl font-semibold mb-2 text-gray-800'>{feature.title}</h3>
                <p className='text-gray-600'>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className='mt-16 flex flex-col md:flex-row items-center gap-8 bg-indigo-50 rounded-xl p-8'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className='md:w-1/2'
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className='text-2xl font-bold text-gray-800 mb-4'>Real-time Collaboration</h3>
              <p className='text-gray-600 mb-4'>
                See updates from your team members instantly. No more refreshing or waiting for sync.
              </p>
              <ul className='space-y-2'>
                <motion.li 
                  className='flex items-start'
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Check className='text-indigo-600 mt-1 mr-2' size={18} />
                  <span>Live notifications for task updates</span>
                </motion.li>
                <motion.li 
                  className='flex items-start'
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Check className='text-indigo-600 mt-1 mr-2' size={18} />
                  <span>Instant messaging within projects</span>
                </motion.li>
                <motion.li 
                  className='flex items-start'
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Check className='text-indigo-600 mt-1 mr-2' size={18} />
                  <span>Collaborative document editing</span>
                </motion.li>
              </ul>
            </motion.div>
            <motion.div 
              className='md:w-1/2'
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className='bg-white p-4 rounded-lg shadow-md border border-gray-200'>
                <motion.img 
                  src={notifications} 
                  alt="Collaboration Preview" 
                  className='rounded-lg'
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section id="about" className='py-16 px-6 md:px-16 lg:px-32 bg-gray-50'>
          <motion.div 
            className='max-w-6xl mx-auto'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className='text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Why We Created TaskFlow
            </motion.h2>
            
            <div className='flex flex-col lg:flex-row gap-12 items-center'>
              <motion.div 
                className='lg:w-1/2'
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
                  <motion.img 
                    src={dashboard} 
                    alt="TaskFlow Interface" 
                    className='rounded-lg mb-4'
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  />
                  <p className='text-gray-600 text-center text-sm'>
                    Our clean, intuitive interface saves you time and frustration
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className='lg:w-1/2 space-y-6'
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className='text-xl font-semibold mb-3 text-indigo-600'>The Problem</h3>
                  <p className='text-gray-600'>
                    We saw teams struggling with expensive, complex tools that required training and still didn't meet their basic needs. Many were using multiple apps just to get their work done.
                  </p>
                </motion.div>
                
                <motion.div 
                  className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                >
                  <h3 className='text-xl font-semibold mb-3 text-indigo-600'>Our Solution</h3>
                  <p className='text-gray-600'>
                    TaskFlow combines all essential project management features in one simple, free platform. We cut the bloat and focused on what teams actually need to collaborate effectively.
                  </p>
                </motion.div>
                
                <motion.div 
                  className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                >
                  <h3 className='text-xl font-semibold mb-3 text-indigo-600'>Our Promise</h3>
                  <p className='text-gray-600'>
                    We'll never charge for core features. TaskFlow will remain free for teams of all sizes, with optional premium support for businesses that need it.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section id="contact" className='py-16 px-6 md:px-16 lg:px-32 bg-white'>
          <motion.div 
            className='max-w-md mx-auto'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center'>
              Contact Us
            </h2>
            <motion.form 
              className='space-y-4'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                variants={item}
              >
                <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                <input 
                  type='text' 
                  id='name' 
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm'
                />
              </motion.div>
              <motion.div
                variants={item}
              >
                <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                <input 
                  type='email' 
                  id='email' 
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm'
                />
              </motion.div>
              <motion.div
                variants={item}
              >
                <label htmlFor='message' className='block text-sm font-medium text-gray-700 mb-1'>Message</label>
                <textarea 
                  id='message' 
                  rows='4'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm'
                ></textarea>
              </motion.div>
              <motion.button 
                type='submit'
                className='w-full rounded-md px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 transition font-medium'
                whileHover={{ scale: 1.02, boxShadow: '0 5px 15px rgba(79, 70, 229, 0.3)' }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </motion.form>
          </motion.div>
        </section>

        <footer className='bg-gray-800 text-white py-12 px-6 md:px-16 lg:px-32'>
          <motion.div 
            className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              variants={item}
            >
              <h3 className='text-lg font-bold mb-3'>TaskFlow</h3>
              <p className='text-gray-400 text-sm'>
                Simple, free project management for teams of all sizes.
              </p>
            </motion.div>
            <motion.div
              variants={item}
            >
              <h4 className='font-semibold mb-3 text-sm'>Product</h4>
              <ul className='space-y-2'>
                <li>
                  <motion.button 
                    onClick={() => scrollToSection('features')} 
                    className='text-gray-400 hover:text-white transition text-sm'
                    whileHover={{ x: 5 }}
                  >
                    Features
                  </motion.button>
                </li>
              </ul>
            </motion.div>
            <motion.div
              variants={item}
            >
              <h4 className='font-semibold mb-3 text-sm'>Company</h4>
              <ul className='space-y-2'>
                <li>
                  <motion.button 
                    onClick={() => scrollToSection('about')} 
                    className='text-gray-400 hover:text-white transition text-sm'
                    whileHover={{ x: 5 }}
                  >
                    About
                  </motion.button>
                </li>
              </ul>
            </motion.div>
            <motion.div
              variants={item}
            >
              <h4 className='font-semibold mb-3 text-sm'>Support</h4>
              <ul className='space-y-2'>
                <li>
                  <motion.button 
                    onClick={() => scrollToSection('contact')} 
                    className='text-gray-400 hover:text-white transition text-sm'
                    whileHover={{ x: 5 }}
                  >
                    Contact
                  </motion.button>
                </li>
              </ul>
            </motion.div>
          </motion.div>
          <motion.div 
            className='border-t border-gray-700 pt-8 text-center text-gray-400 text-sm'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p>© {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
          </motion.div>
        </footer>
      </main>
    </div>
  );
}

export default LandingPage;