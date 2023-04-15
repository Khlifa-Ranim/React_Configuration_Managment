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
const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch()
  const params = useParams()
//déclaration profile userId
const profileUserId = params.id;
//fetch globale state user
const [profileUser, setProfileUser] = useState({});
  //const { user } = useSelector((state) => state.authReducer.authData);

  // useEffect(()=>{
  //   const fetchProfileUser =async()=>{ 
  //     if(profileUserId === user._id){
  //       setProfileUser(user)
  //       console.log(user)
  //     }
  //     else{
  //       //get userId from the database
  //       const profileUser= await UserApi.getUser(profileUserId)
  //       setProfileUser(profileUser)
  //       console.log(profileUser)
  //     }
  //   }

  //   //on a ajouter [user] pour stoper la boucle infini 
  //   fetchProfileUser()
  // },[user])




  const handleFormSubmit=(values)=>{
    console.log(values);
  }
 
  const initialValues = {
    username: "",
    prenom: "",
    telephone: "",
    email: "",
    address: "",
  };
  return(
    <div  className="app">
    <Sidebar/> 
     <div  className="content">
     <Topbar/>
<Box m="20px">
   <Header title="Create Mon Profile" subtitle="Mes Information"></Header>
 
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
      handleChange,
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
                value={values.username }
                name="username"
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                 sx={{gridColumn:"span 2"}}
                 />
                <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Prénom"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.prenom}
                name="prenom"
                error={!!touched.prenom && !!errors.prenom}
                helperText={touched.prenom && errors.prenom}
                sx={{ gridColumn: "span 2" }}
              />

<TextField
                fullWidth
                variant="filled"
                type="text"
                label="Numéro téléphone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.telephone}
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
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              
               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 4" }}
              />

            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
                Update User
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
    username: yup.string().required("required"),
    prenom: yup.string().required("required"),
    email:yup.string().email("invalid email").required("required"),
    telephone : yup
    .string()
    .matches(phoneRegExp,"phone number is not valid")
    .required("required"),
    address: yup.string().required("required"),
})

export default Form;
