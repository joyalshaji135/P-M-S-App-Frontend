import React, { useState, useEffect } from 'react';
import { LuWorkflow } from "react-icons/lu";
import { MdEmail, MdLock } from "react-icons/md";

function IconInput({ children, placeholder, type, name, onChange }) {
    return (
        <div className="flex justify-left items-center w-full relative h-12 bg-gray-100 rounded-lg mt-4">
            <div className='icon-wrapper w-14 flex justify-center items-center absolute'>
                <span className='text-lg opacity-80 text-gray-500'>{children}</span>
            </div>
            <input 
                type={type} 
                placeholder={placeholder} 
                name={name}
                onChange={onChange}
                className='w-full h-full pl-14 pr-4 rounded-lg focus:outline-none bg-transparent'
            />
        </div>
    );
}

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: ''
    });
    const [isLoading, setIsLoading] = useState(true);

    // Simulate page loading animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // 2 seconds loading animation
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center w-full h-screen bg-white">
                <div className="animate-pulse">
                    <LuWorkflow className="text-6xl text-blue-600" />
                </div>
            </div>
        );
    }

    return (
        <div className='flex justify-center items-center w-full h-screen bg-slate-50'>
            <div className='form-container overflow-hidden rounded-2xl justify-between flex drop-shadow-xl w-11/12 max-w-screen-xl bg-white'>
                <div className='form-section w-1/2 px-24 py-12'>
                    <div className="logo-wrap flex justify-center gap-x-1 items-center">
                        <LuWorkflow className="text-2xl text-blue-600" />
                        <span className="text-xl font-bold text-gray-800">TaskFlow</span>
                    </div>
                    <h1 className='text-2xl font-semibold mt-6 text-neutral-900 opacity-80 text-center'>Log in to your account</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-6">
                            <IconInput 
                                type='email' 
                                placeholder='Email' 
                                name="email" 
                                onChange={handleChange}
                            >
                                <MdEmail />
                            </IconInput>
                            <IconInput 
                                type='password' 
                                placeholder='Password' 
                                name="password" 
                                onChange={handleChange}
                            >
                                <MdLock />
                            </IconInput>
                        </div>
                        {/* Role Select Dropdown */}
                        <div className="mt-6">
                            <label className="block text-gray-500 text-sm mb-1">Select Role</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            >
                                <option value="">Select a Role</option>
                                <option value="admin">Admin</option>
                                <option value="developer">Team Member</option>
                                <option value="manager">Team Manager</option>
                                <option value="tester">Company Owner</option>
                            </select>
                        </div>
                        <button 
                            type="submit" 
                            className="w-full bg-blue-600 text-white py-2 rounded-lg mt-6 hover:bg-blue-700 transition duration-300 text-sm"
                        >
                            Log In
                        </button>
                    </form>
                </div>
                <div className='illustration-section w-1/2 bg-blue-600 flex justify-center items-center'>
                    <div className="illu-wrap">
                        <img 
                            src="https://via.placeholder.com/600x800" 
                            alt="Illustration" 
                            className="h-full w-full object-cover" 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;