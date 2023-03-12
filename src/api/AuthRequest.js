 import axios from "axios"
 {/*axios package allow to  make requests to the server side  */}

 const API=axios.create({baseURL:"http://192.168.137.207:5000"})

 export const logIn=(formData)=>API.post('/user/login',formData)
 export const signUp=(formData)=>API.post('/user/',formData)