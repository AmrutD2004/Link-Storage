import React from 'react'
import Navbar from '../../components/Navbar'
import Hero from './Hero'

const LandingPage = () => {
  return (
    <>
    <Navbar />
    <div className='lg:h-[5vh]'></div>
    <div className='max-w-7xl mx-auto mt-30'>
        <Hero />
    </div>
    </>
  )

}

export default LandingPage