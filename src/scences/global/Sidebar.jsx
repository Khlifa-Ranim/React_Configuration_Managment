import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { fetchRoles } from "../../redux/RolesSlices/FetchRolesSlice";
import { fetchTypes_Users } from "../../redux/Types_UsersSlices/Featch_Types_Users";
import { fetchProfiles } from "../../redux/ProfileSlices/FetchProfileSlice";

import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [accessToken, setAccessToken] = useState(localStorage.getItem("token"));

  const decoded_token = jwt_decode(accessToken);
  // console.log("decoded_token",decoded_token);
  // console.log("Username",decoded_token.username);


  const role = useSelector((state) => state.FetchRolsStore);
  // console.log("role:", role.Roles);
  const roles = role.Roles;

  const TypesUsers = useSelector(
    (state) => state.Featch_Types_Users_SliceStore
  );
  const Tab_Types_Users = TypesUsers.storeTypesUsers;
  // console.log("Tab_Types_Users:", Tab_Types_Users);

  const profile = useSelector((state) => state.FetchProfilessStore);
  const Profile = profile.profiles;
  // console.log("Profiles:",profile.profiles)

  const roleNamesMap = {};
  roles.forEach((role) => {
    roleNamesMap[role.id] = role.name;
  });

  const typeNameMap = {};
  Tab_Types_Users.forEach((type) => {
    typeNameMap[type.id] = type.name;
  });

  const ProfileIdMap = {};
  Profile.forEach((profile) => {
    ProfileIdMap[profile.user_id] = profile.id;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoles());
  }, []); // run useEffect when roleDeleted changes

  useEffect(() => {
    dispatch(fetchTypes_Users());
  }, []);

  useEffect(() => {
    dispatch(fetchProfiles());
  }, []);

  const TypesNames = typeNameMap[decoded_token.type_id];

  const roleNames = decoded_token.role_id.map((roleId) => roleNamesMap[roleId]);

  const profileId = ProfileIdMap[decoded_token.user_id];

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h4" color={"#ff347f"} fontWeight="bold">
                  TYPE_USER:
                  <br></br>
                  {TypesNames}
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/User.jpg`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                  onClick={() => {
                    Navigate(`/EditProfile/${profileId}`);
                  }}
                />
              </Box>

              <Box textAlign="center">
                <div>
                  {/* <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{m:"10px 0 0 0"}}>
      {profileId === decoded_token.user_id ? decoded_token.username : ''}
    </Typography> */}
                  <Typography
                    variant="h5"
                    color={colors.grey[100]}
                    sx={{ m: "10px 0 0 0" }}
                  >
                    Profile ID: {profileId}
                  </Typography>
                </div>
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {decoded_token.username}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  <ul style={{ listStyle: "none", paddingLeft: "1em" }}>
                    <p style={{ color: "#ff347f" }}>My Roles:</p>
                    {roleNames.map((roleName) => (
                      <li style={{ position: "relative" }}>
                        <span
                          style={{
                            position: "absolute",
                            left: "-1em",
                            top: "0.2em",
                          }}
                        >
                          &#8226;
                        </span>
                        {roleName}
                      </li>
                    ))}
                  </ul>
                </Typography>
              </Box>
            </Box>
          )}
          {/* MENU ITEMS */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            {/* <Item
                title=" Gestion des Utilisateurs"
                to="/team"
                icon={<PeopleOutlinedIcon/>}
                selected={selected}
                setSelected={setSelected}
                /> */}
            <Item
              title="Gestion des Utilisateurs"
              to="/FetchUser"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Gestion des Profiles"
              to="/FetchProfiles"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Gestion Des Roles"
              to="/FetchRoles"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Gestion Des Permissons"
              to="/FetchPermissions"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Gestion Des Roles-permission"
              to="/FeatchRole_Permission"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Gestion Des Users Roles"
              to="/FeatchRolesUsers"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Gestion Des Types Des Utilisateurs"
              to="/FeatchTypesUsers"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title="Gestion Of Configuration"
              to="/FeatchConfigurations"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Gestion Of Versions Configurations"
              to="/FeatchConfigurationVersion"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
            {/* <Item
                title="Gestion des permissions"
                to="/contacts"
                icon={<ContactsOutlinedIcon/>}
                selected={selected}
                setSelected={setSelected}
                /> 
                 <Item
                title="Gestion Des Roles"
                to="/invoices"
                icon={<ReceiptOutlinedIcon/>}
                selected={selected}
                setSelected={setSelected}
                /> */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            {/* <Item
              title="Modifier profile"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            {/* <Item
              title="Creer  un utilisatur"
              to="/newUser"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            <Item
              title="Calender"
              to="/calender"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAP page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>

            <Item
              title="Bar Charts"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
