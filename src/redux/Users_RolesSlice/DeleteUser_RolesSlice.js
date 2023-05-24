import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteUserRole = createAsyncThunk(
    "user/deleteUserRole",
    async ({ user_id,role_id }, { rejectWithValue }) => {
      try {
        const response = await fetch(`http://localhost:5000/users_roles`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ user_id,role_id }),
        });
        if (response.status === 200) {
          return "User-Role relationship deleted successfully";
        } else if (response.status === 404) {
          throw new Error("User-Role relationship does not exist");
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
  
  const DeleteUserRoleSlice = createSlice({
    name: "DeleteUserRole",
    initialState: {
      isLoding: false,
      error: null
    },
  
    extraReducers: {
      [deleteUserRole.pending]: (state, action) => {
        state.isLoding = true;
        state.error = null;
      },
      [deleteUserRole.fulfilled]: (state, action) => {
        state.isLoding = false;
        console.log(action.payload);
        // Update state to reflect deleted user_role relationship
      },
      [deleteUserRole.rejected]: (state, action) => {
        state.isLoding = false;
        state.error = action.payload;
      }
    }
  
  });
  
  export default DeleteUserRoleSlice.reducer;
  export const {  removeUserRole } = DeleteUserRoleSlice.actions;
  