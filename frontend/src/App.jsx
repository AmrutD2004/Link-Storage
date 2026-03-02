import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import LandingPage from './pages/Landing/LandingPage'
import SignUp from './pages/SignUp'
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login'
import Categories from './pages/Categories'
import AllLinks from './pages/AllLinks'
import Protected from './Protected/Protected'

const App = () => {
  return (
    <Router>
      <Toaster position="top-right"
      />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Protected><Dashboard /></Protected>} />
        <Route path='/categories' element={<Protected><Categories /></Protected>} />
        <Route path='/links' element={<Protected><AllLinks /></Protected>} />
      </Routes>
    </Router>
  )
}

export default App