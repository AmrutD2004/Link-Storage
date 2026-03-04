import { createContext, useCallback, useEffect, useState } from "react";
import { is_auth } from "../api/endpoint";


export const AuthContext = createContext()

export const AuthContextProvider = (props) => {

    const [userData, setUserData] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            const data = await is_auth()

            if (data.success) {
                setUserData(data)
                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false)
            }

        } catch {
            setIsLoggedIn(false)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const value = {
        userData, fetchData, isLoggedIn, setIsLoggedIn, loading
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}