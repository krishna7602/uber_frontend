import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
      <div className='h-screen bg-cover bg-center bg-[url(https://plus.unsplash.com/premium_photo-1731842686156-74895c29a87b?q=80&w=2355&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] flex justify-between flex-col w-full bg-red-400'>
        <img className="w-20 py-8 pl-9 " src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <div className='bg-slate-100 py-5 px-10 rounded-lg'>
            <h2 className='text-2xl pb-7 flex justify-center font-bold'>Get Started with Uber</h2>
            <Link to="/user/login" className='flex items-center justify-center  w-full bg-black text-white py-3 rounded-xl mt-2'>Continue</Link>
        </div>

      </div>
    </div>
  )
}

export default Start
