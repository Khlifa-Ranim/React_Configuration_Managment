import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const editTypes = createAsyncThunk(
  "types/editTypes",
  async (updatedRole, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/type/${updatedRole.id}`, {
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

const EditTypesUsersSlice = createSlice({
  name: "editRolsStore",
  initialState : {
    isLoading: false,
    Roles: [],
    error: "",
  },
  extraReducers: {
    [editTypes.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [editTypes.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.roles.map(role=>{
    if(role.id==action.payload.id){
      role.name=action.payload.name;
      role.description=action.payload.description
    }
      })
      
    },
    [editTypes.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
  
});

export default EditTypesUsersSlice.reducer