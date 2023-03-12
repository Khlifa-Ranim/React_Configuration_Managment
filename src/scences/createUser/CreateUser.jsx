import React, { useState } from "react";
import "./CreateUser.css"
import styled from "styled-components";
import Input from '../../components/Input'
import Button from '../../components/Button'
import { height } from "@mui/system";

const CreateUser = () => {    
    const [profileImg, setProfileImg] = useState([]);


    

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

 function imageHandler (e)  {
    const reader = new FileReader();
    reader.onload = () =>{
      if(reader.readyState === 2){
       setProfileImg({profileImg: reader.result})
      }
    }
    reader.readAsDataURL(e.target.files[0])
  };

  return (<>
  <div className="body">
    <MainContainer >
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
          required
       />

        <Input
          type="text"
          placeholder="Entrer votre Prénom"
          required
        />
        <Input
          type="text"
          placeholder="Entrer votre Téléphone"
          required
        />
        <Input
          type="text"
          placeholder="Entrer votre Email"
          required
        />
         <Input
          type="text"
          placeholder="Entrer votre Adresse"
          required
        />
        
         <input
          type="file"
          name="image"
          onChange={imageHandler}
          accept="image/*"
          id="input"
          required
        /> 
     <div className="label">
         <label className="image-upload" htmlFor="input">
			    <i className="material-icons">add_photo_alternate</i>
			    Choisir Votre Profile
	      </label>

        </div>
      </InputContainer>

      <HorizontalRule />

      <ButtonContainer>
        <Button content="Connexion" />
      </ButtonContainer> 

    </MainContainer>
    </div>
  </>
  );
}




const MainContainer = styled.div`
display: flex;
align-items: center;
flex-direction: column;
height:90vh;
width: 30vw;
background: rgba(255, 255, 255, 0.15);
box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
backdrop-filter: blur(8.5px);
-webkit-backdrop-filter: blur(8.5px);
border-radius: 10px;
color: #ffffff;
text-transform: uppercase;
letter-spacing: 0.4rem;


@media only screen and (min-width: 360px) {
  width: 80vw;
  height: 90vh;

  h4 {
    font-size: small;
  }
}
@media only screen and (min-width: 411px) {
  width: 80vw;
  height: 90vh;
}

@media only screen and (min-width: 768px) {
  width: 80vw;
  height: 80vh;
}
@media only screen and (min-width: 1024px) {
  width: 70vw;
  height: 50vh;
}
@media only screen and (min-width: 1280px) {
  width: 30vw;
  height: 80vh;
}

`;


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