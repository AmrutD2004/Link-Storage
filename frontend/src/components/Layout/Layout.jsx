import React from 'react'
import Sidebar from '../Sidebar'
import InappNavbar from '../InappNavbar'

const Layout = ({ children }) => {
    return (
        <div className='flex h-screen overflow-hidden'>
            <div>
                <Sidebar />
            </div>
            <div className='flex flex-col flex-1 overflow-hidden'>
                <InappNavbar />
                <main className="flex-1 overflow-y-auto px-6 py-4 bg-gray-100">
                    {children}
                </main>
            </div>

        </div>
    )
}

export default Layout