import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  profiles: [],
  error: "",
};




export const featchImageById = createAsyncThunk(
  "profile/fetchprofile",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/image/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        
      });

      if (response.status === 200) {
        return "image deleted successfully";
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




const FeatchImageByIdSlice = createSlice({
  name: "FetchProfilessStore",
  initialState,

  extraReducers: {
    [featchImageById.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [featchImageById.fulfilled]: (state, action) => {
      state.loading = false;
      state.RoleInfo = action.payload;
    },
    [featchImageById.rejected]: (state, action) => {
      state.loading = false;
      if (action.payload === "INVALID_ROLE") {
        state.error = "Cannot fech permission - permission does not exist or unauthorized.";
      } else {
        state.error = action.payload;
      }
    }
  }

});

export default profileSlice.reducer
export const fetchprofileReducer = FeatchImageByIdSlice.reducer;
