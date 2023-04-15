
import React from 'react';
import {  useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "../User/NewUser.css";


import Sidebar from '../../global/Sidebar';
import Topbar from '../../global/Topbar';

function FetchPermissionById() {
  const { id } = useParams();
  console.log("id:", id);
  
  // const roletab = useSelector((state) => state.FetchRolsStore);
  // const roles = roletab.Roles;
  // console.log("roletab:", roles);

  const role_permission = useSelector((state) => state.FetchRoles_PermissionsStore);
  console.log("role_permissionsss:", role_permission.Permissions_Roles);
  const per_role = role_permission.Permissions_Roles;

  const permissiontab = useSelector((state) => state.FetchRoles_PermissionsStore);
  const permissions=permissiontab.Permissions_Roles;
  console.log("permission_rolestab",permissions)
  
  console.log("permissions:", permissions); // add this line to check the value of permissions

  const permissionId = parseInt(id); // convert id to an integer
  
  // const permission = permissions.find((item) => item.role_name === permissionId);
  const permission = permissions.find((item) => item.role_name === id.toString());
  

  console.log("roleid:", permission);
  




  const { permission_names, role_name } = permission;

  return (
    <div  className="app">
    <Sidebar/> 
     <div  className="content">
     <Topbar/>
    <div className="MainContainer22">
    <h2 className="WelcomeText">Permission Details</h2>
    <div className="InputContainer">
     {permission.loading && <div>Chargement.....</div>}

      <p>permission_names: {permission_names}</p>
      <br></br>
      <br></br>
      <br></br>
      <p>role_name: {role_name}</p>

    </div>
    </div>

    </div>
    </div>

  );
}

export default FetchPermissionById;


