import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getCategories, getlinks } from "../api/endpoint";

export const CategoryContext = createContext()

export const CategoryContextProvider = (props)=>{

    const {isLoggedIn} = useContext(AuthContext)
    const [categories, setCategories] = useState([])
    const [links, setLinks] = useState([])
    const fetchCategories = async()=>{
        const data = await getCategories()
        if(data.success){
            setCategories(data.data)
        }
    }

    const fetchLinks = async()=>{
        const data = await getlinks()
        if(data.success){
            setLinks(data.data)
            console.log(data)
        }
    }

    useEffect(()=>{
        if(isLoggedIn){
            fetchCategories()
            fetchLinks()
        }
    }, [isLoggedIn])
    const value = {
        categories, fetchCategories, links, fetchLinks
    }
    return (
        <CategoryContext.Provider value={value}>
            {props.children}
        </CategoryContext.Provider>
    )
}

