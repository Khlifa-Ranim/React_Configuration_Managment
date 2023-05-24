import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

export const editRole = createAsyncThunk(
  "role/editRole",
  async (updatedRole, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/role/${updatedRole.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedRole),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error);
      }

      // ADD LOG
      const log = await fetch("http://localhost:5000/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          action: `${
            jwt_decode(localStorage.getItem("token")).username
          } Updated Role with Name :  ${updatedRole.name}`,
        }),
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const RoleSlice = createSlice({
  name: "editRolsStore",
  initialState: {
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
      state.roles.map((role) => {
        if (role.id == action.payload.id) {
          role.name = action.payload.name;
          role.description = action.payload.description;
        }
      });
    },
    [editRole.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default RoleSlice.reducer;
