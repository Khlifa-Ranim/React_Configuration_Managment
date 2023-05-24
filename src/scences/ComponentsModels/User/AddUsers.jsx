import React, { useEffect, useState } from "react";
import Topbar from "../../global/Topbar";
import Sidebar from "../../global/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { CreateUser } from "../../../redux/UserSlices/NewUser";
import "../User/NewUser.css";
// import { fetchRoles_permissions } from "../../../redux/Permission_RoleSlice/FeatchPermission_RoleSlice";
import { fetchRoles } from "../../../redux/RolesSlices/FetchRolesSlice";
import { useNavigate } from "react-router-dom";

import { createSlice } from "@reduxjs/toolkit";
import { Button, TextField } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const NewUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifpassword, setVerifpassword] = useState("");
  const [role, setRole] = useState("");

  const [formErrors, setFromErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { loading, error, user } = useSelector(
    (state) => state.CreateAddUserSlice
  );

  const role_permission = useSelector((state) => state.FetchRolsStore);
  console.log("role:", role_permission.Roles);
  const roles_permissions = role_permission.Roles;
  console.log("roles_permissions", roles_permissions);

  const filteredRolesPermissions = roles_permissions.filter(
    (role) => role.name
  );
  console.log("filteredRolesPermissions", filteredRolesPermissions);

  useEffect(() => {
    dispatch(fetchRoles());
  }, []);
  const CreateUserHandle = (e) => {
    e.preventDefault(); // prevent page reload
    setFromErrors(validate(username, password, verifpassword, role));
    setIsSubmit(true);

    console.table(username, password, verifpassword, role);
    if (
      Object.keys(formErrors).length === 0 &&
      username.trim() !== "" &&
      password.trim() !== "" &&
      verifpassword.trim() !== ""
    ) {
      dispatch(CreateUser({ username, password, role }));
      // setTimeout(() => Navigate("/FetchUser"), 22); // redirect after 3 seconds

    }
  };

  const validate = (username, password, verifpassword, role) => {
    const errors = {};

    const name_pattern = /^[a-zA-Z\s]*$/;
    const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,50}$/; // pattern to check if password has at least one uppercase, one lowercase, one digit, one special character, and is between 8 to 50 characters long

    if (!username) {
      errors.username = "Name is Required";
    } else if (!name_pattern.test(username)) {
      errors.username = "Name should only contain letters and spaces";
    } else if (username.length < 4) {
      errors.username = "Name should contain at least 4 letters";
    }

    if (!password) {
      errors.password = "Password is Required";
    }
    //  else if (password.length < 4) {
    //   errors.password = "Password should contain at least 4 characters";
    // }
    else if (!passwordPattern.test(password)) {
      errors.password = "Les mots de passe doivent comporter entre 8 et 50 caractères et doivent inclure au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial tel que !@#$%^&*.";
    }

    if (!verifpassword) {
      errors.verifpassword = "Verification Password is Required";
    } else if (verifpassword !== password) {
      errors.verifpassword = "Verification Password should match Password";
    }

    if (!role) {
      errors.role = "Role Permissions is Required";
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length > 0 && isSubmit) {
      console.log("formErrors", formErrors);
    }
  }, [formErrors, isSubmit]);

  // added state variables
  const [showPassword, setShowPassword] = useState(false);
  const [showVerificationPassword, setShowVerificationPassword] =
    useState(false);

  const togglePasswordVisibility = (e) => {
    e.preventDefault(); //this ligne permet de n'est pas reload the page when i click on the button
    setShowPassword(!showPassword);
  };

  const toggleVerificationPasswordVisibility = (e) => {
    e.preventDefault(); //this ligne permet de n'est pas reload the page when i click on the button
    setShowVerificationPassword(!showVerificationPassword);
  };


  return (
    <>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Topbar />
          <div className="container" style={{height:"200px", paddingTop:"80px",paddingBottom:"180px"}}>

          <div className="error">{error}</div>

          {error && <div className="error">{error}</div>}

          {loading ? (
            <div>
              Loading...
              {Navigate('/FetchUser')} 
  
            </div>
          ) : (
          

            <form class="form">
              <p class="title">Add Users</p>
              <p class="message">Create new accounts</p>
                <label>
                  <input
                    required=""
                    placeholder=""
                    type="text"
                    class="input"
                    value={username}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      setUsername(value);
                      setFromErrors({ ...formErrors, [name]: value });
                    }}
                  />
                  <span>Username</span>
                  <p style={{ color: "red" }}>{formErrors.username}</p>
                </label>

                <label>
                  <div className="InputWithButton">
                    <input
                      class="input"
                      value={password}
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => {
                        const { name, value } = e.target;
                        setPassword(value);
                        setFromErrors({ ...formErrors, [name]: value });
                      }}
                    />
                    <span>PassWord</span>
                    <RemoveRedEyeIcon
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                      }}
                      onClick={togglePasswordVisibility}
                    />
                    <p style={{ color: "red" }}>{formErrors.password}</p>
                  </div>
                </label>

              <label>
                <div >
                  <input
                    class="input"
                    type={showVerificationPassword ? "text" : "password"}
                    value={verifpassword}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      setVerifpassword(value);
                      setFromErrors({ ...formErrors, [name]: value });
                    }}
                  />
                  <span>Verification Password</span>
                  <RemoveRedEyeIcon
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                    }}
                    onClick={toggleVerificationPasswordVisibility}
                  />

                  <p style={{ color: "red" }}>{formErrors.verifpassword}</p>
                </div>
              </label>

              <label>
                <select
                  id="role"
                  name="role"
                  class="input"
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setRole(value);
                    setFromErrors({ ...formErrors, [name]: value });
                  }}
                >
                    <option value=""></option> {/* Empty option */}

                  {filteredRolesPermissions.map((role) => (
                    <option key={role.name} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>
                <span>Select a role for the user</span>
                <p style={{ color: "red" }}>{formErrors.role}</p>
              </label>
              <div  style={{marginLeft:"40px"}}>
                <button
                  class="submit"
                  disabled={loading}
                  onClick={CreateUserHandle}
                 style={{width:"400px"}}
                >
                  {loading ? "Creating user..." : "Create user"}
                </button>
                <button
                  class="submit"
                  onClick={() => {
                    Navigate("/FetchUser");
                  }}
                  style={{ marginLeft: "20px", background: "gray" ,width:"400px"}}
                >
                  Cancel{" "}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      </div>
    </>
  );
};

export default NewUser;
