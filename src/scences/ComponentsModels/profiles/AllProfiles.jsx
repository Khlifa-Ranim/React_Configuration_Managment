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
import {
  fetchProfiles,
  featchProfileById,
} from "../../../redux/ProfileSlices/FetchProfileSlice";
import { deleteProfile } from "../../../redux/ProfileSlices/DeleteProfile_Slice";

const Profiles = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const profile = useSelector((state) => state.FetchProfilessStore);
  const Profile = profile.profiles;
  console.log("Profiles:", profile.profiles);
  console.log("Profiles:", Profile);
  console.log("adresse:", Profile.adresse);

  const [roleDeleted, setRoleDeleted] = useState(false); // state variable to keep track of deleted role

  const navigate = useNavigate();

  const sortedTabProfile= [...Profile].sort(
    (a, b) => b.id - a.id
  );
  const [searchTerm, setSearchTerm] = useState("");
  const rows = profile.loading
    ? []
    : profile.error
    ? []
    : sortedTabProfile.map((profile) => ({
        id: profile.id,
        adresse: profile.adresse,
        description: profile.description,
        name: profile.name,
        telephone: profile.telephone,
        email: profile.email,
        user_id: profile.user_id,
        image: profile.image,
      }));

  const searchTermLowerCase = searchTerm.toLowerCase();
  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTermLowerCase) ||
      row.email.toLowerCase().includes(searchTermLowerCase)
  );

  useEffect(() => {
    dispatch(fetchProfiles());
  }, []);
  console.log("Getprofiles.jsx");

  console.log(profile.profiles); // <-- add this line to check the value of profile.uprofiles

  const FetchProfile = (id) => {
    console.log("fetch one Role active");
    const selectedProfile = Profile.find((item) => item.id === id);
    console.log(selectedProfile);
    dispatch(featchProfileById(id));
    navigate(`/FeachProfileId/${id}`);
  };

  const DeleteProfile = (id) => {
    console.log("delete Profile active");
    dispatch(deleteProfile(id))
      .then(() => setRoleDeleted(true)) // set roleDeleted to true after successful deletion
      .catch((error) => console.log(error));
  };

  const columns = [
    {
      field: "user_id",
      headerName: "User_Id",
      flex: 1,
      cellClassName: "name-column--cell",
      hide: true,
    },

    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <div style={{ fontSize: "14px", color: "black" }}>{params.value}</div>
      ),
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <div style={{ fontSize: "14px", color: "black" }}>{params.value}</div>
      ),
    },
    { field: "adresse", headerName: "Adresse" },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "telephone",
      headerName: "Telephone",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      cellClassName: "name-column--cell",

      renderCell: ({ row }) => {
        return (
          <>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => FetchProfile(row.id)}
              style={{ marginRight: "10px", backgroundColor: "#a8e6cf" }} // add margin-right inline style
            >
              Read
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => DeleteProfile(row.id)}
              style={{ backgroundColor: "#FFC0CB" }} // add margin-right inline style
            >
              Delete
            </Button>
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
          <Header title="All Profiles" subtitle="List Of All Profiles" />
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
                placeholder="Search with Name Or Email..."
              />
            </div>
            {/* <Link to="/NewProfile">
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
                  }}
              >
                Add a New Profile
              </Button>
            </Link> */}
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

export default Profiles;
