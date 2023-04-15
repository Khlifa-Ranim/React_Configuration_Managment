import React, { useEffect, useState } from "react";
import Topbar from "../../global/Topbar";
import Sidebar from "../../global/Sidebar";
import { useDispatch } from 'react-redux';
import {CreatePermission}  from'../../../redux/PermissionSlices/AddPermissionSlice'
import "../User/NewUser.css";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


const AddPermission = () => {    

  
  const [endpoint, setEndpoint] = useState('');
  const [method, setMethod] = useState('');
  const [description, setdDscription] = useState('');

  const [formErrors,setFromErrors]= useState({});
  const [isSubmit,setIsSubmit]= useState(false);
  const navigate=useNavigate();

   const notify=()=>{
    toast(" Permission  Ajouter Avec Succès 👌")
   }


  const dispatch = useDispatch();


const CreateUserHandle=(e)=>{
  e.preventDefault();
      setFromErrors(validate(endpoint,method,description));
      setIsSubmit(true);

if (Object.keys(formErrors).length === 0 && endpoint.trim() !== '' && description.trim() !== '') {

  console.table(endpoint,method,description)
  dispatch(CreatePermission({endpoint,method,description}))
  notify(); // display toast notification
  setTimeout(() => navigate('/FetchPermissions'), 2000); // redirect after 3 seconds
}
}

const validate = (endpoint, method, description) => {
  const errors = {};

  const endpoint_pattern = /^[a-zA-Z\s]*$/;
  const method_pattern = /^(GET|PUT|DELETE|POST)$/;
  const description_pattern = /^[a-zA-Z\s'éèêàùîôç-]*$/;

  if (!endpoint) {
    errors.endpoint = "Endpoint is Required";
  } else if (!endpoint.startsWith("/")) {
    errors.endpoint = "Endpoint should start with /";
  } else if (endpoint.length < 4) {
    errors.endpoint = "Endpoint should contain at least 4 letters";
  }

  if (!method) {
    errors.method = "Method is Required";
  }

  if (!description) {
    errors.description = "Description is Required";
  } else if (!description_pattern.test(description)) {
    errors.description = "Description should only contain letters and spaces";
  } else if (description.length < 8) {
    errors.description = "Description should contain at least 8 letters";
  }

  return errors;
};


useEffect(() => {
  if (Object.keys(formErrors).length > 0 && isSubmit) {
    console.log(formErrors);
  }
}, [formErrors, isSubmit]);

  return (<>

     <div  className="app">
    <Sidebar/> 
     <div  className="content">
     <Topbar/>


      <form className="MainContainer2" onSubmit={CreateUserHandle}>
      <ToastContainer />
      <h2 className="WelcomeText">Créer Une Permission</h2>
      <div className="InputContainer">
      <label htmlFor="type">Select an Endpoint :</label>
         <input
         className="Input"
          type="text" 
          placeholder="EndPoint"
          value={endpoint} 
          onChange={(e) => {
            const { name, value } = e.target;
            setEndpoint(value);
            setFromErrors({...formErrors, [name]: value});
          }}
                    
       />
      <p style={{color:"red"}}>{formErrors.endpoint}</p>

             <label htmlFor="type">Select a Methoe :</label>
             <select className="Input"
                  onChange={(e) => {
                    const { value } = e.target;
                    setMethod(value);
                    setFromErrors({ ...formErrors, type: value });
                  }}>
                    <option > </option>
                    <option > POST</option>
                    <option > GET</option>
                    <option > DELETE</option>
                    <option > PUT</option>
                    <option > PATCH</option>
                </select>

         <p style={{color:"red"}}>{formErrors.method}</p>
         <label htmlFor="type">Select a Description :</label>
          <input
         className="Input"
         placeholder="Description"
         type="text"
          value={description}
         onChange={(e) => {
          const { name, value } = e.target;
          setdDscription(value);
          setFromErrors({...formErrors, [name]: value});
        }}
        />
        <p style={{color:"red"}}>{formErrors.description}</p>
      </div>

      <div className="ButtonContainer">

      <button  className="Button" type="submit" >Create Permission</button>    
    
      </div>

      </form>

        </div>
        </div>


    
  </>
  );
}


export default AddPermission;


