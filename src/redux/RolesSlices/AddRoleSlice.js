 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
 

export const CreateRole = createAsyncThunk(
  "roles/CreateRole",
  async (roles, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/roles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(roles),
      });

      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.error);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



  

const CreateRoleSlice = createSlice({
    name: 'CreateroleStore',
    initialState:{
      roles: [],
      loading: false,
      error: null,
     // token: localStorage.getItem("token") // initialize the token from the local storage
    }
  ,

    reducers: {
      addRole: (state, action) => {
            state.roles.push(action.payload);

          },
         
    },
    extraReducers: (builder) => {
      builder
        .addCase(CreateRole.pending, (state) => {
          state.loading = true;
        })
        .addCase(CreateRole.fulfilled, (state, action) => {
          state.loading = false;
          console.log(action.payload); // add this line to log the payload object
          state.roles = action.payload.roles;
        })
        .addCase(CreateRole.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
          console.log(action.error); // add this line to log the error object
    
        });
    },
    
    
    
    
    
    
  });
  
  export default CreateRoleSlice.reducer; 
  export const {addRole} = CreateRoleSlice.actions;

// const initialState = {
  
//   token: token,
//   isAuthenticated: `Bearer ${token ? 'true' : 'false'}`,
//   username: '',
//   password: '',
//   loading: false,
//   error: null,
// };
 
//     //*******************FUNCTION--CreateUser********************/

//     // export const CreateUser=createAsyncThunk("CreateUser",async(body)=>{
//     //   const res= await fetch("http://localhost:5000/users",{
//     //     method:"post",
//     //     headers:{
//     //       'Content-Type': 'application/json'
//     //       //'Authorization': `Bearer ${token}`


//     //     },
//     //     body: JSON.stringify(body),

//     //   })
//     //   return await res.json();
//     // })

//         export const CreateUser = createAsyncThunk(
//       "CreateUser",
//       async (body, { getState }) => {
//         const { token } = getState().user; // Get the token from the state
//         const res = await fetch("http://localhost:5000/users", {
//           method: "post",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // Add the token to the headers
//           },
//           body: JSON.stringify(body),
//         });
//         return await res.json();
//       }
//     );




// const CreateUserSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     addToken: (state, action) => {
//       state.token = localStorage.getItem("token");
//     },

//     addUser: (state, action) => {
//       state.user = JSON.parse(localStorage.getItem("user"));
//     },
    
//     logout: (state, action) => {
//       state.token = null;
//       state.expirationTime = null;
//       localStorage.clear();
//     },
//   },
//   extraReducers: {
  
//         //*******************CreateUser********************/
//         [CreateUser.pending]: (state, action) => {
//           state.loding = true;
//           state.isAuthenticated = false;
//         },
//         [CreateUser.fulfilled]: (
//           state,
//           { payload: { error, msg, token, user,username,password} }
//         ) => {
//           state.loding = false;
//           state.isAuthenticated = true;
//           if (error) {
//             state.error = error;
//           } else {
//             state.msg = msg;
//             state.token = token;
//             state.user = user;
//             state.username=username;
//             state.password=password;
    
//             localStorage.setItem("msg", msg);
//             localStorage.setItem("user", JSON.stringify(user));
//             localStorage.setItem("token", token);
    
//             // set expiration time to one hour from now
//             const expirationTime = new Date().getTime() + 60 * 60 * 1000; // one hour in milliseconds
//             state.expirationTime = expirationTime;
//             localStorage.setItem("expirationTime", expirationTime);
//           }
//         },
//         [CreateUser.rejected]: (state, action) => {
//           state.loding = true;
//           state.isAuthenticated = false;
//         },
    


//   },
// });

// export const { addToken, addUser, logout } = AuthSlice.actions;
// export default CreateUserSlice.reducer;
