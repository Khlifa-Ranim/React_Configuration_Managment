import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  Roles: [],
  error: "",
  RoleInfo:null,
};



export const fetchRoles = createAsyncThunk("role/fetchRoles", async () => {
    
  const config = {
    
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  console.log("Fetching Roles..."); // <-- add this line to log when users are being fetched

  const response = await axios.get("http://localhost:5000/roles", config);
  console.log("Roles fetched:", response.data); // <-- add this line to log the fetched users
 
  return response.data.map((role) => {
    return {
      id: role.id,  
      name: role.name,
      description: role.description,
  };
});
});

export const fetchRole = createAsyncThunk(
  "role/fetchRole",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/role/${id}`, {
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

const RoleSlice = createSlice({
  name: "FetchRolsStore",
  initialState,
  extraReducers: (builder) => {

    builder.addCase(fetchRoles.pending,(state)=>{
        state.loading=true
    })
    builder.addCase(fetchRoles.fulfilled,(state,action)=>{
        state.loading=false
        state.Roles=action.payload
        state.error=''
    })
    builder.addCase(fetchRoles.rejected,(state,action)=>{
        state.loading=false
        state.Roles=[]
        state.error=action.error.message
    })

    
  },
});

const FetchRoleSlice = createSlice({
  name: "FetchRolsStore",
  initialState,

  extraReducers: {
    [fetchRole.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [fetchRole.fulfilled]: (state, action) => {
      state.loading = false;
      state.RoleInfo = action.payload;
    },
    [fetchRole.rejected]: (state, action) => {
      state.loading = false;
      if (action.payload === "INVALID_ROLE") {
        state.error = "Cannot delete role - role does not exist or unauthorized.";
      } else {
        state.error = action.payload;
      }
    }
  }

});

export default RoleSlice.reducer
// export const rolesReducer = RoleSlice.reducer;
 export const fetchRoleReducer = FetchRoleSlice.reducer;