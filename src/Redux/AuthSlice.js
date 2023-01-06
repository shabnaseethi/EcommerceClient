import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const INITIAL_STATE = {
  errors: [],
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (values) => {
    const response = fetch(`/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    return response;
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


      if (Array.isArray(action.payload)) {
        action.payload.map((error) => {
          toast.error(error.message);
        });
      }
      if (action.payload.isRegistered) {
        state.registerStatus = true;
        toast.success("You are successfully registered");
        toast.success("Please Login...");
      }
    },
    [registerUser.rejected]: (state, action) => {
      console.log("Rejected");
    },
  },
});

export default authSlice.reducer;
