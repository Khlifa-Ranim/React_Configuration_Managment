import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteRolesPermissions = createAsyncThunk(
  "rolesPermissions/deleteRolesPermissions",
  async ({ role_id, permission_id }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/roles_permissions`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ role_id, permission_id }),
      });
      if (response.status === 200) {
        return `Role-Permission relationship with role id [ ${role_id} ] and permission id : [ ${permission_id} ] has been deleted successfully`;
      } else if (response.status === 404) {
        throw new Error("Role-Permission relationship does not exist");
      } else if (response.status === 401) {
        throw new Error("Unauthorized - Invalid or missing token");
      } else if (response.status === 403) {
        throw new Error("Forbidden - User does not have necessary roles");
      } else {
        throw new Error("Internal Server Error");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const DeleteRolesPermissionsSlice = createSlice({
  name: "DeleteRolesPermissions",
  initialState: {
    isLoding: false,
    error: null,
  },

  extraReducers: {
    [deleteRolesPermissions.pending]: (state, action) => {
      state.isLoding = true;
      state.error = null;
    },
    [deleteRolesPermissions.fulfilled]: (state, action) => {
      state.isLoding = false;
      console.log(action.payload);
      // Update state to reflect deleted role_permission relationship
    },
    [deleteRolesPermissions.rejected]: (state, action) => {
      state.isLoding = false;
      state.error = action.payload;
    },
  },
});

export default DeleteRolesPermissionsSlice.reducer;
export const { removeRolesPermissions } = DeleteRolesPermissionsSlice.actions;
