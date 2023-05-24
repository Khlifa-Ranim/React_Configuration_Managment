// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchRoles } from "../../../redux/RolesSlices/FetchRolesSlice";
// import { fetchPermissions } from "../../../redux/PermissionSlices/FetchPermissionsSlice";
// import { CreateUsers_Roles } from "../../../redux/Users_RolesSlice/AddUsersRolesSlice";
// import { fetchUsers,fetchUser } from "../../../redux/UserSlices/FetchUserSlice";

// import Topbar from "../../global/Topbar";
// import Sidebar from "../../global/Sidebar";
// import "../User/NewUser.css";
// import Select from "react-select";
// import { Multiselect } from "multiselect-react-dropdown";

// const UsersRoles = () => {
//   const dispatch = useDispatch();

//   const [user_id, setUser_id] = useState([]);
//   const [role_id, setRole_id] = useState([]);


//   const role = useSelector((state) => state.FetchRolsStore);
//   console.log("role:", role.Roles);
//   const roles = role.Roles;

//   const filteredRoless = roles.filter((role) => role.id);
//   console.log("filteredRolessss", filteredRoless);

 

//   /*****************************Users Select*************************/

//   const user = useSelector((state) => state.FetchUsersStore);
//   const Users=user.users;
//   console.log("Users", Users);


//  const FiltterAllUsers=Users.filter((user)=>user.id)
//  console.log("FiltterAllUsers", FiltterAllUsers);

//   console.log(Users)



//   const CreateRolePermissionHandle = (e) => {
//     e.preventDefault();  
//     dispatch(CreateUsers_Roles({ role_id, user_id }))
//     console.log(role_id, user_id )
//   };

//   useEffect(() => {
//     dispatch(fetchRoles());

//   }, []); // run useEffect when roleDeleted changes

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, []);

//   /*****************************PERMISSION SELECT*************************/
//   // const [permission_id, setPermission_id] = useState([]); // state variable to keep track of selected permissions

//   const [selectAll, setSelectAll] = useState(false); // state variable to keep track of select all option

//   // function to handle select all option
//   const handleSelectAll = () => {
//     if (selectAll) {
//       // unselect all options
//       setUser_id([]);
//     } else {
//       // select all options
//       setUser_id(
//         FilterUser.map((user) => user.id)
        
//       );
//     }
//     // toggle select all option
//     setSelectAll(!selectAll);
//   };

//   /*****************************Roles SELECT*************************/
//   // const [role_id, setRole_id] = useState([]); // state variable to keep track of selected permissions

//   const [selectAlll, setSelectAlll] = useState(false); // state variable to keep track of select all option

//   // function to handle select all option
//   const handleSelectRoleAll = () => {
//     if (selectAlll) {
//       // unselect all options
//       setRole_id([]);
//     } else {
//       // select all options
//       setRole_id(filteredRoless.map((role) => role.role_id));
//     }
//     // toggle select all option
//     setSelectAlll(!selectAlll);
//   };

//   return (
//     <>
//       <div className="app">
//         <Sidebar />
//         <div className="content">
//           <Topbar />
//           <div>
//             <form className="MainContainer2" onSubmit={CreateRolePermissionHandle}>
//               <h2 className="WelcomeText">  Create a new Relation one Role to one User</h2>

//               <label htmlFor="permission" className="NameInput">Select a Roles:</label>
              
//               <div className="styleMultiselect">
//                 <Multiselect
//                   className="Multiselect"
//                   options={filteredRoless}
//                   selectedValues={role_id}
//                   onSelect={(selectedList) => setRole_id(selectedList)}
//                   onRemove={(selectedList) => setRole_id(selectedList)}
//                   displayValue="id"
//                 />
//               </div>

          


//               <label htmlFor="permission" className="NameInput">Select a User:</label>

//               <div className="styleMultiselect">
//                 <Multiselect
//                   className="Multiselect"
//                   options={FilterUser}
//                   selectedValues={user_id}
//                   onSelect={(selectedList) =>
//                     setUser_id(selectedList)
//                   }
//                   onRemove={(selectedList) =>
//                     setUser_id(selectedList)
//                   }
//                   displayValue="id"
//                 />
//               </div>


//               <div className="ButtonContainer">
//                 <button className="Button" type="submit">
//                   Create 
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default UsersRoles;
