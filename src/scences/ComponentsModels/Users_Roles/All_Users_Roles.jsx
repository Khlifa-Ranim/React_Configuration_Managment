
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
import { fetchUsers_Roles,fetchRolesPermission } from "../../../redux/Users_RolesSlice/Featch_Users_RolesSlice";
import { deleteRolePermissions } from "../../../redux/Permission_RoleSlice/DeletePermissionRolesSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const Users_Roles = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const Users_Roles = useSelector((state) => state.Featch_Users_Roles_SliceStore);
  console.log("role_permissionsss:", Users_Roles.UsersRoles);
  const Tab_Users_Roles = Users_Roles.UsersRoles;


  const notify = () => {
    toast(" Delete succeed  👌");
  };

  useEffect(() => {
    dispatch(fetchUsers_Roles());
  }, []);

//   console.log(role_permission.Permissions_Roles); // <-- add this line to check the value of user.users
  
  
  const fetchPermissionn = (id, roles_permissions) => {
    console.log("fetch one Role active");
    console.log("roles_permissions:", roles_permissions); // add this line to check the value of roles_permissions
    const selectedPermission = roles_permissions.find((item) => item.permission_names);
    console.log("selectedPermission", selectedPermission);
    // dispatch(fetchRolesPermission(id));
    navigate(`/FetchRolesPermissionById/${id}`);
  };


  const getRowId = (row, index) => {
    return (index + 1).toString();
  };

  const DeleteRolePermissions = (id) => {
    console.log("delete roleprmission active");
    notify(); // display toast notification
    dispatch(deleteRolePermissions(id));
    // navigate("/FetchRoles");

  };

  const [searchTerm, setSearchTerm] = useState("");
  console.log(searchTerm);


  const rows = 
              Users_Roles.loading
              ? []
              : Users_Roles.error
              ? []
              : Users_Roles.UsersRoles.map((Users_Roles, index) => ({
                  ...Users_Roles,
                  // id: roles_permissions.role_name,
                  id: getRowId(Users_Roles, index),

              }));

const filteredRows = rows.filter((row) =>
row.username.toLowerCase().includes(searchTerm.toLowerCase())
);
console.log(filteredRows);


  const columns = [
    { field: "id", headerName: "id", flex: 0.5 },
    {
        field: "roles_names",
        headerName: "roles_names",
        flex: 1,
        cellClassName: "name-column--cell",
      },
  
    { field: "username", headerName: "username" },
  
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row }) => {
        
        return (
          <>
              <Button
              variant="contained"
              color="secondary"
              onClick={() => fetchPermissionn(row.id)}
              style={{ marginRight: "10px", backgroundColor: "#a8e6cf" }} // add margin-right inline style
            >
              Read
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => DeleteRolePermissions(row.id)}
              style={{ marginRight: "10px", backgroundColor: "#FFC0CB" }} // add margin-right inline style
            >
              Delete
            </Button>
            <Link to={`/EditRole/${row.id}`}>
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
        title="Les Permissuions Users Roles"
        subtitle="Listes Des  Permissuions Users Roles"
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
                placeholder="Search With Username..."
              />
            </div>
            <Link to="/AddUsersRoles">
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
                Add New Users Roles
              </Button>
            </Link>
            <Link to="/AddManyUsersRoles">
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
                Add   Many Roles to one User
              </Button>
            </Link>

<DataGrid
  rows={filteredRows}
  columns={columns}
  components={{ Toolbar: GridToolbar }}
  // getRowId={(row) => row.role_name}
  getRowId={(row) => row.id}

//   onRowClick={(row) => fetchPermissionn(row.id, role_permission.Permissions_Roles)}
/>

          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Users_Roles;
