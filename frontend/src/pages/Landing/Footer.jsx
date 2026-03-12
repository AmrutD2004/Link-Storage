import React from 'react'
import { Bookmark, Twitter, Github, ArrowUpRight } from 'lucide-react'

const Footer = () => {
  const links = {
    Product: ['Features', 'Changelog', 'Roadmap', 'Pricing'],
    Resources: ['Documentation', 'Blog', 'Guides', 'API'],
    Company: ['About', 'Privacy', 'Terms', 'Contact'],
  }

  return (
    <footer className=' border-t border-neutral-200 bg-neutral-50 px-10 overflow-hidden'>

      {/* Subtle background grid */}

      <div className='relative z-10 max-w-7xl mx-auto'>

        {/* Top section */}
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-12 py-14 border-b border-neutral-200'>

          {/* Brand col */}
          <div className='lg:col-span-2 flex flex-col gap-4'>
            <div className='flex items-center gap-2'>
              <div className='p-1.5 rounded-lg bg-[#0B3A66]'>
                <Bookmark size={15} strokeWidth={2} className='text-white' />
              </div>
              <span className='text-[#0B3A66] font-bold text-lg tracking-tight'>Curato</span>
            </div>
            <p className='text-sm text-neutral-500 leading-relaxed max-w-xs font-light'>
              One clean place to collect, tag, and find every link that matters — without the noise.
            </p>
            <div className='flex items-center gap-2 mt-2'>
              {[Twitter, Github].map((Icon, i) => (
                <a
                  key={i}
                  href='#'
                  className='w-8 h-8 rounded-lg border border-neutral-200 bg-white flex items-center justify-center text-neutral-400 hover:text-[#0B3A66] hover:border-[#0B3A66] transition-colors duration-150'
                >
                  <Icon size={14} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section} className='flex flex-col gap-4'>
              <p className='text-xs font-semibold text-neutral-800 uppercase tracking-widest'>{section}</p>
              <ul className='flex flex-col gap-2.5'>
                {items.map((item) => (
                  <li key={item}>
                    <a href='#' className='text-sm text-neutral-500 hover:text-[#0B3A66] transition-colors duration-150 flex items-center gap-0.5 group'>
                      {item}
                      <ArrowUpRight size={11} className='opacity-0 group-hover:opacity-100 transition-opacity duration-150 -mt-0.5' />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className='flex flex-col sm:flex-row items-center justify-between py-5 gap-3'>
          <p className='text-xs text-neutral-400'>© {new Date().getFullYear()} Curato. All rights reserved.</p>
          <div className='flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#EBF2F8] border border-[#D6E8F4]'>
            <span className='w-1.5 h-1.5 rounded-full bg-[#3B82A6] animate-pulse' />
            <span className='text-xs text-[#3B82A6] font-medium tracking-tight'>Free during early access</span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer