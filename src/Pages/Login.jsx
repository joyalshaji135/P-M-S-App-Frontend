import React, { useState, useEffect } from "react";
import { LuWorkflow } from "react-icons/lu";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAuthSlice } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import { createSelector } from "@reduxjs/toolkit";
import loginImg from "../assets/login_img.png";

const selectAuthState = createSelector(
  [(state, role) => role, (state) => state],
  (role, state) => {
    return role ? state[role] || { loading: false, error: null } : { loading: false, error: null };
  }
);

function IconInput({ children, placeholder, type, name, onChange, showPasswordToggle, onTogglePassword }) {
  return (
    <div className="flex items-center w-full relative h-12 bg-gray-50 rounded-lg mt-4 group focus-within:ring-2 focus-within:ring-blue-200 transition-all">
      <div className="icon-wrapper w-14 flex justify-center items-center absolute">
        <span className="text-xl text-blue-500/80 group-focus-within:text-blue-600 transition-colors">
          {children}
        </span>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        className="w-full h-full pl-14 pr-11 rounded-lg focus:outline-none bg-transparent placeholder-gray-400 text-gray-700"
        autoComplete="off"
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-3 text-gray-400 hover:text-blue-600 transition-colors"
        >
          {type === "password" ? <MdVisibility /> : <MdVisibilityOff />}
        </button>
      )}
    </div>
  );
}

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => selectAuthState(state, formData.role));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { email, password, role } = formData;
    if (!email || !password || !role) {
      toast.warn("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.warn("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || loading) return;

    try {
      const authSlice = createAuthSlice(formData.role);
      await dispatch(authSlice.actions.loginUser(formData)).unwrap();

      toast.success("Login Successful");
      navigate(
        formData.role === "admin" ? "/admin" :
        formData.role === "company-owners" ? "/owner" :
        formData.role === "team-managers" ? "/team-manager" :
        formData.role === "team-members" ? "/team-member" : "/"
      );
    } catch (error) {
      console.error("Login Failed:", error);
      toast.error(error.message || "Login failed. Please try again.");
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth) * 100;
      const yPos = (clientY / window.innerHeight) * 100;
      
      document.documentElement.style.setProperty('--mouse-x', `${xPos}%`);
      document.documentElement.style.setProperty('--mouse-y', `${yPos}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-sky-100 z-50">
        <div className="flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 mb-4 animate-pulse">
            <LuWorkflow className="text-5xl text-blue-600" />
            <span className="text-3xl font-bold text-gray-800">TaskFlow</span>
          </div>
          <div className="w-32 h-1 bg-blue-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full animate-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex justify-center items-center w-full min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 p-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[var(--mouse-y,50%)] left-[var(--mouse-x,50%)] -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vh] bg-[radial-gradient(circle_at_center,rgba(56,182,255,0.1)_0,transparent_70%)] opacity-40 transition-[background] duration-300"></div>
        
        {/* Floating bubbles */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-blue-100/30 backdrop-blur-sm"
            style={{
              width: `${Math.random() * 10 + 5}rem`,
              height: `${Math.random() * 10 + 5}rem`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.4 + 0.1,
              transform: `scale(${Math.random() * 0.5 + 0.5})`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl flex flex-col md:flex-row relative z-10 border border-white/20">
        {/* Left Form Section */}
        <div className="w-full md:w-1/2 p-8 lg:p-12">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 mb-8">
              <LuWorkflow className="text-3xl text-blue-600" />
              <span className="text-2xl font-bold text-gray-800">TaskFlow</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-500">Sign in to continue to your workspace</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <IconInput
                type="email"
                placeholder="Email Address"
                name="email"
                onChange={handleChange}
              >
                <MdEmail />
              </IconInput>

              <IconInput
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                showPasswordToggle={true}
                onTogglePassword={() => setShowPassword(!showPassword)}
              >
                <MdLock />
              </IconInput>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all
                    appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0NjZDN0YiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSIvPjwvc3ZnPg==')] 
                    bg-no-repeat bg-[right_1rem_center] bg-[length:1.5rem]"
                >
                  <option value="">Select your role</option>
                  <option value="admin">Administrator</option>
                  <option value="company-owners">Company Owner</option>
                  <option value="team-managers">Team Manager</option>
                  <option value="team-members">Team Member</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                {/* <a
                  href="#forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Forgot password?  
                </a> */}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white 
                rounded-lg font-semibold hover:from-blue-700 hover:to-blue-600 transition-all 
                disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center">
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Sign In"
                )}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </form>

          {/* <div className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="#signup" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Create account
            </a>
          </div> */}
        </div>

        {/* Right Illustration Section */}
        <div className="hidden md:block w-1/2 bg-gradient-to-br from-blue-600 to-blue-500 rounded-r-2xl p-12 relative overflow-hidden">
          {/* Animated background for right panel */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-400/30 filter blur-xl animate-float"></div>
            <div className="absolute top-1/3 right-1/3 w-40 h-40 rounded-full bg-blue-300/20 filter blur-xl animate-float animation-delay-2000"></div>
            <div className="absolute bottom-1/4 right-1/4 w-28 h-28 rounded-full bg-blue-200/20 filter blur-xl animate-float animation-delay-4000"></div>
          </div>
          
          <div className="h-full flex flex-col justify-center items-center text-center relative z-10">
            <img
              src={loginImg}
              alt="Team Collaboration"
              className="w-full max-w-md mb-8 transform hover:scale-105 transition-transform duration-500"
            />
            <h2 className="text-2xl font-bold text-white mb-4">
              Streamline Your Workflow
            </h2>
            <p className="text-blue-100/90 text-lg">
              Collaborate seamlessly with your team and achieve more
            </p>
          </div>
        </div>
      </div>

      {/* Add global styles for animations */}
      <style jsx global>{`
        :root {
          --mouse-x: 50%;
          --mouse-y: 50%;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(0) translateX(20px);
          }
          75% {
            transform: translateY(20px) translateX(10px);
          }
        }
        
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        
        .animate-progress {
          animation: progress 1.5s ease-in-out forwards;
        }
        
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default Login;