import React, { useEffect, useState } from "react";
import Topbar from "../../global/Topbar";
import Sidebar from "../../global/Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import {editRole}  from'../../../redux/RolesSlices/EdiRoleSlice'
import "../User/NewUser.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditRole = () => {    
  

 
  const {id}=useParams(); //take the id from  the router
  const dispatch = useDispatch();

   const role = useSelector((state) => state.FetchRolsStore);
   console.log("role:" ,role.Roles);
   const roles=role.Roles;
   const navigate=useNavigate();


   const existingUser=roles.filter(f=>f.id==id);

   const {name,description}=existingUser[0];
   const [uName, setUName] = useState(name);
   const [UDescription, setUDescription] = useState(description);

    
  const [formErrors,setFromErrors]= useState({});
  const [isSubmit,setIsSubmit]= useState(false);

   const notify=()=>{
    toast(" Update succeed  👌")
   }


   const EditRoleHandle = (e) => {
    e.preventDefault();
    console.table(uName, UDescription);

    setFromErrors(validate(uName, UDescription));
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0 && uName.trim() !== '' && UDescription.trim() !== '') {

    dispatch(editRole({ id: id, name: uName, description: UDescription }));
    notify(); // display toast notification
    setTimeout(() => navigate("/FetchRoles"), 1000); // redirect after 3 seconds
  };
}

const validate = (uName, UDescription) => {
  const errors = {};

  const name_pattern = /^[a-zA-Z\s]*$/;
  const description_pattern = /^[a-zA-Z\s'éèêàùîôç-]*$/;

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
            <h2 className="WelcomeText">Modifier Ce Role</h2>
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
                onClick={EditRoleHandle}
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


export default EditRole;
// import React, { useState } from "react";
// import Topbar from "../global/Topbar";
// import Sidebar from "../global/Sidebar";
// import { useDispatch } from 'react-redux';
// import { editRole } from '../../redux/RolesSlices/EdiRoleSlice';
// import "../User/NewUser.css";


// const EditRole = ({ role }) => {
//   // const [updateName, setUpdateName] = useState(role.name);
//   const [updateDescription, setUpdateDescription] = useState(role.description);

//   const dispatch = useDispatch();

//   const handleUpdateRole = (e) => {
//     e.preventDefault();

//     dispatch(editRole({
//       id: role.id,
//       name: updateName,
//       description: updateDescription
//     }));
//   }

//   return (
//     <>
//       <div className="app">
//         <Sidebar/>
//         <div className="content">
//           <Topbar/>

//           <form className="MainContainer2" onSubmit={handleUpdateRole}>
//             <h2 className="WelcomeText">Modifier Ce Role</h2>
//             <div className="InputContainer">
//               <input
//                 className="Input"
//                 type="text"
//                 value={updateName}
//                 onChange={(e) => setUpdateName(e.target.value)}
//                 required
//               />

//               <input
//                 className="Input"
//                 type="text"
//                 value={updateDescription}
//                 onChange={(e) => setUpdateDescription(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="ButtonContainer">
//               <button className="Button" type="submit">Modifier Role</button>
//             </div>
//           </form>

//         </div>
//       </div>
//     </>
//   );
// }

// export default EditRole;


