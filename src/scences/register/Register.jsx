import React, { useState } from "react";
import "./Auth.css"
import styled from "styled-components";
import Input from '../../components/Input'
import {useDispatch,useSelector}  from 'react-redux'
import { logIn } from "../../actions/AuthAction.js";


export const Connexion = () => {
 const loading = useSelector((state) => state.authReducer.loading);
 console.log(loading)

  {/*To handlling our input*/}
 const [data ,setData]=useState({
  username:"",
  password:"",})

console.log(data)
  {/*constante pour controller la validité de conformepassword */}
 const dispatch=useDispatch()

 {/*pour enregistrer les information dans ecrite les inputs */}
 const handleChange=(e)=>{
  setData({...data,[e.target.name]: e.target.value})
 }

 {/*permet de submit our form to the backend serveur*/}
 const handleSubmit=(e)=>{
  e.preventDefault();

 
  {/*sending the data */}

    dispatch(logIn(data))
  
 }

 
 




  return (<>
  <div className="body">
      <form  className="MainContainer" onSubmit={handleSubmit}>
      <WelcomeText>Welcome  To The page Of Log In</WelcomeText>


      <>
   { /*partie de Login*/}
        <InputContainer> 
        <Input 
            type="text"
            placeholder="Entrer Votre Nom "
            name="username"
            onChange={handleChange}
            value={data.username}
            required
          /> 
 
        <Input
               type="password"
                name="password"
                onChange={handleChange}
                placeholder="Entrer Votre Password"
                value={data.password}
                required
          />
         
        </InputContainer>

        <InputContainer>

       
    <span
      style={{ fontSize: '12px', cursor: 'pointer' }}
    >
      "Don't have an account? Register"
    </span>
        </InputContainer>

 <ButtonContainer>
<button className="Button" type="submit" disabled={loading} >
  {loading ? "Loading..." :"Log In"} </button>
</ButtonContainer>



      </>
      <LoginWidth>OR LOGIN WITH</LoginWidth>
      <HorizontalRule />

      <ForgotPassword>Forgot Password ?</ForgotPassword>
      </form>
  
    </div>
  </>
  );
}




// export const Register = () => {
//     const loading = useSelector((state) => state.authReducer.loading);
//     console.log(loading)
//     {/*To handlling our input*/}
//     const [data ,setData]=useState({
//      username:"",
//      password:"",
//      confirmPass:""})
     
//     const [ConfirmPass,setConfirmPass]=useState(true)
//    {/*constante pour controller la validité de conformepassword */}
//     const dispatch=useDispatch()
//     {/*pour enregistrer les information dans ecrite les inputs */}
//     const handleChange=(e)=>{
//      setData({...data,[e.target.name]: e.target.value})
//     }
   
//     {/*permet de submit our form to the backend serveur*/}
//     const handleSubmit=(e)=>{
//      e.preventDefault();
   
   
//        {/*useDispatch to interact with the action */}
//       data.password ===data.confirmPass
      
//       ? dispatch(signUp(data))
//         :setConfirmPass(false) 
    
//     }
    
   
//        {/*por retourner le form a l'état initial */}
//      const restForm=()=>{
//      setConfirmPass(true);
//      setData(
//    {
//      username:"",
//      password:"",
//      confirmPass:""
//    }
//      )
//     } 
   
   
//    /*   const FacebookBackground =
//        "linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)";
//      const InstagramBackground =
//        "linear-gradient(to right, #A12AC4 0%, #ED586C 40%, #F0A853 100%)";
//      const TwitterBackground =
//        "linear-gradient(to right, #56C1E1 0%, #35A9CE 50%)"; */
   
//      return (<>
//      <div className="body">
//          <form  className="MainContainer" onSubmit={handleSubmit}>
//          <WelcomeText>Welcome  To The page Of Register </WelcomeText>
   
   
//          <>
//       { /*partie de Login*/}
//            <InputContainer> 
//            <Input 
//                type="text"
//                placeholder="Entrer Votre Nom "
//                name="username"
//                onChange={handleChange}
//                value={data.username}
//                required
//              /> 
    
//            <Input
//                   type="password"
//                    name="password"
//                    onChange={handleChange}
//                    placeholder="Entrer Votre Password"
//                    value={data.password}
//                    required
//              />
            
         
        
//               <Input
//                type="password"
//                placeholder="Confirmer Votre Password"
//                name="confirmPass"
//                onChange={handleChange}
//                value={data.confirmPass}
//                required
//              />
             
//              <span style= {{display : ConfirmPass ? "none":"block",
//                 color:"red",
//                 fontSize:"12px",
//                 weight:"bold"
//              }}>
//                  *confirm Password is not the same
//                  </span>
                 
                 
//          </InputContainer>
         
//            <InputContainer>
   
            
   
             
//             <span style={{fontSize: '12px',cursor:"pointer"}} 
            
//               title="Dashboard"
//                 to="/">
//               </span>
   
//            </InputContainer>
   
//     <ButtonContainer>
//    <button className="Button" type="submit" disabled={loading} >
//      {loading ? "Loading..." : "Register"} </button>
//    </ButtonContainer>
   
   
   
//          </>
//          <LoginWidth>OR LOGIN WITH</LoginWidth>
//          <HorizontalRule />
//          {/* <IconsContainer>
//            <Icon color={FacebookBackground}>
//              <FaFacebookF />
//            </Icon>
//            <Icon color={InstagramBackground}>
//              <FaInstagram />
//            </Icon>
//            <Icon color={TwitterBackground}>
//              <FaTwitter />
//            </Icon>
//          </IconsContainer> */}
//          <ForgotPassword>Forgot Password ?</ForgotPassword>
//          </form>
     
//        </div>
//      </>
//      );
//    }








const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

const ButtonContainer = styled.div`
margin: 1rem 0 2rem 0;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
`;

const LoginWidth = styled.h5`
cursor:pointer;
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


const ForgotPassword = styled.h4`
  cursor: pointer;
`;



export default Connexion;