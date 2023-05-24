import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./redux/UserSlices/AuthSlice";
import fetchUsers from "./redux/UserSlices/FetchUserSlice";
import FETCHprofile from "./redux/ProfileSlices/FetchProfileSlice";
import RoleSlice from "./redux/RolesSlices/FetchRolesSlice";
import CreateSlice from "./redux/RolesSlices/AddRoleSlice";
import PermissionSlice from "./redux/PermissionSlices/FetchPermissionsSlice";
import DetleteSlice from "./redux/UserSlices/DeleteUserSlice";
import FetchPermissionRolesSlice from "./redux/Permission_RoleSlice/FeatchPermission_RoleSlice";
import Featch_Users_Roles_Slice from "./redux/Users_RolesSlice/Featch_Users_RolesSlice";
import Featch_Types_Users_Slice from "./redux/Types_UsersSlices/Featch_Types_Users";
import FeatchUsersRolesByIdSlice from "./redux/ConfigurationSlices/Featch_ConfigurationSlice";
import CreateAddUserSlice from "./redux/UserSlices/NewUser";
import LogsStore from "./redux/Logs/FeatchLogs_Slice";
import FeatchConfigurationversionSlice from "./redux/ConfigurationVersionSlice/FeatchConfigurationVersion";

const store = configureStore({
  reducer: {
    AuthStore: AuthSlice,
    FetchUsersStore: fetchUsers,
    FetchProfilessStore: FETCHprofile,
    FetchRoles_PermissionsStore: FetchPermissionRolesSlice,
    FetchRolsStore: RoleSlice,
    FetchPermissionStore: PermissionSlice,
    DetleteStore: DetleteSlice,
    CreateroleStore: CreateSlice,
    Featch_Users_Roles_SliceStore: Featch_Users_Roles_Slice,
    Featch_Types_Users_SliceStore: Featch_Types_Users_Slice,
    Featch_Configurations_Store: FeatchUsersRolesByIdSlice,
    CreateAddUserSlice: CreateAddUserSlice,
    LogsStore: LogsStore,
    FeatchConfigurationversionStore: FeatchConfigurationversionSlice,
  },
});
export default store;
