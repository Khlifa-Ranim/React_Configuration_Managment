import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { message } from 'antd';
import { toast } from "react-toastify";




export const CreateRole = createAsyncThunk(
  "roles/CreateRole",
  async (roles, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/roles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(roles),
      });

      const data = await response.json();

      if (!response.ok) {
        /**************msg error */
        message.error(data.message);
        const { error } = await response.json();
        return rejectWithValue(data.error);
      }
      else {
        toast.success("Role added successfully");
        return data;
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
          } created an Role with Name Role:  ${roles.name}`,
        }),
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const CreateRoleSlice = createSlice({
  name: "CreateroleStore",
  initialState: {
    roles: [],
    loading: false,
    error: null,
    // token: localStorage.getItem("token") // initialize the token from the local storage
  },
  reducers: {
    addRole: (state, action) => {
      state.roles.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateRole.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload); // add this line to log the payload object
        state.roles = action.payload.roles;
      })
      .addCase(CreateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log(action.error); // add this line to log the error object
      });
  },
});

export default CreateRoleSlice.reducer;
export const { addRole } = CreateRoleSlice.actions;
