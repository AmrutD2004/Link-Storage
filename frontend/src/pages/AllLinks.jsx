import React from 'react'
import Layout from '../components/Layout/Layout'

const AllLinks = () => {
  return (
     <Layout>
            <div className='max-w-7xl mx-auto'>
                <div className='flex items-center justify-between me-2 w-full'>
                    <div className='flex flex-col items-start justify-start w-full gap-1 leading-tight px-5 py-3'>
                        <h1 className='text-2xl font-bold text-[#0B3A66] tracking-tight'>All Links</h1>
                    </div>
                </div>
            </div>
        </Layout>
  )
}

export default AllLinks