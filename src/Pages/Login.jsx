// import React, { useState, useEffect } from "react";
// import { LuWorkflow } from "react-icons/lu";
// import { MdEmail, MdLock } from "react-icons/md";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { createAuthSlice } from "../redux/slices/authSlice"; 
// import { store } from "../redux/store";
// import { createSelector } from '@reduxjs/toolkit';
// import { toast } from "react-toastify";



// function IconInput({ children, placeholder, type, name, onChange }) {
//   return (
//     <div className="flex justify-left items-center w-full relative h-12 bg-gray-100 rounded-lg mt-4">
//       <div className="icon-wrapper w-14 flex justify-center items-center absolute">
//         <span className="text-lg opacity-80 text-gray-500">{children}</span>
//       </div>
//       <input
//         type={type}
//         placeholder={placeholder}
//         name={name}
//         onChange={onChange}
//         className="w-full h-full pl-14 pr-4 rounded-lg focus:outline-none bg-transparent"
//       />
//     </div>
//   );
// }

// function Login() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     role: "",
//   });
//   const [rememberMe, setRememberMe] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const selectAuthState = createSelector(
//     (state) => state,
//     (state, role) => role,
//     (state, role) => (role ? state[role] || { loading: false, error: null } : { loading: false, error: null })
//   );
  

//   // useEffect(() => {
//   //   // Dynamically inject the reducer based on selected role
//   //   if (formData.role) {
//   //     const authSlice = createAuthSlice(formData.role);
//   //     store.injectReducer(formData.role, authSlice.reducer);
//   //   }
//   // }, [formData.role]);

//   // Access role-specific Redux state dynamically
//   const { loading, error } = useSelector((state) => 
//     selectAuthState(state, formData.role)
//   );

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const validateForm = () => {
//     const { email, password, role } = formData;
//     if (!email || !password || !role) {
//       alert("All fields are required.");
//       return false;
//     }
//     if (!/\S+@\S+\.\S+/.test(email)) {
//       alert("Please enter a valid email address.");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm() || loading) return;

//     try {
//       const authSlice = createAuthSlice(formData.role);
//       await dispatch(authSlice.actions.loginUser(formData)).unwrap();

//       toast.success("Login Success");
//       navigate(
//         formData.role === "admin"
//           ? "/admin"
//           : formData.role === "company-owners"
//           ? "/owner"
//           : formData.role === "team-managers"
//           ? "/team-manager"
//           : formData.role === "team-members"
//           ? "/team-member"
//           : "/"
//       );
//     } catch (error) {
//       console.error("Login Failed:", error);
//       alert("Login Failed: " + error.message);
//     }
//   };
//   return (
//     <div className="flex justify-center items-center w-full h-screen bg-slate-50">
//       <div className="form-container overflow-hidden rounded-2xl justify-between flex drop-shadow-xl w-11/12 max-w-screen-xl bg-white">
//         <div className="form-section w-1/2 px-24 py-12">
//           <div className="logo-wrap flex justify-center gap-x-1 items-center">
//             <LuWorkflow className="text-2xl text-blue-600" />
//             <span className="text-xl font-bold text-gray-800">TaskFlow</span>
//           </div>
//           <h1 className="text-2xl font-semibold mt-6 text-neutral-900 opacity-80 text-center">
//             Log in to your account
//           </h1>
//           {loading && <p className="text-blue-500 mt-2 text-center">Loading...</p>}
//           {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
//           <form onSubmit={handleSubmit}>
//             <div className="mt-6">
//               <IconInput
//                 type="email"
//                 placeholder="Email"
//                 name="email"
//                 onChange={handleChange}
//               >
//                 <MdEmail />
//               </IconInput>
//               <IconInput
//                 type="password"
//                 placeholder="Password"
//                 name="password"
//                 onChange={handleChange}
//               >
//                 <MdLock />
//               </IconInput>
//             </div>
//             <div className="mt-6">
//               <label className="block text-gray-500 text-sm mb-1">Select Role</label>
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="w-full p-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
//               >
//                 <option value="">Select a Role</option>
//                 <option value="admin">Admin</option>
//                 <option value="team-members">Team Member</option>
//                 <option value="team-managers">Team Manager</option>
//                 <option value="company-owners">Company Owner</option>
//               </select>
//             </div>
//             <div className="mt-4 flex items-center">
//               <input
//                 type="checkbox"
//                 id="rememberMe"
//                 checked={rememberMe}
//                 onChange={(e) => setRememberMe(e.target.checked)}
//                 className="mr-2"
//               />
//               <label htmlFor="rememberMe" className="text-sm text-gray-600">
//                 Remember Me
//               </label>
//             </div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 text-white py-2 rounded-lg mt-6 hover:bg-blue-700 transition duration-300 text-sm disabled:bg-blue-400 disabled:cursor-not-allowed"
//             >
//               {loading ? "Logging In..." : "Log In"}
//             </button>
//             <div className="mt-4 text-right">
//               <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
//                 Forgot Password?
//               </a>
//             </div>
//             <div className="mt-4 text-center">
//               <span className="text-sm text-gray-600">Don't have an account? </span>
//               <a href="/signup" className="text-sm text-blue-600 hover:underline">
//                 Sign Up
//               </a>
//             </div>
//           </form>
//         </div>
//         <div className="illustration-section w-1/2 bg-blue-600 flex justify-center items-center">
//           <div className="illu-wrap">
//             <img
//               src="https://via.placeholder.com/600x800"
//               alt="Illustration"
//               className="h-full w-full object-cover"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


import React, { useState } from "react";
import { LuWorkflow } from "react-icons/lu";
import { MdEmail, MdLock } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAuthSlice } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import { createSelector } from "@reduxjs/toolkit";
import loginImg from "../assets/login_img.png"

// Define selector outside component
const selectAuthState = createSelector(
  [(state, role) => role, (state) => state],
  (role, state) => {
    return role ? state[role] || { loading: false, error: null } : { loading: false, error: null };
  }
);

function IconInput({ children, placeholder, type, name, onChange }) {
  return (
    <div className="flex justify-left items-center w-full relative h-12 bg-gray-100 rounded-lg mt-4">
      <div className="icon-wrapper w-14 flex justify-center items-center absolute">
        <span className="text-lg opacity-80 text-gray-500">{children}</span>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        className="w-full h-full pl-14 pr-4 rounded-lg focus:outline-none bg-transparent"
      />
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Use the memoized selector
  const { loading, error } = useSelector((state) => selectAuthState(state, formData.role));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { email, password, role } = formData;
    if (!email || !password || !role) {
      alert("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
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

      toast.success("Login Success");
      navigate(
        formData.role === "admin"
          ? "/admin"
          : formData.role === "company-owners"
          ? "/owner"
          : formData.role === "team-managers"
          ? "/team-manager"
          : formData.role === "team-members"
          ? "/team-member"
          : "/"
      );
    } catch (error) {
      console.error("Login Failed:", error);
      alert("Login Failed: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-slate-50">
      <div className="form-container overflow-hidden rounded-2xl justify-between flex drop-shadow-xl w-11/12 max-w-screen-xl bg-white">
        <div className="form-section w-1/2 px-24 py-12">
          <div className="logo-wrap flex justify-center gap-x-1 items-center">
            <LuWorkflow className="text-2xl text-blue-600" />
            <span className="text-xl font-bold text-gray-800">TaskFlow</span>
          </div>
          <h1 className="text-2xl font-semibold mt-6 text-neutral-900 opacity-80 text-center">
            Log in to your account
          </h1>
          {loading && <p className="text-blue-500 mt-2 text-center">Loading...</p>}
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mt-6">
              <IconInput type="email" placeholder="Email" name="email" onChange={handleChange}>
                <MdEmail />
              </IconInput>
              <IconInput type="password" placeholder="Password" name="password" onChange={handleChange}>
                <MdLock />
              </IconInput>
            </div>
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
                <option value="team-members">Team Member</option>
                <option value="team-managers">Team Manager</option>
                <option value="company-owners">Company Owner</option>
              </select>
            </div>
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-600">Remember Me</label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg mt-6 hover:bg-blue-700 transition duration-300 text-sm disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {loading ? "Logging In..." : "Log In"}
            </button>
            <div className="mt-4 text-right">
              <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600">Don't have an account? </span>
              <a href="/signup" className="text-sm text-blue-600 hover:underline">
                Sign Up
              </a>
            </div>
          </form>
        </div>
        <div className="illustration-section w-1/2 bg-blue-600 flex justify-center items-center">
          <div className="illu-wrap">
            <img
              src={loginImg}
              alt="Illustration"
              className="h-[400px] w-[400px] object-cover "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
