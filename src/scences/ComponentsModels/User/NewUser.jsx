import React, { useEffect, useState } from "react";
import Topbar from "../../global/Topbar";
import Sidebar from "../../global/Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import {CreateUser}  from'../../../redux/UserSlices/NewUser'
import "../User/NewUser.css";
import { fetchRoles_permissions } from "../../../redux/Permission_RoleSlice/FeatchPermission_RoleSlice";
import { fetchTypes_Users} from "../../../redux/Types_UsersSlices/Featch_Types_Users";


const NewUser = () => {    
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifpassword, setVerifpassword] = useState('');
  const [role, setRole] = useState('');
  const [type, setType] = useState('');


  
  const [formErrors,setFromErrors]= useState({});
  const [isSubmit,setIsSubmit]= useState(false);


  const dispatch = useDispatch();
  // *************************Roles**************************
  const role_permission = useSelector((state) => state.FetchRoles_PermissionsStore);
  console.log("role_permissionsss:", role_permission.Permissions_Roles);
  const roles_permissions = role_permission.Permissions_Roles;
  console.log("roles_permissions", roles_permissions);

  const filteredRolesPermissions = roles_permissions.filter((role) => role.role_name);
  console.log("filteredRolesPermissions", filteredRolesPermissions);

  useEffect(() => {
    dispatch(fetchRoles_permissions());
  }, []);

    // *************************Types Users**************************
    const TypesUsers = useSelector((state) => state.Featch_Types_Users_SliceStore);
    console.log("TypesRoles:", TypesUsers);
    const Tab_Types_Users = TypesUsers.storeTypesUsers;


    const filteredTypesUsers = Tab_Types_Users.filter((role) => role.name);
    console.log("filteredTypesUsers", filteredTypesUsers);
  

    useEffect(() => {
      dispatch(fetchTypes_Users());
    }, []);



const CreateUserHandle=(e)=>{
  e.preventDefault();
  setFromErrors(validate(username ,password,verifpassword,role,type));
  setIsSubmit(true);

  console.table(username,password,verifpassword,role,type)
  if (Object.keys(formErrors).length === 0 && username.trim() !== '' && password.trim() !== ''&& verifpassword.trim() !== '') {
  dispatch(CreateUser({username,password}))
}
}


const validate = (username ,password,verifpassword,role,type) => {
  const errors = {};

  const name_pattern = /^[a-zA-Z\s]*$/;
  const description_pattern = /^[a-zA-Z\s'éèêàùîôç-]*$/;

  if (!username) {
    errors.username = "Name is Required";
  } else if (!name_pattern.test(username)) {
    errors.username = "Name should only contain letters and spaces";
  }
  else if (username.length <4) {
    errors.username = "Name should contain at least 4 letters";
  }
  if (!password) {
    errors.password = "Description is Required";
  } else if (!description_pattern.test(password)) {
    errors.password = "Description should only contain letters and spaces";
  }
  else if (password.length <4 ) {
    errors.password = "Description should contain at least 8 letters";
   }
  if (!verifpassword) {
    errors.verifpassword = "Description is Required";
  } else if (!description_pattern.test(verifpassword)) {
    errors.verifpassword = "Description should only contain letters and spaces";
  }
  else if (verifpassword.length <4 ) {
    errors.verifpassword = "Description should contain at least 4 letters";
  }
  else if (password !== verifpassword) { // add this condition
    errors.verifpassword = "Verification Password should match Password";}
    
    if (!role) {
      errors.role = "Role Permissions is Required";
    }
    if (!type) {
      errors.type = "Role Permissions is Required";
    }
  return errors;
};

useEffect(() => {
  if (Object.keys(formErrors).length > 0 && isSubmit) {
    console.log("formErrors",formErrors);
  }
}, [formErrors, isSubmit]);


  return (<>

     <div  className="app">
    <Sidebar/> 
     <div  className="content">
     <Topbar/>


      <form className="MainContainer3" onSubmit={CreateUserHandle}>
      <h2 className="WelcomeText">Créer Un Utilisateur</h2>
      <div className="InputContainer3">
      <label htmlFor="role">Username:</label>
         <input
         className="Input"
          type="text" 
          value={username} 
          onChange={(e) => 
            {
              const { name, value } = e.target;
              setUsername(value);
              setFromErrors({...formErrors, [name]: value});
            }}
       />
           <p style={{color:"red"}}>{formErrors.username}</p>

        <label htmlFor="role">Password:</label>
        <input
         className="Input"
         type="password"
          value={password}
          onChange={(e) => {
            const { name, value } = e.target;
            setPassword(value);
            setFromErrors({...formErrors, [name]: value});
          }}
          required
        />
             <p style={{color:"red"}}>{formErrors.password}</p>

     <label htmlFor="role">Verif Password:</label>
        <input
         className="Input"
         type="password" value={verifpassword}
          onChange={(e) => 
            {
              const { name, value } = e.target;
              setVerifpassword(value);
              setFromErrors({...formErrors, [name]: value});
            }}          
        />
       <p style={{color:"red"}}>{formErrors.verifpassword}</p>
         <label htmlFor="role">Select a Role Permissions:</label>
                <select id="role" name="role" className="Input"
                  onChange={(e) => {
                    const { value } = e.target;
                    setRole(value);
                    setFromErrors({ ...formErrors, role: value });
                  }}>
                  {filteredRolesPermissions.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.role_name}
                      
                    </option>
                  ))}
                </select>

            <p style={{color:"red"}}>{formErrors.role}</p>
            <label htmlFor="type">Select a Type For the User:</label>
                <select id="type" name="type" className="Input"
                  onChange={(e) => {
                    const { value } = e.target;
                    setRole(value);
                    setFromErrors({ ...formErrors, type: value });
                  }}>
                  {filteredTypesUsers.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                      
                    </option>
                  ))}
                </select>
            <p style={{color:"red"}}>{formErrors.type}</p>

      </div>
   

      <div className="ButtonContainer">

      <button  className="Button" type="submit" >Create User</button>    
    
      </div>

      </form>

        </div>
        </div>


    
  </>
  );
}


export default NewUser;


