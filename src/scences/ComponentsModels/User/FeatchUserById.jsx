
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
  




  const { username, type_id,role_id } = user;

  return (
    <div  className="app">
    <Sidebar/> 
     <div  className="content">
     <Topbar/>
    <div className="MainContainer2">
    <h2 className="WelcomeText">User Details</h2>
    <div className="InputContainer">
     {user.loading && <div>Chargement.....</div>}

      <p>username: {username}</p>
      <p>type_id: {type_id}</p>
      <p>role_id: {role_id}</p>

    </div>
    </div>

    </div>
    </div>

  );
}

export default FetchPermissionById;


