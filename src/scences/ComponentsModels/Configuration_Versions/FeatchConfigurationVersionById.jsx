
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


  const Configuration_version = useSelector((state) => state.FeatchConfigurationversionStore);
  
  console.log("Configuration_version:", Configuration_version);

  const tabConfigurationVersion = Configuration_version.TabConfigurationVersion;

  console.log("Configuration_version:", tabConfigurationVersion);
  
  const ConfigurationId = parseInt(id); // convert id to an integer
  const configuration = tabConfigurationVersion.find((item) => item.id === ConfigurationId);
  console.log("configurationVersionid:", configuration);

  
  const BacktoDashboard = () => {
    console.log("Button active");

    navigate(`/FeatchConfigurationVersion`);
  };

  const { description, name ,value,version,updatedBy,} = configuration;

  return (
    <div  className="app">
    <Sidebar/> 
     <div  className="content">
     <Topbar/>
    <div className="MainContainer2">
        <button  onClick={() => BacktoDashboard()} className="back-btn">Back</button>

    <h2 className="WelcomeText" style={{ marginBottom:"18px",color:"#8A8FF7"}}>Configuration Version Details</h2>
      <table style={{ marginLeft:"20px",marginTop:"0px",height:"1200px",width:"600px"}}>
        <tr> <p style={{ color: "#ff347f",fontWeight: "bold" }}>Name : </p> {name}</tr>
        <tr> <p style={{ color: "#ff347f",fontWeight: "bold" }}>Description :</p>{description}</tr>
        <tr> <p style={{ color: "#ff347f",fontWeight: "bold" }}>Value: </p>{value}</tr>
        <tr> <p style={{ color: "#ff347f",fontWeight: "bold" }}>The Version: </p> {version}</tr>
        <tr> <p style={{ color: "#ff347f",fontWeight: "bold" }}>Updated By :</p> {updatedBy}</tr>

      </table>

    </div>

    </div>
    </div>


  );
}

export default FeatchConfigurationById;


