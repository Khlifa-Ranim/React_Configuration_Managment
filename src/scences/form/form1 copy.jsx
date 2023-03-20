import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import '../../index.css';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import *as UserApi from '../../api/UserRequests.js'
import { uploadImage } from "../../actions/UploadActions";
const Form = (modalOpened,setModelOpened,data) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const[formData,setFormData]=useState()
  const[profileImage,setProfileImage]=useState(null)
  const dispatch =useDispatch()
  const param =useParams()
  //import user from the dataBase
 const user=useSelector((state)=>state.authReducer.authData)

 const handleChange =(e)=>{
  setFormData({...formData,[e.target.name]:e.target.value})
 }

 const onImageChange =(event)=>{
  if(event.target.files && event.target.files[0] ){
    let img=event.target.files[0];
    event.target.name ==="image" 
     setProfileImage(img)

   }
 }
 


  const handleFormSubmit=(values)=>{
    console.log(values);
  }  
 
  const handleSbmit =(e)=>{
  e.preventDefault();
  let UserData=formData;
  if(profileImage){
    const data = new FormData();
    const fileName=Data.now()+profileImage.name;
    data.append("name",fileName);
    data.appand("file",profileImage)
    UserData.image=fileName;
     try {
      dispatch(uploadImage(data))
     } catch (error) {
      console.log(error)
      
     }
  }
  dispatch(UserApi.updateUser(param.id,UserData))
  setModelOpened(false)
  }

  return(
    <div  className="app">
    <Sidebar/> 
     <div  className="content">
     <Topbar/>
<Box m="20px">
   <Header title="Modifier Mon Profile" subtitle="Mes Information"></Header>
 
 <Formik
   onSubmit={handleFormSubmit}
   initialValues={initialValues}
   validationSchema={checkoutSchema}
  >
    {({
      values,
      errors,
      touched,
      handleBlur,
      handleSubmit,
    })=>(
        <form onSubmit={handleSubmit}>
            <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4,minmax(0, 1fr))"
            
            sx={{
                "& > div": {gridColumn:isNonMobile? undefined:"span 4"},
            }}
            > 
                <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nom"
                onBlur={handleBlur}
                onChange={handleChange}
                value={formData.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                 sx={{gridColumn:"span 2"}}
                 />
                <TextField
                fullWidth
                variant="filled"
                type="text"
                label="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={formData.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />

               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Numéro téléphone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={formData.telephone}
                name="telephone"
                error={!!touched.telephone && !!errors.telephone}
                helperText={touched.telephone && errors.telephone}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={formData.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              
               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="adresse "
                onBlur={handleBlur}
                onChange={handleChange}
                value={formData.adresse}
                name="adresse"
                error={!!touched.adresse && !!errors.adresse}
                helperText={touched.adresse && errors.adresse}
                sx={{ gridColumn: "span 4" }}
              />
               
               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="description "
                onBlur={handleBlur}
                onChange={handleChange}
                value={formData.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
              <b>Profile Image</b>
               <TextField
                type="file"
                name="image"
                onChange={onImageChange}
                error={!!touched.image && !!errors.image}
                helperText={touched.image && errors.image}
                sx={{ gridColumn: "span 4" }}
              
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" onClick={handleSbmit}>
                Modifier tous
            </Button>
            </Box>
        </form>
    )}

  </Formik>
    </Box>
    </div>
    </div>
  )
}

const phoneRegExp=
   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;



   const checkoutSchema=yup.object().shape({
    name: yup.string().required("required"),
    description: yup.string().required("required"),
    email:yup.string().email("invalid email").required("required"),
    telephone : yup
    .string()
    .matches(phoneRegExp,"phone number is not valid")
    .required("required"),
    address: yup.string().required("required"),
})

export default Form;
