import React,{useEffect, useState} from "react";
import { useSelector } from "react-redux";
import "../styles/ShoppingCart.css";
import CartDetails from "./CartDetails";


export const ShoppingCart = () => {
 
  const { cartList } = useSelector((state) => state.cart);
  
  const totalCartCount = cartList.reduce(
    (acc, value) => (acc += value.count),
    0
  );
  const totalAmount = cartList.reduce(
    (acc, value) => (acc += value.price * value.count),
    0
  );

  return (
    <div className="shopping">
     {totalCartCount===0?<div className="before-shopping">
      <h4>Your Shopping Cart is empty</h4>
      <p>Start shopping</p>
     </div>: <CartDetails
        cartList={cartList}
        totalCartCount={totalCartCount}
        totalAmount={totalAmount}
      />}
      
    </div>
  );
};
