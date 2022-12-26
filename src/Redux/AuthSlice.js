import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { url } from "../api";
const INITIAL_STATE = {
  token: "",
  name: "",
  email: "",
  _id: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (values) => {
    const response = fetch("http://localhost:5000/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {return data});
     return response
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      console.log("Loading");
    },
    [registerUser.fulfilled]: (state, action) => {
      console.log("Success");
     console.log(action.payload);
     state.name = action.payload.name;
     state._id= action.payload.id;
     state.email=action.payload.email;
     state.registerStatus=true;
     state.userLoaded=true;
    },
    [registerUser.rejected]: (state, action) => {
      console.log("Rejected");
    },
  },
});

export default authSlice.reducer;
