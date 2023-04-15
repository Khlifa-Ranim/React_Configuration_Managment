import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deletePermissions = createAsyncThunk(
  "permission/deletePermissions",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/permission/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}
          `,
        },
      });
      if (response.status === 200) {
        return "permission deleted successfully";
      } else if (response.status === 202) {
        return "Nothing deleted";
      } else if (response.status === 401) {
        throw new Error("Unauthorized - Invalid or missing token");
      } else if (response.status === 403) {
        throw new Error("Forbidden - User does not have necessary roles");
      } else if (response.status === 404) {
        throw new Error("Not Found - Endpoint not found or invalid permissions");
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
    isLoding: false,
    error: null
  },

  extraReducers: {
    [deletePermissions.pending]: (state, action) => {
      state.isLoding = true;
      state.error = null;
    },
    [deletePermissions.fulfilled]: (state, action) => {
      state.isLoding = false;
      state.users = state.users.filter((el) => el.id !== action.payload);
    },
    [deletePermissions.rejected]: (state, action) => {
      state.isLoding = false;
      state.error = action.payload;
    }
  }

});

export default DeletePermissionSlice.reducer;
export const {  removeUser } = DeletePermissionSlice.actions;
