import { Link, Loader2, Plus, X, XIcon } from 'lucide-react'
import React, { useContext, useState, useEffect } from 'react'
import { CategoryContext } from '../../context/CategoryContext'
import { createLink, fetchURLTitle } from '../../api/endpoint'
import toast from 'react-hot-toast'

const AddLinkModal = ({ onClose, defaultURL }) => {

    const [tags, setTags] = useState([])
    const [loading, setLoading] = useState(false)
    const { fetchCategories, categories, links, fetchLinks } = useContext(CategoryContext)
    const [noTitle, setNoTitle] = useState(false)

    const [linkTitle, setLinkTitle] = useState('')
    const [formData, setFormData] = useState({
        category: '',
        purpose: ''
    })
    const [url, setUrl] = useState(defaultURL || '')
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleURlChange = async (e) => {
        const value = e.target.value
        setUrl(value)
        if (value.startsWith('http://') || value.startsWith('https://')) {
            try {
                const data = await fetchURLTitle(value)
                if (data.success) {
                    console.log(data)
                    if (data.title == null) {
                        setNoTitle(true)
                    } else {
                        setLinkTitle(data.title)
                    }

                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handlekeydown = (e) => {

        if (e.key !== 'Enter') return
        e.preventDefault();
        const value = e.target.value
        if (!value.trim()) return
        setTags([...tags, value])
        e.target.value = ''
    }

    const removeTags = (id) => {
        setTags(tags.filter((el, i) => i !== id))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const payload = {
                actual_link: url,
                link_title: linkTitle,
                link_purpose: formData.purpose || null,
                link_tags: tags,
                category: formData.category,
            }
            const data = await createLink(payload)
            if (data.success) {
                toast.success('Link Added Successfully', {
                    style: {
                        backgroundColor: '#ECFDF5',
                        color: '#065F46',
                        fontSize: '14px',
                        fontWeight: '500',
                        padding: '10px 16px',
                        boxShadow: '0 4px 16px rgba(16,185,129,0.12)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    },
                    icon: (
                        <div style={{
                            backgroundColor: '#059669',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    ),
                    duration: 3000,
                })
                setFormData({
                    purpose: '',
                    category: ''
                })
                setTags([])
                setLinkTitle('')
                setUrl('')
                setTimeout(() => {
                    fetchLinks()
                    onClose()
                }, 2000)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (defaultURL) {
            handleURlChange({ target: { value: defaultURL } })
        }
    }, [])
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xs'>
            <div className='max-w-4xl mx-auto z-50'>
                <form onSubmit={handleSubmit} className='w-125 bg-white px-5 py-3 rounded-lg border border-neutral-300'>
                    <div className='flex items-center justify-between w-full'>
                        <h1 className='text-balance font-semibold text-[#0B3A66] tracking-tight'>Add new link</h1>
                        <button onClick={onClose} className='p-1.5 rounded-lg bg-gray-100 hover:text-red-500 transition-colors cursor-pointer'><X size={18} /></button>
                    </div>
                    <div className='flex flex-col items-start justify-start gap-1 w-full mt-6 relative'>
                        <label className="text-sm text-[#0B3A66] font-medium">URL</label>
                        <Link size={16} className='absolute top-8 left-2.5 text-neutral-500' />
                        <input value={url} onChange={handleURlChange} type="text" className='w-full px-8 py-1.5 outline-none text-sm border border-neutral-300 rounded-lg text-neutral-800' placeholder='Paste a URL - title fetched automatically' />
                    </div>
                    <div className='flex flex-col items-start justify-start gap-1 w-full mt-6 relative'>
                        <label className="text-sm text-[#0B3A66] font-medium">Title</label>
                        <input value={linkTitle} onChange={(e) => { setLinkTitle(e.target.value), setNoTitle(false) }} type="text" className='w-full px-3 py-1.5 outline-none text-sm border border-neutral-300 rounded-lg text-neutral-800' placeholder='Link Title' />
                        {noTitle && <span className='absolute -bottom-5 left-2 text-xs text-red-500'>No title found</span>}
                    </div>
                    <div className='flex flex-col items-start justify-start gap-1 w-full mt-6 '>
                        <label className="text-sm text-[#0B3A66] font-medium">Purpose / Note (optional)</label>
                        <textarea name='purpose' onChange={handleChange} value={formData.purpose} type="text" className='w-full px-3 py-1.5 outline-none text-sm border border-neutral-300 rounded-lg text-neutral-800' placeholder='What is this link for? Why did you save it?' />
                    </div>
                    <div className='flex flex-col items-start justify-start gap-1 w-full mt-6 '>
                        <label className="text-sm text-[#0B3A66] font-medium">Tags</label>
                        <div className='w-full flex flex-wrap items-center outline-none text-sm border border-neutral-300 rounded-lg text-neutral-800'>
                            {tags.map((tag, index) => (
                                <span key={index} className='m-2 px-3 py-1 bg-[#EBF2F8] border border-[#E6EEF4] rounded-full flex items-center gap-1'>{tag}<button onClick={() => removeTags(index)}><XIcon size={12} /></button></span>
                            ))}
                            <input
                                type="text"
                                onKeyDown={handlekeydown}
                                className='flex-1 min-w-[120px] px-3 py-1.5 outline-[#0B3A66] text-sm rounded-lg text-neutral-800'
                                placeholder='Add tag, press Enter...'
                            />
                        </div>
                    </div>
                    <div className='flex flex-col items-start justify-start gap-1 w-full mt-6 '>
                        <label className="text-sm text-[#0B3A66] font-medium">Category</label>
                        <select onChange={handleChange} className='w-full px-3 py-1.5 outline-none text-sm border border-neutral-300 rounded-lg' name="category" value={formData.category} >
                            <option className=''>Select a category</option>
                            {categories.map((cat) => (
                                <option value={cat.id}>{cat.link_category}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex items-end justify-end w-full my-5'>
                        {loading ? (
                            <button className='bg-[#0B3A66] text-white flex items-center mt-4 px-3 py-1.5 text-sm gap-1 rounded-lg shadow hover:scale-102 transition-all duration-200 cursor-pointer'><Loader2 className='animate-spin' size={18} />Saving Link...</button>
                        ) : (
                            <button className='bg-[#0B3A66] text-white flex items-center mt-4 px-3 py-1.5 text-sm gap-1 rounded-lg shadow hover:scale-102 transition-all duration-200 cursor-pointer'><Plus size={18} />Save Link</button>
                        )}

                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddLinkModal