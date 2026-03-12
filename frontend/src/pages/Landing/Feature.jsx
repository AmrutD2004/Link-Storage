import React from 'react'
import { Zap, Tags, Lock, Package } from "lucide-react"

const Feature = () => {
  const features = [
    {
      icon: <Zap size={16} />,
      title: "Auto-fetch on paste",
      description: "Paste any URL and we instantly pull the title, favicon, and a preview. No manual entry, ever.",
    },
    {
      icon: <Tags size={16} />,
      title: "Tags & fast search",
      description: "Add tags, group by category, and search across everything in milliseconds — even across thousands of links.",
    },
    {
      icon: <Lock size={16} />,
      title: "Private by default",
      description: "Your links stay yours. Share a collection with a public URL only when you decide to, on your terms.",
    },
    {
      icon: <Package size={16} />,
      title: "Export & import",
      description: "Bring in your existing bookmarks from any browser. Export everything as Netscape HTML or JSON anytime.",
    },
  ]

  return (
    <div className='mt-10 w-full'>
      <div className='flex flex-col items-start justify-start gap-2 px-4 sm:px-5 py-3'>
        <h1 className='uppercase text-sm text-[#3B82A6] font-medium'>Features</h1>
        <h1
          className='text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter text-[#0B3A66] leading-tight w-full max-w-lg lg:w-150'
          style={{ fontFamily: "'DM Sans'" }}
        >
          Everything you need, nothing you don't.
        </h1>
        <p className='w-full max-w-md lg:w-140 text-neutral-500 tracking-tight'>
          LinkVault keeps your bookmarks organized without getting in the way. Paste a link, and it does the rest.
        </p>
      </div>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-4 sm:px-5 py-3 mt-6 lg:mt-10'>
        {features.map((item, idx) => (
          <div
            key={idx}
            className='border border-neutral-300 px-5 py-7 flex flex-col items-start justify-start gap-3 rounded-lg shadow hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer'
          >
            <span className='bg-gray-100 p-2 shadow rounded-lg'>{item.icon}</span>
            <h1 className='text-lg tracking-tight text-[#0B3A66] font-medium'>{item.title}</h1>
            <p className='text-sm text-neutral-500'>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Feature