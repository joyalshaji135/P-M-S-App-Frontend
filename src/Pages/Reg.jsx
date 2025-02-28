import React, { useState } from 'react';

function Reg() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div
      className='w-full min-h-screen flex items-center justify-center'
      style={{ backgroundColor: '#FAACA8', backgroundImage: 'linear-gradient(180deg, #FAACA8 0%, #DDD6F3 100%)' }}
    >
      <div className='flex items-center justify-center w-full'>
        <div className='p-8 w-80 text-center rounded-xl shadow-xl max-w-md bg-white'>
          <h1 className='text-xl font-semibold text-center mb-4'>Create an Account</h1>

          <button
            className='w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg mb-3 hover:bg-gray-200 transition duration-300 text-sm'
          >
            <img src='https://www.svgrepo.com/show/355037/google.svg' alt='Google' className='w-4 h-4 mr-2' />
            Sign up with Google
          </button>

          <div className='flex items-center my-3'>
            <hr className='flex-grow border-gray-300' />
            <span className='px-2 text-gray-500 text-xs'>Or sign up with</span>
            <hr className='flex-grow border-gray-300' />
          </div>

          <form>
            <div className='mb-3 text-left'>
              <label className='block text-gray-700 text-xs mb-1'>Name</label>
              <input
                type='text'
                name='name'
                placeholder='John Smith'
                value={formData.name}
                onChange={handleInputChange}
                className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm bg-white'
              />
            </div>

            <div className='mb-3 text-left'>
              <label className='block text-gray-700 text-xs mb-1'>Email</label>
              <input
                type='email'
                name='email'
                placeholder='example@gmail.com'
                value={formData.email}
                onChange={handleInputChange}
                className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm bg-white'
              />
            </div>

            <div className='mb-3 text-left'>
              <label className='block text-gray-700 text-xs mb-1'>Password</label>
              <input
                type='password'
                name='password'
                placeholder='••••••••'
                value={formData.password}
                onChange={handleInputChange}
                className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm bg-white'
              />
            </div>

            <div className='mb-3 text-left'>
              <label className='block text-gray-700 text-xs mb-1'>Confirm Password</label>
              <input
                type='password'
                name='confirmPassword'
                placeholder='••••••••'
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm bg-white'
              />
            </div>

            <div className='mb-3 text-left'>
              <label className='block text-gray-700 text-xs mb-1'>Select Role</label>
              <select
                name='role'
                value={formData.role}
                onChange={handleInputChange}
                className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm bg-white'
              >
                <option value=''>Select a Role</option>
                <option value='admin'>Admin</option>
                <option value='developer'>Team Member</option>
                <option value='manager'>Team Manager</option>
                <option value='tester'>Company Owner</option>
              </select>
            </div>

            <button
              type='submit'
              className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 text-sm'
            >
              Sign up
            </button>
          </form>

          <p className='text-xs text-gray-500 mt-3'>
            Already have an account?{' '}
            <a href='/login' className='text-blue-600 font-semibold hover:underline'>
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Reg;