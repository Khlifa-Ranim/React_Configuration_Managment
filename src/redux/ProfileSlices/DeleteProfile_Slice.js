import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

export const deleteProfile = createAsyncThunk(
  "profile/deleteUserRole",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/profile/${id}`, {
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
            } deleted Profile with id: ${id}`,
          }),
        });
        // Refresh the page
        window.location.reload();
        return "profile relationship deleted successfully";
      } else if (response.status === 404) {
        throw new Error("profile relationship does not exist");
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
    error: null,
  },

  extraReducers: {
    [deleteProfile.pending]: (state, action) => {
      state.isLoding = true;
      state.error = null;
    },
    [deleteProfile.fulfilled]: (state, action) => {
      state.isLoding = false;
      console.log(action.payload);
      // Update state to reflect deleted user_role relationship
    },
    [deleteProfile.rejected]: (state, action) => {
      state.isLoding = false;
      state.error = action.payload;
    },
  },
});

export default DeleteUserRoleSlice.reducer;
export const { removeUserRole } = DeleteUserRoleSlice.actions;
