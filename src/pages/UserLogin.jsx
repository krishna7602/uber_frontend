import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { UserDataContext } from '../context/userContext'
import axios from 'axios'
import { useContext } from 'react'

const UserLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const { user, setUser } = React.useContext(UserDataContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            console.log(email, password)
            const userData = {
                email: email,
                password: password
            }

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

            if (response.status === 200) {
                console.log(response.data)
                const data = response.data
                setUser(data.user)
                localStorage.setItem('token', data.token)
                navigate('/home')
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
        <div className='min-h-screen w-full flex flex-col lg:flex-row bg-gradient-to-br from-gray-50 to-blue-50'>
            {/* Left Section - Form */}
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
                        <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2'>Welcome Back</h1>
                        <p className='text-gray-600 text-sm sm:text-base'>Sign in to your account to continue</p>
                    </div>

                    <form onSubmit={handleSubmit} className='space-y-6'>
                        {/* Email Input */}
                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>Email Address</label>
                            <input
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-gray-400'
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
                                className='w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-gray-400'
                                type="password"
                                placeholder='••••••••'
                            />
                        </div>

                        {/* Login Button */}
                        <button
                            disabled={loading}
                            className='w-full py-3 px-4 bg-black text-white font-bold rounded-xl hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-soft hover:shadow-medium'
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className='mt-6'>
                        <p className='text-gray-600 text-center text-sm mb-3'>Don't have an account?</p>
                        <Link
                            to="/user/signup"
                            className='block w-full py-3 px-4 bg-white text-black font-bold rounded-xl border-2 border-black hover:bg-black hover:text-white transition-all duration-200'
                        >
                            Create Account
                        </Link>
                    </div>
                </div>

                {/* Captain Login */}
                <div className='mt-8 pt-8 border-t border-gray-200'>
                    <p className='text-gray-600 text-center text-sm mb-3'>Drive with us</p>
                    <Link
                        to='/captain/login'
                        className='block w-full py-3 px-4 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-500 transition-all duration-200 text-center'
                    >
                        Sign in as Captain
                    </Link>
                </div>
            </div>

            {/* Right Section - Image/Message (Hidden on Mobile) */}
            <div className='hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 flex-col justify-center items-center p-12 text-white'>
                <div className='text-center'>
                    <div className='mb-6'>
                        <i className='ri-map-pin-line text-6xl opacity-80'></i>
                    </div>
                    <h2 className='text-4xl font-bold mb-4'>Get Around with Uber</h2>
                    <p className='text-lg text-blue-100 mb-8'>Fast, reliable, and secure rides at your fingertips</p>
                    <div className='flex justify-center gap-8 mt-8'>
                        <div className='text-center'>
                            <i className='ri-check-line text-3xl mb-2'></i>
                            <p className='text-sm'>Easy Booking</p>
                        </div>
                        <div className='text-center'>
                            <i className='ri-time-line text-3xl mb-2'></i>
                            <p className='text-sm'>Fast Pickup</p>
                        </div>
                        <div className='text-center'>
                            <i className='ri-safe-line text-3xl mb-2'></i>
                            <p className='text-sm'>Safe Rides</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLogin
