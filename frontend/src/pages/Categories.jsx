import Layout from '../components/Layout/Layout'
import React from 'react'

const Categories = () => {
    return (
        <Layout>
            <div className='max-w-7xl mx-auto'>
                <div className='flex items-center justify-between me-2 w-full'>
                    <div className='flex flex-col items-start justify-start w-full gap-1 leading-tight px-5 py-3'>
                        <h1 className='text-2xl font-bold text-[#0B3A66] tracking-tight'>Categories</h1>
                        <p className='text-sm text-neutral-500'>3 categories</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Categories