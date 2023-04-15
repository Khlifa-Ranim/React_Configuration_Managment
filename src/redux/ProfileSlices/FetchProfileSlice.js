import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  profiles: [],
  error: "",
};


export const fetchProfiles = createAsyncThunk("profile/fetchProfiles", async () => {
    
  const config = {
    
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  console.log("Fetching profiles..."); // <-- add this line to log when users are being fetched

  const response = await axios.get("http://localhost:5000/profiles", config);
  console.log("profiles fetched:", response.data); // <-- add this line to log the fetched users
   // return response.data

  return response.data.map((profile) => {
    return {
    id: profile.id,
    adresse: profile.adresse,
    description: profile.description,
    name: profile.name,
    telephone: profile.telephone,
    email:profile.email,
    user_id: profile.user_id,

  };
});
});



const profileSlice = createSlice({
  name: "FetchProfilessStore",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProfiles.pending,(state)=>{
        state.loading=true
    })
    builder.addCase(fetchProfiles.fulfilled,(state,action)=>{
        state.loading=false
        state.profiles=action.payload
        state.error=''
    })
    builder.addCase(fetchProfiles.rejected,(state,action)=>{
        state.loading=false
        state.profiles=[]
        state.error=action.error.message
    })
  },
});

export default profileSlice.reducer