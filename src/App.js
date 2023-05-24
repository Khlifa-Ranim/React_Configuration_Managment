import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./scences/dashboard/index";
import Team from "./scences/team/index";
import Contacts from "./scences/contacts/contacts";
import Invoices from "./scences/invoices/invoices";
import Form from "./scences/form/form";
import Calendar from "./scences/calendar/calendar";
import FAQ from "./scences/faq/faq";
import Bar from "./scences/bar/bar";
import Pie from "./scences/pie/pie";
import Line from "./scences/line/line";
import Geography from "./scences/geography/geography";
import { useSelector } from "react-redux";
import Login from "./scences/Auth/login";
import CreateUser from "./scences/ComponentsModels/User/NewUser";
import CreateProfiles from "./scences/ComponentsModels/profiles/CreateProfile";
import Profiles from "./scences/ComponentsModels/profiles/AllProfiles";

import Users from "./scences/ComponentsModels/User/Users";
import Roles from "./scences/ComponentsModels/Roles/Roles";
import Permissions from "./scences/ComponentsModels/Permissions/AllPermissions";
import AddPermissions from "./scences/ComponentsModels/Permissions/AddPermission";
import AddRole from "./scences/ComponentsModels/Roles/AddRole";
import EditRole from "./scences/ComponentsModels/Roles/EditRole";
import EditPermission from "./scences/ComponentsModels/Permissions/EditPermission";
import FeatchRoleById from "./scences/ComponentsModels/Roles/FeatchRoleById";
import FetchPermissionById from "./scences/ComponentsModels/Permissions/FeatchPermissionById";
import FetchUseryId from "./scences/ComponentsModels/User/FeatchUserById";
import EditUser from "./scences/ComponentsModels/User/EditUser";
import Roles_Permissions from "./scences/ComponentsModels/Roles-Permissions/AddManyPermissionsToOneRole";
import FeatchRole_Permission from "./scences/ComponentsModels/Roles-Permissions/FeatchRoles_Permission";
import FetchRolesPermissionById from "./scences/ComponentsModels/Roles-Permissions/FeatchPermissionRolesById";
import AddPerRoles from "./scences/ComponentsModels/Roles-Permissions/AddPermissionToRole";
import FeatchRolesUsers from "./scences/ComponentsModels/Users_Roles/All_Users_Roles";
import FeatchTypesUsers from "./scences/ComponentsModels/Types_Users/All_Types_users";
import AddUsersTypes from "./scences/ComponentsModels/Types_Users/AddTypesUsers";
import EditTypesUsers from "./scences/ComponentsModels/Types_Users/EditUsersTypes";
import AddUsersRoles from "./scences/ComponentsModels/Users_Roles/AddUsersRoles";
import AddManyUsersRoles from "./scences/ComponentsModels/Users_Roles/AddManyRolesToUser";
import AddRoleUsers from "./scences/ComponentsModels/Users_Roles/AddOneRoleToUser";
import AddUsers from "./scences/ComponentsModels/User/AddUsers";
import FeatchRolesUserById from "./scences/ComponentsModels/Users_Roles/FeatchRolesUserById";
import FeatchConfigurations from "./scences/ComponentsModels/Configurations/Featch_Configurations";
import FeatchConfigurationById from "./scences/ComponentsModels/Configurations/Featch_ConfigurationById";
import EditConfiguration from "./scences/ComponentsModels/Configurations/Edit_Configuration";
import FeachProfileId from "./scences/ComponentsModels/profiles/GetProfiles_ById";
import FetchTypeById from "./scences/ComponentsModels/Types_Users/FeatchTypeById";
import AddConfiguration from "./scences/ComponentsModels/Configurations/Add_Configuration";
import EditProfile from "./scences/ComponentsModels/profiles/Edit_Profile";
import FeatchLogs from "./scences/ComponentsModels/Logs/Logs"
import FeatchConfigurationVersion from "./scences/ComponentsModels/Configuration_Versions/FeatchConfigurationVersion"
import VersionnerConfiguration from "./scences/ComponentsModels/Configuration_Versions/VersionnerConfiguration";
import FeatchConfigurationVersionByID from "./scences/ComponentsModels/Configuration_Versions/FeatchConfigurationVersionById";






