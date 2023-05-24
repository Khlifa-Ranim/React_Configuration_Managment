import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteType = createAsyncThunk(
  "type/deleteType",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/type/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(id),
      });
      if (response.status === 200) {
        return "deleteType relationship deleted successfully";
      } else if (response.status === 404) {
        throw new Error("deleteType relationship does not exist");
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

const DeleteTypeSlice= createSlice({
  name: "DeleteTypeSlice",
  initialState: {
    isLoding: false,
    error: null,
  },

  extraReducers: {
    [deleteType.pending]: (state, action) => {
      state.isLoding = true;
      state.error = null;
    },
    [deleteType.fulfilled]: (state, action) => {
      state.isLoding = false;
      console.log(action.payload);
      // Update state to reflect deleted user_role relationship
    },
    [deleteType.rejected]: (state, action) => {
      state.isLoding = false;
      state.error = action.payload;
    },
  },
});

export default DeleteTypeSlice.reducer;
