import React from 'react'

const Hero = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 w-full justify-between'>
            <div className='flex flex-col items-start justify-start px-5 py-2 gap-7'>
                <div className='flex items-center gap-3 px-3 py-2 rounded-full bg-[#EBF2F8] border border-[#E6EEF4] '>
                    <p className='p-1 rounded-full bg-[#3B82A6]'></p>
                    <p className='uppercase text-xs tracking-tight text-[#3B82A6] font-medium'>Free during early access</p>
                </div>
                <div className='flex flex-col items-start justify-start gap-3 w-full'>
                    <p className='text-5xl w-90 font-bold text-[#0B3A66]'>Bookmarks with <span className='italic text-[#3B82A6]'>purpose.</span></p>
                </div>
            </div>
        </div>
    )
}

export default Hero