import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
  data: [], // array of objects from API
  filteredTitle: [],
  isLoading: true
}

export const GetName = createAsyncThunk(
  "role/GetName",
  async (searchTerm, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/search_by_role_name", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        return data;
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

export const SetNameSlice = createSlice({
  name: 'roleSlice',
  initialState,
  reducers: {},
  extraReducers: {
    [GetName.pending]: (state) => {
      state.isLoading = true;
    },
    [GetName.fulfilled]: (state, action) => {
      state.filteredTitle = action.payload;
      state.isLoading = false;
    },
    [GetName.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default SetNameSlice.reducer;
