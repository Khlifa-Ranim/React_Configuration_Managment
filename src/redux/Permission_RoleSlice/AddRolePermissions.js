import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { message } from "antd";

export const CreateRole_Permissions = createAsyncThunk(
  "role_Permissions/CreateRole_Permissions",
  async ({ role_id, permission_id }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/roles_permissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ role_id, permission_id }),
      });

      const data = await response.json();

      if (!response.ok) {
        /**************msg error */
        message.error(data.message);
        const { error } = await response.json();
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
          } Created One Permission To the Role with ID:  ${role_id}`,
        }),
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const CreateRolePermissionSlice = createSlice({
  name: "CreateroleStore",
  initialState: {
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
