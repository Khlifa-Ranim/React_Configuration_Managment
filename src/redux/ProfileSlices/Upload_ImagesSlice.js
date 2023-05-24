import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

export const uploadProfileImage = createAsyncThunk(
  "profile/uploadImage",
  async (editProfile, { rejectWithValue }) => {
    try {
      // const formData = new FormData();
      // formData.append("image", imageFile);
      const response = await fetch(
        `http://localhost:5000/profile/upload/image/${
          jwt_decode(localStorage.getItem("token")).user_id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(editProfile),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.error);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  uploadStatus: "idle",
  uploadError: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadProfileImage.pending, (state) => {
        state.uploadStatus = "loading";
        state.uploadError = null;
      })
      .addCase(uploadProfileImage.fulfilled, (state) => {
        state.uploadStatus = "succeeded";
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.uploadStatus = "failed";
        state.uploadError = action.payload;
      });
  },
});

export default profileSlice.reducer;
