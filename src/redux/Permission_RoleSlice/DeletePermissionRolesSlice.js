import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteRolePermissions = createAsyncThunk(
  "permission/deletePermissions",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/roles_permissions/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}
          `,
        },
      });
      if (response.status === 200) {
        return { id };
      } else if (response.status === 202) {
        return { id, message: "Nothing deleted" };
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


const DeleterolePermissionSlice = createSlice({
  name: "deletePermissions",
  initialState: {
    isLoding: false,
    error: null
  },

  extraReducers: {
    [deleteRolePermissions.pending]: (state, action) => {
      state.isLoding = true;
      state.error = null;
    },
[deleteRolePermissions.fulfilled]: (state, action) => {
  state.isLoding = false;
  state.permissions = state.permissions.filter((permission) => permission.id !== action.payload.id);
},

    [deleteRolePermissions.rejected]: (state, action) => {
      state.isLoding = false;
      state.error = action.payload;
    }
  }

});

export default DeleterolePermissionSlice.reducer;
