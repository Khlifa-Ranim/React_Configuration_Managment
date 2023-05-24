import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { message } from "antd";

export const editProfile = createAsyncThunk(
  "profile/editProfile",
  async (editProfile, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/profile/${editProfile.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(editProfile),
        }
      );

      // ADD LOG
      const log = await fetch("http://localhost:5000/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          action: `${
            jwt_decode(localStorage.getItem("token")).username
          }Updated Profile with Name :  ${editProfile.name}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
              /**************msg error */
              message.error(data.message);
              const { error } = await response.json();
        return rejectWithValue(data.error);
      }
      else {toast.success("Profile Updated Successffuly")}

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ProfileSlice = createSlice({
  name: "editPermissionStore",
  initialState: {
    isLoading: false,
    Permissions: [],
    error: "",
  },
  extraReducers: {
    [editProfile.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [editProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.roles.map((profile) => {
        if (profile.id == action.payload.id) {
          profile.description = action.payload.description;
          profile.adresse = action.payload.adresse;
          profile.email = action.payload.email;
          profile.image = action.payload.image;
          profile.name = action.payload.name;
          profile.telephone = action.payload.telephone;
        }
      });
    },
    [editProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default ProfileSlice.reducer;
