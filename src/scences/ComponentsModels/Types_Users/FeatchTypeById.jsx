
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "../User/NewUser.css";

import Sidebar from '../../global/Sidebar';
import Topbar from '../../global/Topbar';

function FeatchRoleById() {
  const { id } = useParams();
  
  // const roletab = useSelector((state) => state.FetchRolsStore);
  // const roles = roletab.Roles;
  // console.log("roletab:", roles);

  // const TypesUsers = useSelector((state) => state.Featch_Types_Users_SliceStore);
  // console.log("TypesRoles:", TypesUsers);
  // const Tab_Types_Users = TypesUsers.storeTypesUsers;

  const roletab = useSelector((state) => state.Featch_Types_Users_SliceStore);
  const roles = roletab.storeTypesUsers;
  console.log("roletab:", roles);

  
  const roleId = parseInt(id); // convert id to an integer
  const role = roles.find((item) => item.id === roleId);
  console.log("roleid:", role);
  




  const { description, name } = role;

  return (
    <div  className="app">
    <Sidebar/> 
     <div  className="content">
     <Topbar/>
    <div className="MainContainer2">
    <h2 className="WelcomeText">Type User Details</h2>
    <div className="InputContainer">
      <p  style={{ color: "#ff347f"}}>Name: </p>{name}
      <p  style={{ color: "#ff347f"}}>Description: </p>{description}
    </div>
    </div>

    </div>
    </div>



  );
}

export default FeatchRoleById;


