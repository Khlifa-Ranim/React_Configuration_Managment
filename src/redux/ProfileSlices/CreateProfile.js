 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

 const initialState={
    user: "",
    loading: false,
    error: null,
  }

 export const CreateProfile = createAsyncThunk(
    "profile/createProfile",
    async (profile, { rejectWithValue }) => {
      try {
        const response = await fetch("http://localhost:5000/profiles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(profile),
        });
  
        if (!response.ok) {
          const { error } = await response.json();
          return rejectWithValue(error);
        }
  
        // const { token } = await response.json();
        // localStorage.setItem("token", token); // dispatch addToken action
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  

const CreateProfileSlice = createSlice({
    name: 'user',
    initialState:{
      user: "",
      loading: false,
      error: null,
     // token: localStorage.getItem("token") // initialize the token from the local storage
    }
  ,

 
    extraReducers: (builder) => {
      builder
        .addCase(CreateProfile.pending, (state) => {
          state.loading = true;
        })
        .addCase(CreateProfile.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload.user;
          //state.token = action.payload.token;
        })
        .addCase(CreateProfile.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      
        });
    },
  });
  
  export default CreateProfileSlice.reducer; 
