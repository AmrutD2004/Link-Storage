import { createContext, useCallback, useEffect, useState } from "react";
import { is_auth } from "../api/endpoint";


export const AuthContext = createContext()

export const AuthContextProvider = (props)=>{

    const [userData, setUserData] = useState(null)
    const [isLoggedIn, setIsLoggenIn] = useState(false)

    const fetchData = useCallback(async()=>{
        const data = await is_auth()
        setIsLoggenIn(true)
        setUserData(data)
    }, [])

    const value = {
        userData, fetchData, isLoggedIn, setIsLoggenIn
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}