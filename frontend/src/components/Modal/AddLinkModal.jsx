import { Link, Plus, X } from 'lucide-react'
import React from 'react'

const AddLinkModal = ({onClose}) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xs'>
        <div className='max-w-4xl mx-auto z-50'>
            <div className='w-125 bg-white px-5 py-3 rounded-lg border border-neutral-300'>
                <div className='flex items-center justify-between w-full'>
                    <h1 className='text-balance font-semibold text-[#0B3A66] tracking-tight'>Add new link</h1>
                    <button onClick={onClose} on className='p-1.5 rounded-lg bg-gray-100 hover:text-red-500 transition-colors cursor-pointer'><X size={18}/></button>
                </div>
                <div className='flex flex-col items-start justify-start gap-1 w-full mt-6 relative'>
                    <label className="text-sm text-[#0B3A66] font-medium">URL</label>
                    <Link size={16} className='absolute top-8 left-2.5 text-neutral-500'/>
                    <input type="text"  className='w-full px-8 py-1.5 outline-none text-sm border border-neutral-300 rounded-lg text-neutral-800'placeholder='Paste a URL - title fetched automatically'/>
                </div>
                <div className='flex flex-col items-start justify-start gap-1 w-full mt-6 '>
                    <label className="text-sm text-[#0B3A66] font-medium">Title</label>
                    <input type="text"  className='w-full px-3 py-1.5 outline-none text-sm border border-neutral-300 rounded-lg text-neutral-800'placeholder='Link Title'/>
                </div>
                <div className='flex flex-col items-start justify-start gap-1 w-full mt-6 '>
                    <label className="text-sm text-[#0B3A66] font-medium">Purpose / Note (optional)</label>
                    <textarea type="text"  className='w-full px-3 py-1.5 outline-none text-sm border border-neutral-300 rounded-lg text-neutral-800'placeholder='What is this link for? Why did you save it?'/>
                </div>
                <div className='flex flex-col items-start justify-start gap-1 w-full mt-6 '>
                    <label className="text-sm text-[#0B3A66] font-medium">Category</label>
                    <select className='w-full px-3 py-1.5 outline-none text-sm border border-neutral-300 rounded-lg' name="" id="">
                        <option className=''>Select a category</option>
                    </select>
                </div>
                <div className='flex items-end justify-end w-full my-5'>
                    <button className='bg-[#0B3A66] text-white flex items-center mt-4 px-3 py-1.5 text-sm gap-1 rounded-lg shadow hover:scale-102 transition-all duration-200 cursor-pointer'><Plus size={18} />Save Link</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddLinkModal