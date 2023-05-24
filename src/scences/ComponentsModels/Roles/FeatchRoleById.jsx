
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import "../User/NewUser.css";


import Sidebar from '../../global/Sidebar';
import Topbar from '../../global/Topbar';

function FeatchRoleById() {
  const { id } = useParams();
  console.log("id:", id);
  
  const roletab = useSelector((state) => state.FetchRolsStore);
  const roles = roletab.Roles;
  console.log("roletab:", roles);
  
  const roleId = parseInt(id); // convert id to an integer
  const role = roles.find((item) => item.id === roleId);
  console.log("roleid:", role);
  
  const navigate=useNavigate();



  const { description, name } = role;

  return (
    <div  className="app">
    <Sidebar/> 
     <div  className="content">
     <Topbar/>
    <div className="MainContainer2">
      <div>
      <button onClick={() => navigate(`/FetchRoles`)} style={{marginLeft:"200px"}}className="back-btn">
              Back
            </button>
    <button onClick={() => navigate(`/FeatchRole_Permission`)} style={{background:"#7980F9"}} className="back-btn">
              More information about roles
            </button>
          </div>
    <h2 className="WelcomeText" style={{color:"#7980F9",marginBottom:"2px"}}>Role Details</h2>
    <div className="InputContainer">
      <p style={{ color: "#ff347f"}}>Name: </p>{name}
      <p style={{ color: "#ff347f"}}>Description: </p>{description}
    </div>
    </div>

    </div>
    </div>


  );
}

export default FeatchRoleById;


