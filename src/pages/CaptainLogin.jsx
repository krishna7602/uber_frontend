import React from 'react'
import { data, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'
import { useState } from 'react'

const CaptainLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { captain, setCaptain } = React.useContext(CaptainDataContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      console.log(email, password)
      const captainData = {
        email: email,
        password: password
      }
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captainData)
      if (response.status === 200) {
        console.log(response.data)
        const data = response.data;
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain/home')
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message)
      alert(error.response?.data?.message || 'Login failed. Please try again.')
      setLoading(false)
    }
    setEmail('')
    setPassword('')
  }

  return (
    <div className='min-h-screen w-full flex flex-col lg:flex-row bg-gradient-to-br from-gray-50 to-yellow-50'>
      {/* Left Section - Image/Message (Hidden on Mobile) */}
      <div className='hidden lg:flex w-1/2 bg-gradient-to-br from-yellow-400 to-yellow-600 flex-col justify-center items-center p-12 text-gray-900'>
        <div className='text-center'>
          <div className='mb-6'>
            <i className='ri-taxi-line text-6xl opacity-90'></i>
          </div>
          <h2 className='text-4xl font-bold mb-4'>Drive & Earn</h2>
          <p className='text-lg text-gray-800 mb-8'>Start earning as a Captain on Uber</p>
          <div className='flex justify-center gap-8 mt-8'>
            <div className='text-center'>
              <i className='ri-star-line text-3xl mb-2'></i>
              <p className='text-sm'>Great Earnings</p>
            </div>
            <div className='text-center'>
              <i className='ri-time-line text-3xl mb-2'></i>
              <p className='text-sm'>Flexible Hours</p>
            </div>
            <div className='text-center'>
              <i className='ri-shield-check-line text-3xl mb-2'></i>
              <p className='text-sm'>Full Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className='w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-8 md:p-12'>
        {/* Logo */}
        <div>
          <img
            className="w-16 sm:w-20 mb-8 hover:scale-105 transition-transform"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber Logo"
          />
        </div>

        {/* Form Content */}
        <div className='flex-1 flex flex-col justify-center'>
          <div className='mb-8'>
            <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2'>Captain Portal</h1>
            <p className='text-gray-600 text-sm sm:text-base'>Sign in to manage your rides and earnings</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Email Input */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Email Address</label>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all placeholder:text-gray-400'
                type="email"
                placeholder='you@example.com'
              />
            </div>

            {/* Password Input */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Password</label>
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all placeholder:text-gray-400'
                type="password"
                placeholder='••••••••'
              />
            </div>

            {/* Login Button */}
            <button
              disabled={loading}
              className='w-full py-3 px-4 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-soft hover:shadow-medium'
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className='mt-6'>
            <p className='text-gray-600 text-center text-sm mb-3'>New to Uber Captains?</p>
            <Link
              to="/captain/signup"
              className='block w-full py-3 px-4 bg-white text-black font-bold rounded-xl border-2 border-black hover:bg-black hover:text-white transition-all duration-200'
            >
              Register as Captain
            </Link>
          </div>
        </div>

        {/* User Login */}
        <div className='mt-8 pt-8 border-t border-gray-200'>
          <p className='text-gray-600 text-center text-sm mb-3'>Looking to book a ride?</p>
          <Link
            to='/user/login'
            className='block w-full py-3 px-4 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition-all duration-200 text-center'
          >
            Sign in as User
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CaptainLogin
