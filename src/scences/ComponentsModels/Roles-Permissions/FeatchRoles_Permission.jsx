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
import {
  fetchRoles_permissions,
  fetchRolesPermission,
} from "../../../redux/Permission_RoleSlice/FeatchPermission_RoleSlice";
import { deleteRolesPermissions } from "../../../redux/Permission_RoleSlice/DeleteRole_PermissionsSlise";
import { deleteRoles } from "../../../redux/RolesSlices/DeleteRoleSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";


const Role_Permission = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [roleDeleted, setRoleDeleted] = useState(false); // state variable to keep track of deleted role
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const role_permission = useSelector(
    (state) => state.FetchRoles_PermissionsStore
  );
  console.log("role_permissionsss:", role_permission.Permissions_Roles);
  const roles_permissions = role_permission.Permissions_Roles;

  
  const sortedTabRoles_Permissions= [...roles_permissions].sort(
    (a, b) => b.id - a.id
  );
  const notify = () => {
    toast(" Delete succeed  👌");
  };

  useEffect(() => {
    dispatch(fetchRoles_permissions());
  }, []);

  console.log(role_permission.Permissions_Roles); // <-- add this line to check the value of user.users

  const fetchPermissionn = (id) => {
    console.log("fetch one Role active");
    console.log("roles_permissions:", roles_permissions); // add this line to check the value of roles_permissions
    const selectedPermission = roles_permissions.find((item) =>  item.id === id);
    console.log("selectedPermission", selectedPermission);
    dispatch(fetchRolesPermission(id));
    navigate(`/FetchRolesPermissionById/${id}`);
  };

  const getRowId = (row, index) => {
    return (index + 1).toString();
  };

  const DeleteRolesPermissionss = (id, permission_ids) => {
    console.log("delete roleprmission active");
    // notify(); // display toast notification
    // dispatch(deleteRolesPermissions(id,permission_ids));
    console.log("id,permission_ids", id, permission_ids);
    // navigate("/FetchRoles");
  };

  /************delete***************** */
  const [showDialog, setShowDialog] = useState(false);
  const DeleteRole = (id) => {
    console.log("delete Role active");
    notify(); // display toast notification
    dispatch(deleteRoles(id))
      .then(() => setRoleDeleted(true)) // set roleDeleted to true after successful deletion
      .catch((error) => console.log(error));
  };

  
  const handleCancel = () => {
    setShowDialog(false);
  };

  /******************search******************** */
  const [searchTerm, setSearchTerm] = useState("");
  console.log(searchTerm);

  const filteredRoless = roles_permissions.filter((role) => role.id);
  console.log("filteredRoles", filteredRoless);

  const rows = sortedTabRoles_Permissions.loading
    ? []
    : role_permission.error
    ? []
    : role_permission.Permissions_Roles.map((roles_permissions, index) => ({
        ...roles_permissions,
        // id: getRowId(roles_permissions, index),
      }));

  const filteredRows = rows.filter((row) =>
    row.role_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(filteredRows);

  const columns = [
    { field: "id", headerName: "id", flex: 0.5, hide: true },

    {
      field: "role_name",
      headerName: "role_name",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <div style={{ fontSize: "14px", color: "black" }}>{params.value}</div>
      ),
    },

    {
      field: "permission_names",
      headerName: "permission_names",
      flex:2,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <div style={{ fontSize: "14px", color: "black" }}>{params.value}</div>
      ),
    },

    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row }) => {

        const handleConfirm = () => {
          setShowDialog(false);
          DeleteRole(row.id);
        };
        return (
          <>
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                fetchPermissionn(row.id)
              }
              style={{ marginRight: "10px", backgroundColor: "#a8e6cf" }} // add margin-right inline style
            >
              Read
            </Button>

            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setShowDialog(true)}
                style={{ marginRight: "10px", backgroundColor: "#ff8585" }}
              >
                Delete
              </Button>

              <Dialog open={showDialog} onClose={handleCancel}>
                <DialogTitle
                  style={{ fontSize: "20px", backgroundColor: "#ff8585" }}
                >
                  Are you sure you want to delete this Permissions role relation?
                </DialogTitle>
                <DialogContent style={{ fontSize: "18px" }}>
                  Confirm Delete
                </DialogContent>
                <DialogActions>
                  <Button
                    style={{ marginRight: "10px", backgroundColor: "#A4A9FC" }}
                    onClick={handleConfirm}
                    autoFocus
                  >
                    Delete
                  </Button>
                  <Button
                    style={{ marginRight: "10px", backgroundColor: "#ff8585" }}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </>
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
            title="List of permissions affect to a specific role"
            subtitle="List of Permissions for  to a specific role"
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
            <Link to="/AddPerRoles">
              <Button
                className="button"
                variant="contained"
                color="secondary"
                style={{
                  marginLeft: "400px",
                  height: "44px",
                  width: "44%",
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
                }} // add margin-right inline style
              >
                Add One permission to a specific Role +
              </Button>
            </Link>
            <Link to="/Roles_Permissions">
              <Button
                className="button"
                variant="contained"
                color="secondary"
                style={{
                  marginLeft: "400px",
                  height: "44px",
                  width: "44%",
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
                }} // add margin-right inline style
              >
                Add Many permissions to a specific Role +
              </Button>
            </Link>

            <DataGrid
              rows={filteredRows}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
              // getRowId={(row) => row.role_name}
              getRowId={(row) => row.id}
              // onRowClick={(row) =>
              //   fetchPermissionn(row.id, role_permission.Permissions_Roles)
              // }
            />
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Role_Permission;
