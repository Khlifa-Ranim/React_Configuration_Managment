import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  UsersRoles: [],
  error: "",
};

export const fetchUsers_Roles= createAsyncThunk("users_roles/fetchusers_roles", async () => {
    
    const config = {
      
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    console.log("Fetching users_roles..."); // <-- add this line to log when Permissions are being fetched
  
    const response = await axios.get("http://localhost:5000/users_roles", config);
    console.log("roles_permissions fetched:", response.data); // <-- add this line to log the fetched users
     // return response.data
  
    return response.data.map((UsersRoles) => {
      return {
        roles_names: UsersRoles.roles_names,
        username: UsersRoles.username,
   
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


  const Featch_Users_Roles_Slice = createSlice({
    name: "Featch_Users_Roles_SliceStore",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(fetchUsers_Roles.pending,(state)=>{
          state.loading=true
      })
      builder.addCase(fetchUsers_Roles.fulfilled,(state,action)=>{
          state.loading=false
          state.UsersRoles=action.payload
          state.error=''
      })
      builder.addCase(fetchUsers_Roles.rejected,(state,action)=>{
          state.loading=false
          state.UsersRoles=[]
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

  export default Featch_Users_Roles_Slice.reducer
  export const fetchRoleReducer = FetchRolesPermissionSlice.reducer;
