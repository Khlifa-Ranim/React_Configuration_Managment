
import React from 'react';
import {  useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "..//User/NewUser.css";


import Sidebar from '../../global/Sidebar';
import Topbar from '../../global/Topbar';

function FetchPermissionById() {
  const { id } = useParams();
  console.log("id:", id);

  const usertab = useSelector((state) => state.FetchUsersStore);
  const Users=usertab.users;
  console.log("Users:",Users)
  
  
  const userId = parseInt(id); // convert id to an integer
  const user = Users.find((item) => item.id === userId);
  console.log("userid:", user);
  




  const { username, USER_TYPE,roles } = user;

  return (
    <div  className="app">
    <Sidebar/> 
     <div  className="content">
     <Topbar/>
    <div className="MainContainer2">
    <h2 className="WelcomeText">User Details</h2>
    <div className="InputContainer">
     {user.loading && <div>Chargement.....</div>}

      <p style={{ color: "#ff347f"}}>username: </p> {username}
      <p style={{ color: "#ff347f"}}>USER_TYPE: </p>{USER_TYPE}
      <p style={{ color: "#ff347f"}}>roles:</p>

      <ul style={{ listStyle: "none", paddingLeft: "1em" }}>
                        {user.roles.map((name, index) => (
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

    </div>
    </div>

    </div>
    </div>

  );
}

export default FetchPermissionById;


