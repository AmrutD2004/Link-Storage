import axios from 'axios'

const api = axios.create({
    baseURL : 'http://127.0.0.1:8000/',
    withCredentials : true
})

export const userRegister = async(payload)=>{
    const respose = await api.post('api/register/', payload, {
        headers : {
            'Content-Type' : "application/json"
        }
    })
    return respose.data
}

export const login = async(payload)=>{
    const respose = await api.post('api/login/', payload)
    return respose.data
}

export const is_auth = async()=>{
    const respose = await api.get('api/is-auth/')
    return respose.data
}

export const logout = async()=>{
    const respose = await api.post('api/logout/')
    return respose.data
}