import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  TabConfigurationVersion: [],
  error: "",
};

export const featchConfigurationsVersion = createAsyncThunk(
  "configuration/featchConfigurationsVersion",
  async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    console.log("Fetching Configurations Version..."); // <-- add this line to log when Permissions are being fetched

    const response = await axios.get(
      "http://localhost:5000/configurationsversion",
      config
    );
    console.log("Configuration Version fetched:", response.data); // <-- add this line to log the fetched users
    // return response.data

    return response.data.map((Configuration) => {
      return {
        id: Configuration.id,
        description: Configuration.description,
        name: Configuration.name,
        updatedBy: Configuration.updatedBy,
        value: Configuration.value,
        version: Configuration.version,
        id_configuration: Configuration.id_configuration,

      };
    });
  }
);

export const FeatchConfigurationVersionById = createAsyncThunk(
  "configurationVersion/fetchconfigurationVersion",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/configurationversion/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        return "configuration Featched successfully";
      } else if (response.status === 202) {
        return "Nothing Featched";
      } else if (response.status === 401) {
        throw new Error("Unauthorized - Invalid or missing token");
      } else if (response.status === 403) {
        throw new Error("Forbidden - User does not have necessary roles");
      } else if (response.status === 404) {
        throw new Error(
          "Not Found - Endpoint not found or invalid permissions"
        );
      } else {
        throw new Error("Internal Server Error");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const FeatchConfigurationversionSlice  = createSlice({
  name: "FeatchConfigurationversionStore",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(featchConfigurationsVersion.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(featchConfigurationsVersion.fulfilled, (state, action) => {
      state.loading = false;
      state.TabConfigurationVersion = action.payload;
      state.error = "";
    });
    builder.addCase(featchConfigurationsVersion.rejected, (state, action) => {
      state.loading = false;
      state.TabConfigurationVersion = [];
      state.error = action.error.message;
    });
  },
});

const FeatchConfigurationVersionByIdSlice = createSlice({
  name: "FeatchConfigurationById",
  initialState,

  extraReducers: {
    [FeatchConfigurationVersionById.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [FeatchConfigurationVersionById.fulfilled]: (state, action) => {
      state.loading = false;
      state.RoleInfo = action.payload;
    },
    [FeatchConfigurationVersionById.rejected]: (state, action) => {
      state.loading = false;
      if (action.payload === "INVALID_ROLE") {
        state.error =
          "Cannot fech permission - permission does not exist or unauthorized.";
      } else {
        state.error = action.payload;
      }
    },
  },
});

export default FeatchConfigurationversionSlice.reducer;
export const FeatchconfigurationVersion =  FeatchConfigurationVersionByIdSlice.reducer;
