import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




// export const editRole = createAsyncThunk("role/editRole", async (id) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   };
//   console.log("Updating Role..."); // <-- add this line to log when the role is being updated

//   const response = await axios.put(`http://localhost:5000/role/${id}`, config);
//   console.log("Role updated:", response.data); // <-- add this line to log the updated role data

//   return {
//     id: response.data.id,
//     name: response.data.name,
//     description: response.data.description,
//   };
// });




export const editRole = createAsyncThunk(
  "role/editRole",
  async (updatedRole, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/role/${updatedRole.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedRole),
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
  name: "editRolsStore",
  initialState : {
    isLoading: false,
    Roles: [],
    error: "",
  },
  extraReducers: {
    [editRole.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [editRole.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.roles.map(role=>{
    if(role.id==action.payload.id){
      role.name=action.payload.name;
      role.description=action.payload.description
    }
      })
      
    },
    [editRole.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
  
});

export default RoleSlice.reducer