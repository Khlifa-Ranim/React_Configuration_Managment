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
  fetchRoles,
  fetchRole,
} from "../../../redux/RolesSlices/FetchRolesSlice";
import { deleteRoles } from "../../../redux/RolesSlices/DeleteRoleSlice";
import { Alert } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";


const Roles = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const role = useSelector((state) => state.FetchRolsStore);
  console.log("role:", role.Roles);
  const roles = role.Roles;

  const [roleDeleted, setRoleDeleted] = useState(false); // state variable to keep track of deleted role

  const [showDetails, setShowDetails] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  console.log(searchTerm);

  const filteredRoless = roles.filter((role) => role.id);
  console.log("filteredRoles", filteredRoless);

  const GetName = () => {
    const role = useSelector((state) => state.FetchRolsStore);
    const roles = role.Roles;
    const Roless = roles.filter((role) => role.name);
    console.log("Roless", Roless);
    alert("all roles");
  };

  const sortedTabRoles= [...roles].sort(
    (a, b) => b.id - a.id
  );

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const rows = role.loading
    ? []
    : role.error
    ? []
    : sortedTabRoles.map((role, index) => ({
        id: role.id,
        name: role.name,
        description: role.description,
      }));

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(filteredRoles);

  const filter = roles.filter((role) => role.name.toLowerCase().includes("ra"));

  console.log(filter);

  const navigate = useNavigate();

  const notify = () => {
    toast(" Delete succeed  👌");
  };

  useEffect(() => {
    dispatch(fetchRoles());
  }, []);

  const FetchRole = (id) => {
    console.log("fetch one Role active");
    const selectedRole = roles.find((item) => item.id === id);
    console.log(selectedRole);
    dispatch(fetchRole(id));
    setShowDetails(true);
    navigate(`/FeachRoleId/${id}`);
  };


 
/************************delete************* */
  const [showDialog, setShowDialog] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);

  const handleDelete = () => {
    if (selectedRoleId) {
      notify(); // display toast notification
      dispatch(deleteRoles(selectedRoleId)).then((error) => console.log(error));
      setShowAlert(true);
      setShowDialog(false);
    }
  };


  const handleCancel = () => {
    setShowDialog(false);
  };

  const columns = [
    { field: "id", headerName: "id", flex: 0.5},

    {
      field: "name",
      headerName: "name",
      cellClassName: "centered-cell",
      flex: 0.5,
      renderCell: (params) => (
        <div style={{ fontSize: "14px" }}>{params.value}</div>
      ),
    },
    {
      field: "description",
      headerName: "description",
      cellClassName: "centered-cell",
      flex: 1,
      renderCell: (params) => (
        <div style={{ fontSize: "14px", color: "black" }}>{params.value}</div>
      ),
    },

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
              onClick={() => FetchRole(row.id)}
              style={{ marginRight: "10px", backgroundColor: "#a8e6cf" }} // add margin-right inline style
            >
              Read
            </Button>
            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={() =>{ setShowDialog(true);
                  setSelectedRoleId(row.id);}
                }
                style={{ marginRight: "10px", backgroundColor: "#ff8585" }}
              >
                Delete
              </Button>

              <Dialog open={showDialog} onClose={handleCancel}>
                <DialogTitle
                  style={{ fontSize: "20px", backgroundColor: "#ff8585" }}
                >
                  Are you sure you want to delete this role?
                </DialogTitle>
                <DialogContent style={{ fontSize: "18px" }}>
                  Confirm Delete
                </DialogContent>
                <DialogActions>
                  <Button
                    style={{ marginRight: "10px", backgroundColor: "#A4A9FC" }}
                    onClick={handleDelete}
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
          <Header title="All Roles" subtitle="List Of Roles" />

          {/* <div>
 <input value={searchTerm}  onChange={(e)=>setSearchTerm(e.target.value)} type="text"  />
  <div>
    {roles.filter((role) =>role.name.toLowerCase().includes(searchTerm)).map((user) => (
      <div key={user.id || user.name}>{user.name}</div>
    ))}
  </div>
</div>  */}
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
                placeholder="Search With Name..."
              />
            </div>

            <div>
              {/* <Roles_Permissions /> */}

              <Link to="/AddRole">
                <Button
                  // className="button"
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
                  }}
                >
                  Click Add Role
                </Button>
              </Link>
            </div>
            <DataGrid
              columns={columns}
              rows={filteredRows}
              components={{ Toolbar: GridToolbar }}
            />
            {/* <DataGrid
              rows={role.loading ? [] : role.error ? [] : role.Roles.map((role, index) => ({
                id: index + 1,
                name: role.name,
                description: role.description,
              }))}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
            /> 
             */}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Roles;
