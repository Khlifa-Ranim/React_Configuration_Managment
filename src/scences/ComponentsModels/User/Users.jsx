import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import Topbar from "../../global/Topbar";
import Sidebar from "../../global/Sidebar";
import "../../../index.css";
import React from "react";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsers,
  fetchUser,
} from "../../../redux/UserSlices/FetchUserSlice";
import { deleteUsers } from "../../../redux/UserSlices/DeleteUserSlice";
import { Link, useNavigate } from "react-router-dom";
import { banUsers } from "../../../redux/UserSlices/BanUser";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notifyBand = () => {
    toast(" User Disabled Succefully 👌");
  };

  const notifyEnable = () => {
    toast(" User Enabeled Succefully 👌");
  };

  const user = useSelector((state) => state.FetchUsersStore);

  const Users = user.users;
  console.log(Users);

  const sortedTabUsers= [...Users].sort(
    (a, b) => b.id - a.id
  );
  const [searchTerm, setSearchTerm] = useState("");

  const rows = user.loading
    ? []
    : user.error
    ? []
    : sortedTabUsers.map((user) => ({
        id: user.id,
        username: user.username,
        USER_TYPE: user.USER_TYPE,
        roles: user.roles,
      }));

  const searchTermLowerCase = searchTerm.toLowerCase();
  const filteredRows = rows.filter(
    (row) =>
      row.username.toLowerCase().includes(searchTermLowerCase) ||
      row.USER_TYPE.toLowerCase().includes(searchTermLowerCase)
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  /**************Delete************* */
  const [showDialog, setShowDialog] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);

  const notifydelete = () => {
    toast("User Deleted Succefully👌");
  };

  const DeleteUser = () => {
    if (selectedRoleId) {
    console.log("delete user active");
    dispatch(deleteUsers(selectedRoleId)).then((error) => console.log(error));
    notifydelete();
    setShowDialog(false);
  }
  };

  const handleCancel = () => {
    setShowDialog(false);
  };
  /****************Featch***************** */
  const fetchUserr = (id) => {
    console.log("fetch one user active");
    const selectedUser = Users.find((item) => item.id === id);
    console.log(selectedUser);
    dispatch(fetchUser(id));
    // setShowDetails(true);
    navigate(`/FetchUserById/${id}`);
  };

  /************Ban************** */
  const [showDialogban, setShowDialogban] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [disabledButtons, setDisabledButtons] = useState(
    JSON.parse(localStorage.getItem("disabledButtons")) || {}
  );

  const Colors = {
    false: "#ff8585",
    true: "#eb2632",
  };

  useEffect(() => {
    localStorage.setItem("disabledButtons", JSON.stringify(disabledButtons));
  }, [disabledButtons]);



  const BanUser = () => {
    const selectedUser = Users.find((item) => item.selectedUserId === selectedUserId);
    console.log(selectedUser);
    if (selectedUserId) {

    dispatch(banUsers(selectedUserId)).then((error) => console.log(error));
    notifyBand(); // display toast notification
setShowDialogban();
    setDisabledButtons((prev) => {
      if (!prev.hasOwnProperty(selectedUserId)) {
        // create a new object if the id property does not exist in prev
        return {
          ...prev,
          [selectedUserId]: {
            disabled: true,
            color: Colors.true,
          },
        };
      } else {
        // update the existing object for the selected user
        return {
          ...prev,
          [selectedUserId]: {
            ...prev[selectedUserId],
            disabled: !prev[selectedUserId].disabled,
            color: Colors[!prev[selectedUserId].disabled],
          },
        };
      }
    });}
  };

  const handleCancelban = () => {
    setShowDialogban(false);
  };

  /***************UnBanUser************* */

  const [showDialogunban, setShowDialogunban] = useState(false);
