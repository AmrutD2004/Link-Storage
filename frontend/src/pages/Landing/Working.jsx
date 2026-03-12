import React from 'react'
import { Link2, Tag, Search } from "lucide-react"

const Working = () => {
  const steps = [
    {
      icon: Link2,
      step: "1",
      title: "Paste any link",
      description: "Title and preview are fetched automatically",
    },
    {
      icon: Tag,
      step: "2",
      title: "Add a tag or two",
      description: "Organize by topic, project, or context",
    },
    {
      icon: Search,
      step: "3",
      title: "Find it instantly",
      description: "Search by title, URL, tag, or note in milliseconds",
    },
  ]

  return (
    <div className='bg-[#EBF2F8] rounded-lg flex flex-col items-center justify-center py-10 px-4 sm:px-8'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <h1 className='text-[#3B82A6]'><strong>How it works</strong></h1>
        <h1
          className='text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter text-[#0B3A66] leading-tight text-center w-full max-w-sm lg:w-100'
          style={{ fontFamily: "'DM Sans'" }}
        >
          From chaos to clarity in three steps.
        </h1>
        <p className='w-full max-w-md lg:w-125 text-center text-neutral-500'>
          Save links from anywhere, organize with tags, and find anything instantly. It's that simple.
        </p>
      </div>

      <img
        width={900}
        src='./Hero.png'
        className='mt-10 shadow rounded-lg mask-b-from-50% w-full max-w-3xl'
      />

      <div className='flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 justify-center mt-10 lg:mt-15 w-full max-w-3xl'>
        {steps.map((item, index) => {
          const Icon = item.icon
          return (
            <div key={index} className="flex items-start gap-4 flex-1">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 flex-shrink-0">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Step {item.step}</p>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Working