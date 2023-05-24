import React, { useState } from "react";
import * as yup from "yup";
import "./CreateUser.css"
import styled from "styled-components";
import Input from '../../components/Input'
import Button from '../../components/Button'
import { height } from "@mui/system";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { CreateProfile } from "../../actions/UserActions";

const CreateUser = () => {    
  const [profileImg, setProfileImg] = useState([]);
  {/*constante pour controller la validité de conformepassword */}

  const dispatch=useDispatch()
  const [data ,setData]=useState({
    name: "",
    prenom: "",
    telephone: "",
    email: "",
    adresse: "",
    description:"",
  })

  {/*pour enregistrer les information dans ecrite les inputs */}
  const handleChange=(e)=>{
    // name:name dans les inputs et value:values dans input
    setData({...data,[e.target.name]: e.target.value})
   // console.log(data.name)
    }
   
  const handleFormSubmit=(values)=>{
    console.log(values);
  }

   {/*permet de submit our form to the backend serveur*/}
  const handleSubmit=(e)=>{
    //on prenant le département par défaut
    e.preventDefault();

     {/*useDispatch to interact with the action */}
    {/*sending the data */}
    dispatch(CreateProfile(data))

  }



    {/*por retourner le form a l'état initial */}
  const restForm=()=>{
  setData(
{
  name: "",
  prenom: "",
  telephone: "",
  email: "",
  adresse: "",
  description:"",
}
  )
 } 

   const initialValues = {
    name: "",
    prenom: "",
    telephone: "",
    email: "",
    adresse: "",
    description:"",
  };

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

    

/*  function handleImage(e){
    console.log(e.target.files)
    setImage(e.target.files[0])
 }
 */
/*  function handleApi(){
    const formData =new FormData()
    formData.append('image',image)
    axios.post('url',formData).then((res)=>{
        console.log(res)
    })
 } */

 const imageHandler = (e) => {
  const reader = new FileReader();
  reader.onload = () => {
    setProfileImg(reader.result);
    console.log(reader.result)
  };
  reader.readAsDataURL(e.target.files[0]);
};


  return (<>
  <div className="body">
  <Formik
   onSubmit={handleFormSubmit}
   initialValues={initialValues}
   validationSchema={checkoutSchema}
  >
     
  {({
      errors,
      touched,
      handleBlur,
    })=>(   
<form className="MainContainer" onSubmit={handleSubmit}>

<WelcomeText>Créer Un Profile</WelcomeText>
       <InputContainer>
       <img
            style={{
             width:"200px",
             height:"100px",
              borderRadius:"50%",
              objectFit:"cover",
             }}
  src={profileImg}

  alt=""
  id="img"
/>
         <Input
          type="text"
          placeholder="Entrer votre Nom"
          name="name"
          onChange={handleChange}
          value={data.name}
          error={!!touched.name && !!errors.name}
          helperText={touched.name && errors.name}
           sx={{gridColumn:"span 2"}}
          
       />

        <Input
          type="text"
          placeholder="Entrer votre Adresse email"
          value={data.email}
          onChange={handleChange}
          name="email"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          sx={{ gridColumn: "span 4" }}
        />
        <Input
          type="text"
          placeholder="Entrer votre Téléphone"
          required
          value={data.telephone}
          onChange={handleChange}
          name="telephone"
          error={!!touched.telephone && !!errors.telephone}
          helperText={touched.telephone && errors.telephone}
          sx={{ gridColumn: "span 4" }}
        />
        <Input
          type="text"
          placeholder="Entrer votre Addresse"
          required
          onChange={handleChange}
          value={data.adresse}
          name="adresse"
          error={!!touched.adresse && !!errors.adresse}
          helperText={touched.adresse && errors.adresse}
        />
         <Input
          type="text"
          placeholder="Description"
          required
          onChange={handleChange}
          value={data.description}
          name="description"
          error={!!touched.description && !!errors.description}
          helperText={touched.description && errors.description}
        />
          <input
          type="file"
          name="image"
          accept="image/*"
          id="input"
          onChange={imageHandler}
         // className="material-icons"
         style={{
          display:"none"
          }}
          required
        />  
  
         <div className="label">
         <label className="image-upload" htmlFor="input">
         {/* <input
          type="file"
          name="image"
          onChange={imageHandler}
          accept="image/*"
          id="input"
          className="material-icons"
          required
        />  */}
			    <i className="material-icons">add_photo_alternate</i>
			    Choisir Votre Profile
	      </label>
        </div>

       
        </InputContainer>
        <HorizontalRule />
      
      <ButtonContainer>
        <Button content="Connexion" />
      </ButtonContainer> 
        </form>)}
      

     

        </Formik>
    </div>
  </>
  );
}







const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
`;

const ImageText=styled.h4`
margin: 0rem 0 0rem 0;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 60%;
  width: 100%;
`;

const ButtonContainer = styled.div`
margin: 1rem 0 2rem 0;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
`;



const HorizontalRule = styled.hr`
width:90%;
height:0.3rem;
border-raduis:0.8rem;
border:none;
background: linear-gradient(to right, #14163c 0%, #03217b 79%);
background-color: #ebd0d0;
margin:1.5rem 0 1rem 0;
backdrop-filter:blur(25px);
`



export default CreateUser;