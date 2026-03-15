import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import { deleteLink, getlinkDetails } from '../api/endpoint'
import { Pencil, ShipWheel, SquareArrowOutUpRight, Trash2, Tag, Calendar, FolderOpen, Share, Share2 } from 'lucide-react'
import dayjs from 'dayjs'
import toast from 'react-hot-toast'
import ShareModal from '../components/Modal/ShareModal'
import { CategoryContext } from '../context/CategoryContext'
import EditLinkModal from '../components/Modal/EditLinkModal'


const LinkDetails = () => {
    const { id } = useParams()
    const { fetchLinks } = useContext(CategoryContext)
    const [linkDetails, setLinkDetails] = useState(null)
    const [open, setOpen] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const fetchLinkDetails = async (id) => {
        const data = await getlinkDetails(id)
        if (data.success) setLinkDetails(data.data)
    }

    useEffect(() => { fetchLinkDetails(id) }, [id])

    const handleDelete = async (id, actual_link) => {
        if (window.confirm(`Are you sure you want to delete "${actual_link.replace(/^https?:\/\//, '')}"?`)) {
            setLoading(true)
            const data = await deleteLink(id)
            if (data.success) {
                toast.success(`${actual_link.replace(/^https?:\/\//, '')}" deleted`, {
                    style: {
                        background: '#ECFDF5', color: '#065F46',
                        border: '1px solid #A7F3D0', borderRadius: '12px',
                        fontSize: '14px', fontWeight: '500',
                        padding: '10px 16px',
                        boxShadow: '0 4px 16px rgba(16,185,129,0.12)',
                    },
                })
                setLoading(false)

                setTimeout(() => {
                    fetchLinks()
                    navigate('/dashboard')
                }, 1000)
            }
        }
    }

    if (!linkDetails) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="flex items-center gap-2 text-neutral-400 text-sm">
                        <ShipWheel size={16} className="animate-spin" />
                        <span>Loading link details...</span>
                    </div>
                </div>
            </Layout>
        )
    }

    const link = linkDetails?.actual_link

    return (
        <>
            <Layout>
                <div className='max-w-3xl mx-auto py-10'>

                    {/* Breadcrumb */}
                    <div className='flex items-center gap-2 text-xs text-neutral-400 mb-8'>
                        <Link to='/dashboard' className='hover:text-[#0B3A66] transition-colors'>Dashboard</Link>
                        <span>/</span>
                        <span className='text-neutral-600 font-medium truncate max-w-[250px]'>
                            {linkDetails.link_title}
                        </span>
                    </div>

                    {/* Main Card */}
                    <div className='bg-white border border-[#E6EEF4] rounded-2xl shadow-sm overflow-hidden'>

                        {/* Card Header */}
                        <div className='px-5 lg:px-7 pt-5 lg:pt-7 pb-4 lg:pb-5 border-b border-[#F3F4F6]'>
                            <div className='flex flex-col lg:flex-row lg:items-start justify-between gap-4'>

                                {/* Title + URL */}
                                <div className='flex items-start gap-4 flex-1 min-w-0'>
                                    {/* Favicon placeholder */}
                                    <div className='hidden w-11 h-11 rounded-xl bg-[#EBF5FF] border border-[#BFDBFE] lg:flex items-center justify-center flex-shrink-0 text-lg'>
                                        🔗
                                    </div>
                                    <div className='flex flex-col gap-1 min-w-0'>
                                        <h1 className='text-lg font-semibold text-neutral-800 leading-snug'>
                                            {linkDetails.link_title}
                                        </h1>
                                        <Link
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            to={linkDetails.actual_link}
                                            className='flex items-center gap-1 text-[#3B82A6] hover:text-[#0B3A66] text-xs w-fit transition-colors'
                                        >
                                            <SquareArrowOutUpRight size={11} className='shrink-0' />
                                            <span className='truncate max-w-[280px]'>
                                                {linkDetails.actual_link.replace(/^https?:\/\//, '')}
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                {/* Action Buttons - Scrollable on mobile */}
                                <div className='flex flex-col lg:flex-row lg:items-center gap-2 shrink-0 relative '>
                                    <Link
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        to={linkDetails.actual_link}
                                        className='flex items-center justify-center gap-1.5 text-xs font-medium text-[#3B82A6] hover:text-[#0B3A66] bg-[#EBF5FF] hover:bg-[#D6EDF9] border border-[#BFDBFE] px-3 py-1.5 rounded-lg transition-all duration-150 whitespace-nowrap flex-shrink-0 '
                                    >
                                        <SquareArrowOutUpRight size={11} />
                                        Open link
                                    </Link>
                                    <button onClick={() => setOpenEditModal(true)} className='flex items-center justify-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-[#0B3A66] hover:bg-[#EAF2FB] border border-[#E6EEF4] px-3 py-1.5 rounded-lg transition-all duration-150 whitespace-nowrap flex-shrink-0'>
                                        <Pencil size={11} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(linkDetails.id, linkDetails.actual_link)}
                                        disabled={loading}
                                        className='flex items-center justify-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-lg transition-all duration-150 disabled:opacity-50 whitespace-nowrap flex-shrink-0'
                                    >
                                        <Trash2 size={11} />
                                        {loading ? 'Deleting...' : 'Delete'}
                                    </button>
                                    <button onClick={() => setOpen(true)} className='flex items-center justify-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-[#0B3A66] hover:bg-[#EAF2FB] border border-[#E6EEF4] px-3 py-1.5 rounded-lg transition-all duration-150 whitespace-nowrap flex-shrink-0'><Share2 size={18} />Share</button>
                                </div>
                            </div>
                        </div>

                        {/* Card Body */}
                        <div className='px-5 lg:px-7 py-5 lg:py-6 flex flex-col gap-5 lg:gap-6'>

                            {/* Purpose */}
                            {linkDetails.link_purpose && (
                                <div className='flex flex-col gap-1.5'>
                                    <span className='text-[11px] font-700 uppercase tracking-widest text-neutral-400'>
                                        Purpose
                                    </span>
                                    <p className='text-sm text-neutral-600 leading-relaxed'>
                                        {linkDetails.link_purpose}
                                    </p>
                                </div>
                            )}

                            {/* Divider */}
                            <div className='h-px bg-[#F3F4F6]' />

                            {/* Meta grid - Stack on mobile */}
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>

                                {/* Tags */}
                                <div className='bg-[#F8FBFF] rounded-xl p-4 border border-[#E6EEF4]'>
                                    <div className='flex items-center gap-1.5 mb-3'>
                                        <Tag size={12} className='text-[#3B82A6]' />
                                        <span className='text-[11px] font-700 uppercase tracking-widest text-neutral-400'>Tags</span>
                                    </div>
                                    <div className='flex flex-wrap gap-1.5'>
                                        {linkDetails.link_tags?.length > 0
                                            ? linkDetails.link_tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className='px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EBF5FF] text-[#3B82A6] border border-[#BFDBFE]'
                                                >
                                                    {tag}
                                                </span>
                                            ))
                                            : <span className='text-xs text-neutral-300'>No tags added</span>
                                        }
                                    </div>
                                </div>

                                {/* Category + Date */}
                                <div className='flex flex-col gap-3'>
                                    {linkDetails.category && (
                                        <div className='bg-[#F8FBFF] rounded-xl p-4 border border-[#E6EEF4]'>
                                            <div className='flex items-center gap-1.5 mb-1'>
                                                <FolderOpen size={12} className='text-[#3B82A6]' />
                                                <span className='text-[11px] font-700 uppercase tracking-widest text-neutral-400'>Category</span>
                                            </div>
                                            <span className='text-sm font-medium text-neutral-700'>{linkDetails.category_name}</span>
                                        </div>
                                    )}
                                    <div className='bg-[#F8FBFF] rounded-xl p-4 border border-[#E6EEF4]'>
                                        <div className='flex items-center gap-1.5 mb-1'>
                                            <Calendar size={12} className='text-[#3B82A6]' />
                                            <span className='text-[11px] font-700 uppercase tracking-widest text-neutral-400'>Saved on</span>
                                        </div>
                                        <span className='text-sm font-medium text-neutral-700'>
                                            {dayjs(linkDetails.created_at).format('DD MMMM YYYY')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
            {open && (<ShareModal onClose={() => setOpen(false)} link={link} />)}
            {openEditModal && (<EditLinkModal onClose={() => setOpenEditModal(false)} link={linkDetails} linkId={linkDetails.id} />)}
        </>
    )
}

export default LinkDetails