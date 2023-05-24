import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { message } from 'antd';


export const CreateConfiguration = createAsyncThunk(
  "configuration/CreateConfiguration",
  async (configuration, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/configurations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(configuration),
      });

      const data = await response.json();

      if (!response.ok) {
     /**************msg error */
     message.error(data.message);
     const { error } = await response.json();
        return rejectWithValue(data.error);
      }
      else {toast.success("Configuration added successfully");
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

const CreateConfigurationSlice = createSlice({
  name: "CreateroleStore",
  initialState: {
    Types: [],
    loading: false,
    error: null,
    // token: localStorage.getItem("token") // initialize the token from the local storage
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateConfiguration.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateConfiguration.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload); // add this line to log the payload object
        state.Types = action.payload.Types;
      })
      .addCase(CreateConfiguration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log(action.error); // add this line to log the error object
      });
  },
});

export default CreateConfigurationSlice.reducer;
