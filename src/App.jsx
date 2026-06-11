import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Start from './pages/Start'
import UserSignUp from './pages/UserSignUp'
import UserLogin from './pages/UserLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import CaptainLogin from './pages/CaptainLogin'
import Home from './pages/Home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogOut from './pages/UserLogOut'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import Ridding from './pages/Ridding'
import CaptainRiding from './pages/CaptainRiding'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start/>} />
        <Route path="/user/signup" element={<UserSignUp />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/captain/login" element={<CaptainLogin />} />
        <Route path="/captain/signup" element={<CaptainSignUp />} />
        <Route path='/home' element={
          <UserProtectedWrapper>
            <Home/>
          </UserProtectedWrapper>
        }/>
        <Route path='/user/logout' element={
          <UserProtectedWrapper>
            <UserLogOut/>
          </UserProtectedWrapper>
        }/>

        <Route path='/captain/home' element={
          <CaptainProtectedWrapper>
            <CaptainHome/>
          </CaptainProtectedWrapper>
        }/>  
      
      <Route path='/riding' element={<Ridding/>}/>
      <Route path='/captain-riding' element={<CaptainRiding/>}/>
      </Routes>
    </div>
  )
}

export default App
