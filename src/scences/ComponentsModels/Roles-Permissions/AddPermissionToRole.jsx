import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRoles } from "../../../redux/RolesSlices/FetchRolesSlice";
import { fetchPermissions } from "../../../redux/PermissionSlices/FetchPermissionsSlice";
import { CreateRole_Permissions } from "../../../redux/Permission_RoleSlice/AddRolePermissions";

import Topbar from "../../global/Topbar";
import Sidebar from "../../global/Sidebar";
import "../User/NewUser.css";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";

const Roles = () => {
  const [role_id, setRole_id] = useState([]);
  const [permission_id, setPermission_id] = useState([]);

  const dispatch = useDispatch();
  const role = useSelector((state) => state.FetchRolsStore);
  console.log("role:", role.Roles);
  const roles = role.Roles;

  const filteredRoless = roles.filter((role) => role.name);
  console.log("filteredRolessss", filteredRoless);

  const permission = useSelector((state) => state.FetchPermissionStore);
  const permissions = permission.Permissions;
  console.log("permissions:", permission.Permissions);

  const FilterPermission = permissions.filter(
    (permission) => permission.endpoint
  );
  console.log("FilterPermission", FilterPermission);

  useEffect(() => {
    dispatch(fetchRoles());
  }, []); // run useEffect when roleDeleted changes

  useEffect(() => {
    dispatch(fetchPermissions());
  }, []);

  const Navigate = useNavigate();

  const notify = () => {
    toast(" Relation one Permission to one Role Added successfully👌");
  };

  const CreateRolePermissions = (e) => {
    e.preventDefault();
    dispatch(
      CreateRole_Permissions({
        role_id: role_id.role_id,
        permission_id: permission_id.permission_id,
      })
    );

    console.log(
      "id_roles,id_permissions",
      role_id.role_id,
      permission_id.permission_id
    );

    notify(); // display toast notification
    setTimeout(() => Navigate("/FeatchRole_Permission"), 800);
  };

  return (
    <>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Topbar />
          <div>
              <div className="container" style={{height:"200px", paddingTop:"80px",paddingBottom:"180px"}}>
                <ToastContainer />
<form class="form">
  <p class="title"> Add One permmission to role</p>
  <p class="message"> Create Permission to a role</p>


  <label>
  <label htmlFor="type">     Select  Role:</label>
    <select
      required=""
      type="text"
      class="input"
      onChange={(e)=>{
        setRole_id({role_id:Number (e.target.value)})
        // console.log("id_role:", e.target.value);
      }}
    >
               {filteredRoless.map((role) => (
                    <option key={role.id} value={role.id} 
                 
                    >
                      {role.name}
                    </option>
                  ))}
    </select>
  </label>

  <label>
  <label htmlFor="type">     Select  Permission</label>
    <select
      required=""
      type="text"
      class="input"
      onChange={(e) => {
        setPermission_id({ permission_id: Number(e.target.value) });
      }}
    >
         {FilterPermission.map((permission) => (
                    <option key={permission.id} value={permission.id}>
                      {permission.endpoint}
                    </option>
                  ))}
    </select>
  </label>
  <div style={{marginLeft:"40px"}}>
    <button class="submit" style={{width:"400px"}} onClick={CreateRolePermissions}>
Add Permission To Role  </button>
    <button
      class="submit"
      style={{ marginLeft: "20px", background: "gray" ,width:"400px"}}
      onClick={() => {
        Navigate("/FeatchRole_Permission");
      }}                >
      Cancel{" "}
    </button>
  </div>
</form>
</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Roles;
