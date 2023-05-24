import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
const initialState = {
  user: "",
  loading: false,
  error: null,
};

export const CreateUser = createAsyncThunk(
  "auth/createUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        /**************msg error */
        message.error(data.message);
        const { error } = await response.json();
        return rejectWithValue(error);
      }
      else {toast.success("User account Created Successffuly");}
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
          } created an account for ${user.username}`,
        }),
      });
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

const CreateUserSlice = createSlice({
  name: "CreateAddUserSlice",
  initialState,

  reducers: {
    addToken: (state, action) => {},

    addUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(CreateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default CreateUserSlice.reducer;
