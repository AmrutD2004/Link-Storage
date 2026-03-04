import React, { useContext, useState } from 'react'
import { Link, Loader2, Plus, X, XIcon } from 'lucide-react'
import { createCategory } from '../../api/endpoint';
import toast from 'react-hot-toast';
import { CategoryContext } from '../../context/CategoryContext';


const AddCategory = ({ onClose }) => {
    const colors = [
        "#EBF5FF",
        "#ECFDF5",
        "#FFF7EB",
        "#F5F3FF",
        "#FFF1F2",
        "#F0FAFA",
        "#F3F4F6",
        "#FDF2F8"
    ];
    const [colorCode, setColorCode] = useState('')
    const [category, setCategory] = useState('')
    const [loading, setLoading] = useState(false)
    const{fetchCategories} = useContext(CategoryContext)

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            setLoading(true)
            const payload = {
                link_category : category,
                category_color : colorCode
            }
            const data = await createCategory(payload)
            if(data.success){
                toast.success('Category Created', {
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

                setTimeout(()=>{
                    onClose()
                    fetchCategories()
                }, 1000)
            }

        }catch(error){
            
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xs'>
            <div className='max-w-4xl mx-auto z-50'>
                <form onSubmit={handleSubmit} className='w-125 bg-white px-5 py-3 rounded-lg border border-neutral-300'>
                    <div className='flex items-center justify-between w-full'>
                        <h1 className='text-balance font-semibold text-[#0B3A66] tracking-tight'>New category</h1>
                        <button onClick={onClose} on className='p-1.5 rounded-lg bg-gray-100 hover:text-red-500 transition-colors cursor-pointer'><X size={18} /></button>
                    </div>
                    <div className='flex flex-col items-start justify-start gap-1 w-full mt-6'>
                        <label className="text-sm text-[#0B3A66] font-medium">Category name</label>
                        <input onChange={(e) => setCategory(e.target.value)} type="text" className='w-full px-3 py-1.5 outline-none text-sm border border-neutral-300 rounded-lg text-neutral-800' placeholder='e.g. Design Resources' value={category}/>
                    </div>
                    <div className='flex flex-col items-start justify-start gap-1 w-full mt-6 '>
                        <label className="text-sm text-[#0B3A66] font-medium">Color</label>
                        <div className='flex w-full gap-3'>
                            {colors.map((code, idx) => (
                                <div onClick={() => setColorCode(code)}
                                    key={idx}
                                    className={`w-8 h-8 rounded-lg cursor-pointer flex items-center justify-center 
        ${colorCode === code ? "border-2 border-[#0B3A66]" : "border border-transparent"}`}
                                    style={{ backgroundColor: code }}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='flex items-end justify-end w-full my-5'>
                        {loading ? (
                            <button className='bg-[#0B3A66] text-white flex items-center mt-4 px-3 py-1.5 text-sm gap-1 rounded-lg shadow hover:scale-102 transition-all duration-200 cursor-pointer '><Loader2 className='animate-spin' size={18} />Adding Category...</button>
                        ) : (
                            <button className='bg-[#0B3A66] text-white flex items-center mt-4 px-3 py-1.5 text-sm gap-1 rounded-lg shadow hover:scale-102 transition-all duration-200 cursor-pointer'><Plus size={18} />Add Category</button>
                        )}
                        
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCategory