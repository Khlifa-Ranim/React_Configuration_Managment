
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import "../User/NewUser.css";


import Sidebar from '../../global/Sidebar';
import Topbar from '../../global/Topbar';

function FeatchConfigurationById() {

    const navigate = useNavigate();

  const { id } = useParams();
  console.log("id:", id);

  const Configurations = useSelector((state) => state.Featch_Configurations_Store);
  console.log("Configurations:", Configurations);
  const tabConfigurations = Configurations.TabConfiguration;
  console.log("tabConfigurations",tabConfigurations)

  
  const ConfigurationId = parseInt(id); // convert id to an integer
  const configuration = tabConfigurations.find((item) => item.id === ConfigurationId);
  console.log("configurationid:", configuration);

  
  const BacktoDashboard = () => {
    console.log("Button active");

    navigate(`/FeatchConfigurations`);
  };

  const { description, name ,value,version,defaultValue,createdBy,updatedBy,createdAt,} = configuration;

  return (
    <div  className="app">
    <Sidebar/> 
     <div  className="content">
     <Topbar/>
    <div className="MainContainer2">
      
        <button  onClick={() => BacktoDashboard()} className="back-btn">Back</button>
      
    <h2 className="WelcomeText">Configuration Details</h2>
    <table style={{ marginLeft:"20px",marginTop:"0px",height:"1200px",width:"600px"}}>

    <tr> <p style={{ color: "#ff347f",fontWeight: "bold" }}>Name : </p> {name}</tr>
    <tr> <p style={{ color: "#ff347f",fontWeight: "bold" }}>Description :</p>{description}</tr>
     <tr> <p style={{ color: "#ff347f",fontWeight: "bold" }}>value: </p>{value}</tr>
     <tr><p style={{ color: "#ff347f",fontWeight: "bold" }}>version: </p>{version}</tr>
     <tr><p style={{ color: "#ff347f",fontWeight: "bold" }}>defaultValue: </p>{defaultValue}</tr>
     <tr><p style={{ color: "#ff347f",fontWeight: "bold" }}>createdBy: </p>{createdBy}</tr>
     <tr><p style={{ color: "#ff347f",fontWeight: "bold" }}>updatedBy: </p>{updatedBy}</tr>
     <tr><p style={{ color: "#ff347f",fontWeight: "bold" }}>createdAt: </p>{createdAt}</tr>
      </table>

    </div>
    </div>

    </div>


  );
}

export default FeatchConfigurationById;


