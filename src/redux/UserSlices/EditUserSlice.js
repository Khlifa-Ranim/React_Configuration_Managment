import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const editUser = createAsyncThunk(
  "permission/editPermission",
  async (updatedUser, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/user/${updatedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedUser),
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
    Users: [],
    error: "",
  },
  extraReducers: {
    [editUser.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [editUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.roles.map(role=>{
    if(role.id==action.payload.id){
      role.username=action.payload.username;
      role.type_id=action.payload.type_id
      role.role_id=action.payload.role_id

    }
      })
      
    },
    [editUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
  
});

export default RoleSlice.reducer