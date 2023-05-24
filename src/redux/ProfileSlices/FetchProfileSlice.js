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
  // console.log("profiles fetched:", response.data); // <-- add this line to log the fetched users
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
    image: profile.image,


  };
});
});



export const featchProfileById = createAsyncThunk(
  "profile/fetchprofile",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/profile/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        
      });

      if (response.status === 200) {
        return "profile deleted successfully";
      } else if (response.status === 202) {
        return "Nothing deleted";
      } else if (response.status === 401) {
        throw new Error("Unauthorized - Invalid or missing token");
      } else if (response.status === 403) {
        throw new Error("Forbidden - User does not have necessary roles");
      } else if (response.status === 404) {
        throw new Error("Not Found - Endpoint not found or invalid permissions");
      } else {
        throw new Error("Internal Server Error");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


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

const FeatchProfileByIdSlice = createSlice({
  name: "FetchProfilessStore",
  initialState,

  extraReducers: {
    [featchProfileById.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [featchProfileById.fulfilled]: (state, action) => {
      state.loading = false;
      state.RoleInfo = action.payload;
    },
    [featchProfileById.rejected]: (state, action) => {
      state.loading = false;
      if (action.payload === "INVALID_ROLE") {
        state.error = "Cannot fech permission - permission does not exist or unauthorized.";
      } else {
        state.error = action.payload;
      }
    }
  }

});

export default profileSlice.reducer
export const fetchprofileReducer = FeatchProfileByIdSlice.reducer;
