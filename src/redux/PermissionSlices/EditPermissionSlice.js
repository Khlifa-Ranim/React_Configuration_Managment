import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const editPermission = createAsyncThunk(
  "permission/editPermission",
  async (updatedPermission, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/permission/${updatedPermission.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedPermission),
      });

      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.error);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const RoleSlice = createSlice({
  name: "editPermissionStore",
  initialState : {
    isLoading: false,
    Permissions: [],
    error: "",
  },
  extraReducers: {
    [editPermission.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [editPermission.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.roles.map(role=>{
    if(role.id==action.payload.id){
      role.description=action.payload.description;
      role.endpoint=action.payload.endpoint
      role.method=action.payload.method

    }
      })
      
    },
    [editPermission.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
  
});

export default RoleSlice.reducer