import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/userContext';

const UserSignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const newUser = {
      fullName: { firstName, lastName },
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );
      if (response.status === 201) {
        const data = response.data;
        localStorage.setItem('token', data.token);
        setUser(data.user);
        navigate('/user/login');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('This email is already registered. Please log in.');
      } else {
        setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
      }
      setLoading(false);
    }

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className='min-h-screen w-full flex flex-col bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6'>
      {/* Logo */}
      <img
        className="w-16 sm:w-20 mb-6 hover:scale-105 transition-transform"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />

      <div className='flex-1 flex items-center justify-center'>
        <div className='w-full max-w-md'>
          {/* Header */}
          <div className='mb-8'>
            <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2'>Get Started</h1>
            <p className='text-gray-600 text-sm sm:text-base'>Create your account to book rides</p>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className='mb-4 p-4 bg-red-50 border border-red-200 rounded-xl'>
              <p className='text-red-700 text-sm font-medium'>{errorMessage}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-4'>
            {/* Personal Info */}
            <div className='bg-white p-4 rounded-xl border border-gray-200'>
              <p className='text-sm font-semibold text-gray-700 mb-3'>Personal Information</p>
              <div className='space-y-3'>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder='First Name'
                  required
                  className='w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-gray-400 text-sm'
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder='Last Name'
                  required
                  className='w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-gray-400 text-sm'
                />
              </div>
            </div>

            {/* Login Credentials */}
            <div className='bg-white p-4 rounded-xl border border-gray-200'>
              <p className='text-sm font-semibold text-gray-700 mb-3'>Login Credentials</p>
              <div className='space-y-3'>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Email Address'
                  required
                  className='w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-gray-400 text-sm'
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password (min 6 characters)'
                  required
                  className='w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-gray-400 text-sm'
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className='w-full py-3 px-4 bg-black text-white font-bold rounded-xl hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-soft hover:shadow-medium text-sm sm:text-base'
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <div className='mt-6 pt-6 border-t border-gray-200'>
            <p className='text-gray-600 text-center text-sm mb-3'>Already have an account?</p>
            <Link
              to="/user/login"
              className='block w-full py-2.5 px-4 bg-white text-black font-bold rounded-xl border-2 border-black hover:bg-black hover:text-white transition-all duration-200 text-center text-sm'
            >
              Sign In Instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;
