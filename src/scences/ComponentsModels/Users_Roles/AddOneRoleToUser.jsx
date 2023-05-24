import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRoles } from "../../../redux/RolesSlices/FetchRolesSlice";
import { fetchPermissions } from "../../../redux/PermissionSlices/FetchPermissionsSlice";
import { CreateUsers_Roles } from "../../../redux/Users_RolesSlice/AddUsersRolesSlice";
import { fetchUsers } from "../../../redux/UserSlices/FetchUserSlice";

import Topbar from "../../global/Topbar";
import Sidebar from "../../global/Sidebar";
import "../User/NewUser.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Roles = () => {
  const [user_id, setUser_id] = useState([]);
  const [role_id, setRole_id] = useState([]);

  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.FetchRolsStore);
  console.log("role:", role.Roles);
  const roles = role.Roles;

  const filteredRoless = roles.filter((role) => role.name);
  console.log("filteredRolessss", filteredRoless);

  /***********************Users*********************** */
  const user = useSelector((state) => state.FetchUsersStore);
  const Users = user.users;
  console.log("Users", Users);

  const FilterUsers = Users.filter((user) => user.username);
  console.log("FilterUsers", FilterUsers);

  useEffect(() => {
    dispatch(fetchRoles());
  }, []); // run useEffect when roleDeleted changes

  useEffect(() => {
    dispatch(fetchPermissions());
  }, []);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const CreateRoleUser = (e) => {
    e.preventDefault();
    dispatch(
      CreateUsers_Roles({ user_id: user_id.user_id, role_id: role_id.role_id })
    );
    console.log("user_id,Role_id", user_id.user_id, role_id.role_id);
    setTimeout(() => Navigate("/FeatchRolesUsers"), 20);
  };

  return (
    <>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Topbar />
          {/* <div>
            <form className="MainContainer2">
              <h2 className="WelcomeText" style={{marginTop:"20px",marginBottom:"40px"}}> Create a Role to a User</h2>
              <div className="InputContainer">
                <label htmlFor="role">Select a role:</label>
                <select
                  id="role"
                  name="role"
                  className="Input"
                  onChange={(e) => {
                    setRole_id({ role_id: Number(e.target.value) });
                    // console.log("id_role:", e.target.value);
                  }}
                >
                  {filteredRoless.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="permission" style={{ marginLeft: "440px" }}>
                  Select a user:
                </label>
                <select
                  id="user"
                  name="user"
                  className="Input"
                  style={{ width: "880px", marginLeft: "94px" }}
                  onChange={(e) => {
                    setUser_id({ user_id: Number(e.target.value) });
                  }}
                >
                  {FilterUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginTop: "60px", marginBottom: "60px" }}>
                <Button
                  variant="contained"
                  type="submit"
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "#A4A9FC",
                    width: "200px",
                    height: "50px",
                  }}
                  onClick={CreateRoleUser}
                >
                  Add New Role to User
                </Button>
                <Button
                  variant="contained"
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "black",
                    width: "200px",
                    height: "50px",
                  }}
                  onClick={() => {
                    Navigate("/FeatchRolesUsers");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div> */}
          <div
            className="container"
            style={{
              height: "200px",
              paddingTop: "80px",
              paddingBottom: "180px",
            }}
          >
            <form class="form">
              <p class="title">Add One Role To User</p>
              <p class="message"> Create Relation one Role To User</p>

              <label>
                <label htmlFor="type"> Select User :</label>
                <select
                  required=""
                  type="text"
                  class="input"
                  onChange={(e) => {
                    setUser_id({ user_id: Number(e.target.value) });
                  }}
                >
                  {FilterUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <label htmlFor="type"> Select Role :</label>
                <select
                  required=""
                  type="text"
                  class="input"
                  onChange={(e) => {
                    setRole_id({ role_id: Number(e.target.value) });
                    // console.log("id_role:", e.target.value);
                  }}
                >
                  {filteredRoless.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </label>
    

              <div style={{ marginLeft: "40px" }}>
                <button
                  class="submit"
                  style={{ width: "400px" }}
                  onClick={CreateRoleUser}
                >
                  Add A Role To User{" "}
                </button>
                <button
                  class="submit"
                  style={{
                    marginLeft: "20px",
                    background: "gray",
                    width: "400px",
                  }}
                  onClick={() => {
                    Navigate("/FeatchRolesUsers");
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
export default Roles;
