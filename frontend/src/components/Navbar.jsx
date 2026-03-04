import { Menu } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()

    const [menu, setMenu] = useState(false)
  return (
    
    <div className='w-full fixed top-0 border border-[#E6EEF4]'>
        <div className='max-w-7xl mx-auto px-3 py-4'>
            <div className='flex items-center justify-between w-full'>
                <Link className='text-[#0B3A66] text-2xl font-medium tracking-tight'>Curato</Link>
                <div className='hidden lg:flex lg:items-center lg:justify-end lg:gap-3'>
                    <button onClick={()=> navigate('/login')} className='px-3 py-2 text-balance font-medium text-[#0B3A66] tracking-tighter rounded-sm cursor-pointer hover:shadow-xs shadow-[#fffff9] transition-all duration-300 border border-[#E6EEF4] text-sm'>
                        Log In
                    </button>
                    <button onClick={()=> navigate('/signup')} className='px-3 py-2 bg-[#0B3A66] text-sm font-medium text-white tracking-tighter rounded-sm cursor-pointer hover:shadow-md shadow-[#0B3A66] transition-all duration-300 hover:scale-102 hover:bg-[#194670]'>
                         Get started free
                    </button>
                </div>
                <button onClick={()=> setMenu(!menu)} className='p-2 rounded-sm bg-[#fffff9] lg:hidden'>
                    <Menu size={18}/>
                </button>      
            </div>
            {menu && (
                <div className='w-full flex flex-col items-center justify-center gap-3 fixed top-15 bg-[#232a41] mx-4 px-5 -left-4 right-0 py-5'>
                    <button className='px-3 py-1 text-balance font-medium text-[#fffff9] tracking-tighter rounded-sm cursor-pointer hover:shadow-xs shadow-[#fffff9] transition-all duration-300 w-full '>
                        Log In
                    </button>
                    <button className='px-3 py-1 bg-[#0B3A66] text-balance font-medium tracking-tighter rounded-sm cursor-pointer hover:shadow-xs shadow-[#fffff9] transition-all duration-300 hover:scale-102 w-full '>
                        Get started free
                    </button>
                </div>
            )} 
        </div>
    </div>
  )
}

export default Navbar