function App() {
  const [theme, colorMode] = useMode();
  //test if  the user is available
  //const user = useSelector((state) => state.authReducer.authData);
  const isAuthenticated = useSelector(
    (state) => state.AuthStore.isAuthenticated
  );

  return (
    <>
      <div>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              {/* if the user available  then go to page dashboard else to authentification page */}

              {/* <Route
                path="/dashboard"
                element={isAuthenticated ? <Dashboard /> :  <Navigate to="/" />}
              /> */}
              <Route
                path="/dashboard"
                element={isAuthenticated ? <Dashboard /> : <Login />}
              />

              <Route
                path="/FetchProfiles"
                element={isAuthenticated ? <Profiles /> : <Login />}
              />

              <Route
                path="/FetchRoles"
                element={isAuthenticated ? <Roles /> : <Login />}
              />
              <Route
                path="/FetchUser"
                element={isAuthenticated ? <Users /> : <Login />}
              />
              <Route
                path="/FetchPermissions"
                element={isAuthenticated ? <Permissions /> : <Login />}
              />
              <Route
                path="/FeatchRole_Permission"
                element={isAuthenticated ? <FeatchRole_Permission /> : <Login />}
              />
                <Route
                path="/FeatchRolesUsers"
                element={isAuthenticated ? <FeatchRolesUsers /> : <Login />}
              />
                <Route
                path="/FeatchTypesUsers"
                element={isAuthenticated ? <FeatchTypesUsers /> : <Login />}
              />
                <Route
                path="/FeatchConfigurations"
                element={isAuthenticated ? <FeatchConfigurations /> : <Login />}
              />
                 <Route
                path="/FeatchLogs"
                element={isAuthenticated ? <FeatchLogs /> : <Login />}
              />
              
              <Route
                path="/FeatchConfigurationVersion"
                element={isAuthenticated ? <FeatchConfigurationVersion /> : <Login />}
              />

              <Route
                path="/newUser"
                element={isAuthenticated ? <CreateUser /> : <Login />}
              />

              <Route
                path="/AddPermission"
                element={isAuthenticated ? <AddPermissions /> : <Login />}
              />
              <Route
                path="/AddRole"
                element={isAuthenticated ? <AddRole /> : <Login />}
              />
              <Route
                path="/AddUsers"
                element={isAuthenticated ? <AddUsers /> : <Login />}
              />
                <Route
                path="/AddUsersTypes"
                element={isAuthenticated ? <AddUsersTypes /> : <Login />}
              />

             <Route
                path="/AddUsersRoles"
                element={isAuthenticated ? <AddUsersRoles /> : <Login />}
              />
              
             <Route
                path="/AddPerRoles"
                element={isAuthenticated ? <AddPerRoles /> : <Login />}
              />
               <Route
                path="/AddRoleUsers"
                element={isAuthenticated ? <AddRoleUsers /> : <Login />}
              />
                 <Route
                path="/AddManyUsersRoles"
                element={isAuthenticated ? <AddManyUsersRoles /> : <Login />}
              />
                 <Route
                path="/AddConfiguration"
                element={isAuthenticated ? <AddConfiguration /> : <Login />}
              />
              <Route
                path="/NewProfile"
                element={isAuthenticated ? <CreateProfiles /> : <Login />}
              />

              <Route
                path="/EditRole/:id"
                element={isAuthenticated ? <EditRole /> : <Login />}
              />

              <Route
                path="/EditPermission/:id"
                element={isAuthenticated ? <EditPermission /> : <Login />}
              />
             <Route
            path="/EditTypesUsers/:id"
            element={isAuthenticated ? <EditTypesUsers /> : <Login />}
            />
              <Route
            path="/EditConfiguration/:id"
            element={isAuthenticated ? <EditConfiguration /> : <Login />}
            />
              <Route
            path="/EditProfile/:id"
            element={isAuthenticated ? <EditProfile /> : <Login />}
            />
            <Route
            path="/VersionnerConfiguration/:id"
            element={isAuthenticated ? <VersionnerConfiguration /> : <Login />}
            />
              <Route
                path="/FeachRoleId/:id"
                element={isAuthenticated ? <FeatchRoleById /> : <Login />}
              />

              <Route
                path="/FetchPermissionById/:id"
                element={isAuthenticated ? <FetchPermissionById /> : <Login />}
              />
              <Route
                path="/FetchUserById/:id"
                element={isAuthenticated ? <FetchUseryId /> : <Login />}
              />
              <Route
                path="/FetchRolesPermissionById/:id"
                element={isAuthenticated ? <FetchRolesPermissionById /> : <Login />}
              />
               <Route
                path="/FeatchRolesUserById/:id"
                element={isAuthenticated ? <FeatchRolesUserById /> : <Login />}
              />
                <Route
                path="/FeatchConfigurationById/:id"
                element={isAuthenticated ? <FeatchConfigurationById /> : <Login />}
              />

             <Route
                path="/FeachProfileId/:id"
                element={isAuthenticated ? <FeachProfileId /> : <Login />}
              />

              <Route
                path="/FetchTypeById/:id"
                element={isAuthenticated ? <FetchTypeById /> : <Login />}
              />
                <Route
                path="/FeatchConfigurationVersionByID/:id"
                element={isAuthenticated ? <FeatchConfigurationVersionByID /> : <Login />}
              />
              <Route
                path="/EditUser/:id"
                element={isAuthenticated ? <EditUser /> : <Login />}
              />

              <Route
                path="/Roles_Permissions"
                element={isAuthenticated ? <Roles_Permissions /> : <Login />}
              />
              <Route path="/" element={<Login />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/Form" element={<Form />} />
              <Route path="/calender" element={<Calendar />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </div>
    </>
  );
}

export default App;
