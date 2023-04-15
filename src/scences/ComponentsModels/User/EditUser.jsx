import React, { useEffect, useState } from "react";
import Topbar from "../../global/Topbar";
import Sidebar from "../../global/Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import {editUser}  from'../../../redux/UserSlices/EditUserSlice'
import "../User/NewUser.css";
import { useNavigate, useParams } from "react-router-dom";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPermission = () => {    
  
  const {id}=useParams(); //take the id from  the router
  const user = useSelector((state) => state.FetchUsersStore);


  const navigate=useNavigate();

  const dispatch = useDispatch();

  const Users=user.users;
  console.log(Users)


  const existingPermission=Users.filter(f=>f.id==id);

  const {username,type_id,role_id}=existingPermission[0];

  const [uUsername, setUUsername] = useState(username);
  const [uType_id, setUType_id] = useState(type_id);
  const [uRole_id, setURole_id] = useState(role_id);

  // const [formErrors,setFromErrors]= useState({});
  // const [isSubmit,setIsSubmit]= useState(false);

  const notify=()=>{
    toast(" Update succeed  👌")
   }

const EditUserHandle=(e)=>{
  e.preventDefault();
  console.table(uUsername,uType_id,uRole_id)

  // setFromErrors(validate(uEndpoint,uMethod,uDescription));
  // setIsSubmit(true);

  // if (Object.keys(formErrors).length === 0 && uEndpoint.trim() !== '' && uMethod.trim() !== ''&& uDescription.trim() !== '') {

  dispatch(editUser({id:id,uUsername:uUsername,uType_id:uType_id,uRole_id:uRole_id}))
  notify(); // display toast notification
  setTimeout(() => navigate("/FetchUser"), 200); // redirect after 3 seconds

}


// const validate = (uEndpoint,uMethod,uDescription) => {
//   const errors = {};

//   const endpoint_pattern = /^[a-zA-Z\s]*$/;
//   const method_pattern = /^(GET|PUT|DELETE|POST)$/;
//   const description_pattern = /^[a-zA-Z\s]*$/;

//   if (!uEndpoint) {
//     errors.uEndpoint = "Endpoint is Required";
//   } else if (!uEndpoint.startsWith("/")) {
//     errors.uEndpoint = "Endpoint should start with /";
//   } else if (uEndpoint.length <2) {
//     errors.uEndpoint = "Endpoint should contain at least 8 letters";
//   }

//   if (!uMethod) {
//     errors.uMethod = "Method is Required";
//   } else if (!method_pattern.test(uMethod)) {
//     errors.uMethod = "Method should be GET, PUT, DELETE, or POST";
//   }

//   if (!uDescription) {
//     errors.uDescription = "Description is Required";
//   } else if (!description_pattern.test(uDescription)) {
//     errors.uDescription = "Description should only contain letters and spaces";
//   } else if (uDescription.length < 8) {
//     errors.uDescription = "Description should contain at least 8 letters";
//   }

//   return errors;
// };


// useEffect(() => {
//   if (Object.keys(formErrors).length > 0 && isSubmit) {
//     console.log(formErrors);
//   }
// }, [formErrors, isSubmit]);

  return (<>

     <div  className="app">
    <Sidebar/> 
     <div  className="content">
     <Topbar/>


      <form className="MainContainer2">
      <h2 className="WelcomeText">Modifier  User</h2>
      <div className="InputContainer">
         <input
         className="Input"
          type="text" 
          placeholder="EndPoint"
          value={uUsername} 
          onChange={(e) => setUUsername(e.target.value)}
          required

       />
        {/* <p style={{color:"red"}}>{formErrors.uEndpoint}</p> */}


        <input
         className="Input"
         type="text" 
         value={uType_id}
         placeholder="Methode"
         onChange={(e) => setUType_id(e.target.value)}
         required
        />
               {/* <p style={{color:"red"}}>{formErrors.uMethod}</p> */}

          <input
         className="Input"
         placeholder="Description"
         type="text"
          value={uRole_id}
          onChange={(e) => setURole_id(e.target.value)}
          required
        />
         {/* <p style={{color:"red"}}>{formErrors.uDescription}</p> */}

      </div>

      <div className="ButtonContainer">

      <button  
      className="Button" 
      type="submit" 
      onClick={EditUserHandle}
      >Modifier User</button>    
    
      </div>

      </form>

        </div>
        </div>


    
  </>
  );
}


export default EditPermission;


