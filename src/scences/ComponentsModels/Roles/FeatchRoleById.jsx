
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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
  




  const { description, name } = role;

  return (
    <div  className="app">
    <Sidebar/> 
     <div  className="content">
     <Topbar/>
    <div className="MainContainer2">
    <h2 className="WelcomeText">Role Details</h2>
    <div className="InputContainer">
      <p>Name: {name}</p>
      <p>Description: {description}</p>
    </div>
    </div>

    </div>
    </div>


//     <div>
//     <h2>Liste des Roles </h2>
//    {role.loading && <div>Chargement.....</div>}
//    {!role.loading && role.error ? <div>Erreur: {role.error}</div> : null}
//    {!role.loading && roles && roles.length ? (
//      <ul>
//        {roles.map((role) => (
//          <li>
//            <p>name: {role.name}</p>
//            <p>description: {role.description}</p>

//          </li>
//        ))}
//      </ul>
//    ) : null}
//  </div>

  );
}

export default FeatchRoleById;


