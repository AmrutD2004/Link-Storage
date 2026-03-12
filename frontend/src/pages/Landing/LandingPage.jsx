import React from 'react'
import Navbar from '../../components/Navbar'
import Hero from './Hero'
import Feature from './Feature'
import Working from './Working'
import Footer from './Footer'

const LandingPage = () => {
  return (
    <div className='relative'>
      <Navbar />
      <div className='lg:h-[5vh]' />
      <div className='max-w-7xl mx-auto mt-16 sm:mt-20 lg:mt-30 flex flex-col space-y-7 px-4 sm:px-6 lg:px-0'>
        <Hero />
      </div>
      <div className='w-full bg-gray-100 border border-neutral-300 h-10 mt-5' />
      <div className='max-w-7xl mx-auto'>
        <Feature />
      </div>
      <div className='w-full bg-gray-100 border border-neutral-300 h-10 mt-5 my-10' />
      <div id='working' className='px-4 sm:px-6 lg:px-5'>
        <Working />
      </div>
      <div className='w-full bg-gray-100 border-t border-neutral-300 h-10 mt-10' />
      <Footer />
    </div>
  )
}

export default LandingPage