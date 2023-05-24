import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  Logs: [],
  error: "",
};


export const featchLogs= createAsyncThunk("logs/FeatchLogs", async () => {
    
  const config = {
    
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  console.log("Fetching Permissions..."); // <-- add this line to log when Permissions are being fetched

  const response = await axios.get("http://localhost:5000/logs", config);
  console.log("Permissions fetched:", response.data); // <-- add this line to log the fetched users
   // return response.data

  return response.data.map((logs) => {
    return {
        id: logs.id,
        action: logs.action,
        id_user:logs.id_user,
        date: logs.date,
  };
});
});



const LogsSlice = createSlice({
  name: "LogsStore",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(featchLogs.pending,(state)=>{
        state.loading=true
    })
    builder.addCase(featchLogs.fulfilled,(state,action)=>{
        state.loading=false
        state.Logs=action.payload
        state.error=''
    })
    builder.addCase(featchLogs.rejected,(state,action)=>{
        state.loading=false
        state.Logs=[]
        state.error=action.error.message
    })
  },
});


export default LogsSlice.reducer
