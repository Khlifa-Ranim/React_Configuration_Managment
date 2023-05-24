import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRoles } from "../../../redux/RolesSlices/FetchRolesSlice";
import { CreateUsers_Roles } from "../../../redux/Users_RolesSlice/AddManyRolesToUserSlice";
import { fetchUsers } from "../../../redux/UserSlices/FetchUserSlice";

import Topbar from "../../global/Topbar";
import Sidebar from "../../global/Sidebar";
import "../User/NewUser.css";
import { Multiselect } from "multiselect-react-dropdown";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UsersRoles = () => {
  const dispatch = useDispatch();

  const [role_ids, setRole_ids] = useState([]);
  const [user_id, setUser_id] = useState({ user_id: null });

  /*******************************Roles select*********************** */

  const role = useSelector((state) => state.FetchRolsStore);
  const roles = role.Roles;

  const filteredRoles = roles.filter((role) => role.name);
  console.log("filteredRolessss", filteredRoles);

 const Navigate=useNavigate();

  /*****************************Users Select*************************/

  const user = useSelector((state) => state.FetchUsersStore);
  const Users=user.users;

 const FiltterAllUsers=Users.filter((user)=>user.username)
 console.log("FiltterAllUsers", FiltterAllUsers);


  
  useEffect(() => {
    dispatch(fetchRoles());
  }, []); 

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);


  const CreateRolesUserHandel = (e) => {
    e.preventDefault();  
    // const RolesIds = role_id.map((role) => role.id); // extract permission IDs from the selected permissions
    const RolesIds = role_ids.map((role) => role.id);
console.log( "RolesIds",RolesIds)
    dispatch(CreateUsers_Roles({
      role_ids:RolesIds,
      user_id:user_id.user_id }))
       
    console.log("user_id, RolesIds",user_id.user_id , RolesIds )
  };





  /*****************************Roles SELECT*************************/
  // const [role_id, setRole_id] = useState([]); // state variable to keep track of selected permissions

  const [selectAlll, setSelectAlll] = useState(false); // state variable to keep track of select all option

  // function to handle select all option
  const handleSelectRoleAll = () => {
    if (selectAlll) {
      // unselect all options
      setRole_ids(Number([]));
    } else {
      // select all options
      setRole_ids(filteredRoles.map((role) => role.name));
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

          <div className="container" style={{height:"200px", paddingTop:"80px",paddingBottom:"180px"}}>

<form class="form">
                <p class="title">Add Many Roles To User </p>
                <p class="message"> Create Relation Many Roles To A User</p>

                <label>
                  <label htmlFor="type"> Select User :</label>
                  <select
                    required=""
                    type="text"
                    class="input"
                    onChange={(e)=>{
                      setUser_id({user_id:Number (e.target.value)})
                    }}
                  >
                    {FiltterAllUsers.map((user) => (
                    <option key={user.id} value={user.id}
                   >
                      {user.username}
                    </option>
                  ))}
                  </select>
                </label>

                <label>
                  <label htmlFor="type"> Select Roles:</label>
                  <Multiselect
                    required=""
                    type="text"
                    class="input"
                    options={filteredRoles}
                    selectedValues={role_ids}
                    onSelect={(selectedList) => setRole_ids(selectedList)}
                    onRemove={(selectedList) => setRole_ids(selectedList)}
                    onChange={(selectedList) => {
                      setRole_ids({
                        role_id: Number(selectedList.target.value),
                      });
                    }}
                    value={role.id} 
                    displayValue="name"
                  />
                </label>

                <label>
                  <div style={{ marginLeft: "40px" }}>
                    <span style={{ color: "green" }}>
Select All Roles                    </span>

                    <input
                      style={{ width: "50px", height: "20px" }}
                      required=""
                      type="checkbox"
                      class="input"
                      checked={selectAlll}
                      onChange={handleSelectRoleAll}
                    ></input>
                  </div>
                </label>

                <div style={{ marginLeft: "40px" }}>
                  <button
                    class="submit"
                    style={{ width: "400px" }}
                    onClick={CreateRolesUserHandel}
                  >
Add Many Roles To User                  </button>
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
export default UsersRoles;
