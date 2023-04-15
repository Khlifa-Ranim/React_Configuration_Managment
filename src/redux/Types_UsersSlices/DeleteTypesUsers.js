import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteTypes = createAsyncThunk(
  "types/deleteTypes",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/type/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        return "role deleted successfully";
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

const DdeleteTypesSlice = createSlice({
  name: "deleteRoles",
  initialState: {
    isLoding: false,
    error: null
  },

  extraReducers: {
    [deleteTypes.pending]: (state, action) => {
      state.isLoding = true;
      state.error = null;
    },
    [deleteTypes.fulfilled]: (state, action) => {
      state.isLoding = false;
      state.users = state.users.filter((el) => el.id !== action.payload);
    },
    [deleteTypes.rejected]: (state, action) => {
      state.isLoding = false;
      if (action.payload === "INVALID_ROLE") {
        state.error = "Cannot delete role - role does not exist or unauthorized.";
      } else {
        state.error = action.payload;
      }
    }
  }

});

export default DdeleteTypesSlice.reducer;
export const {  removeUser } = DdeleteTypesSlice.actions;
