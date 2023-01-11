import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  orderList: [],
  allOrderList:[],
  orderStatus:false,
  isOrdered:false
};

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async (values) => {
    const response = await fetch(`/order`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id:values}),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    return response;
  }
);
export const fetchAllOrder = createAsyncThunk(
  "order/fetchAllOrder",
  async (values) => {
    
    const response = await fetch(`/allorder`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id:values}),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    return response;
  }
);


const orderSlice = createSlice({
  name: "order",
  initialState: INITIAL_STATE,
  reducers: {
    setOrderStatus:(state,action)=>{
      state.orderStatus= action.payload;
    },
    setIsOrdered:(state,action)=>{
      state.isOrdered=action.payload;

    }

  },
  extraReducers: {
    [fetchOrder.pending]: (state, action) => {
      console.log("Loading");
    },
    [fetchOrder.fulfilled]: (state, action) => {
      state.orderList = action.payload;
    },
    [fetchOrder.rejected]: (state, action) => {
      console.log("Rejected");
    },
    [fetchAllOrder.pending]: (state, action) => {
      console.log("Loading");
    },
    [fetchAllOrder.fulfilled]: (state, action) => {
      state.allOrderList = action.payload;
    },
    [fetchAllOrder.rejected]: (state, action) => {
      console.log("Rejected");
    },
  },
});
export default orderSlice.reducer;
export const { setOrderStatus, setIsOrdered } =
  orderSlice.actions;