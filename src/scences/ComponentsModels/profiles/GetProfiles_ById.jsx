
import React from 'react';
import {  useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "..//User/NewUser.css";


import Sidebar from '../../global/Sidebar';
import Topbar from '../../global/Topbar';

function FetchProfileById() {
  const { id } = useParams();
  console.log("id:", id);

  const usertab = useSelector((state) => state.FetchUsersStore);
  const Users=usertab.users;
  console.log("Users:",Users)
  
  const tabprofile = useSelector((state) => state.FetchProfilessStore);
  const profiles = tabprofile.profiles
  console.log("Profiles:",profiles)

  
  // const userId = parseInt(id); // convert id to an integer
  // const user = Users.find((item) => item.id === userId);
  // console.log("userid:", user);
  

  const profileId = parseInt(id); // convert id to an integer
  const profile = profiles.find((item) => item.id === profileId);
  console.log("profileId:", profile);
  




  const { name, adresse,description,email,image,telephone } = profile;

  return (
    <div  className="app">
    <Sidebar/> 
     <div  className="content">
     <Topbar/>
    <div className="MainContainer2"style={{height:"800px"}}>
    <h2 className="WelcomeText" style={{ marginBottom:"180px",color:"#8A8FF7",marginTop:"2px"}}>Profile Details</h2>
    <div className="InputContainer">
     {profile.loading && <div>Chargement.....</div>}
<table style={{marginLeft:"20px",height:"1200px",width:"600px"}}>
<tr style={{height:"40px"}}>  <p style={{ color: "#ff347f"}}>name: </p></tr>  <tr style={{height:"40px"}}> {name}</tr>
<tr style={{height:"40px"}}>     <p style={{ color: "#ff347f"}}>description: </p></tr> <tr style={{height:"40px"}}> {description}</tr>
<tr style={{height:"40px"}}>    <p style={{ color: "#ff347f"}}>adresse: </p></tr> <tr style={{height:"40px"}}>  {adresse}</tr>
<tr style={{height:"40px"}}>      <p style={{ color: "#ff347f"}}>email: </p> </tr> <tr style={{height:"40px"}}> {email}</tr>
<tr style={{height:"40px"}}>       <p style={{ color: "#ff347f"}}>telephone: </p></tr> <tr style={{height:"40px"}}> {telephone}</tr>
<tr style={{height:"40px"}}>   <p style={{ color: "#ff347f"}}> Image </p></tr> <tr style={{height:"40px"}}>   <img src={image} alt="Profile Image"/></tr>


      </table>    

    </div>
    </div>

    </div>
    </div>

  );
}

export default FetchProfileById;


