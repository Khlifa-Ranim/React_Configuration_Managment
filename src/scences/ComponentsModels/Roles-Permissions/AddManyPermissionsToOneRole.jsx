import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRoles } from "../../../redux/RolesSlices/FetchRolesSlice";
import { fetchPermissions } from "../../../redux/PermissionSlices/FetchPermissionsSlice";
import { CreateRole_allPermissions } from "../../../redux/Permission_RoleSlice/AddManyPermissionToOneRole";

import Topbar from "../../global/Topbar";
import Sidebar from "../../global/Sidebar";
import "../User/NewUser.css";
import { Multiselect } from "multiselect-react-dropdown";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Roles = () => {
  const dispatch = useDispatch();

  const [permission_ids, setPermission_ids] = useState([]);
  const [role_id, setRole_id] = useState({ role_id: null });

  /***********Roles********************************/

  const role = useSelector((state) => state.FetchRolsStore);
  console.log("role:", role.Roles);
  const roles = role.Roles;

  const filteredRoless = roles.filter((role) => role.name);
  console.log("filteredRolessss", filteredRoless);

  /*******************Permissions************************/

  const permission = useSelector((state) => state.FetchPermissionStore);
  const permissions = permission.Permissions;

  const FilterPermission = permissions.filter(
    (permission) => permission.permission_names
  );
  console.log("FilterPermission", FilterPermission);

  // const CreateRolePermissionHandle = (e) => {
  //   e.preventDefault();
  //     dispatch(CreateRole_Permissions({role_id,permission_id}));
  //     // notify(); // display toast notification
  //     // setTimeout(() => navigate('/FetchRoles'), 3000); // redirect after 3 seconds

  // };

  useEffect(() => {
    dispatch(fetchRoles());
  }, []); // run useEffect when roleDeleted changes

  useEffect(() => {
    dispatch(fetchPermissions());
  }, []);

  const Navigate = useNavigate();


  const CreateRolePermissionHandle = (e) => {
    e.preventDefault();
    const permissionIds = permission_ids.map((permission) => permission.id); // extract permission IDs from the selected permissions
    dispatch(
      CreateRole_allPermissions({
        permission_ids: permissionIds,
        role_id: role_id.role_id,
      })
    );
    // console.log("id_roles, id_permissions", role_id.role_id, permissionIds);
    // notify(); // display toast notification
    setTimeout(() => Navigate("/FeatchRole_Permission"), 800);
  };

  /*****************************PERMISSION SELECT*************************/
  // const [permission_id, setPermission_id] = useState([]); // state variable to keep track of selected permissions

  const [selectAll, setSelectAll] = useState(false); // state variable to keep track of select all option

  // function to handle select all option
  const handleSelectAll = () => {
    if (selectAll) {
      // unselect all options
      setPermission_ids([]);
    } else {
      // select all options
      setPermission_ids(FilterPermission.map((permission) => ({
        id: permission.id,
        permission_names: permission.permission_names
      })));
    }
    // toggle select all option
    setSelectAll(!selectAll);
  };
  
  return (
    <>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Topbar />
          <div>
            <div
              className="container"
              style={{
                height: "200px",
                paddingTop: "80px",
                paddingBottom: "180px",
              }}
            >
              <ToastContainer />
              <form class="form">
                <p class="title"> Add Many Permissions To A Role</p>
                <p class="message"> Create Permission to a role</p>

                <label>
                  <label htmlFor="type"> Select a Roles:</label>
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

                <label>
                  <label htmlFor="type"> Select a Permissions:</label>
                  <Multiselect
                    required=""
                    type="text"
                    class="input"
                    options={FilterPermission}
                    selectedValues={permission_ids}
                    onSelect={(selectedList) => setPermission_ids(selectedList)}
                    onRemove={(selectedList) => setPermission_ids(selectedList)}
                    onChange={(selectedList) => {
                      setPermission_ids({
                        permission_id: Number(selectedList.target.value),
                      });
                    }}
                    value={permission.id} // use permission_id here instead of permission.id
                    displayValue="permission_names"
                  />
                </label>

                <label>
                  <div style={{ marginLeft: "40px" }}>
                    <span style={{ color: "green" }}>
                      Select All Permissions
                    </span>

                    <input
                      style={{ width: "50px", height: "20px" }}
                      required=""
                      type="checkbox"
                      class="input"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    ></input>
                  </div>
                </label>

                <div style={{ marginLeft: "40px" }}>
                  <button
                    class="submit"
                    style={{ width: "400px" }}
                    onClick={CreateRolePermissionHandle}
                  >
                    Add New permissions to a role{" "}
                  </button>
                  <button
                    class="submit"
                    style={{
                      marginLeft: "20px",
                      background: "gray",
                      width: "400px",
                    }}
                    onClick={() => {
                      Navigate("/FeatchRole_Permission");
                    }}
                  >
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
