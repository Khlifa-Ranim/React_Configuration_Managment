import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";


const initialState = {
  user: "",
  token: "",
  loading: false,
  isAuthenticated: localStorage.getItem('is_logged') ?? 0,
  expirationTime: 1680550353506,
  username: null,
  password: null,
};
//*******************FUNCTION--LoginIn********************/

export const SignInUser = createAsyncThunk(
  "auth/SignInUser", async (body,rejectWithValue) => {
  
  const res = await fetch("http://localhost:5000/user/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      // 'Authorization': `Bearer ${token}`
      //"Authorization": `Bearer ${("token")}`,
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(body),
  });
  const data= await res.json();
   if (!res.ok) {
    /**************msg error */
    message.error(data.message);
    const { error } = await res.json();
    return rejectWithValue(error);
  }
  return data;
});


const AuthSlice = createSlice({
  name: "AuthStore",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = localStorage.getItem("token");
    },

    addUser: (state, action) => {
      state.user = localStorage.getItem("user");


    },

 

    logout: (state, action) => {
      state.token = null;
      state.expirationTime = null;
      state.username = null;
      state.password = null;
      localStorage.clear();
    },
  },
  extraReducers: {
    //*******************LoginIn********************/
    [SignInUser.pending]: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    [SignInUser.fulfilled]: (
      state,
      { payload: { error, token, user, username, password } }
    ) => {
      state.loading = false;
      state.isAuthenticated = true;
      if (error) {
        state.error = error;
      } else {
        state.token = token;
        state.username = username;
        state.password = password;
        state.user = user;

        console.log("user in state:", state.user);
        if (user) {
          // add this check to make sure that user is not undefined
          localStorage.setItem("user", JSON.stringify(user));
        }
        console.log("user in local storage:", localStorage.getItem("user"));
        localStorage.setItem("user", user);

        localStorage.setItem("token", token);
        localStorage.setItem('is_logged', 1)

        // set expiration time to one hour from now
        const expirationTime = new Date().getTime() + 60 * 60 * 1000; // one hour in milliseconds
        state.expirationTime = expirationTime;
        localStorage.setItem("expirationTime", expirationTime);
      }
    },
    [SignInUser.rejected]: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
  },
});
// Add a selector to check if the token is expired or not
export const isTokenExpired = (state) => {
  const expirationTime = state.expirationTime;
  if (!expirationTime) {
    return true;
  }
  const now = new Date().getTime();
  return now > expirationTime;
};

export const { addToken, addUser, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
