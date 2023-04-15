import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  Permissions_Roles: [],
  error: "",
};

export const fetchRoles_permissions= createAsyncThunk("roles_permissions/fetchPermissionsRoles", async () => {
    
    const config = {
      
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    console.log("Fetching PermissionsRoles..."); // <-- add this line to log when Permissions are being fetched
  
    const response = await axios.get("http://localhost:5000/roles_permissions", config);
    console.log("roles_permissions fetched:", response.data); // <-- add this line to log the fetched users
     // return response.data
  
    return response.data.map((roles_permissions) => {
      return {
        // id: roles_permissions.id,
        permission_names: roles_permissions.permission_names,
        role_name: roles_permissions.role_name,
   
    };
  });
  });


  export const fetchRolesPermission = createAsyncThunk(
    "role_per/fetchRole_per",
    async (id, { rejectWithValue }) => {
      try {
        const response = await fetch(`http://localhost:5000/roles_permissions/${id.toString()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          
        });
  
        if (response.status === 200) {
          return "role deleted successfully";
        } else if (response.status === 202) {
          return "Nothing deleted";
        } else if (response.status === 401) {
          throw new Error("Unauthorized - Invalid or missing token");
        } else if (response.status === 403) {
          throw new Error("Forbidden - User does not have necessary roles");
        } else if (response.status === 404) {
          throw new Error("Not Found - Endpoint not found or invalid permissions");
        } else {
          throw new Error("Internal Server Error");
        }
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


  const FetchPermissionRolesSlice = createSlice({
    name: "FetchRoles_PermissionsStore",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(fetchRoles_permissions.pending,(state)=>{
          state.loading=true
      })
      builder.addCase(fetchRoles_permissions.fulfilled,(state,action)=>{
          state.loading=false
          state.Permissions_Roles=action.payload
          state.error=''
      })
      builder.addCase(fetchRoles_permissions.rejected,(state,action)=>{
          state.loading=false
          state.Permissions_Roles=[]
          state.error=action.error.message
      })
    },
  });
  
  const FetchRolesPermissionSlice = createSlice({
    name: "FetchRolse_perStore",
    initialState,
  
    extraReducers: {
      [fetchRolesPermission.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
      },
      [fetchRolesPermission.fulfilled]: (state, action) => {
        state.loading = false;
        state.RoleInfo = action.payload;
      },
      [fetchRolesPermission.rejected]: (state, action) => {
        state.loading = false;
        if (action.payload === "INVALID_ROLE") {
          state.error = "Cannot fech permission - permission does not exist or unauthorized.";
        } else {
          state.error = action.payload;
        }
      }
    }
  
  });

  export default FetchPermissionRolesSlice.reducer
  export const fetchRoleReducer = FetchRolesPermissionSlice.reducer;
