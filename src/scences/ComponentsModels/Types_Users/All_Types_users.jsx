

import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import Topbar from "../../global/Topbar";
import Sidebar from "../../global/Sidebar";
import "../../../index.css";
//import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTypes_Users} from "../../../redux/Types_UsersSlices/Featch_Types_Users";
import { deleteTypes } from "../../../redux/Types_UsersSlices/DeleteTypesUsers";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const TypesUsers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const TypesUsers = useSelector((state) => state.Featch_Types_Users_SliceStore);
  console.log("TypesRoles:", TypesUsers);
  const Tab_Types_Users = TypesUsers.storeTypesUsers;


  const notify = () => {
    toast(" Delete succeed  👌");
  };

  useEffect(() => {
    dispatch(fetchTypes_Users());
  }, []);

  console.log(Tab_Types_Users); // <-- add this line to check the value of user.users
  
  
  // const fetchPermissionn = (id, roles_permissions) => {
  //   console.log("fetch one Role active");
  //   console.log("roles_permissions:", roles_permissions); // add this line to check the value of roles_permissions
  //   const selectedPermission = roles_permissions.find((item) => item.permission_names);
  //   console.log("selectedPermission", selectedPermission);
  //   // dispatch(fetchRolesPermission(id));
  //   navigate(`/FetchRolesPermissionById/${id}`);
  // };


  const getRowId = (row, index) => {
    return (index + 1).toString();
  };

  const DeleteTypesUsers = (id) => {
    console.log("delete UsersTypes active");
    notify(); // display toast notification
    dispatch(deleteTypes(id));
  };

  const [searchTerm, setSearchTerm] = useState("");
  console.log(searchTerm);

  
  const rows = 
              TypesUsers.loading
              ? []
              : TypesUsers.error
              ? []
              : Tab_Types_Users.map((TypesUsers, index) => ({
                id: TypesUsers.id,
                name: TypesUsers.name,
                description: TypesUsers.description,
                id: getRowId(TypesUsers, index),

              }));

const filteredRows = rows.filter((row) =>
row.name.toLowerCase().includes(searchTerm.toLowerCase())
);
console.log(filteredRows);


  const columns = [
    { field: "id", headerName: "id", flex: 0.5 },
    {
        field: "description",
        headerName: "description",
        flex: 1,
        cellClassName: "name-column--cell",
      },
  
      // {
      //   field: "id",
      //   headerName: "idd",
      //   flex: 1,
      //   cellClassName: "name-column--cell",
      // },
    { field: "name", headerName: "name" },
  
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row }) => {
        
        return (
          <>
               {/* <Button
              variant="contained"
              color="secondary"
              onClick={() => fetchPermissionn(row.id)}
              style={{ marginRight: "10px", backgroundColor: "#a8e6cf" }} // add margin-right inline style
            >
              Read
            </Button> */}

            <Button
              variant="contained"
              color="secondary"
              onClick={() => DeleteTypesUsers(row.id)}
              style={{ marginRight: "10px", backgroundColor: "#FFC0CB" }} // add margin-right inline style
            >
              Delete
            </Button>

            <Link to={`/EditTypesUsers/${row.id}`}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  // setId(row.id)
                }}
                style={{ marginRight: "10px" }} // add margin-right inline style
              >
                Edit
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <Topbar />
        <Box m="20px">
        <Header
        title="Les Types Utilisateurs"
        subtitle="Listes Des Types Utilisateur"
      />

          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
              },
            }}
          >
            <ToastContainer />
            <div style={{ position: "relative" }}>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                style={{
                  height: "44px",
                  width: "34%",
                  backgroundColor: "#eeeeee",
                  paddingLeft: "44px",
                  backgroundImage:
                    'url("https://cdn-icons-png.flaticon.com/512/149/149852.png")',
                  backgroundSize: "20px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "12px 50%",
                  border: "none",
                  borderRadius: "4px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
                placeholder="Search With Roles Name..."
              />
            </div>
            <Link to="/AddUsersTypes">
              <Button
                className="button"
                variant="contained"
                color="secondary"
                style={{
                  marginLeft: "400px",
                  height: "44px",
                  width: "40%",
                  backgroundColor: "#86f3b8",
                  marginTop: "14px",
                  fontSize: "11px",
                  fontFamily: "Arial",
                  fontWeight: "bold",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  borderRadius: "4px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  transition: "all 0.2s ease-in-out",
                  display: "flex",
                  justifyContent: "center",
                }}// add margin-right inline style 
                 >
                Add New Type Users
              </Button>
            </Link>

<DataGrid
  rows={filteredRows}
  columns={columns}
  components={{ Toolbar: GridToolbar }}
  // getRowId={(row) => row.role_name}
  getRowId={(row) => row.id}

  // onRowClick={(row) => fetchPermissionn(row.id, Tab_Types_Users)}
  />

          </Box>
        </Box>
      </div> 
    </div> 
  );

    }
export default TypesUsers;

// import { Box, Button } from "@mui/material";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { tokens } from "../../../theme";
// import Header from "../../../components/Header";
// import { useTheme } from "@mui/material";
// import Topbar from "../../global/Topbar";
// import Sidebar from "../../global/Sidebar";
// import "../../../index.css";
// //import { useHistory } from 'react-router-dom';
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchTypes_Users} from "../../../redux/Types_UsersSlices/Featch_Types_Users";
// import { deleteRolePermissions } from "../../../redux/Permission_RoleSlice/DeletePermissionRolesSlice";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { v4 as uuidv4 } from 'uuid';

// const TypesUsers = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const navigate = useNavigate();

//   const dispatch = useDispatch();
//   const TypesRoles = useSelector((state) => state.Featch_Types_Users_SliceStore);
//   console.log("TypesRoles:", TypesRoles);
//   const Tab_Types_Users = TypesRoles.storeTypesUsers;


//   const notify = () => {
//     toast(" Delete succeed  👌");
//   };

//   useEffect(() => {
//     dispatch(fetchTypes_Users());
//   }, []);

//   console.log(Tab_Types_Users); // <-- add this line to check the value of user.users
  
  
//   const fetchPermissionn = (id, roles_permissions) => {
//     console.log("fetch one Role active");
//     console.log("roles_permissions:", roles_permissions); // add this line to check the value of roles_permissions
//     const selectedPermission = roles_permissions.find((item) => item.permission_names);
//     console.log("selectedPermission", selectedPermission);
//     // dispatch(fetchRolesPermission(id));
//     navigate(`/FetchRolesPermissionById/${id}`);
//   };


//   const getRowId = (row, index) => {
//     return (index + 1).toString();
//   };

//   const DeleteRolePermissions = (id) => {
//     console.log("delete roleprmission active");
//     notify(); // display toast notification
//     dispatch(deleteRolePermissions(id));
//     // navigate("/FetchRoles");

//   };

//   const [searchTerm, setSearchTerm] = useState("");
//   console.log(searchTerm);

  
//   const rows = 
//               TypesRoles.loading
//               ? []
//               : TypesRoles.error
//               ? []
//               : TypesRoles.Tab_Types_Users.map((TypesRoles, index) => ({
//                   ...TypesRoles,
//                   // id: TypesRoles.name,
//                   id: getRowId(TypesRoles, index),

//               }));

// const filteredRows = rows.filter((row) =>
// row.name.toLowerCase().includes(searchTerm.toLowerCase())
// );
// console.log(filteredRows);


//   const columns = [
//     { field: "id", headerName: "id", flex: 0.5 },
//     {
//         field: "description",
//         headerName: "description",
//         flex: 1,
//         cellClassName: "name-column--cell",
//       },
  
//       {
//         field: "id",
//         headerName: "idd",
//         flex: 1,
//         cellClassName: "name-column--cell",
//       },
//     { field: "name", headerName: "name" },
  
