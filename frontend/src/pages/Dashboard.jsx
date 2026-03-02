import React, { useContext, useState } from 'react'
import Layout from '../components/Layout/Layout'
import dayjs from 'dayjs'
import { Plus } from 'lucide-react'
import AddLinkModal from '../components/Modal/AddLinkModal'
import { AuthContext } from '../context/AuthContext'

const Dashboard = () => {
    const [openModal, setOpenmodal] = useState(false)
    const today = new Date().toLocaleDateString('en-IN', {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
    })

    const {userData} = useContext(AuthContext)
    
    return (
        <>
        <Layout>
            <div className='max-w-7xl mx-auto'>
                <div className='flex items-center justify-between me-2 w-full'>
                    <div className='flex flex-col items-start justify-start w-full gap-1 leading-tight px-5 py-3'>
                        <h1 className='text-2xl font-bold text-[#0B3A66] tracking-tight'>Dashboard</h1>
                        <p className='text-sm text-neutral-500'>{today}</p>
                    </div>
                    <button onClick={()=> setOpenmodal(true)} className='px-3 py-2 text-sm w-32 bg-[#0B3A66] text-white font-medium rounded-lg shadow-sm cursor-pointer hover:scale-102 transition-all duration-200 flex items-center gap-1'><Plus size={18} />Add Link</button>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 px-7 py-3'>
                    <div className='flex flex-col items-start justify-start rounded-lg bg-white shadow-sm'>
                        <div className='px-5 py-6 flex flex-col gap-1'>
                            <h1 className='text-xs uppercase text-neutral-500 '>Total links</h1>
                            <span className='text-3xl text-[#0B3A66]'>241</span>
                        </div>
                        
                    </div>
                    <div className='flex flex-col items-start justify-start rounded-lg bg-white shadow-sm'>
                        <div className='px-5 py-6 flex flex-col gap-1'>
                            <h1 className='text-xs uppercase text-neutral-500 '>Categories</h1>
                            <span className='text-3xl text-[#0B3A66]'>241</span>
                        </div>
                        
                    </div>
                    <div className='flex flex-col items-start justify-start rounded-lg  bg-white shadow-sm'>
                        <div className='px-5 py-6 flex flex-col gap-1'>
                            <h1 className='text-xs uppercase text-neutral-500 '>Tags</h1>
                            <span className='text-3xl text-[#0B3A66]'>241</span>
                        </div>
                        
                    </div>
                    <div className='flex flex-col items-start justify-start rounded-lg  bg-white shadow-sm'>
                        <div className='px-5 py-6 flex flex-col gap-1'>
                            <h1 className='text-xs uppercase text-neutral-500 '>Shared</h1>
                            <span className='text-3xl text-[#0B3A66]'>241</span>
                        </div>
                        
                    </div>
                </div>
            </div>
        </Layout>
        {openModal && (<AddLinkModal onClose={()=> setOpenmodal(false)}/>)}
        </>
    )
}

export default Dashboard