import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import axios from "axios";

const INITIAL_STATE = {
  cartList: [],
  cartCount: 0,
  productData: [],
  itemsToBuy: [{}],
  user: JSON.parse(localStorage.getItem("user")),
};
const instance = axios.create({
  withCredentials: true,
});

export const fetchCart = createAsyncThunk("cart/fetchCart", async (values) => {
  const response = fetch(`/cart/${values.id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  return response;
});

export const fetchData = createAsyncThunk("cart/fetchData", async () => {
  const response = await fetch("/products")
    .then((response) => response.json())
    .then((data) => data.data);
  return response;
});

export const addToCart = createAsyncThunk("cart/addToCart", async (values) => {
  const response = fetch(`/addCart`, {
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
});

export const incrementCart = createAsyncThunk(
  "cart/incrementCart",
  async (values) => {
    const response = fetch(`/increment`, {
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

export const decrementCart = createAsyncThunk(
  "cart/decrementCart",
  async (values) => {
    const response = fetch(`/decrement`, {
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

export const removeCart = createAsyncThunk(
  "cart/removeCart",
  async (values) => {
    const response = fetch(`/remove`, {
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
export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (values) => {
 
    const response = await instance
      .delete(`/deletecart/${values.id}`)
     .catch(err=>console.log(err.message));
    return response;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: {
    [fetchData.pending]: (state, action) => {
      // console.log("Loading");
    },
    [fetchData.fulfilled]: (state, action) => {
      // console.log("Success");
      state.productData = action.payload;
      // console.log(state.productData);
    },
    [fetchData.rejected]: (state, action) => {
      // console.log("Rejected");
    },
    [fetchCart.pending]: (state, action) => {
      console.log("Loading");
    },
    [fetchCart.fulfilled]: (state, action) => {
      state.cartList = action.payload;
    },
    [fetchCart.rejected]: (state, action) => {
      console.log("Rejected");
    },
    [addToCart.pending]: (state, action) => {
      console.log("Loading");
    },
    [addToCart.fulfilled]: (state, action) => {
      const itemExists = state.cartList.find(
        (item) => item.product_id === action.payload.product_id
      );
      if (itemExists) {
        state.cartList.forEach((item) => {
          if (item.product_id === action.payload.product_id) {
            item.count = 1;
          }
        });
        return;
      }
      state.cartList.push({
        ...action.payload,
      });
      toast.success(`${action.payload.name} is added to the cart`);
    },
    [addToCart.rejected]: (state, action) => {
      // console.log("Rejected");
    },
    [incrementCart.pending]: (state, action) => {
      // console.log("Loading");
    },
    [incrementCart.fulfilled]: (state, action) => {
      const productID = action.payload.product_id;
      state.cartList.forEach((item) => {
        if (item?.product_id === productID) {
          item.count++;
        }
      });
    },
    [incrementCart.rejected]: (state, action) => {
      // console.log("Rejected");
    },
    [decrementCart.pending]: (state, action) => {
      // console.log("Loading");
    },
    [decrementCart.fulfilled]: (state, action) => {
      const productID = action.payload.product_id;
      state.cartList.forEach((item) => {
        if (item?.product_id === productID) {
          item.count--;
        }
      });
    },
    [decrementCart.rejected]: (state, action) => {
      // console.log("Rejected");
    },
    [deleteCart.pending]: (state, action) => {
      // console.log("Loading");
    },
    [deleteCart.fulfilled]: (state, action) => {
 
      state.cartList = [];
     
      toast.warning("cart is cleared");
    },
    [deleteCart.rejected]: (state, action) => {
      console.log("Deletecart rejected");
    },
    [removeCart.pending]: (state, action) => {
      // console.log("Loading");
    },
    [removeCart.fulfilled]: (state, action) => {
      const newCart = state.cartList.filter(
        (item) => item.product_id !== action.payload.product_id
      );
      state.cartList = newCart;
      toast.warning("One item is removed from the cart");
    },
    [removeCart.rejected]: (state, action) => {},
  },
});

export default cartSlice.reducer;
