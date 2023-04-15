 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
 

export const CreateRole_Permissions = createAsyncThunk(
  "role_Permissions/CreateRole_Permissions",
  async ({role_id,permission_id}, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/roles_permissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({role_id,permission_id}),
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



  

const CreateRolePermissionSlice = createSlice({
    name: 'CreateroleStore',
    initialState:{
      roles: [],
      loading: false,
      error: null,
     // token: localStorage.getItem("token") // initialize the token from the local storage
    },
  
    extraReducers: (builder) => {
      builder
        .addCase(CreateRole_Permissions.pending, (state) => {
          state.loading = true;
        })
        .addCase(CreateRole_Permissions.fulfilled, (state, action) => {
          state.loading = false;
          console.log(action.payload); // add this line to log the payload object
          state.roles = action.payload.roles;
        })
        .addCase(CreateRole_Permissions.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
          console.log(action.error); // add this line to log the error object
    
        });
    },
    
    
    
    
    
    
  });
  
  export default CreateRolePermissionSlice.reducer; 

