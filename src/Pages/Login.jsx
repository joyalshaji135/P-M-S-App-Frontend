import React, { useState } from 'react';
import { LuWorkflow } from "react-icons/lu";
import { MdEmail, MdLock } from "react-icons/md";
import { FiCheck } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import dashboard from '../assets/Dashboard.png';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect based on role
      const redirectPath = formData.role === 'admin' ? '/admin' : '/dashboard';
      navigate(redirectPath);
      
    } catch (error) {
      alert(`Login error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    "Manage tasks across multiple projects",
    "Collaborate in real-time with your team",
    "Track progress with intuitive dashboards"
  ];

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      <div className='w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row'>
        {/* Left Form Section */}
        <div className='w-full md:w-1/2 p-8 md:p-12'>
          <div className='flex items-center justify-center gap-2 mb-8'>
            <LuWorkflow className="text-2xl text-blue-600" />
            <span className="text-xl font-bold">TaskFlow</span>
          </div>
          
          <h1 className='text-2xl font-semibold text-center mb-6'>Welcome Back</h1>
          
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-1'>
              <label className='text-sm text-gray-600'>Email</label>
              <div className='flex items-center bg-gray-100 rounded-lg px-3 py-2'>
                <MdEmail className='text-gray-500 mr-2' />
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full outline-none bg-transparent'
                  required
                />
              </div>
            </div>
            
            <div className='space-y-1'>
              <label className='text-sm text-gray-600'>Password</label>
              <div className='flex items-center bg-gray-100 rounded-lg px-3 py-2'>
                <MdLock className='text-gray-500 mr-2' />
                <input
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full outline-none bg-transparent'
                  required
                />
              </div>
            </div>
            
            <div className='space-y-1'>
              <label className='text-sm text-gray-600'>Role</label>
              <select
                name='role'
                value={formData.role}
                onChange={handleChange}
                className='w-full bg-gray-100 rounded-lg p-2 outline-none'
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="member">Team Member</option>
                <option value="manager">Team Manager</option>
              </select>
            </div>
            
            <div className='flex items-center'>
              <input
                type='checkbox'
                id='remember'
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className='mr-2'
              />
              <label htmlFor='remember' className='text-sm'>Remember me</label>
            </div>
            
            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-70'
            >
              {isSubmitting ? 'Logging in...' : 'Log In'}
            </button>
            
            
          </form>
        </div>
        
        {/* Right Info Section */}
        <div className='w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 md:p-12 text-white'>
          <div className='h-full flex flex-col justify-center'>
            <img 
              src={dashboard} 
              alt="Dashboard Preview" 
              className='w-full max-w-md mx-auto mb-8 rounded-lg shadow-lg'
            />
            
            <h2 className='text-xl font-bold mb-4 text-center'>Streamline Your Workflow</h2>
            
            <ul className='space-y-3 mb-6'>
              {benefits.map((benefit, index) => (
                <li key={index} className='flex items-start'>
                  <FiCheck className='mt-1 mr-2 flex-shrink-0' />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            
            <div className='text-center text-blue-100 text-sm'>
              <p>"TaskFlow simplified our team collaboration"</p>
              <p className='font-medium mt-1'>- Joyal Shaji</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;