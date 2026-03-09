import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8080/',
    withCredentials: true
})

export const userRegister = async (payload) => {
    const respose = await api.post('api/register/', payload, {
        headers: {
            'Content-Type': "application/json"
        }
    })
    return respose.data
}

export const login = async (payload) => {
    const respose = await api.post('api/login/', payload)
    return respose.data
}

export const is_auth = async () => {
    const respose = await api.get('api/is-auth/')
    return respose.data
}

export const logout = async () => {
    const respose = await api.post('api/logout/')
    return respose.data
}

export const createCategory = async (payload) => {
    const respose = await api.post('api/create-category/', payload)
    return respose.data
}

export const getCategories = async () => {
    const respose = await api.get('api/get-category/')
    return respose.data
}

export const deleteCategory = async (id) => {
    const respose = await api.delete(`api/delete-category/${id}/`)
    return respose.data
}

export const fetchURLTitle = async (url) => {
    const respose = await api.post('api/fetch-link-title/', { url })
    return respose.data
}

export const createLink = async (payload) => {
    const respose = await api.post('api/create-link/', payload)
    return respose.data
}

export const getlinks = async () => {
    const respose = await api.get('api/get-links/')
    return respose.data
}
export const deleteLink = async (id) => {
    const respose = await api.delete(`api/delete-link/${id}/`)
    return respose.data
}

export const getlinkDetails = async (id) => {
    const respose = await api.get(`api/get-link-id/${id}/`)
    return respose.data
}

export const editLink = async (id, payload) => {
    const response = await api.put(`api/edit-link/${id}/`, payload)
    return response.data
}
export const updateUserInfo = async (payload) => {
    const response = await api.put(`api/update-user/`, payload,)
    return response.data
}

export const updateAvatar = async (payload) => {
    const response = await api.put(`api/update-avatar/`, payload,)
    return response.data
}

export const updatePassword = async (payload) => {
    const response = await api.put(`api/update-password/`, payload,)
    return response.data
}