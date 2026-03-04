import { Plus, Trash } from 'lucide-react'
import Layout from '../components/Layout/Layout'
import React, { useContext, useState } from 'react'
import AddCategory from '../components/Modal/AddCategory'
import { CategoryContext } from '../context/CategoryContext'
import { deleteCategory } from '../api/endpoint'
import toast from 'react-hot-toast'

const Categories = () => {
    const [openModal, setOpenmodal] = useState(false)
    const { categories, fetchCategories } = useContext(CategoryContext)
    const handleDelete = async (id, category) => {
        if (window.confirm(`Are you really want to delete category ${category}`)) {
            try {
                const data = await deleteCategory(id)
                if (data.success) {
                    toast.success('Category Deleted', {
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
                    fetchCategories()
                }
            }catch(error){
                console.log(error.message)
            }
        }
    }

    if (categories.length === 0) {
        return (
            <>
                <Layout>
                    <div className='max-w-7xl mx-auto'>
                        <div className='min-h-screen flex flex-col items-center justify-center gap-4'>
                            <h1 className='text-neutral-500 text-sm text-center max-w-md'>
                                You haven’t created any categories yet. Add one to start organizing your links.
                            </h1>

                            <button
                                onClick={() => setOpenmodal(true)}
                                className='px-4 py-2 text-sm bg-[#0B3A66] text-white font-medium rounded-lg shadow-sm cursor-pointer hover:scale-102 transition-all duration-200 flex items-center gap-2'
                            >
                                <Plus size={18} />
                                Create Category
                            </button>
                        </div>
                    </div>
                </Layout>

                {openModal && (
                    <AddCategory onClose={() => setOpenmodal(false)} />
                )}
            </>
        )
    }
    return (
        <>
            <Layout>
                <div className='max-w-7xl mx-auto'>
                    <div className='flex items-center justify-between me-2 w-full'>
                        <div className='flex flex-col items-start justify-start w-full gap-1 leading-tight px-5 py-3'>
                            <h1 className='text-2xl font-bold text-[#0B3A66] tracking-tight'>Categories</h1>
                            <p className='text-sm text-neutral-500'>{categories.length} categories</p>
                        </div>
                        <div className='w-full flex justify-end'>
                            <button onClick={() => setOpenmodal(true)} className='px-3 py-2 text-sm  bg-[#0B3A66] text-white font-medium rounded-lg shadow-sm cursor-pointer hover:scale-102 transition-all duration-200 flex items-center gap-1'><Plus size={18} />New Category</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {categories.map(cat => (
                            <div key={cat.id}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
                                {/* Color bar top */}
                                <div className="h-2 w-full" style={{ background: cat.category_color }} />
                                <div className="p-4">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="w-3 h-3 rounded-full flex-shrink-0"
                                            style={{ background: cat.color }} />
                                        <span className="text-sm font-semibold text-gray-800 text-start w-full">{cat.link_category}</span>
                                        <button onClick={() => handleDelete(cat.id, cat.link_category)} className='p-2 rounded-lg hover:bg-gray-100 cursor-pointer hover:text-red-500 transition-colors duration-200'><Trash size={14} /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Layout>
            {openModal && (<AddCategory onClose={() => setOpenmodal(false)} />)}
        </>
    )
}

export default Categories