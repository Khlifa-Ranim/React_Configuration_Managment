import React, { useEffect, useState } from "react";
import Topbar from "../../global/Topbar";
import Sidebar from "../../global/Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import {CreateRole,addRole}  from'../../../redux/RolesSlices/AddRoleSlice'
import "../User/NewUser.css";
import { useNavigate } from "react-router-dom";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddRole = () => {    
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
 
  const [formErrors,setFromErrors]= useState({});
  const [isSubmit,setIsSubmit]= useState(false);
  const dispatch = useDispatch();
  
   const navigate=useNavigate();

   const notify=()=>{
    toast(" Role  Ajouter Avec Succès 👌")
   }
   const CreateUserHandle = (e) => {
    e.preventDefault();
    setFromErrors(validate(name, description));
    setIsSubmit(true);
  
    if (Object.keys(formErrors).length === 0 && name.trim() !== '' && description.trim() !== '') {
      dispatch(CreateRole({ name, description }));
      notify(); // display toast notification
      setTimeout(() => navigate('/FetchRoles'), 3000); // redirect after 3 seconds
    }
  };

  

const validate = (name, description) => {
  const errors = {};

  const name_pattern = /^[a-zA-Z\s]*$/;
  const description_pattern = /^[a-zA-Z\s'éèêàùîôç-]*$/;

  if (!name) {
    errors.name = "Name is Required";
  } else if (!name_pattern.test(name)) {
    errors.name = "Name should only contain letters and spaces";
  }
  else if (name.length < 8) {
    errors.name = "Name should contain at least 8 letters";
  }
  if (!description) {
    errors.description = "Description is Required";
  } else if (!description_pattern.test(description)) {
    errors.description = "Description should only contain letters and spaces";
  }
  else if (description.length < 8) {
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
      <h2 className="WelcomeText">Créer Un Role</h2>
      <div className="InputContainer">
         <input
         className="Input"
          type="text" 
          placeholder="Non de Role"
          value={name} 
          // onChange={(e) => setName(e.target.value)}
          onChange={(e) => {
            const { name, value } = e.target;
            setName(value);
            setFromErrors({...formErrors, [name]: value});
          }}
       />
       <p  style={{color:"red"}}>{formErrors.name}</p>
        <input
         className="Input"
         type="text" 
         value={description}
        //  name="description"

         placeholder="Donner Une Description"
          // onChange={(e) => setDescription(e.target.value)}
          
          onChange={(e) => {
            const { name, value } = e.target;
            setDescription(value);
            setFromErrors({...formErrors, [name]: value});
          }}
        />
           <p style={{color:"red"}}>{formErrors.description}</p>

      </div>

      <div className="ButtonContainer">

      <button  className="Button" type="submit" >Créer Role</button>    
    
      </div>

      </form>

        </div>
        </div>


    
  </>
  );
}


export default AddRole;


