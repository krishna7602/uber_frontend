import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [color, setVehicleColor] = useState('')
  const [plate, setVehiclePlate] = useState('')
  const [capacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { captain, setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const captainData = {
        fullName: {
          firstName: firstName,
          lastName: lastName,
        },
        email: email,
        password: password,
        vehicle: {
          color: color,
          plate: plate,
          capacity: parseInt(capacity),
          vehicleType: vehicleType
        }
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captainData)
      
      if (response.status === 201) {
        console.log(response.data)
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain/home')
      }

      // Clear form
      setEmail('')
      setPassword('')
      setFirstName('')
      setLastName('')
      setVehicleColor('')
      setVehiclePlate('')
      setVehicleCapacity('')
      setVehicleType('')
    } catch (error) {
      console.error('Signup error:', error)
      setError(error.response?.data?.message || 'Signup failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen w-full flex flex-col bg-gradient-to-br from-gray-50 to-yellow-50 py-8 px-4 sm:px-6'>
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
            <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2'>Drive with Uber</h1>
            <p className='text-gray-600 text-sm sm:text-base'>Create your captain account</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className='mb-4 p-4 bg-red-50 border border-red-200 rounded-xl'>
              <p className='text-red-700 text-sm font-medium'>{error}</p>
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
                  className='w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all placeholder:text-gray-400 text-sm'
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder='Last Name'
                  required
                  className='w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all placeholder:text-gray-400 text-sm'
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
                  className='w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all placeholder:text-gray-400 text-sm'
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password (min 6 characters)'
                  required
                  className='w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all placeholder:text-gray-400 text-sm'
                />
              </div>
            </div>

            {/* Vehicle Info */}
            <div className='bg-white p-4 rounded-xl border border-gray-200'>
              <p className='text-sm font-semibold text-gray-700 mb-3'>Vehicle Information</p>
              <div className='space-y-3'>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  required
                  className='w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all text-sm'
                >
                  <option value="">Select Vehicle Type</option>
                  <option value="car">Car</option>
                  <option value="auto">Auto</option>
                  <option value="motorcycle">Motorcycle</option>
                </select>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setVehicleColor(e.target.value)}
                  placeholder='Vehicle Color (e.g., Red, Blue)'
                  required
                  className='w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all placeholder:text-gray-400 text-sm'
                />
                <input
                  type="text"
                  value={plate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                  placeholder='Vehicle Number Plate'
                  required
                  className='w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all placeholder:text-gray-400 text-sm'
                />
                <input
                  type="number"
                  value={capacity}
                  onChange={(e) => setVehicleCapacity(e.target.value)}
                  placeholder='Seating Capacity'
                  required
                  className='w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all placeholder:text-gray-400 text-sm'
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className='w-full py-3 px-4 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-soft hover:shadow-medium text-sm sm:text-base'
            >
              {loading ? 'Creating Account...' : 'Create Captain Account'}
            </button>
          </form>

          {/* Login Link */}
          <div className='mt-6 pt-6 border-t border-gray-200'>
            <p className='text-gray-600 text-center text-sm mb-3'>Already have an account?</p>
            <Link
              to="/captain/login"
              className='block w-full py-2.5 px-4 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition-all duration-200 text-center text-sm'
            >
              Sign In Instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaptainSignup
