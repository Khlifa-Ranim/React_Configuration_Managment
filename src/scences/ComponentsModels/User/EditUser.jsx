import React, { useEffect, useState } from "react";
import Topbar from "../../global/Topbar";
import Sidebar from "../../global/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../../redux/UserSlices/EditUserSlice";
import "../User/NewUser.css";
import { useNavigate, useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { fetchRoles } from "../../../redux/RolesSlices/FetchRolesSlice";


const EditPermission = () => {
  const { id } = useParams(); //take the id from  the router
  const user = useSelector((state) => state.FetchUsersStore);

  const Navigate = useNavigate();

  const dispatch = useDispatch();

  const role_permission = useSelector((state) => state.FetchRolsStore);
  console.log("role:", role_permission.Roles);
  const roles_permissions = role_permission.Roles;
  console.log("roles_permissions", roles_permissions);

  const filteredRolesPermissions = roles_permissions.filter(
    (role) => role.name
  );

  useEffect(() => {
    dispatch(fetchRoles());
  }, []);

  const Users = user.users;
  console.log(Users);

  const existingPermission = Users.filter((f) => f.id == id);

  const { username, USER_TYPE, password,roles } = existingPermission[0];

  const [uUsername, setUUsername] = useState(username);
  // const [uType_id, setUType_id] = useState(USER_TYPE);
  const [uPassword, setUPassword] = useState(password);
  const [uRole, setURole] = useState(roles);

  console.log(password);
  console.log(USER_TYPE);
  console.log(username);

  const [formErrors, setFromErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const notify = () => {
    toast(" Update succeed  👌");
  };

  const EditUserHandle = (e) => {
    e.preventDefault();
    setFromErrors(validate(uPassword));
    setIsSubmit(true);

    console.table(uUsername, uPassword,uRole);

    if (Object.keys(formErrors).length === 0 && uPassword.trim() !== "") {
      dispatch(editUser({id:id,username:uUsername,password:uPassword,role:uRole}))
      setTimeout(() => Navigate("/FetchUser"), 200); // redirect after 3 seconds
    }

  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (e) => {
    e.preventDefault(); //this ligne permet de n'est pas reload the page when i click on the button
    setShowPassword(!showPassword);
  };

  const validate = (uPassword) => {
    const errors = {};

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,50}$/; // pattern to check if password has at least one uppercase, one lowercase, one digit, one special character, and is between 8 to 50 characters long

    if (!uPassword) {
      errors.uPassword = "Password is Required";
    }
    //  else if (password.length < 4) {
    //   errors.password = "Password should contain at least 4 characters";
    // }
    else if (!passwordPattern.test(uPassword)) {
      errors.uPassword =
        "Les mots de passe doivent comporter entre 8 et 50 caractères et doivent inclure au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial tel que !@#$%^&*.";
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

          <div
            className="container"
            style={{
              height: "200px",
              paddingTop: "80px",
              paddingBottom: "180px",
            }}
          >
            <form class="form">
              <p class="title">Edit User</p>
              <p class="message">Update account user </p>
              <label>
                <input
                  required=""
                  placeholder=""
                  type="text"
                  class="input"
                  value={uUsername}
                  // onChange={(e) => setUUsername(e.target.value)}
                />
                <span>Username</span>
                {/* <p style={{ color: "red" }}>{formErrors.username}</p> */}
              </label>

              <label>
                <div className="InputWithButton">
                  <input
                    class="input"
                    value={uPassword}
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      setUPassword(value);
                      setFromErrors({ ...formErrors, [name]: value });
                    }}
                  />
                  <span>Password</span>
                  <RemoveRedEyeIcon
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                    }}
                    onClick={togglePasswordVisibility}
                  />
                  <p style={{ color: "red" }}>{formErrors.uPassword}</p>
                </div>
              </label>
              <label>
                <select
                  id="role"
                  name="role"
                  class="input"
                  value={uRole}
                  onChange={(e) =>setURole(e.target.value) }

                >

                  {filteredRolesPermissions.map((role) => (
                    <option key={role.name} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>
                <span>Select a role for the user</span>
                <p style={{ color: "red" }}>{formErrors.role}</p>
              </label>

              {/* <label>
                <input
                  required=""
                  placeholder=""
                  type="text"
                  class="input"
                  value={uType_id}
                  onChange={(e) => setUType_id(e.target.value)}
                />
                <span>User Type</span>
                {/* {/* <p style={{ color: "red" }}>{formErrors.username}</p> */}
              {/* </label> */} 

              <div style={{ marginLeft: "40px" }}>
                <button
                  class="submit"
                  onClick={EditUserHandle}
                  style={{ width: "400px" }}
                >
                  Update User
                </button>
                <button
                  class="submit"
                  onClick={() => {
                    Navigate("/FetchUser");
                  }}
                  style={{
                    marginLeft: "20px",
                    background: "gray",
                    width: "400px",
                  }}
                >
                  Cancel{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPermission;
