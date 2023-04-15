// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//     //*******************FUNCTION--LoginIn********************/

// export const SignInUser = createAsyncThunk("SignInUser", async (body) => {
//   const res = await fetch("http://localhost:5000/user/login", {
//     method: "post",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${localStorage.getItem("token")}`,



//     },
//     body: JSON.stringify(body),
//   });
//   return await res.json();
// });
// //*******************CreateUser********************/
// export const CreateUser = createAsyncThunk(
//     "auth/createUser",
//     async (user, { rejectWithValue }) => {
//       try {
//         const response = await fetch("http://localhost:5000/users", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${localStorage.getItem("token")}`,
//           },
//           body: JSON.stringify(user),
//         });
  
//         if (!response.ok) {
//           const { error } = await response.json();
//           return rejectWithValue(error);
//         }
  
//         // const { token } = await response.json();
//         // localStorage.setItem("token", token); // dispatch addToken action
//       } catch (error) {
//         return rejectWithValue(error.message);
//       }
//     }
//   );


// //*******************LoginIn********************/
// const AuthSlice = createSlice({
//   name: "user",
//   initialState:{
//     user: "",
//     token: "",
//     loading: false,
//     isAuthenticated: false,
//     expirationTime: null, 
//   },
//   reducers: {
//     addToken: (state, action) => {
//       state.token = localStorage.getItem("token");
   
//     },

//     // addUser: (state, action) => {
//     //   // state.user = JSON.parse(localStorage.getItem("user"));
//     //   const storedUser = localStorage.getItem("user");
//     //   if (storedUser) {
//     //     state.user = JSON.parse(storedUser);
//     //   }
//     // },
    
//     addUser: (state, action) => {
//       const storedUser = localStorage.getItem("user");
//       const user = JSON.parse(storedUser);
//       console.log("storedUser", storedUser);
//       console.log("user", user);
      
//       if (storedUser !== null) {
//         try {
//           state.user = user;
//         } catch (e) {
//           console.error("Error parsing stored user data:", e);
//         }
//       }
//     },
    
//     logout: (state, action) => {
//       state.token = null;
//       state.expirationTime = null;
//       localStorage.clear();
//     },
//   },
  


//   //*******************CreateUser********************/
//   const CreateUserSlice = createSlice({

//   name: 'user',
//   initialState:{
//     user: "",
//     loading: false,
//     error: null,
//    // token: localStorage.getItem("token") // initialize the token from the local storage
//   }
// ,

//   reducers: {
//       addToken: (state, action) => {
//          // localStorage.setItem("token", action.payload.token);

//           state.token =  localStorage.setItem("token", action.payload.token);

//         },
    
//         addUser: (state, action) => {
//           state.user = JSON.parse(localStorage.getItem("user"));
//         },
        
//         logout: (state, action) => {
//           state.token = null;
//           state.expirationTime = null;
//           localStorage.clear();
//         },
//   },
    
// });

//   extraReducers: {
//     //*******************LoginIn********************/
//     [SignInUser.pending]: (state, action) => {
//       state.loading = true;
//       state.isAuthenticated = false;
//     },
//     [SignInUser.fulfilled]: (
//       state,
//       { payload: { error, token, user } }
//     ) => {
//       state.loading = false;
//       state.isAuthenticated = true;
//       if (error) {
//         state.error = error;
//       } else {
//         state.token =token;
//         state.user = user;

//         localStorage.setItem("user", JSON.stringify(user));
//         localStorage.setItem("token", token);

//         // set expiration time to one hour from now
//         const expirationTime = new Date().getTime() + 60 * 60 * 1000; // one hour in milliseconds
//         state.expirationTime = expirationTime;
//         localStorage.setItem("expirationTime", expirationTime);
//       }
//     },
//     [SignInUser.rejected]: (state, action) => {
//       state.loading = true;
//       state.isAuthenticated = false;
//     },
//       //*******************CreateUser********************/
//       [CreateUser.pending]: (state, action) => {
//         state.loading = true;
//       },
//       [CreateUser.fulfilled]: (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         //state.token = action.payload.token;
//       },
//       [CreateUser.rejected]: (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;      },

//   },
// });
// // Add a selector to check if the token is expired or not
// export const isTokenExpired = (state) => {
//     const expirationTime = state.expirationTime;
//     if (!expirationTime) {
//       return true;
//     }
//     const now = new Date().getTime();
//     return now > expirationTime;
//   };

// export const { addToken, addUser, logout } = AuthSlice.actions;
// export default {AuthSlice,CreateUserSlice}.reducer;

