import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { resetPassword } from "../api/endpoint";
import toast from "react-hot-toast";
import { Eye, EyeClosed, Loader, Loader2 } from "lucide-react";

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const [seePassword, setSeepassword] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const payload = {
                token: token,
                password, password
            }
            const data = await resetPassword(payload)
            if (data.status === 'Ok') {
                toast.success('Password reset Successfully', {
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
                setPassword('')
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
            }

        } catch (error) {
            const message =
                error.data?.token?.[0] ||
                error.data?.password?.[0] ||
                "Something went wrong";

            toast.error(message);
            setLoading(false)
        } finally {
            setLoading(false)
        }

    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex min-h-screen items-center justify-center gap-4">
                <form onSubmit={handleSubmit} className="bg-white flex flex-col gap-2 px-5 py-10 shadow-sm rounded-lg w-100 ">
                    <h1 className="text-xl font-semibold tracking-tight leading-tight text-neutral-800">Reset Your Password</h1>
                    <div className="flex flex-col items-start gap-1 mt-4  py-3">
                        <label className="text-sm font-medium">Enter New Password</label>
                        <div className="relative w-full">
                            <button type="button" onClick={() => setSeepassword(!seePassword)} className="absolute right-2 top-2">
                                {seePassword ? (<EyeClosed size={16} className="text-neutral-500" />) : (<Eye size={16} className="text-neutral-500" />)}
                            </button>
                            <input
                                type={`${seePassword ? 'text' : 'password'}`}
                                placeholder="Enter new password"
                                className="text-sm w-full border border-neutral-300 px-3 py-1 rounded-lg outline-none w-full"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {loading ? (
                        <button className='flex items-center justify-center bg-[#0E4A82] text-white px-3 py-2 rounded-lg shadow cursor-pointer text-sm font-medium gap-2'><Loader2 size={16} className='animate-spin' />Reseting Password...</button>
                    ) : (
                        <button className='flex items-center justify-center bg-[#0B3A66] text-white px-3 py-2 rounded-lg shadow cursor-pointer text-sm font-medium hover:bg-[#0E4A82] transition-colors duration-200'>Reset Password</button>
                    )}
                </form>
            </div>
        </div>
    );
}


export default ResetPassword