import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { message } from "antd";

export const CreateUsers_Roles = createAsyncThunk(
  "user_id/CreateUsers_Roles",
  async ({ user_id, role_id }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/user_role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ user_id, role_id }),
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
          } created an Role To the User With Id:  ${user_id}`,
        }),
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const CreateUsers_RolesSlice = createSlice({
  name: "CreateroleStore",
  initialState: {
    roles: [],
    loading: false,
    error: null,
    // token: localStorage.getItem("token") // initialize the token from the local storage
  },

  extraReducers: (builder) => {
    builder
      .addCase(CreateUsers_Roles.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateUsers_Roles.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload); // add this line to log the payload object
        state.roles = action.payload.roles;
      })
      .addCase(CreateUsers_Roles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log(action.error); // add this line to log the error object
      });
  },
});

export default CreateUsers_RolesSlice.reducer;
