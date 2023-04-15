import React, { useEffect, useState } from "react";
import Topbar from "../../global/Topbar";
import Sidebar from "../../global/Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import {editTypes}  from'../../../redux/Types_UsersSlices/EditTypesUsers'
import "../User/NewUser.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditTypes = () => {    
  

 
  const {id}=useParams(); //take the id from  the router
  const dispatch = useDispatch();

  //  const role = useSelector((state) => state.FetchRolsStore);
  //  console.log("role:" ,role.Roles);
  //  const roles=role.Roles;
   const navigate=useNavigate();

   const TypesUsers = useSelector((state) => state.Featch_Types_Users_SliceStore);
   console.log("TypesRoles:", TypesUsers);
   const Tab_Types_Users = TypesUsers.storeTypesUsers;
 
   const existingTypeUser=Tab_Types_Users.filter(f=>f.id==id);

   const {name,description}=existingTypeUser[0];
   const [uName, setUName] = useState(name);
   const [UDescription, setUDescription] = useState(description);

    
  const [formErrors,setFromErrors]= useState({});
  const [isSubmit,setIsSubmit]= useState(false);

   const notify=()=>{
    toast(" Update succeed  👌")
   }


   const EditUsersTypesHandle = (e) => {
    e.preventDefault();
    console.table(uName, UDescription);

    setFromErrors(validate(uName, UDescription));
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0 && uName.trim() !== '' && UDescription.trim() !== '') {

    dispatch(editTypes({ id: id, name: uName, description: UDescription }));
    notify(); // display toast notification
    // setTimeout(() => navigate("/FetchRoles"), 1000); // redirect after 3 seconds
  };
}

const validate = (uName, UDescription) => {
  const errors = {};

  const name_pattern = /^[a-zA-Z\s]*$/;
  const description_pattern = /^[a-zA-Z\s]*$/;

  if (!uName) {
    errors.uName = "Name is Required";
  } else if (!name_pattern.test(uName)) {
    errors.uName = "Name should only contain letters and spaces";
  }
  else if (uName.length < 8) {
    errors.uName = "Name should contain at least 8 letters";
  }
  if (!UDescription) {
    errors.UDescription = "Description is Required";
  } else if (!description_pattern.test(UDescription)) {
    errors.UDescription = "Description should only contain letters and spaces";
  }
  else if (UDescription.length < 8) {
    errors.UDescription = "Description should contain at least 8 letters";
  }

  return errors;
};


useEffect(() => {
  if (Object.keys(formErrors).length > 0 && isSubmit) {
    console.log(formErrors);
  }
}, [formErrors, isSubmit]);
  return (
    <>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Topbar />

          <form className="MainContainer2">
            <h2 className="WelcomeText">Modifier Ce Types Users</h2>
            <div className="InputContainer">
              <input
                className="Input"
                type="text"
                value={uName}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setUName(value);
                  setFromErrors({...formErrors, [name]: value});
                }}
              />
          <p  style={{color:"red"}}>{formErrors.uName}</p>

              <input
                className="Input"
                type="text"
                value={UDescription}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setUDescription(value);
                  setFromErrors({...formErrors, [name]: value});
                }}
              />

        <p style={{color:"red"}}>{formErrors.UDescription}</p>

            </div>

            <div className="ButtonContainer">
              <button
                className="Button"
                type="submit"
                onClick={EditUsersTypesHandle}
              >
                Modifier Role
              </button>
              <ToastContainer />

            </div>
          </form>
        </div>
      </div>
    </>
  );
}


export default EditTypes;


