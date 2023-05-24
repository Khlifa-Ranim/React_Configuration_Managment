
import React from 'react';
import {  useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "../User/NewUser.css";


import Sidebar from '../../global/Sidebar';
import Topbar from '../../global/Topbar';

function FetchPermissionById() {
  const { id } = useParams();
  console.log("id:", id);
  


  

  const Users_Roles = useSelector((state) => state.Featch_Users_Roles_SliceStore);
  console.log("Users_Roles:",Users_Roles);

  const TabUsers_Roles= Users_Roles.UsersRoles;
  console.log("TabUsers_Roles:",TabUsers_Roles);

  const UserRolesID = parseInt(id); // convert id to an integer
  const userRole = TabUsers_Roles.find((item) => item.id === UserRolesID);

  
  console.log("User_RolesID:", userRole);



  const { roles_names, username } = userRole;

  return (
    <div  className="app">
    <Sidebar/> 
     <div  className="content">
     <Topbar/>
     <div className="MainContainer2">
    <h2 className="WelcomeText">Relations Roles To User Details</h2>
    <div className="InputContainer">
     {userRole.loading && <div>Chargement.....</div>}

      {/* <p>roles_names: {roles_names}</p> */}


      <p style={{ color: "#ff347f"}}>roles_names:</p>

<ul style={{ listStyle: "none", paddingLeft: "1em" }}>
                  {userRole.roles_names.map((name, index) => (
                    <li key={index} style={{ position: "relative" }}>
                      <span
                        style={{
                          position: "absolute",
                          left: "-1em",
                          top: "0.2em",
                        }}
                      >
                        &#8226;
                      </span>
                      {name}
                    </li>
                  ))}
                </ul>
      <br></br>
      <br></br>
      <br></br>
      <p style={{ color: "#ff347f"}}>username: </p>{username}

    </div>
    </div>

    </div>
    </div>

  );
}

export default FetchPermissionById;


