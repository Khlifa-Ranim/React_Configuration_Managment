import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { message } from "antd";

export const VersionnerConfigurations = createAsyncThunk(
  "versionconfiguration/VersionnerConfiguration",
  async (VersionnerConfiguration, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/versionner/${VersionnerConfiguration.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(VersionnerConfiguration),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        /**************msg error */
        message.error(data.message);
        const { error } = await response.json();
        return rejectWithValue(data.error);
      }
      else {toast.success("Configuration version create successlly")}
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
          } Updated Configuration With Name :  ${VersionnerConfiguration.name}`,
        }),
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ConfigurationVersionnerSlice = createSlice({
  name: "Versionner",
  initialState: {
    isLoading: false,
    Permissions: [],
    error: "",
  },
  extraReducers: {
    [VersionnerConfigurations.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [VersionnerConfigurations.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.roles.map((configuration) => {
        if (configuration.id == action.payload.id) {
          configuration.description = action.payload.description;
          configuration.name = action.payload.name;
          configuration.updatedBy = action.payload.updatedBy;
          configuration.value = action.payload.value;
          configuration.version = action.payload.version;
        }
      });
    },
    [VersionnerConfigurations.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default ConfigurationVersionnerSlice.reducer;
