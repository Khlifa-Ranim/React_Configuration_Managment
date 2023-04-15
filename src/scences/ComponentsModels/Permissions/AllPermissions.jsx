import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import Topbar from "../../global/Topbar";
import Sidebar from "../../global/Sidebar";
import "../../../index.css";
import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPermissions } from "../../../redux/PermissionSlices/FetchPermissionsSlice";
import { deletePermissions } from "../../../redux/PermissionSlices/DeletePermissionSlice";
import { fetchPermission } from "../../../redux/PermissionSlices/FetchPermissionsSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Permissions = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const permission = useSelector((state) => state.FetchPermissionStore);
  const permissions = permission.Permissions;
  console.log(permissions);

  const [searchTerm, setSearchTerm] = useState("");
  const rows = permission.loading
    ? []
    : permission.error
    ? []
    : permission.Permissions.map((permission) => ({
        id: permission.id,
        description: permission.description,
        endpoint: permission.endpoint,
        method: permission.method,
      }));

      const searchTermLowerCase = searchTerm.toLowerCase();
      const filteredRows = rows.filter(row =>
        row.endpoint.toLowerCase().includes(searchTermLowerCase) ||
        row.method.toLowerCase().includes(searchTermLowerCase)
      );

  const filter = permissions.filter((role) =>
    role.endpoint.toLowerCase().includes("ra")
  );

  console.log(filter);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const notify = () => {
    toast(" Delete succeed  👌");
  };

  useEffect(() => {
    dispatch(fetchPermissions());
  }, []);

  console.log(permission.Permissions); // <-- add this line to check the value of user.users

  const DeletePermission = (id) => {
    console.log("delete prmission active");
    notify(); // display toast notification
    dispatch(deletePermissions(id));
  };

  const fetchPermissionn = (id) => {
    console.log("fetch one Role active");
    const selectedPermission = permissions.find((item) => item.id === id);
    console.log("selectedPermission",selectedPermission);
    dispatch(fetchPermission(id));
    // setShowDetails(true);
    navigate(`/FetchPermissionById/${id}`);
  };
  const columns = [
    { field: "id", headerName: "id", flex: 0.5 },
    { field: "description", headerName: "description",
     flex: 1,
    cellClassName: "name-column--cell",
   },
    {
      field: "endpoint",
      headerName: "endpoint",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    { field: "method", headerName: "method" },

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
              onClick={() => DeletePermission(row.id)}
              style={{ marginRight: "10px", backgroundColor: "#ff8585" }} // add margin-right inline style
            >
              Delete
            </Button>
            <Link to={`/EditPermission/${row.id}`}>
              <Button
                variant="contained"
                color="primary"
                // onClick={() => handleEdit(row.id)}
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
          <Header title="Les Permissions" subtitle="Listes Des Permissions" />
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
                placeholder="Search with Endpoint Or Methode..."
              />
            </div>
            <Link to="/AddPermission">
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
                AJOUTER UNE PERMISSION
              </Button>
            </Link>
            <DataGrid
              columns={columns}
              rows={filteredRows}
              components={{ Toolbar: GridToolbar }}
              //  checkboxSelection
            />
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Permissions;
