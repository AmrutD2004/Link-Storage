import React, { useContext, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { AuthContext } from '../context/AuthContext'
import { Loader2, Save, TriangleAlert } from 'lucide-react'
import { deleteAccount, updateAvatar, updatePassword, updateUserInfo } from '../api/endpoint'
import toast from 'react-hot-toast'

const Profile = () => {

    const { userData, fetchData, isLoggedIn } = useContext(AuthContext)
    const basUrl = import.meta.env.VITE_BASE_URL
    const [loading, setLoading] = useState(false)
    const [updatePassloading, setUpdatePassLoading] = useState(false)
    const [formData, setFormData] = useState({
        username: userData?.username || '',
        email: userData?.email || '',
    })
    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handlePassword = (e) => {
        const { name, value } = e.target
        setPassword(prev => ({ ...prev, [name]: value }))
        setNotMatch(false)
    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        const data = new FormData()
        data.append('user_avatar', file)
        const res = await updateAvatar(data)
        try {
            if (res.success) {
                fetchData()
                toast.success('Avatar updated Successfully', {
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
                <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    ),
    duration: 3000,
})
            }

        } catch (error) {
            console.log(error?.res?.data)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const payload = {
                username: formData.username,
                email: formData.email
            }
            const data = await updateUserInfo(payload)
            if (data.success) {
                fetchData()
                toast.success('Info Updated Successfully', {
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
                <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    ),
    duration: 3000,
})
            }
        } catch (error) {
            console.log(error.message)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    const [notMatch, setNotMatch] = useState(false)

    const handlePasswordSubmit = async (e) => {
        e.preventDefault()
        try {
            setUpdatePassLoading(true)
            if (password.newPassword !== password.confirmPassword) {
                setNotMatch(true)
                setUpdatePassLoading(false)
                return
            }

            const payload = {
                oldPassword: password.oldPassword,
                newPassword: password.newPassword
            }
            const data = await updatePassword(payload)
            if (data.success) {
                toast.success('Password Updated Successfully', {
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
                <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    ),
    duration: 3000,
})
                setPassword({
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                })
            }
        } catch (error) {
            console.log(error.message)
            setUpdatePassLoading(false)
        } finally {
            setUpdatePassLoading(false)
        }
    }

    const handleDelete = async(e)=>{
        e.preventDefault()
        try{
            const data = await deleteAccount()
            if(data.success){
                toast.success('Account Deleted Permantely', {
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
                <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    ),
    duration: 3000,
})
                window.location.reload
            }
        }catch(error){
            console.log(error.message)
        }
    }

    if (!userData) return null

    return (
        <Layout>
            <div className='max-w-7xl mx-auto flex flex-col space-y-8'>

                <div className='flex flex-col gap-1 px-5 py-3'>
                    <h1 className='text-2xl font-bold text-[#0B3A66] tracking-tight'>Settings</h1>
                    <p className='text-xs text-neutral-500'>Manage your account and preferences</p>
                </div>

                <div className='w-full max-w-xl border border-neutral-300 rounded-lg shadow-sm bg-white overflow-hidden'>

                    <div className='px-7 py-4 bg-gray-100'>
                        <h1 className='font-semibold text-neutral-800'>Account information</h1>
                        <span className='text-xs text-neutral-500'>Update your profile details</span>
                    </div>

                    <div className='border-t border-neutral-300 bg-white'>
                        <div className='mx-7 my-3 bg-gray-100 rounded-lg'>
                            <div className='flex flex-col lg:flex-row gap-3 px-5 py-3 items-center'>

                                <div className="w-16 h-16 rounded-full overflow-hidden">
                                    <img
                                        src={userData?.avatar ? `${basUrl}${userData.avatar}` : "/user.png"}
                                        alt="user"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className='leading-tight flex flex-col gap-1 py-3'>
                                    <div className='text-center lg:text-start'>
                                        <h1 className='font-medium text-sm'>{userData?.username}</h1>
                                        <span className='text-xs text-neutral-500'>{userData?.email}</span>
                                    </div>
                                    <label className='bg-white flex items-center lg:w-30 justify-center px-3 py-1 text-xs font-medium rounded-lg hover:bg-[#EBF5FF] transition-colors duration-200 cursor-pointer border border-neutral-300 hover:border-[#C8DDEF] hover:text-[#0B3A66]'><input type="file" className="hidden" name='user_avatar' onChange={handleImageChange} />Change Avatar</label>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className='flex flex-col items-start px-5 py-3 bg-white gap-2'>
                        <div className='flex flex-col items-start w-full gap-2'>
                            <label className='text-sm font-medium'>Username</label>
                            <input type="text" className='w-full border border-neutral-300 rounded-lg outline-none text-xs lg:text-sm px-3 py-1 text-neutral-800' name='username' onChange={handleChange} value={formData.username} />
                        </div>
                        <div className='flex flex-col items-start w-full gap-2'>
                            <label className='text-sm font-medium'>Email</label>
                            <input type="text" className='w-full border border-neutral-300 rounded-lg outline-none text-xs lg:text-sm px-3 py-1 text-neutral-800' name='email' onChange={handleChange} value={formData.email} />
                        </div>
                        <div className='w-full flex items-center justify-end mt-3'>
                            {loading ? (
                                <button className='px-3 py-2 font-medium rounded-lg shadow text-xs text-white bg-[#0E4A82] flex items-center gap-1'><Loader2 className='animate-spin' size={16} />Saving Changes...</button>
                            ) : (
                                <button onClick={handleSubmit} className='px-3 py-2 font-medium rounded-lg shadow text-xs text-white bg-[#0B3A66] flex items-center gap-1 hover:bg-[#0E4A82] cursor-pointer transition-colors duration-200'><Save size={16} />Save Changes</button>
                            )}
                        </div>
                    </div>

                </div>

                <div className='w-full max-w-xl border border-neutral-300 rounded-lg shadow-sm bg-white overflow-hidden'>

                    <div className='px-7 py-4 bg-gray-100'>
                        <h1 className='font-semibold text-neutral-800'>Security</h1>
                        <span className='text-xs text-neutral-500'>Manage your password</span>
                    </div>
                    <div className='flex flex-col items-start px-5 py-3 bg-white gap-2'>
                        <div className='flex flex-col items-start w-full gap-2'>
                            <label className='text-sm font-medium'>Current Password</label>
                            <input type="password" className='w-full border border-neutral-300 rounded-lg outline-none text-xs lg:text-sm px-3 py-1 text-neutral-800' name='oldPassword' onChange={handlePassword} value={password.oldPassword} placeholder='Current password' />
                        </div>
                        <div className='flex flex-col items-start w-full gap-2'>
                            <label className='text-sm font-medium'>New Password</label>
                            <input type="password" className={`w-full border ${notMatch ? 'border-red-500' : 'border-neutral-300'}  rounded-lg outline-none text-xs lg:text-sm px-3 py-1 text-neutral-800`} name='newPassword' onChange={handlePassword} value={password.newPassword} placeholder='New password' />
                        </div>
                        <div className='flex flex-col items-start w-full gap-2 relative'>
                            <label className='text-sm font-medium'>Confirm Password</label>
                            <input type="password" className={`w-full border ${notMatch ? 'border-red-500' : 'border-neutral-300'}  rounded-lg outline-none text-xs lg:text-sm px-3 py-1 text-neutral-800`} name='confirmPassword' onChange={handlePassword} value={password.confirmPassword} placeholder='Confirm password' />
                            {notMatch && <span className='text-xs text-red-500 absolute -bottom-5'>New password and confirm password do not match.</span>}
                        </div>
                        <div className='w-full flex items-center justify-end mt-3'>
                            {updatePassloading ? (
                                <button className='px-3 py-2 font-medium rounded-lg shadow text-xs text-white bg-[#0E4A82] flex items-center gap-1'><Loader2 className='animate-spin' size={16} />Updating password...</button>
                            ) : (
                                <button onClick={handlePasswordSubmit} className='px-3 py-2 font-medium rounded-lg shadow text-xs text-white bg-[#0B3A66] flex items-center gap-1 hover:bg-[#0E4A82] cursor-pointer transition-colors duration-200'><Save size={16} />Update Password</button>
                            )}
                        </div>
                    </div>

                </div>
                <div className='w-full max-w-xl border border-neutral-300 rounded-lg shadow-sm bg-white overflow-hidden'>

                    <div className='px-7 py-4 bg-red-100'>
                        <h1 className='font-semibold text-red-500 flex items-center gap-1'><TriangleAlert size={16}/>Danger Zone</h1>
                    </div>

                    <div className='border-t border-red-300 bg-red-100'>
                        <div className='px-7 py-3 bg-red-100 rounded-lg flex flex-col lg:flex-row gap-3 items-center justify-between'>
                            <div className='flex flex-col items-start justify-start gap-1'>
                                <h1 className='text-red-800 text-sm font-medium'>Delete your account</h1>
                            <span className='text-xs text-red-500 tracking-tight'>Permanently delete your account and all saved links. This action cannot be undone</span>
                            </div>
                            <button onClick={handleDelete} className='w-full lg:w-30 text-red-500 font-medium hover:bg-red-200 cursor-pointer transition-colors duration-200 px-3 py-1 text-xs border border-red-300 rounded-lg '>Delete account</button>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default Profile