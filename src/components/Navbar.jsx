import React, { useState } from 'react'
import { LuWorkflow } from "react-icons/lu";
import { Menu, X } from 'lucide-react';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
            <div className="container px-4 mx-auto relative text-sm">
                <div className="flex justify-between items-center">
                    {/* Logo Section */}
                    <div className="flex items-center flex-shrink-0">
                        <LuWorkflow className='h-6 w-6 mr-2'/>
                        <span className='text-xl tracking-tight'>TaskFlow</span>
                    </div>

                    {/* Desktop Navigation Links */}
                    <ul className='hidden lg:flex ml-14 space-x-12'>
                        <li><a href="#home" className="hover:text-blue-600 transition-colors">Home</a></li>
                        <li><a href="#features" className="hover:text-blue-600 transition-colors">Features</a></li>
                        <li><a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a></li>
                    </ul>

                    {/* Desktop Action Buttons */}
                    <div className="hidden lg:flex justify-center space-x-12 items-center">
                        <button className="border-2 text-white bg-blue-600 px-3 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
                            Sign In
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="lg:hidden md:flex flex-col justify-end">
                        <button onClick={toggleMenu} aria-label="Toggle Menu">
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="fixed inset-0 bg-black/50 z-20" onClick={toggleMenu}>
                        <div 
                            className="fixed right-0 top-0 z-30 bg-white w-64 h-full p-8 flex flex-col shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={toggleMenu} 
                                className="self-end mb-6"
                                aria-label="Close Menu"
                            >
                                <X />
                            </button>

                            <ul className="space-y-6">
                                <li>
                                    <a 
                                        href="#home" 
                                        onClick={toggleMenu} 
                                        className="block hover:text-blue-600 transition-colors"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="#features" 
                                        onClick={toggleMenu} 
                                        className="block hover:text-blue-600 transition-colors"
                                    >
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="#pricing" 
                                        onClick={toggleMenu} 
                                        className="block hover:text-blue-600 transition-colors"
                                    >
                                        Pricing
                                    </a>
                                </li>
                            </ul>

                            <div className="mt-auto">
                                <button 
                                    className="w-full border-2 text-white bg-blue-600 px-3 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
                                    onClick={toggleMenu}
                                >
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar