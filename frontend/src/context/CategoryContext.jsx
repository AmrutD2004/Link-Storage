import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getCategories } from "../api/endpoint";

export const CategoryContext = createContext()

export const CategoryContextProvider = (props)=>{

    const {isLoggedIn} = useContext(AuthContext)
    const [categories, setCategories] = useState([])
    const fetchCategories = async()=>{
        const data = await getCategories()
        if(data.success){
            setCategories(data.data)
            console.log(data)
        }
    }

    useEffect(()=>{
        if(isLoggedIn){
            fetchCategories()
        }
    }, [isLoggedIn])
    const value = {
        categories, fetchCategories
    }
    return (
        <CategoryContext.Provider value={value}>
            {props.children}
        </CategoryContext.Provider>
    )
}

