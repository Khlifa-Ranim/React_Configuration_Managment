import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import Topbar from "../../global/Topbar";
import Sidebar from "../../global/Sidebar";
import "../../../index.css";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers,fetchUser } from "../../../redux/UserSlices/FetchUserSlice";
import { deleteUsers } from "../../../redux/UserSlices/DeleteUserSlice";
import { Link,useNavigate } from "react-router-dom";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const navigate=useNavigate();

  const user = useSelector((state) => state.FetchUsersStore);
  const Users=user.users;
  console.log(Users)

  const [searchTerm, setSearchTerm] = useState("");
  const rows=
    user.loading
      ? []
      : user.error
      ? []
      : Users.map((user) => ({
          id: user.id,
          username: user.username,
          USER_TYPE: user.USER_TYPE,
          role_id: user.role_id,
        }))

        const searchTermLowerCase = searchTerm.toLowerCase();
        const filteredRows = rows.filter(row =>
          row.username.toLowerCase().includes(searchTermLowerCase) ||
          row.USER_TYPE.toLowerCase().includes(searchTermLowerCase)
        );

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const DeleteUser = (id) => {
    console.log("delete user active");
    dispatch(deleteUsers(id));
  }

  const fetchUserr = (id) => {
    console.log("fetch one user active");
    const selectedUser = Users.find((item) => item.id === id);
    console.log(selectedUser);
    dispatch(fetchUser(id));
    // setShowDetails(true);
    navigate(`/FetchUserById/${id}`)

  };
  console.log("GetUsers.jsx");
  console.log(user.users); // <-- add this line to check the value of user.users

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "username", headerName: "username" },
    {
      field: "USER_TYPE",
      headerName: "USER_TYPE",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "role_id",
      headerName: "role_id",
      type: "number",
      flex: 1,
      cellClassName: "name-column--cell",
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
                onClick={() => fetchUserr(row.id)}
                style={{ marginRight: "10px", backgroundColor: "#a8e6cf" }} // add margin-right inline style
              >
                Read
              </Button>
<Button
  variant="contained"
  color="secondary"
  onClick={() => DeleteUser(row.id)}
  style={{ marginRight: '10px',backgroundColor:"#ff8585" }} // add margin-right inline style

>
  Delete
</Button>

        <Link to={`/EditUser/${row.id}`}>
            <Button
              variant="contained"
              color="primary"
              // onClick={() => handleEdit(row.id)}
              style={{ marginRight: '10px' }} // add margin-right inline style

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
          <Header title="Les Utilisateurs" subtitle="Listes Des Utilisateurs" />
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
                placeholder="Search with Username Or Type_User..."
              />
            </div>
            <Link to="/newUser">
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
             Add A New User             
           </Button>
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
