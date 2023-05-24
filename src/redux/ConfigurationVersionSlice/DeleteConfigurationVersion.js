import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { message } from "antd";
import { toast } from "react-toastify";


export const deleteConfigurationVersion = createAsyncThunk(
  "configuration/deleteConfigurationVersion",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/deleteversion/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(id),
        }
      );
      if (response.ok) {
        const log = await fetch("http://localhost:5000/logs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            action: `${
              jwt_decode(localStorage.getItem("token")).username
            } deleted Configuration Version with id: ${id}`,
          }),
        });
        // Refresh the page
        window.location.reload();
        toast.success("Configuration version deleted successfully");

        return "delete Configuration version relationship deleted successfully";
      } else {
        const data = await response.json();
        const errorMessage = data.message || "An error occurred during deletion.";
        message.error(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const DeleteConfigurationVersionSlice = createSlice({
  name: "deleteConfigurationversion",
  initialState: {
    isLoding: false,
    error: null,
  },

  extraReducers: {
    [deleteConfigurationVersion.pending]: (state, action) => {
      state.isLoding = true;
      state.error = null;
    },
    [deleteConfigurationVersion.fulfilled]: (state, action) => {
      state.isLoding = false;
      console.log(action.payload);
      // Update state to reflect deleted user_role relationship
    },
    [deleteConfigurationVersion.rejected]: (state, action) => {
      state.isLoding = false;
      state.error = action.payload;
    },
  },
});

export default DeleteConfigurationVersionSlice.reducer;