//     {
//       field: "accessLevel",
//       headerName: "Access Level",
//       flex: 1,
//       renderCell: ({ row }) => {
        
//         return (
//           <>
//               <Button
//               variant="contained"
//               color="secondary"
//               onClick={() => fetchPermissionn(row.id)}
//               style={{ marginRight: "10px", backgroundColor: "#a8e6cf" }} // add margin-right inline style
//             >
//               Read
//             </Button>

//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={() => DeleteRolePermissions(row.id)}
//               style={{ marginRight: "10px", backgroundColor: "#FFC0CB" }} // add margin-right inline style
//             >
//               Delete
//             </Button>
//             <Link to={`/EditRole/${row.id}`}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => {
//                   // setId(row.id)
//                 }}
//                 style={{ marginRight: "10px" }} // add margin-right inline style
//               >
//                 Edit
//               </Button>
//             </Link>
//           </>
//         );
//       },
//     },
//   ];

//   return (
//     <div className="app">
//       <Sidebar />
//       <div className="content">
//         <Topbar />
//         <Box m="20px">
//         <Header
//         title="Les Types Utilisateurs"
//         subtitle="Listes Des Types Utilisateur"
//       />

//           <Box
//             m="40px 0 0 0"
//             height="75vh"
//             sx={{
//               "& .MuiDataGrid-root": {
//                 border: "none",
//               },
//               "& .MuiDataGrid-cell": {
//                 borderBottom: "none",
//               },
//               "& .name-column--cell": {
//                 color: colors.greenAccent[300],
//               },
//               "& .MuiDataGrid-columnHeaders": {
//                 backgroundColor: colors.blueAccent[700],
//                 borderBottom: "none",
//               },
//               "& .MuiDataGrid-virtualScroller": {
//                 backgroundColor: colors.primary[400],
//               },
//               "& .MuiDataGrid-footerContainer": {
//                 borderTop: "none",
//                 backgroundColor: colors.blueAccent[700],
//               },
//               "& .MuiCheckbox-root": {
//                 color: `${colors.greenAccent[200]} !important`,
//               },
//               "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
//                 color: `${colors.grey[100]} !important`,
//               },
//             }}
//           >
//             <ToastContainer />
//             <div style={{ position: "relative" }}>
//               <input
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 type="text"
//                 style={{
//                   height: "44px",
//                   width: "34%",
//                   backgroundColor: "#eeeeee",
//                   paddingLeft: "44px",
//                   backgroundImage:
//                     'url("https://cdn-icons-png.flaticon.com/512/149/149852.png")',
//                   backgroundSize: "20px",
//                   backgroundRepeat: "no-repeat",
//                   backgroundPosition: "12px 50%",
//                   border: "none",
//                   borderRadius: "4px",
//                   boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
//                 }}
//                 placeholder="Search With Roles Name..."
//               />
//             </div>
//             <Link to="/AddRole">
//               <Button
//                 className="button"
//                 variant="contained"
//                 color="secondary"
//                 style={{ marginRight: "10px" }} // add margin-right inline style
//               >
//                 Ajouter Un Role +
//               </Button>
//             </Link>

// <DataGrid
//   rows={     TypesRoles.loading
//     ? []
//     : TypesRoles.error
//     ? []
//     : TypesRoles.Tab_Types_Users.map((TypesRoles, index) => ({
//         ...TypesRoles,
//         // id: TypesRoles.name,
//         id: getRowId(TypesRoles, index),

//     }))}
//   columns={columns}
//   components={{ Toolbar: GridToolbar }}
//   // getRowId={(row) => row.role_name}
//   getRowId={(row) => row.id}

//   onRowClick={(row) => fetchPermissionn(row.id, Tab_Types_Users)}
//   />

//           </Box>
//         </Box>
//       </div>
//     </div>
//   );
// };

// export default TypesUsers;
