import { Share, X, Copy } from 'lucide-react';
import React from 'react'
import toast from 'react-hot-toast';
import {
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  MailruShareButton,
  TelegramShareButton,
  ThreadsShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  TwitterIcon,
} from "react-share";

const ShareModal = ({onClose, link}) => {

    const shareUrl = link

    const handleCopy = async (e)=>{
        try{
            await navigator.clipboard.writeText(shareUrl)
            toast.success('Link Copied', {
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
        }catch(error){
            console.log(error.message)
        }
    }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xs z-50'>
    <div className='max-w-md mx-auto w-[95%] lg:w-auto max-h-[90vh] lg:max-h-none'>
        <div className='bg-white w-full border border-neutral-300 rounded-lg relative overflow-hidden'>
            <button onClick={onClose} className='w-full flex justify-end p-4 cursor-pointer absolute z-10'><X size={18} className='hover:text-red-500 transition-colors duration-200'/> </button>
            <div className='flex items-start justify-start gap-3 bg-[#EBF2F8] px-5 py-2 pt-12 lg:pt-2'>
                <span className='p-3 bg-[#EBF2F8] border border-[#E6EEF4] rounded-lg text-[#0B3A66] flex-shrink-0'><Share size={18}/></span>
                <div className='flex flex-col items-start justify-center my-auto gap-1'>
                    <h1 className='text-sm font-medium text-[#0B3A66] tracking-tight'>Share this link</h1>
                    <span className='text-xs text-neutral-500'>Share with your network or copy the URL</span>
                </div>
            </div>
            <hr className='text-neutral-300 mt-3'/>
            <div className='flex flex-wrap items-center justify-center gap-3 w-full px-5 py-3 overflow-x-auto scrollbar-hide'>
                <FacebookShareButton url={shareUrl}>
                    <span className='flex items-center justify-center gap-1 bg-blue-100 px-3 py-1 rounded-lg border border-blue-300 text-sm text-blue-500 font-medium whitespace-nowrap flex-shrink-0'><FacebookIcon size={20} round={true}/>Facebook</span>
                </FacebookShareButton>
                <WhatsappShareButton url={shareUrl}>
                    <span className='flex items-center justify-center gap-1 bg-green-100 px-3 py-1 rounded-lg border border-green-300 text-sm text-green-500 font-medium whitespace-nowrap flex-shrink-0'><WhatsappIcon size={20} round={true}/>WhatsApp</span>
                </WhatsappShareButton>
                <TwitterShareButton url={shareUrl}>
                    <span className='flex items-center justify-center gap-1 bg-blue-200 px-3 py-1 rounded-lg border border-blue-400 text-sm text-blue-700 font-medium whitespace-nowrap flex-shrink-0'><TwitterIcon size={20} round={true}/>Twitter</span>
                </TwitterShareButton>
            </div> 
            <div className='my-5 mx-4 px-5 py-3 bg-gray-100 border border-neutral-300 rounded-lg flex items-center justify-between gap-3'>
                <span className='text-xs text-neutral-500 truncate flex-1'>{link}</span>
                <button onClick={handleCopy} className='px-3 py-1 text-xs bg-[#0B3A66] text-white rounded-md hover:bg-[#0E4A82] transition-colors duration-200 flex items-center gap-1 font-medium cursor-pointer flex-shrink-0'><Copy size={14}/>Copy</button>
            </div>
        </div>
    </div>
</div>
  )
}

export default ShareModal