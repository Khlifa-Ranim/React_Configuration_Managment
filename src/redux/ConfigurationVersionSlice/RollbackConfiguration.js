import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { message } from "antd";

export const rollbackConfiguration = createAsyncThunk(
  "configuration/rollback",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/rollback/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        /**************msg error */
        message.error(data.message);
        const { error } = await response.json();
        return rejectWithValue(data.message);
      }       else {toast.success("Configuration Rolled back successfully");
      // ADD LOG
      const log = await fetch("http://localhost:5000/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          action: `${jwt_decode(localStorage.getItem("token")).username} `,
        }),
      });
      return data;}
    } catch (error) {
      // toast.error(error.message, {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      return rejectWithValue(error.message);
    }
  }
);

const configurationSlice = createSlice({
  name: "configuration",
  initialState: {
    isLoading: false,
    configurations: [],
    error: "",
  },
  reducers: {},
  extraReducers: {
    [rollbackConfiguration.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [rollbackConfiguration.fulfilled]: (state, action) => {
      state.isLoading = false;
      const updatedConfiguration = action.payload;
      const index = state.configurations.findIndex(
        (config) => config.id === updatedConfiguration.id
      );
      if (index !== -1) {
        state.configurations[index] = updatedConfiguration;
      }
    },
    [rollbackConfiguration.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default configurationSlice.reducer;