const[selectedUserUnban,setSelectedUserUnban]=useState(null)
  const UnBanUser = () => {
    if (selectedUserUnban) {

    // const selectedUser = Users.find((item) => item.id === id);
    // console.log(selectedUserUnban);
    dispatch(banUsers(selectedUserUnban));
    notifyEnable();
    setShowDialogunban(false);

  };}

  const handleCancelUnban = () => {
    setShowDialogunban(false);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5, hide: true },
    {
      field: "username",
      headerName: "username",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <div style={{ fontSize: "14px", color: "black" }}>{params.value}</div>
      ),
    },
    {
      field: "USER_TYPE",
      headerName: "USER_TYPE",
    },
    {
      field: "roles",
      headerName: "roles",
      flex: 1,
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
          DeleteUser(row.id);
        };

        const handleConfirmban = () => {
          setShowDialogban(false);
          BanUser(row.id);
        };

        const handleConfirmunban = () => {
          setShowDialogunban(false);
          UnBanUser(row.id);
        };

        const buttonColor = disabledButtons[row.id]?.color || "#ff8585";
        const isDisabled = disabledButtons[row.id]?.disabled || false;

        return (
          <>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => fetchUserr(row.id)}
              style={{ marginRight: "10px", backgroundColor: "#a8e6cf" }} // add margin-right inline style
            >
              Read
            </Button>

            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {setShowDialog(true);
                  setSelectedRoleId(row.id);}}
                style={{ marginRight: "10px", backgroundColor: "#ff8585" }}
              >
                Delete
              </Button>

              <Dialog open={showDialog} onClose={handleCancel}>
                <DialogTitle
                  style={{ fontSize: "20px", backgroundColor: "#ff8585" }}
                >
                  Are you sure you want to delete this User?
                </DialogTitle>
                <DialogContent style={{ fontSize: "18px" }}>
                  Confirm Delete
                </DialogContent>
                <DialogActions>
                  <Button
                    style={{ marginRight: "10px", backgroundColor: "#A4A9FC" }}
                    onClick={DeleteUser}
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
            <Link to={`/EditUser/${row.id}`}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "10px" }} // add margin-right inline style
              >
                Edit
              </Button>
            </Link>

            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => { setShowDialogban(true);
                  setSelectedUserId(row.id);}
                }
                style={{ marginRight: "10px", backgroundColor: buttonColor }}
                disabled={isDisabled}
              >
                {isDisabled ? "Enable" : "Disable"}
              </Button>

              <Dialog open={showDialogban} onClose={handleCancelban}>
                <DialogTitle
                  style={{ fontSize: "20px", backgroundColor: "#ff8585" }}
                >
                  Are you sure you want to Ban this User?
                </DialogTitle>
                <DialogContent style={{ fontSize: "18px" }}>
                  Confirm Ban
                </DialogContent>
                <DialogActions>
                  <Button
                    style={{ marginRight: "10px", backgroundColor: "#A4A9FC" }}
                    onClick={BanUser}
                    autoFocus
                    disabled={isDisabled}
                  >
                    {isDisabled ? "Enable" : "Disable"}
                  </Button>
                  <Button
                    style={{ marginRight: "10px", backgroundColor: "#ff8585" }}
                    onClick={handleCancelban}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
   
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {setShowDialogunban(true);setSelectedUserUnban(row.id)}}
                style={{ marginRight: "10px", backgroundColor: "#ff8585" }}
              >
                Enable
              </Button>

              <Dialog open={showDialogunban} onClose={handleCancelUnban}>
                <DialogTitle
                  style={{ fontSize: "20px", backgroundColor: "#ff8585" }}
                >
                  Are you sure you want to Enable this User?
                </DialogTitle>
                <DialogContent style={{ fontSize: "18px" }}>
                  Confirm Enable
                </DialogContent>
                <DialogActions>
                  <Button
                    style={{ marginRight: "10px", backgroundColor: "#A4A9FC" }}
                    onClick={UnBanUser}
                  >
                    Enable
                  </Button>
                  <Button
                    style={{ marginRight: "10px", backgroundColor: "#ff8585" }}
                    onClick={handleCancelUnban}
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
          <Header title="Users" subtitle="List Of All Users" />
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
                  marginBottom: "14px",
                }}
                placeholder="Search with Username Or Type_User..."
              />
            </div>
            <Link to="/AddUsers">
              <button
                class="cssbuttons-io-button"
                style={{
                  marginLeft: "400px",
                  display: "flex",
                  justifyContent: "center",
                  background:"#8A8FF7",
                }} // add margin-right inline style
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fill="currentColor"
                    d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
                  ></path>
                </svg>
                <span>Add New User</span>
              </button>
            </Link>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
              //  checkboxSelection
            />
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Users;
