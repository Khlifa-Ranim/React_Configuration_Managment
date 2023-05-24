
import React from 'react';
import {  useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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
  
const navigate=useNavigate();



  const { description, endpoint,method } = permission;

  return (
    <div  className="app">
    <Sidebar/> 
     <div  className="content">
     <Topbar/>
    <div className="MainContainer2" >
    <div>
      <button onClick={() => navigate(`/FetchRoles`)} style={{marginLeft:"100px"}}className="back-btn">
              Back
            </button>
    <button onClick={() => navigate(`/FeatchRole_Permission`)} style={{background:"#7980F9"}} className="back-btn">
              More information about permissions role
            </button>
          </div>
    <h2 className="WelcomeText" style={{color:"#7980F9", marginBottom:"4px"}}>Permission Details</h2>
    <div className="InputContainer">
     {permission.loading && <div>Chargement.....</div>}

      <p style={{ color: "#ff347f"}}>Endpoint: </p> {endpoint}
      <p style={{ color: "#ff347f"}}>Description: </p>{description}
      <p style={{ color: "#ff347f"}}>Method: </p> {method}

    </div>
    </div>

    </div>
    </div>

  );
}

export default FetchPermissionById;


