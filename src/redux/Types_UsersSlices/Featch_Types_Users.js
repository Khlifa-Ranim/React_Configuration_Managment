import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  storeTypesUsers: [],
  error: "",
};

export const fetchTypes_Users= createAsyncThunk("Types_Users/fetchTypes_Users", async () => {
    
    const config = {
      
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    console.log("Fetching Types_Users..."); // <-- add this line to log when Permissions are being fetched
  
    const response = await axios.get("http://localhost:5000/types", config);
    console.log("roles_permissions fetched:", response.data); // <-- add this line to log the fetched users
     // return response.data
  
    return response.data.map((TypesUsers) => {
      return {
        id: TypesUsers.id,
        name: TypesUsers.name,
        description: TypesUsers.description,
   
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


  const Featch_Types_Users_Slice = createSlice({
    name: "Featch_Types_Users_SliceStore",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(fetchTypes_Users.pending,(state)=>{
          state.loading=true
      })
      builder.addCase(fetchTypes_Users.fulfilled,(state,action)=>{
          state.loading=false
          state.storeTypesUsers=action.payload
          state.error=''
      })
      builder.addCase(fetchTypes_Users.rejected,(state,action)=>{
          state.loading=false
          state.storeTypesUsers=[]
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

  export default Featch_Types_Users_Slice.reducer
  export const fetchRoleReducer = FetchRolesPermissionSlice.reducer;
