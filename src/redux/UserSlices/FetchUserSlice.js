import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  console.log("Fetching users..."); // <-- add this line to log when users are being fetched

  const response = await axios.get("http://localhost:5000/users", config);
  console.log("Users fetched:", response.data); // <-- add this line to log the fetched users
  console.log(
    "FetchUserSlice.js",
    response.data.map((user) => user.id)
  );
  // return response.data
  return response.data.map((user) => {
    return {
      id: user.id,
      username: user.username,
      USER_TYPE: user.USER_TYPE,
      type_id: user.type_id,
      roles: user.roles,
      password: user.password,
    };
  });
});

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        return response;
      } else if (response.status === 202) {
        return "Nothing deleted";
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
const userSlice = createSlice({
  name: "FetchUsersStore",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

const FetchUserSlice = createSlice({
  name: "FetchRolsStore",
  initialState,

  extraReducers: {
    [fetchUser.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.RoleInfo = action.payload;
    },
    [fetchUser.rejected]: (state, action) => {
      state.loading = false;
      if (action.payload === "INVALID_User") {
        state.error =
          "Cannot fech permission - permission does not exist or unauthorized.";
      } else {
        state.error = action.payload;
      }
    },
  },
});

export default userSlice.reducer;
export const fetchRoleReducer = FetchUserSlice.reducer;
