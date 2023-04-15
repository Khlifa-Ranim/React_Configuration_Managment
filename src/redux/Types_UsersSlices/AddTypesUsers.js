 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
 

export const CreateTypesUsres = createAsyncThunk(
  "types/CreateTypes",
  async ({name,description}, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/types", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({name,description}),
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



  

const CreateTypesUsersSlice = createSlice({
    name: 'CreateroleStore',
    initialState:{
      Types: [],
      loading: false,
      error: null,
     // token: localStorage.getItem("token") // initialize the token from the local storage
    }
  ,

    reducers: {
      addRole: (state, action) => {
            state.Types.push(action.payload);

          },
         
    },
    extraReducers: (builder) => {
      builder
        .addCase(CreateTypesUsres.pending, (state) => {
          state.loading = true;
        })
        .addCase(CreateTypesUsres.fulfilled, (state, action) => {
          state.loading = false;
          console.log(action.payload); // add this line to log the payload object
          state.Types = action.payload.Types;
        })
        .addCase(CreateTypesUsres.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
          console.log(action.error); // add this line to log the error object
    
        });
    },
    
    
    
    
    
    
  });
  
  export default CreateTypesUsersSlice.reducer; 
  export const {addRole} = CreateTypesUsersSlice.actions;
