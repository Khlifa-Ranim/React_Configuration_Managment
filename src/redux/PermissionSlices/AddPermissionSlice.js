import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { message } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const initialState = {
  permission: "",
  loading: false,
  error: null,
  // token: localStorage.getItem("token") // initialize the token from the local storage
};

export const CreatePermission = createAsyncThunk(
  "permission/CreatePermission",
  async (permission, { rejectWithValue }) => {

    try {
      const response = await fetch("http://localhost:5000/permissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(permission),
      });

      const data = await response.json();

      if (!response.ok) {
             /**************msg error */
             message.error(data.message);
             const { error } = await response.json();
        return rejectWithValue(error);
      }
      else {toast.success("Permission added successfully");
     
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
          } added permission with endpoint: ${
            permission.endpoint
          } and method: ${permission.method}`,
        }),

      });
        return data;
        
      }

     
      
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
        // autoClose: 5000,
        // hideProgressBar: true,
        // closeOnClick: true,
        // pauseOnHover: true,
        // draggable: true,
        // progress: undefined,
      });
      return rejectWithValue(error.message);
    }
  }
);

const CreatePermissionSlice = createSlice({
  name: "permission",
  initialState: {
    permission: "",
    loading: false,
    error: null,
    success: false, // add success state
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreatePermission.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreatePermission.fulfilled, (state, action) => {
        state.loading = false;
        state.permission = action.payload.permission;
        state.success = true; // set success to true on successful API call
      })
      .addCase(CreatePermission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default CreatePermissionSlice.reducer;
