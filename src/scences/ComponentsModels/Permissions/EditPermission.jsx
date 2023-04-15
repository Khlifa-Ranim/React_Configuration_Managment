import React, { useEffect, useState } from "react";
import Topbar from "../../global/Topbar";
import Sidebar from "../../global/Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import {editPermission}  from'../../../redux/PermissionSlices/EditPermissionSlice'
import "../User/NewUser.css";
import { useNavigate, useParams } from "react-router-dom";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPermission = () => {    
  
  const {id}=useParams(); //take the id from  the router
  const permission = useSelector((state) => state.FetchPermissionStore);


  const navigate=useNavigate();

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
  setTimeout(() => navigate("/FetchPermissions"), 200); // redirect after 3 seconds

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


      <form className="MainContainer2">
      <h2 className="WelcomeText">Modifier  Permission</h2>
      <div className="InputContainer">
         <input
         className="Input"
          type="text" 
          placeholder="EndPoint"
          value={uEndpoint} 
          onChange={(e) => {
            const { name, value } = e.target;
            setUEndpoint(value);
            setFromErrors({...formErrors, [name]: value});
          }}
          
       />
        <p style={{color:"red"}}>{formErrors.uEndpoint}</p>


        {/* <input
         className="Input"
         type="text" 
         value={uMethod}
         placeholder="Methode"
         onChange={(e) => {
          const { name, value } = e.target;
          setUMethod(value);
          setFromErrors({...formErrors, [name]: value});
        }}
        /> */}
               <select className="Input"
                   value={uMethod}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setUMethod(value);
                    setFromErrors({...formErrors, [name]: value});
                  }}>
                  <option > </option>
                   <option > POST</option>
                    <option > GET</option>
                    <option > DELETE</option>
                    <option > PUT</option>
                    <option > PATCH</option>
                </select>
               <p style={{color:"red"}}>{formErrors.uMethod}</p>

          <input
         className="Input"
         placeholder="Description"
         type="text"
          value={uDescription}
          onChange={(e) => {
            const { name, value } = e.target;
            setUDscription(value);
            setFromErrors({...formErrors, [name]: value});
          }}
        />
         <p style={{color:"red"}}>{formErrors.uDescription}</p>

      </div>

      <div className="ButtonContainer">

      <button  
      className="Button" 
      type="submit" 
      onClick={EditPermissionHandle}
      >Modifier Permission</button>    
    
      </div>

      </form>

        </div>
        </div>


    
  </>
  );
}


export default EditPermission;


