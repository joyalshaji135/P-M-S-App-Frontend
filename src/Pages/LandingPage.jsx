import React, { useState } from 'react';
import { Menu, X, Check, Users, Calendar, FileText, List, BarChart2 } from 'lucide-react';
import dashboard from '../assets/Dashboard.png';
import notifications from '../assets/notifications.png';



function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navigateToLogin = () => {
    // In a real app, this would navigate to your login page
    console.log("Navigating to login");
    window.location.href = "/login"; // or use your router
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

  return (
    <div className='w-full min-h-screen bg-amber-50 overflow-x-hidden'>
      <header className='fixed top-0 w-full z-50 bg-white flex justify-between items-center text-black py-4 px-6 md:px-16 lg:px-32 drop-shadow-md'>
        <div>
          <h1 className='text-2xl md:text-3xl font-bold text-indigo-700'>TaskFlow</h1>
        </div>
        
        <nav className='hidden xl:flex items-center gap-8 font-semibold'>
          <button 
            onClick={() => scrollToSection('hero')}
            className='text-sm font-medium hover:text-indigo-600 p-2 transition'
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('features')}
            className='text-sm font-medium hover:text-indigo-600 p-2 transition'
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className='text-sm font-medium hover:text-indigo-600 p-2 transition'
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className='text-sm font-medium hover:text-indigo-600 p-2 transition'
          >
            Contact
          </button>
        </nav>
        
        <div className='hidden xl:flex items-center gap-4'>
          <button 
            onClick={navigateToLogin}
            className='rounded-md px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 transition font-medium'
          >
            Sign In
          </button>
        </div>
        
        <button 
          className='xl:hidden block focus:outline-none' 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {isOpen && (
        <div className='xl:hidden fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-6 mt-16'>
          <button 
            className='absolute top-6 right-6 focus:outline-none'
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          <nav className='flex flex-col items-center gap-6 font-medium'>
            <button 
              onClick={() => scrollToSection('hero')}
              className='text-lg hover:text-indigo-600 transition'
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className='text-lg hover:text-indigo-600 transition'
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className='text-lg hover:text-indigo-600 transition'
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className='text-lg hover:text-indigo-600 transition'
            >
              Contact
            </button>
          </nav>
          <button 
            onClick={navigateToLogin}
            className='rounded-md px-6 py-2 bg-indigo-600 text-white hover:bg-indigo-700 transition font-medium'
          >
            Sign In
          </button>
        </div>
      )}


      <main className='pt-20'>
        <section id="hero" className='relative py-16 px-6 md:px-16 lg:px-32 flex flex-col md:flex-row items-center gap-8'>
          <div className='absolute -right-20 -top-20 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply opacity-70 animate-blob'></div>
          <div className='absolute -bottom-20 -left-20 w-72 h-72 bg-amber-100 rounded-full mix-blend-multiply opacity-70 animate-blob animation-delay-2000'></div>
          
          <div className='relative z-10 md:w-1/2'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4'>
              Streamline Your Team's <span className='text-indigo-600'>Workflow</span>
            </h1>
            <p className='text-md md:text-lg text-gray-600 mb-6'>
              TaskFlow offers all the essential project management tools without the monthly fees.
              Perfect for teams tired of overpriced, bloated alternatives.
            </p>
            <button 
              onClick={navigateToLogin}
              className='rounded-md px-6 py-3 bg-indigo-600 text-white hover:bg-indigo-700 transition font-medium'
            >
              Get Started
            </button>
          </div>
          
          <div className='relative z-10 md:w-1/2 mt-8 md:mt-0'>
            <div className='relative'>
              <div className='absolute -z-10 -top-4 -right-4 w-full h-full bg-indigo-200 rounded-xl'></div>
              <img 
                src={dashboard} 
                alt="TaskFlow Dashboard" 
                className='relative rounded-xl shadow-lg border-4 border-white'
              />
            </div>
          </div>
        </section>

        \

        <section id="features" className='py-16 px-6 md:px-16 lg:px-32 bg-white'>
          <div className='text-center mb-12'>
            <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-3'>
              Everything Your Team Needs
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              All the essential tools without unnecessary complexity or costs
            </p>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {features.map((feature, index) => (
              <div key={index} className='bg-amber-50 p-6 rounded-lg hover:shadow-md transition transform hover:-translate-y-1'>
                <div className='flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-100'>
                  {feature.icon}
                </div>
                <h3 className='text-xl font-semibold mb-2 text-gray-800'>{feature.title}</h3>
                <p className='text-gray-600'>{feature.description}</p>
              </div>
            ))}
          </div>

          <div className='mt-16 flex flex-col md:flex-row items-center gap-8 bg-indigo-50 rounded-xl p-8'>
            <div className='md:w-1/2'>
              <h3 className='text-2xl font-bold text-gray-800 mb-4'>Real-time Collaboration</h3>
              <p className='text-gray-600 mb-4'>
                See updates from your team members instantly. No more refreshing or waiting for sync.
              </p>
              <ul className='space-y-2'>
                <li className='flex items-start'>
                  <Check className='text-indigo-600 mt-1 mr-2' size={18} />
                  <span>Live notifications for task updates</span>
                </li>
                <li className='flex items-start'>
                  <Check className='text-indigo-600 mt-1 mr-2' size={18} />
                  <span>Instant messaging within projects</span>
                </li>
                <li className='flex items-start'>
                  <Check className='text-indigo-600 mt-1 mr-2' size={18} />
                  <span>Collaborative document editing</span>
                </li>
              </ul>
            </div>
            <div className='md:w-1/2'>
              <div className='bg-white p-4 rounded-lg shadow-md border border-gray-200'>
                <img 
                  src={notifications} 
                  alt="Collaboration Preview" 
                  className='rounded-lg'
                />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className='py-16 px-6 md:px-16 lg:px-32 bg-gray-50'>
          <div className='max-w-6xl mx-auto'>
            <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center'>
              Why We Created TaskFlow
            </h2>
            
            <div className='flex flex-col lg:flex-row gap-12 items-center'>
              <div className='lg:w-1/2'>
                <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
                  <img 
                    src={dashboard} 
                    alt="TaskFlow Interface" 
                    className='rounded-lg mb-4'
                  />
                  <p className='text-gray-600 text-center text-sm'>
                    Our clean, intuitive interface saves you time and frustration
                  </p>
                </div>
              </div>
              
              <div className='lg:w-1/2 space-y-6'>
                <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
                  <h3 className='text-xl font-semibold mb-3 text-indigo-600'>The Problem</h3>
                  <p className='text-gray-600'>
                    We saw teams struggling with expensive, complex tools that required training and still didn't meet their basic needs. Many were using multiple apps just to get their work done.
                  </p>
                </div>
                
                <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
                  <h3 className='text-xl font-semibold mb-3 text-indigo-600'>Our Solution</h3>
                  <p className='text-gray-600'>
                    TaskFlow combines all essential project management features in one simple, free platform. We cut the bloat and focused on what teams actually need to collaborate effectively.
                  </p>
                </div>
                
                <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
                  <h3 className='text-xl font-semibold mb-3 text-indigo-600'>Our Promise</h3>
                  <p className='text-gray-600'>
                    We'll never charge for core features. TaskFlow will remain free for teams of all sizes, with optional premium support for businesses that need it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className='py-16 px-6 md:px-16 lg:px-32 bg-white'>
          <div className='max-w-md mx-auto'>
            <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center'>
              Contact Us
            </h2>
            <form className='space-y-4'>
              <div>
                <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                <input 
                  type='text' 
                  id='name' 
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm'
                />
              </div>
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                <input 
                  type='email' 
                  id='email' 
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm'
                />
              </div>
              <div>
                <label htmlFor='message' className='block text-sm font-medium text-gray-700 mb-1'>Message</label>
                <textarea 
                  id='message' 
                  rows='4'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm'
                ></textarea>
              </div>
              <button 
                type='submit'
                className='w-full rounded-md px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 transition font-medium'
              >
                Send Message
              </button>
            </form>
          </div>
        </section>

        <footer className='bg-gray-800 text-white py-12 px-6 md:px-16 lg:px-32'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
            <div>
              <h3 className='text-lg font-bold mb-3'>TaskFlow</h3>
              <p className='text-gray-400 text-sm'>
                Simple, free project management for teams of all sizes.
              </p>
            </div>
            <div>
              <h4 className='font-semibold mb-3 text-sm'>Product</h4>
              <ul className='space-y-2'>
                <li><button onClick={() => scrollToSection('features')} className='text-gray-400 hover:text-white transition text-sm'>Features</button></li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold mb-3 text-sm'>Company</h4>
              <ul className='space-y-2'>
                <li><button onClick={() => scrollToSection('about')} className='text-gray-400 hover:text-white transition text-sm'>About</button></li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold mb-3 text-sm'>Support</h4>
              <ul className='space-y-2'>
                <li><button onClick={() => scrollToSection('contact')} className='text-gray-400 hover:text-white transition text-sm'>Contact</button></li>
              </ul>
            </div>
          </div>
          <div className='border-t border-gray-700 pt-8 text-center text-gray-400 text-sm'>
            <p>© {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default LandingPage;