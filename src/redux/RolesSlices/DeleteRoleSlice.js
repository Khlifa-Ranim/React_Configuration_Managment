import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

export const deleteRoles = createAsyncThunk(
  "role/deleteRoles",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/role/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
            } deleted Role with id: ${id}`,
          }),
        });
        // Refresh the page
        window.location.reload();
        return "role deleted successfully";
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

const DdeleteRolesSlice = createSlice({
  name: "deleteRoles",
  initialState: {
    isLoding: false,
    error: null,
  },

  extraReducers: {
    [deleteRoles.pending]: (state, action) => {
      state.isLoding = true;
      state.error = null;
    },
    [deleteRoles.fulfilled]: (state, action) => {
      state.isLoding = false;
      state.users = state.users.filter((el) => el.id !== action.payload);
    },
    [deleteRoles.rejected]: (state, action) => {
      state.isLoding = false;
      if (action.payload === "INVALID_ROLE") {
        state.error =
          "Cannot delete role - role does not exist or unauthorized.";
      } else {
        state.error = action.payload;
      }
    },
  },
});

export default DdeleteRolesSlice.reducer;
export const { removeUser } = DdeleteRolesSlice.actions;
