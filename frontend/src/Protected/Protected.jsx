import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const Protected = ({children}) => {
    const {isLoggedIn} = useContext(AuthContext)

    if(!isLoggedIn){
      return <Navigate to={'/login'} replace/>
    }
    return children
}

export default Protected