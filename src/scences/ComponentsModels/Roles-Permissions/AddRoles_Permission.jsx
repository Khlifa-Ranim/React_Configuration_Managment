import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRoles } from "../../../redux/RolesSlices/FetchRolesSlice";
import { fetchPermissions } from "../../../redux/PermissionSlices/FetchPermissionsSlice";
import { CreateRole_Permissions } from "../../../redux/Permission_RoleSlice/AddRolePermissions";

import Topbar from "../../global/Topbar";
import Sidebar from "../../global/Sidebar";
import "../User/NewUser.css";
import Select from "react-select";
import { Multiselect } from "multiselect-react-dropdown";

const Roles = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.FetchRolsStore);
  console.log("role:", role.Roles);
  const roles = role.Roles;

  const [roleDeleted, setRoleDeleted] = useState(false); // state variable to keep track of deleted role
  const filteredRoless = roles.filter((role) => role.name);
  console.log("filteredRolessss", filteredRoless);

  const permission = useSelector((state) => state.FetchPermissionStore);
  const permissions = permission.Permissions;

  // const CreateRolePermissionHandle = (e) => {
  //   e.preventDefault();  
  //     dispatch(CreateRole_Permissions({role_id,permission_id}));
  //     // notify(); // display toast notification
  //     // setTimeout(() => navigate('/FetchRoles'), 3000); // redirect after 3 seconds
    
  // };
  const [permission_id, setPermission_id] = useState([]);
  const [role_id, setRole_id] = useState([]);

  const CreateRolePermissionHandle = (e) => {
    e.preventDefault();  
    dispatch(CreateRole_Permissions({ role_id, permission_id }))
    console.log(role_id, permission_id )
  };

  const FilterPermission = permissions.filter(
    (permission) => permission.endpoint
  );
  console.log("FilterPermission", FilterPermission);

  useEffect(() => {
    dispatch(fetchRoles());
    if (roleDeleted) {
      window.location.reload(); // trigger page refresh after role is deleted
    }
  }, [roleDeleted]); // run useEffect when roleDeleted changes

  useEffect(() => {
    dispatch(fetchPermissions());
  }, []);

  /*****************************PERMISSION SELECT*************************/
  // const [permission_id, setPermission_id] = useState([]); // state variable to keep track of selected permissions

  const [selectAll, setSelectAll] = useState(false); // state variable to keep track of select all option

  // function to handle select all option
  const handleSelectAll = () => {
    if (selectAll) {
      // unselect all options
      setPermission_id([]);
    } else {
      // select all options
      setPermission_id(
        FilterPermission.map((permission) => permission.id)
      );
    }
    // toggle select all option
    setSelectAll(!selectAll);
  };

  /*****************************Roles SELECT*************************/
  // const [role_id, setRole_id] = useState([]); // state variable to keep track of selected permissions

  const [selectAlll, setSelectAlll] = useState(false); // state variable to keep track of select all option

  // function to handle select all option
  const handleSelectRoleAll = () => {
    if (selectAlll) {
      // unselect all options
      setRole_id([]);
    } else {
      // select all options
      setRole_id(filteredRoless.map((role) => role.id));
    }
    // toggle select all option
    setSelectAlll(!selectAlll);
  };

  return (
    <>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Topbar />
          <div>
            <form className="MainContainer2" onSubmit={CreateRolePermissionHandle}>
              <h2 className="WelcomeText"> Create Permission To A Role</h2>

              <label htmlFor="permission" className="NameInput">Select a Roles:</label>
              
              <div className="styleMultiselect">
                <Multiselect
                  className="Multiselect"
                  options={filteredRoless}
                  selectedValues={role_id}
                  onSelect={(selectedList) => setRole_id(selectedList)}
                  onRemove={(selectedList) => setRole_id(selectedList)}
                  displayValue="id"
                />
              </div>

              <div className="styleMultiselect2">
                <input
                  type="checkbox"
                  checked={selectAlll}
                  onChange={handleSelectRoleAll}
                />
                <label htmlFor="selectAll" className="Input2">Select All Roles</label>
              </div>


              <label htmlFor="permission" className="NameInput">Select a Permissions:</label>

              <div className="styleMultiselect">
                <Multiselect
                  className="Multiselect"
                  options={FilterPermission}
                  selectedValues={permission_id}
                  onSelect={(selectedList) =>
                    setPermission_id(selectedList)
                  }
                  onRemove={(selectedList) =>
                    setRoleDeleted(selectedList)
                  }
                  displayValue="id"
                />
              </div>

              <div className="styleMultiselect2">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                ></input>
                <label htmlFor="selectAll" className="Input2">Select All Permissions</label>
              </div>

              <div className="ButtonContainer">
                <button className="Button" type="submit">
                  Create Permission To A Role
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
