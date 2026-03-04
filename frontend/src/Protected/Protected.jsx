import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const Protected = ({children}) => {
    const {isLoggedIn, loading} = useContext(AuthContext)

    if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0B3A66]"></div>
        <span className="ml-2 text-sm text-neutral-500">Verifying session...</span>
      </div>
    );
  }
  
    if(!isLoggedIn){
      return <Navigate to={'/login'} replace/>
    }
    return children
}

export default Protected