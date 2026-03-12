import { BookOpen, Palette, Play, Plus, Search, Toolbox } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const cat = ['All', 'Design', 'Dev', 'Reading', 'Tools']
  const items = [
    {
      title: 'Untitled UI — Free Figma design system',
      link: 'untitledui.com/resources/figma-ui-kit',
      icon: <Palette size={16} />,
      tags: ['design', 'figma'],
      iconBg: '#EEF2FF', iconColor: '#4338CA'
    },
    {
      title: 'Practical Typography — Matthew Butterick',
      link: 'practicaltypography.com',
      icon: <BookOpen size={16} />,
      tags: ['reading', 'type'],
      iconBg: '#FFF7ED', iconColor: '#C2410C'
    },
    {
      title: 'Coolors — Fast color scheme generator',
      link: 'coolors.co',
      icon: <Toolbox size={16} />,
      tags: ['tools', 'color'],
      iconBg: '#ECFDF5', iconColor: '#059669'
    },
  ]
  const tagStyles = {
    design: { bg: '#EEF2FF', text: '#4338CA' },
    figma: { bg: '#F3E8FF', text: '#7C3AED' },
    reading: { bg: '#FEF3C7', text: '#92400E' },
    type: { bg: '#FFF1F2', text: '#BE123C' },
    tools: { bg: '#ECFDF5', text: '#065F46' },
    color: { bg: '#FFF7ED', text: '#C2410C' },
  }
  const navigate = useNavigate()

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 w-full justify-between my-6 lg:my-10 gap-12 lg:gap-0'>

      {/* Left — Text */}
      <div className='flex flex-col items-start justify-start px-0 sm:px-5 py-2 gap-5 lg:gap-7'>
        <div className='flex items-center gap-3 px-3 py-2 rounded-full bg-[#EBF2F8] border border-[#E6EEF4]'>
          <p className='p-1 rounded-full bg-[#3B82A6]'></p>
          <p className='uppercase text-xs tracking-tight text-[#3B82A6] font-medium'>Free during early access</p>
        </div>
        <div className='flex flex-col items-start justify-start gap-3 w-full'>
          <p
            style={{ fontFamily: "'DM Sans'" }}
            className='text-4xl sm:text-5xl font-extrabold text-[#0B3A66] w-full max-w-sm lg:w-85'
          >
            Bookmarks with <span className='italic text-[#3B82A6]'>purpose.</span>
          </p>
        </div>
        <div className='w-full max-w-sm lg:w-94'>
          <p className='w-full text-base tracking-wide text-neutral-500 font-medium leading-relaxed'>
            Store links with context, tag them, and find them in seconds. One clean place to collect, search, and reuse everything that matters.
          </p>
        </div>
        <div className='flex flex-wrap items-center gap-2'>
          <button
            onClick={() => navigate('/login')}
            className='flex items-center gap-1 bg-[#0B3A66] px-4 sm:px-5 py-2.5 sm:py-3 text-sm text-white rounded-lg shadow-sm cursor-pointer'
          >
            <Plus size={18} />Save your first link
          </button>
          <a
            href='#working'
            className='flex items-center gap-1 px-4 sm:px-5 py-2.5 sm:py-3 text-sm rounded-lg shadow-sm border border-neutral-300 cursor-pointer text-[#0B3A66] hover:bg-[#EBF2F8] hover:text-[#3B82A6] transition-colors duration-200'
          >
            <Play size={18} />See how it works
          </a>
        </div>
      </div>

      {/* Right — Mockup */}
      <div className='flex items-center justify-center w-full relative pb-8 lg:pb-0'>
        <div className='w-full max-w-sm sm:max-w-md lg:w-125 drop-shadow-xl rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300'>

          {/* Browser Chrome */}
          <div className='bg-neutral-100 w-full border-b border-neutral-200'>
            <div className='px-4 py-3 flex items-center gap-4 w-full'>
              <div className='flex gap-1.5 items-center'>
                <span className='w-2.5 h-2.5 bg-red-400 rounded-full'></span>
                <span className='w-2.5 h-2.5 bg-yellow-400 rounded-full'></span>
                <span className='w-2.5 h-2.5 bg-green-400 rounded-full'></span>
              </div>
              <div className='w-full'>
                <span className='bg-white px-3 py-1.5 border border-neutral-200 w-full rounded-md text-xs text-neutral-400 flex items-center'>
                  curato.app/my-links
                </span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className='px-4 py-4 bg-white flex flex-col gap-4'>
            <div className='relative'>
              <Search size={13} className='text-neutral-400 absolute top-1/2 -translate-y-1/2 left-3' />
              <span className='flex items-center bg-neutral-50 text-xs text-neutral-500 pl-8 pr-3 py-2.5 rounded-lg border border-neutral-200 w-full'>
                design resources
              </span>
            </div>
            <div className='flex items-center gap-1.5 text-xs font-medium flex-wrap'>
              {cat.map((c, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 rounded-full leading-tight tracking-tight transition-colors ${c === 'All' ? 'bg-[#0F172A] text-white' : 'border border-neutral-200 text-neutral-500 bg-white'}`}
                >
                  {c}
                </span>
              ))}
            </div>
            <div className='flex flex-col gap-2.5'>
              {items.map((item, idx) => (
                <div key={idx} className='w-full border border-neutral-200 rounded-xl px-4 py-3 flex gap-3 items-start bg-[#FAFCFF] hover:shadow-md hover:-translate-y-px transition-all duration-150 cursor-pointer'>
                  <span className='p-2 rounded-lg flex items-center justify-center flex-shrink-0' style={{ background: item.iconBg, color: item.iconColor }}>
                    {item.icon}
                  </span>
                  <div className='flex flex-col gap-1 min-w-0'>
                    <h3 className='text-sm font-semibold text-neutral-800 leading-snug truncate'>{item.title}</h3>
                    <span className='text-xs text-neutral-400'>{item.link}</span>
                    <div className='flex gap-1.5 flex-wrap mt-0.5'>
                      {item.tags.map((tag) => (
                        <span key={tag} className='text-[11px] font-medium px-2 py-0.5 rounded-full' style={{ background: tagStyles[tag]?.bg, color: tagStyles[tag]?.text }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating badge */}
        <div className='absolute flex items-center gap-2 px-4 py-2 text-xs sm:text-sm drop-shadow-xl -bottom-3 left-2 sm:left-5 animate-bounce bg-white rounded-lg border border-neutral-300'>
          <span className='w-2 h-2 rounded-full bg-green-500'></span>
          <span className='text-neutral-500'>Link saved with preview</span>
        </div>
      </div>
    </div>
  )
}

export default Hero