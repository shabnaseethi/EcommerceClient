import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  user:[],
  accessToken:'',
  refreshToken:'',
  isLogged: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    addUser: (state, action) => {
      state.user.push(action.payload);
    },
    loginStatus: (state, action) => {
      state.isLogged=action.payload;
    },
    createToken:(state,action)=>{
      state.refreshToken=action.payload;
    }
  },
});

export const { addUser, loginStatus ,createToken} = userSlice.actions;
export default userSlice.reducer;
