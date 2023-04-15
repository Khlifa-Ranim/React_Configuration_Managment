
import React from 'react';
import {  useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "../User/NewUser.css";


import Sidebar from '../../global/Sidebar';
import Topbar from '../../global/Topbar';

function FetchPermissionById() {
  const { id } = useParams();
  console.log("id:", id);
  
  const roletab = useSelector((state) => state.FetchRolsStore);
  const roles = roletab.Roles;
  console.log("roletab:", roles);

  const permissiontab = useSelector((state) => state.FetchPermissionStore);
  const permissions=permissiontab.Permissions;
  console.log("permissiontab",permissions)
  
  const permissionId = parseInt(id); // convert id to an integer
  console.log("permissionId",permissionId)

  const permission = permissions.find((item) =>item.id === permissionId);

  console.log("roleid:", permission);
  




  const { description, endpoint,method } = permission;

  return (
    <div  className="app">
    <Sidebar/> 
     <div  className="content">
     <Topbar/>
    <div className="MainContainer2">
    <h2 className="WelcomeText">Permission Details</h2>
    <div className="InputContainer">
     {permission.loading && <div>Chargement.....</div>}

      <p>endpoint: {endpoint}</p>
      <p>Description: {description}</p>
      <p>method: {method}</p>

    </div>
    </div>

    </div>
    </div>

  );
}

export default FetchPermissionById;


