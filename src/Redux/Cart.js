import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  cartList: localStorage.getItem("cartList")
    ? JSON.parse(localStorage.getItem("cartList"))
    : [],
  cartCount: 0,
  productData: [{}],
  itemsToBuy: [{}],
  user:JSON.parse(localStorage.getItem("user"))
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (values) => {
    const response = fetch("http://localhost:5000/cart", {
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

export const fetchData = createAsyncThunk("cart/fetchData", async () => {
  const response = await fetch("/products")
    .then((response) => response.json())
    .then((data) => data.data);
  return response;
});

export const addToCart = createAsyncThunk("cart/addToCart",   async (values) => {
  const response = fetch("http://localhost:5000/addCart", {
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
});

export const incrementCart = createAsyncThunk("cart/incrementCart",   async (values) => {
  const response = fetch("http://localhost:5000/increment", {
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
});

export const decrementCart = createAsyncThunk("cart/decrementCart",   async (values) => {
  const response = fetch("http://localhost:5000/decrement", {
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
});

export const removeCart = createAsyncThunk("cart/removeCart",   async (values) => {
  const response = fetch("http://localhost:5000/remove", {
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
});

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
  },
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
      state.cartList=action.payload;     
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
        ...action.payload
      });
    },
    [addToCart.rejected]: (state, action) => {
      console.log("Rejected");
    },
    [incrementCart.pending]: (state, action) => {
      console.log("Loading");
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
      console.log("Rejected");
    },
    [decrementCart.pending]: (state, action) => {
      console.log("Loading");
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
      console.log("Rejected");
    },
    [removeCart.pending]: (state, action) => {
      console.log("Loading");
    },
    [removeCart.fulfilled]: (state, action) => {
      const newCart = current(state.cartList).filter(
            (item) => item.product_id !== action.payload.product_id
          );
          state.cartList = newCart;
    },
    [removeCart.rejected]: (state, action) => {
      console.log("Rejected");
    },
    
  },
});

// export const { addToCart, increment, decrement, addCheckout, removeCart } =
//   cartSlice.actions;
export default cartSlice.reducer;
