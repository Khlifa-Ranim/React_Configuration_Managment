import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";


export const EditConfiguration = createAsyncThunk(
  "permission/editPermission",
  async (EditConfiguration, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/configuration/${EditConfiguration.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(EditConfiguration),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error);
      }

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
          } Updated Configuration With Name :  ${EditConfiguration.name}`,
        }),
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ConfigurationSlice = createSlice({
  name: "EditConfiguration",
  initialState: {
    isLoading: false,
    Permissions: [],
    error: "",
  },
  extraReducers: {
    [EditConfiguration.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [EditConfiguration.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.roles.map((configuration) => {
        if (configuration.id == action.payload.id) {
          configuration.defaultValue = action.payload.defaultValue;
          configuration.description = action.payload.description;
          configuration.name = action.payload.name;
          configuration.updatedBy = action.payload.updatedBy;
          configuration.value = action.payload.value;
          configuration.version = action.payload.version;
        }
      });
    },
    [EditConfiguration.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default ConfigurationSlice.reducer;
