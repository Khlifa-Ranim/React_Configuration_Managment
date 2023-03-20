import axios from "axios"
{/*axios package allow to  make requests to the server side  */}

const API=axios.create({baseURL:"http://192.168.137.207:5000"})
 

export const getUser =(userId)=> API.get(`/user/${userId }`)
export const updateUser = (id, formData) => API.put(`/user/${id}`, formData);
export const CreateProfile=(id,formData)=>API.post(`/user/${id}`, formData)
