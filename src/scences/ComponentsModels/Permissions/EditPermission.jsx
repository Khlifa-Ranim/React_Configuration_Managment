import React, { useEffect, useState } from "react";
import Topbar from "../../global/Topbar";
import Sidebar from "../../global/Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import {editPermission}  from'../../../redux/PermissionSlices/EditPermissionSlice'
import "../User/NewUser.css";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField, useTheme } from "@mui/material";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPermission = () => {    
  
  const {id}=useParams(); //take the id from  the router
  const permission = useSelector((state) => state.FetchPermissionStore);


  const Navigate=useNavigate();

  const dispatch = useDispatch();

  const Permissions=permission.Permissions;


  const existingPermission=Permissions.filter(f=>f.id==id);

  const {description,endpoint,method}=existingPermission[0];

  const [uEndpoint, setUEndpoint] = useState(endpoint);
  const [uMethod, setUMethod] = useState(method);
  const [uDescription, setUDscription] = useState(description);

  const [formErrors,setFromErrors]= useState({});
  const [isSubmit,setIsSubmit]= useState(false);

  const notify=()=>{
    toast(" Update succeed  👌")
   }

const EditPermissionHandle=(e)=>{
  e.preventDefault();
  console.table(uEndpoint,uMethod,uDescription)

  setFromErrors(validate(uEndpoint,uMethod,uDescription));
  setIsSubmit(true);

  if (Object.keys(formErrors).length === 0 && uEndpoint.trim() !==''&& uDescription.trim() !== '') {

  dispatch(editPermission({id:id,endpoint:uEndpoint,method:uMethod,description:uDescription}))
  notify(); // display toast notification
  setTimeout(() => Navigate("/FetchPermissions"), 200); // redirect after 3 seconds

}
}

const validate = (uEndpoint,uMethod,uDescription) => {
  const errors = {};

  const endpoint_pattern = /^[a-zA-Z\s]*$/;
  const method_pattern = /^(GET|PUT|DELETE|POST)$/;
  const description_pattern = /^[a-zA-Z\s'éèêàùîôç-]*$/;

  if (!uEndpoint) {
    errors.uEndpoint = "Endpoint is Required";
  } else if (!uEndpoint.startsWith("/")) {
    errors.uEndpoint = "Endpoint should start with /";
  } else if (uEndpoint.length <2) {
    errors.uEndpoint = "Endpoint should contain at least 8 letters";
  }

  if (!uMethod) {
    errors.uMethod = "Method is Required";
  }

  //  else if (!method_pattern.test(uMethod)) {
  //   errors.uMethod = "Method should be GET, PUT, DELETE, or POST";
  // }

  if (!uDescription) {
    errors.uDescription = "Description is Required";
  } else if (!description_pattern.test(uDescription)) {
    errors.uDescription = "Description should only contain letters and spaces";
  } else if (uDescription.length < 8) {
    errors.uDescription = "Description should contain at least 8 letters";
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


          <div className="container" style={{ paddingTop:"80px",paddingBottom:"180px"}}>

<form class="form">
  <p class="title"> Edit Permission</p>
  <label>
    <input
      required=""
      type="text"
      class="input"
      placeholder="EndPoint"
          value={uEndpoint} 
          onChange={(e) => {
            const { name, value } = e.target;
            setUEndpoint(value);
            setFromErrors({...formErrors, [name]: value});
          }}
    />
    <span>Endpoint</span>
    <p style={{color:"red"}}>{formErrors.uEndpoint}</p>
  </label>



  <label>
  <label htmlFor="type">Select a Methoe :</label>
    <select
      required=""
      type="text"
      class="input"
      value={uMethod}
      onChange={(e) => {
        const { name, value } = e.target;
        setUMethod(value);
        setFromErrors({...formErrors, [name]: value});
      }}
    >
             <option > </option>
                    <option > POST</option>
                    <option > GET</option>
                    <option > DELETE</option>
                    <option > PUT</option>
                    <option > PATCH</option>
    </select>
    <p style={{color:"red"}}>{formErrors.uMethod}</p>
  </label>

  <label>
    <input
      required=""
      type="text"
      class="input"
      value={uDescription}
          onChange={(e) => {
            const { name, value } = e.target;
            setUDscription(value);
            setFromErrors({...formErrors, [name]: value});
          }}
    />
    <span>Description</span>
    <p style={{color:"red"}}>{formErrors.uDescription}</p>
  </label>

  <div style={{marginLeft:"40px"}}>
    <button class="submit" style={{width:"400px"}} onClick={EditPermissionHandle}>
Edit Permission   </button>
    <button
      class="submit"
      style={{ marginLeft: "20px", background: "gray" ,width:"400px"}}
      onClick={() => {
        Navigate("/FetchPermissions");
      }}                >
      Cancel{" "}
    </button>
  </div>
</form>
        </div>
        </div>

</div>
    
  </>
  );
}


export default EditPermission;


