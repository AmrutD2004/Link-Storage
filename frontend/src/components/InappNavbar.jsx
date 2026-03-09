import { Search, Bell, ChevronDown, ChevronUp } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/endpoint";
import toast from "react-hot-toast";

const InappNavbar = () => {
  const navigate = useNavigate()
  const [toggleMenu, setToggelMenu] = useState(false)
  const basUrl = import.meta.env.VITE_BASE_URL
  const { userData, fetchData, isLoggedIn, setIsLoggedIn } = useContext(AuthContext)

  useEffect(()=>{
    fetchData()
  }, [isLoggedIn])

  const handleLogout = async () => {
    const data = await logout()
    if (data.success) {
      toast.success('Logout Successfull', {
        style: {
          backgroundColor: '#ECFDF5',
          color: '#065F46',
          border: '1px solid #A7F3D0',
          fontSize: '14px',
          fontWeight: '500',
          padding: '10px',
          boxShadow: '0 4px 16px rgba(16,185,129,0.12)',
        },
      })
      setIsLoggedIn(false)
      setTimeout(()=>{
        navigate('/login')
      }, 2000)
    }
  }
  return (
    <nav className="sticky top-0 h-16 border-b border-neutral-200 bg-white/70 backdrop-blur-md flex items-center px-6">
      <div className="flex items-center justify-between mx-4 w-full">
        <div className="relative w-80">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />

          <input
            type="text"
            placeholder="Search the links"
            className="w-full pl-9 pr-3 py-2 text-sm border border-neutral-300 rounded-lg outline-none focus:ring-2 focus:ring-[#0B3A66]/20 focus:border-[#0B3A66] transition-all"
          />
        </div>
        <div className='flex items-center justify-center gap-5 text-[#272323]'>

          <button className="relative cursor-pointer">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
          </button>

          <div className='flex items-center justify-start gap-3 rounded-full'>
            {userData.avatar ? (
              <img className="w-12 h-12 rounded-full object-cover" src={`${basUrl}${userData.avatar}`}/>
            ) : (
              <span className='bg-[#EBF5FF] px-4 py-2 text-base text-[#0B3A66] uppercase' style={{
              clipPath: "circle(50% at 50% 50%)"
            }}>{userData?.username?.[0]}</span>
            )}
            
            <div className='relative flex items-center'>
              <button onClick={() => setToggelMenu(!toggleMenu)} className='flex items-start justify-start leading-tight gap-1 px-2 py-2 hover:bg-[#EBF5FF]  transition-all duration-300 cursor-pointer rounded-lg'>
                <span className='text-sm font-medium mt-1'>{userData?.username}</span>
                {toggleMenu ? <ChevronUp size={18} className='mt-1' /> : <ChevronDown size={18} className='mt-1' />}


              </button>
              {toggleMenu && (
                <div className='flex items-center justify-center absolute top-12 bg-white shadow-md border border-neutral-300 rounded-lg right-3 w-30'>
                  <div className='flex flex-col items-center text-center w-full space-y-1'>
                    <span className='border-b border-neutral-300 w-full px-3 py-2 text-base tracking-tight font-medium'>My accout</span>
                    <button className='text-sm tracking-tight hover:bg-red-100 w-full py-1.5'>Verify</button>


                    <Link to={'/profile'} className='text-sm tracking-tight hover:bg-red-100 w-full py-1.5'>Profile</Link>
                    <button onClick={handleLogout} className='py-3 border-t w-full border-neutral-300 text-red-500 cursor-pointer hover:bg-red-50 transition-colors duration-300'>Logout</button>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default InappNavbar;