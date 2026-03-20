import dayjs from 'dayjs'
import { ArrowLeft, ArrowRight, EllipsisVertical, Pencil, Search, SquareArrowOutUpRight, Trash2 } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { deleteLink } from '../api/endpoint'
import toast from 'react-hot-toast'

const Links = ({ links, fetchLinks, categories }) => {
  const [menu, setMenu] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchedLinks, setSearchedLink] = useState([])
  const [category, setCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(0)

  const handleDelete = async (id, link_title) => {
    if (window.confirm(`Are you really want to delete ${link_title}?`)) {
      setLoading(true)
      const data = await deleteLink(id)
      if (data.success) {
        toast.success(`Link ${link_title} Deleted`, {
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
        setLoading(false)
        fetchLinks()
      }
    }
  }

  useEffect(() => {
    setSearchedLink(links)
  }, [links])

  const handleSearch = (keywords) => {
    if (!keywords) {
      setSearchedLink(links)
    } else {
      setSearchedLink(links.filter((f) => f.link_title.toLowerCase().includes(keywords.toLowerCase()) || f.link_tags.some(tag => tag.toLowerCase().includes(keywords))))
    }
  }

  const handleCategorySearched = (category) => {
    if (!category) {
      setSearchedLink(links)
      return
    } else {
      setSearchedLink(links.filter((f) => f.category_name === category))
    }
  }

  //Pagination
  const PAGE_SIZE = 6
  const totalLink = searchedLinks.length
  const noOfPages = Math.ceil(totalLink / PAGE_SIZE)
  const start = currentPage * PAGE_SIZE
  const end = start + PAGE_SIZE

  const handlePage = (n) => {
    setCurrentPage(n)
  }
  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const goToPrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const visibleNumber = [...Array(noOfPages).keys()].slice(Math.max(0, currentPage - 1), Math.min(noOfPages, currentPage + 2))

  if(links.length === 0){
    return (
      <div className='max-w-7xl mx-auto'>
        <div className='flex min-h-screen items-center justify-center'>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0B3A66]"></div>
        <span className="ml-2 text-sm text-neutral-500">Please wait...</span>
        </div>
      </div>
    )
  }
  return (
    <div className='w-full lg:px-7 py-3'>
      <div className='flex flex-col lg:flex-row items-center justify-start gap-2'>
        <div className='w-full relative z-0'>
          <span className='absolute top-2 ps-2 text-neutral-500'><Search size={16} /></span>
          <input type="text" onChange={(e) => handleSearch(e.target.value)} className='border w-full border-neutral-300 px-8 py-2 text-xs rounded-lg outline-none bg-white text-neutral-800 ' placeholder='Filter Links by Link Title, tags or Category' />
        </div>
        <div className='w-full flex items-center justify-start gap-2'>
          <select onChange={(e) => { handleCategorySearched(e.target.value), setCategory(e.target.value) }} className='border border-neutral-300 px-8 py-2 text-xs rounded-lg outline-none bg-white text-neutral-800 w-full lg:w-54'>
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.link_category}>{cat.link_category}</option>
            ))}
          </select>
        </div>
      </div>
      {searchedLinks.length === 0 && (
        <div className='flex items-center justify-center mt-30'>
          <h1 className='text-neutral-500 text-sm text-center'>

            {/* No links in database */}
            {links.length === 0 ? (
              <span>
                You haven't added any links yet. Click <strong>Add Link</strong> to save your first link.
              </span>
            ) : (
              <span>
                No links found
                {category && <span className='font-medium'> in "{category}"</span>}.
              </span>
            )}

          </h1>
        </div>
      )}
      <div className='grid grid-cols-1 lg:grid-cols-3 py-4 gap-4 '>
        {searchedLinks.slice(start, end).map((link) => (
          <div
            key={link.id}
            className='group w-full bg-white rounded-2xl border border-[#E6EEF4] shadow-sm hover:shadow-md hover:border-[#C8DDEF] hover:scale-102 transition-all duration-300 flex flex-col  overflow-hidden cursor-pointer z-0'
          >
            {/* Top section */}
            <div className='flex items-start justify-between px-5 pt-5 pb-3 gap-3'>
              <div className='flex flex-col gap-1.5 flex-1 min-w-0'>

                {/* Title */}
                <h2 className='text-sm font-semibold text-[#0B3A66] leading-snug line-clamp-2 group-hover:text-[#0B3A66] transition-colors duration-200'>
                  {link.link_title}
                </h2>

                {/* URL */}
                <Link
                  target='_blank'
                  rel='noopener noreferrer'
                  to={link.actual_link}
                  onClick={(e) => e.stopPropagation()}
                  className='flex items-center gap-1 text-[#3B82A6] hover:text-[#0B3A66] text-xs w-fit transition-colors duration-150'
                >
                  <SquareArrowOutUpRight size={11} className='flex-shrink-0' />
                  <span className='truncate max-w-[220px]'>
                    {link.actual_link.replace(/^https?:\/\//, '')}
                  </span>
                </Link>
              </div>

              {/* 3-dot menu */}
              <div className='relative flex-shrink-0'>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setMenu(menu === link.id ? null : link.id)
                  }}
                  className='text-neutral-300 hover:text-neutral-500 hover:bg-[#EAF2FB] rounded-lg p-1.5 transition-all duration-150 cursor-pointer'
                >
                  <EllipsisVertical size={15} />
                </button>

                {/* Dropdown */}
                {menu === link.id && (
                  <div className='absolute right-0 top-8 z-50 flex flex-col bg-white border border-[#E6EEF4] rounded-xl shadow-lg overflow-hidden min-w-[130px]'>
                    <Link to={`/link/${link.id}`}
                      className='flex items-center gap-2 px-4 py-2.5 text-xs font-500 text-neutral-700 hover:bg-[#EAF2FB] hover:text-[#0B3A66] transition-colors duration-150'
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Pencil size={13} />
                      Edit link
                    </Link>
                    <button
                      className='flex items-center gap-2 px-4 py-2.5 text-xs font-500 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 w-full text-left'
                      onClick={() => handleDelete(link.id, link.link_title)}
                    >
                      <Trash2 size={13} />
                      {loading ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className='mx-5 h-px bg-[#F3F4F6]' />

            {/* Bottom section */}
            <div className='px-5 pt-3 pb-5 flex flex-col gap-3'>

              {/* Purpose */}
              {link.link_purpose && (
                <p className='text-xs text-neutral-400 leading-relaxed line-clamp-2'>
                  {link.link_purpose}
                </p>
              )}

              {/* Tags + Date */}
              <div className='flex items-center justify-between gap-2 mt-auto'>
                <div className='flex flex-wrap gap-1.5'>
                  {link.link_tags.map((tag) => (
                    <span
                      key={tag}
                      className='px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EBF5FF] text-[#3B82A6] border border-[#BFDBFE] leading-tight'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className='text-[11px] text-neutral-300 flex-shrink-0'>
                  {dayjs(link.created_at).format('DD MMM')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex items-center justify-center px-2 mt-10">
        <button disabled={currentPage === 0} onClick={() => goToPrevPage()} className={`border px-2 py-1 rounded-lg border-neutral-300 text-neutral-600 me-2  text-xs flex items-center gap-1 ${currentPage === 0 ? 'cursor-not-allowed' : 'cursor-pointer hover:text-neutral-700 hover:font-medium hover:border-black transition-all duration-300 hover:bg-gray-200'}`}><ArrowLeft size={16} />Prev</button>
        {visibleNumber.map((n) =>
        (
          <button onClick={() => handlePage(n)} className={`px-3 py-1.5 border text-sm border-neutral-300 text-neutral-500 hover:text-neutral-700 hover:font-medium hover:border-black transition-all duration-300 cursor-pointer hover:bg-gray-200 ${currentPage === n && 'bg-[#0B3A66] font-medium text-white scale-105'}`} key={n}>{n + 1}</button>
        ))}
        <button disabled={currentPage === noOfPages - 1} onClick={() => goToNextPage()} className={`border px-2 py-1 rounded-lg border-neutral-300 text-neutral-600 ms-2   text-xs flex items-center gap-1 ${currentPage === noOfPages - 1 ? 'cursor-not-allowed' : 'cursor-pointer hover:font-medium hover:border-black transition-all duration-300  hover:bg-gray-200 hover:text-neutral-700'}`}>Next<ArrowRight size={16} /></button>
      </div>

    </div>
  )
}

export default Links