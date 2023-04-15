import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  Permissions: [],
  error: "",
};


export const fetchPermissions= createAsyncThunk("permission/fetchPermissions", async () => {
    
  const config = {
    
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  console.log("Fetching Permissions..."); // <-- add this line to log when Permissions are being fetched

  const response = await axios.get("http://localhost:5000/permissions", config);
  console.log("Permissions fetched:", response.data); // <-- add this line to log the fetched users
   // return response.data

  return response.data.map((permission) => {
    return {
        id: permission.id,
        description: permission.description,
        endpoint: permission.endpoint,
        method: permission.method,


  };
});
});

export const fetchPermission = createAsyncThunk(
  "role/fetchRole",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/permission/${id}`, {
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

const profileSlice = createSlice({
  name: "FetchPermissionStore",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPermissions.pending,(state)=>{
        state.loading=true
    })
    builder.addCase(fetchPermissions.fulfilled,(state,action)=>{
        state.loading=false
        state.Permissions=action.payload
        state.error=''
    })
    builder.addCase(fetchPermissions.rejected,(state,action)=>{
        state.loading=false
        state.Permissions=[]
        state.error=action.error.message
    })
  },
});

const FetchPermissionSlice = createSlice({
  name: "FetchRolsStore",
  initialState,

  extraReducers: {
    [fetchPermission.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [fetchPermission.fulfilled]: (state, action) => {
      state.loading = false;
      state.RoleInfo = action.payload;
    },
    [fetchPermission.rejected]: (state, action) => {
      state.loading = false;
      if (action.payload === "INVALID_ROLE") {
        state.error = "Cannot fech permission - permission does not exist or unauthorized.";
      } else {
        state.error = action.payload;
      }
    }
  }

});

export default profileSlice.reducer
export const fetchRoleReducer = FetchPermissionSlice.reducer;