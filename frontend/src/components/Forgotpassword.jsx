import React, { useState } from 'react'
import { forgotPassword } from '../api/endpoint'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const Forgotpassword = () => {
  const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [emailSent, setEmailsent] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleVerify = async(e)=>{
        e.preventDefault()
        setLoading(true)
        try{
            const data = await forgotPassword(email)
            console.log(data)
            if (data.status === 'OK'){
              setEmailsent(true)
            }
        }catch(error){
            console.log(error.message)
            setLoading(false)
        }finally{
          setLoading(false)
        }
    }
  return (
    <div className='max-w-7xl mx-auto'>
  <div className='min-h-screen flex items-center justify-center'>
    <div className='w-100 bg-white rounded-lg shadow-sm px-5 py-5'>

      <h2 className='text-xl font-semibold text-gray-800'>Verify your email</h2>
      <p className='text-sm text-gray-500 mt-1 mb-4'>Enter your email address below and we'll send you a verification link.</p>

      <form onSubmit={handleVerify} className='flex flex-col gap-3'>
        <div className='flex flex-col items-start gap-2'>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
            Enter email
          </label>
          <input
            id='email'
            name='email'
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            placeholder='you@example.com'
            className='mt-1 block w-full rounded-lg outline-none shadow-sm px-3 border border-neutral-300 py-2 sm:text-sm'
          />
        </div>
        {emailSent && <h1 className='text-xs font-medium text-center text-green-600'>Email has sent to email <strong className='underline'>{email}</strong> address.</h1>}
        {loading ? (
          <button className='flex items-center justify-center bg-[#0E4A82] text-white px-3 py-2 rounded-lg shadow cursor-pointer text-sm font-medium gap-2'><Loader2 size={16} className='animate-spin'/>Verifing Email...</button>
        ) : (
          <button className='flex items-center justify-center bg-[#0B3A66] text-white px-3 py-2 rounded-lg shadow cursor-pointer text-sm font-medium hover:bg-[#0E4A82] transition-colors duration-200'>Verify Email</button>
        )}
      </form>

    </div>
  </div>
</div>
  )
}

export default Forgotpassword