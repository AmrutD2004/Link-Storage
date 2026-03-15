import { User, Lock, Mail, Eye, EyeClosed, Loader2, TriangleAlert } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { login } from '../api/endpoint'
import toast from 'react-hot-toast'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Login = () => {
    const navigate = useNavigate()
    const { setIsLoggedIn } = useContext(AuthContext)
    const [seePass, setSeepass] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormdata] = useState({
        username: '',
        password: ''

    })
    const [searchParams] = useSearchParams()

    const addLink = searchParams.get("addLink")
    const url = searchParams.get("url")

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormdata(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.password && !formData.username) {
            toast("Please fill all fields!", {
                icon: <TriangleAlert size={18} />,
                style: {
                    border: "1px solid #95958C",
                    padding: "8px",
                    backgroundColor: "#D4D4D0",
                    color: "#686860",
                },
            });
            return
        }
        if (!formData.username) {
            toast("Please fill username fields!", {
                icon: <TriangleAlert size={18} />,
                style: {
                    border: "1px solid #95958C",
                    padding: "8px",
                    backgroundColor: "#D4D4D0",
                    color: "#686860",
                },
            });
            return
        }
        if (!formData.password) {
            toast("Please fill password fields!", {
                icon: <TriangleAlert size={18} />,
                style: {
                    border: "1px solid #95958C",
                    padding: "8px",
                    backgroundColor: "#D4D4D0",
                    color: "#686860",
                },
            });
            return
        }
        setLoading(true)
        try {
            const payload = {
                username: formData.username,
                password: formData.password
            }
            const data = await login(payload)
            if (data.success) {
                toast.success('User Login Successfully', {
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
                setFormdata({
                    username: '',
                    password: ''

                })
                setIsLoggedIn(true)
                setTimeout(() => {
                    if (addLink && url) {
                        navigate(`/dashboard?openModal=true&url=${encodeURIComponent(url)}`)
                    } else {
                        navigate('/dashboard')
                    }
                }, 2000)
            }
            else {
                toast.error('Something went wrong')
            }
        } catch (error) {
            toast.error('Something went wrong')
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='max-w-7xl mx-auto'>
            <div className='flex items-center justify-center min-h-screen'>
                <div className='w-110 px-5 py-6 shadow-xl rounded-lg mx-3 lg:mx-0'>
                    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-between h-full'>
                        <div className='flex items-center justify-center w-full my-4 '>
                            <h1 className='text-2xl font-semibold text-[#0B3A66]'>Curato</h1>
                        </div>
                        <div className='flex flex-col items-start justify-start gap-3 w-full px-5 py-3'>
                            <div className='flex flex-col items-center justify-start gap-2 w-full relative'>
                                <label className="text-sm font-medium text-start w-full text-[#0B3A66]">Username</label>
                                <User size={16} className='absolute top-9 left-3 text-neutral-300' />
                                <input onChange={handleChange} className='w-full border border-neutral-300 rounded-lg px-10 py-1.5 text-sm placeholder:text-neutral-400 outline-none' type="text" name='username' value={formData.username} placeholder='Enter username' />
                            </div>
                            <div className='flex flex-col items-center justify-start gap-1 w-full relative'>
                                <label className="text-sm font-medium text-start w-full text-[#0B3A66]">Password</label>
                                <Lock size={16} className='absolute top-9 left-3 text-neutral-300' />
                                {!seePass ? (
                                    <button type='button' onClick={() => setSeepass(!seePass)}><Eye size={16} className='absolute top-10 right-3 text-neutral-300' /></button>
                                ) : (
                                    <button type='button' onClick={() => setSeepass(!seePass)}><EyeClosed size={16} className='absolute top-10 right-3 text-neutral-300' /></button>
                                )}
                                <input onChange={handleChange} className='w-full border border-neutral-300 rounded-lg px-10 py-1.5 text-sm placeholder:text-neutral-400 outline-none' type={`${!seePass ? 'password' : 'text'}`} name='password' value={formData.password} placeholder='password' />
                            </div>
                        </div>
                        <div className='flex items-center justify-center w-full px-5 py-3'>
                            {loading ? <button className='w-full text-white font-medium tracking-tight text-sm flex items-center justify-center gap-1 py-3 rounded-lg cursor-pointer bg-[#0E4A82] '><Loader2 size={18} className='animate-spin' />Signing In...</button>
                                :
                                <button className='w-full text-white font-medium tracking-tight text-sm bg-[#0B3A66] py-3 rounded-lg shadow cursor-pointer hover:bg-[#0E4A82] transition-colors duration-200'>Sign In</button>
                            }
                        </div>
                    </form>
                    <h1 className='text-sm font-medium text-center'>Dont't have account? <Link to={'/signup'} className='text-[#0B3A66] font-semibold underline'>Sign Up</Link></h1>
                </div>
            </div>
        </div>
    )
}

export default Login