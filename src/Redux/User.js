import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  user:[],
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
  },
});

export const { addUser, loginStatus } = userSlice.actions;
export default userSlice.reducer;
