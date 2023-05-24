import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

export const deletePermissions = createAsyncThunk(
  "permission/deletePermissions",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/permission/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(id),
      });

      if (response.status === 200) {
        const log = await fetch("http://localhost:5000/logs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            action: `${
              jwt_decode(localStorage.getItem("token")).username
            } deleted permission with id: ${id}`,
          }),
        });
        // Refresh the page
        window.location.reload();
        return "Permission deleted successfully";
      } else if (response.status === 202) {
        return "Nothing deleted";
      } else if (response.status === 401) {
        throw new Error("Unauthorized - Invalid or missing token");
      } else if (response.status === 403) {
        throw new Error("Forbidden - User does not have necessary roles");
      } else if (response.status === 404) {
        throw new Error(
          "Not Found - Endpoint not found or invalid permissions"
        );
      } else {
        throw new Error("Internal Server Error");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const DeletePermissionSlice = createSlice({
  name: "deletePermissions",
  initialState: {
    isLoading: false,
    error: null,
  },

  extraReducers: {
    [deletePermissions.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [deletePermissions.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = state.users.filter((el) => el.id !== action.payload);
    },
    [deletePermissions.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default DeletePermissionSlice.reducer;
export const { removeUser } = DeletePermissionSlice.actions;
