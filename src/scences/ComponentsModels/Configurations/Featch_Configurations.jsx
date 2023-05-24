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
  featchConfigurations,
  featchConfigurationById,
} from "../../../redux/ConfigurationSlices/Featch_ConfigurationSlice";
import { deleteConfiguration } from "../../../redux/ConfigurationSlices/DeleteConfigurationSlice";
import { rollbackConfiguration } from "../../../redux/ConfigurationVersionSlice/RollbackConfiguration";
import { backupConfigurations } from "../../../redux/ConfigurationVersionSlice/BackUpConfiguration";

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

  const Configurations = useSelector(
    (state) => state.Featch_Configurations_Store
  );
  console.log("Configurations:", Configurations);
  const tabConfigurations = Configurations.TabConfiguration;
  console.log("tabConfigurations", tabConfigurations);

  useEffect(() => {
    dispatch(featchConfigurations());
  }, []);

  const [roleDeleted, setRoleDeleted] = useState(false); // state variable to keep track of deleted role

  const [searchTerm, setSearchTerm] = useState("");
  console.log(searchTerm);

  const sortedTabConfigurations= [...tabConfigurations].sort(
    (a, b) => b.id - a.id
  );
  const rows = Configurations.loading
    ? []
    : Configurations.error
    ? []
    : sortedTabConfigurations.map((Configuration, index) => ({
        createdAt: Configuration.createdAt,
        createdBy: Configuration.createdBy,
        defaultValue: Configuration.defaultValue,
        description: Configuration.description,
        id: Configuration.id,
        name: Configuration.name,
        updatedBy: Configuration.updatedBy,
        value: Configuration.value,
        version: Configuration.version,
      }));

  const searchTermLowerCase = searchTerm.toLowerCase();
  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTermLowerCase) ||
      (row.version && row.version.toString().includes(searchTermLowerCase)) ||
      row.value.toLowerCase().includes(searchTermLowerCase)
  );

  const navigate = useNavigate();

  const notify = () => {
    toast(" Delete succeed  👌");
  };

  const FeatchConfigurationById = (id) => {
    console.log("fetch one Role active");
    const selectedConfiguration = tabConfigurations.find(
      (item) => item.id === id
    );
    console.log("selectedConfiguration", selectedConfiguration);
    dispatch(featchConfigurationById(id));
    navigate(`/FeatchConfigurationById/${id}`);
  };

  /***************************delete*************** */
  const [showDialog, setShowDialog] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);


  const DeleteConfiguration = () => {
    if (selectedRoleId) {
    console.log("delete Role active");
    notify(); // display toast notification
    dispatch(deleteConfiguration(selectedRoleId))
      .then(() => setRoleDeleted(true)) // set roleDeleted to true after successful deletion
      .catch((error) => console.log(error));}
      setShowDialog(false);

  };

  const handleCancel = () => {
    setShowDialog(false);
  };
  const handleCancelBackup = () => {
    setShowDialogRollBack(false);
  };
  const handleCancelrollback = () => {
    setShowDialogRollBacks(false);
  };


  /***************************RollbackConfiguration************************* */
  const [showDialogRollBacks, setShowDialogRollBacks] = useState(false);
  const [selectedRollBacksId, setSelectedRollBacksId] = useState(null);

  const Rollbackconfiguration = () => {
    if (selectedRollBacksId) {
    dispatch(rollbackConfiguration(selectedRollBacksId)).then((response) => {
      // Handle the response and update the component state
      if (!response.error) {
        // If the rollback is successful, refresh the page
        window.location.reload();
      } else {
        // Handle the error if the rollback fails
        console.log("Rollback failed:", response.error);
      }
    });
    setShowDialogRollBacks(false);
  }
  };

  /***************************BackupConfiguration************************* */
  const [showDialogRollBack, setShowDialogRollBack] = useState(false);
  const [selectedRollBackId, setSelectedRollBackId] = useState(null);
  const BackUpConfiguration = () => {
    if (selectedRollBackId) {
    dispatch(backupConfigurations(selectedRollBackId)).then((response) => {
      // Handle the response and update the component state
      if (!response.error) {
        // If the rollback is successful, refresh the page
        window.location.reload();
      } else {
        // Handle the error if the rollback fails
        console.log("Rollback failed:", response.error);
      }
    });
    setShowDialogRollBack(false);
  }
  };

  const columns = [
    { field: "id", headerName: "id", flex: 0.5, hide: true },
    { field: "name", headerName: "name", flex: 0.5 },
    { field: "description", headerName: "description", flex: 0.5 },
    { field: "version", headerName: "version", flex: 0.5 },
    { field: "value", headerName: "value", flex: 0.5 },
    { field: "defaultValue", headerName: "defaultValue", flex: 0.5 },
    { field: "createdBy", headerName: "createdBy", flex: 0.5 },

    { field: "createdAt", headerName: "createdAt" },
    {
      field: "updatedBy",
      headerName: "updatedBy",
      flex: 0,
      cellClassName: "name-column--cell",
    },

    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 2,

      renderCell: ({ row }) => {
        const handleConfirm = () => {
          setShowDialog(false);
          DeleteConfiguration(row.id);
        };
        return (
          <>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => FeatchConfigurationById(row.id)}
              style={{ marginRight: "10px", backgroundColor: "#a8e6cf" }} // add margin-right inline style
            >
              Read
            </Button>

            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {setShowDialog(true); setSelectedRoleId(row.id);}}
                style={{ marginRight: "10px", backgroundColor: "#ff8585" }}
              >
                Delete
              </Button>

              <Dialog open={showDialog} onClose={handleCancel}>
                <DialogTitle
                  style={{ fontSize: "20px", backgroundColor: "#ff8585" }}
                >
                  Are you sure you want to delete this Configuration?
                </DialogTitle>
                <DialogContent style={{ fontSize: "18px" }}>
                  Confirm Delete
                </DialogContent>
                <DialogActions>
                  <Button
                    style={{ marginRight: "10px", backgroundColor: "#A4A9FC" }}
                    onClick={DeleteConfiguration}
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

         
                    <>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => {setShowDialogRollBacks(true);
                  setSelectedRollBacksId(row.id);}}
                style={{ marginRight: "10px", backgroundColor: "#A4A9FC" }}
              >
                RollBack
              </Button>
              <Dialog open={showDialogRollBacks} onClose={handleCancel}>
                <DialogTitle
                  style={{ fontSize: "20px", backgroundColor: "#ff8585" }}
                >
                 Are You Sure You want To Do A Rollback For This Configuration ?
                </DialogTitle>
                <DialogContent style={{ fontSize: "18px" }}>
                  Confirm RollBack
                </DialogContent>
                <DialogActions>
                  <Button
                    style={{ marginRight: "10px", backgroundColor: "#A4A9FC" }}
                    onClick={Rollbackconfiguration}
                    autoFocus
                  >
                    RollBack
                  </Button>
                  <Button
                    style={{ marginRight: "10px", backgroundColor: "#ff8585" }}
                    onClick={handleCancelrollback}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
              </>
            <>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => {setShowDialogRollBack(true);
                  setSelectedRollBackId(row.id);}}
                style={{ marginRight: "10px", backgroundColor: "#ffb5b5" }}
              >
                BackUp
              </Button>
              <Dialog open={showDialogRollBack} onClose={handleCancel}>
                <DialogTitle
                  style={{ fontSize: "20px", backgroundColor: "#ff8585" }}
                >
                 Are You Sure You want to do a Backup to this Configuration ?
                </DialogTitle>
                <DialogContent style={{ fontSize: "18px" }}>
                  Confirm Backup
                </DialogContent>
                <DialogActions>
                  <Button
                    style={{ marginRight: "10px", backgroundColor: "#A4A9FC" }}
                    onClick={BackUpConfiguration}
                    autoFocus
                  >
                    Backup
                  </Button>
                  <Button
                    style={{ marginRight: "10px", backgroundColor: "#ff8585" }}
                    onClick={handleCancelBackup}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
              </>
              
            {/* <Button
              variant="contained"
              color="secondary"
              onClick={() => BackUpConfiguration(row.id)}
              style={{ marginRight: "10px", backgroundColor: "#a8e6cf" }}
              disabled={rollbackSuccess} // Disable the button if rollback was successful
            >
              Backup
            </Button> */}
            <Link to={`/EditConfiguration/${row.id}`}>
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
            <Link to={`/VersionnerConfiguration/${row.id}`}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  // setId(row.id)
                }}
                style={{ marginRight: "10px" }} // add margin-right inline style
              >
                Versionner
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
          <Header title="All Configurations" subtitle="List Of  Configurations" />

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
                  width: "40%",
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
                placeholder="Search With Name ,Version or Value"
              />
            </div>

            <div>
              <Link to="/AddConfiguration">
                <Button
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
                  Add New Configurations
                </Button>
              </Link>
            </div>
            <DataGrid
              columns={columns}
              rows={filteredRows}
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Roles;
