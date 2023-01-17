import React from "react";
import "../styles/CardButton.css";
import { useDispatch } from "react-redux";
import { incrementCart, decrementCart } from "../Redux/Cart";
export const AfterCart = ({ productID, cartCount, productPrice }) => {
  const dispatch = useDispatch();

  const user_id = localStorage.getItem("user");
  const decrement = (product) => {
    const productInfo = {
      product_id: product,
      user_id: parseInt(user_id),
      price: productPrice,
    };

    dispatch(decrementCart(productInfo));
  };

  const increment = (productID) => {
    const productInfo = {
      product_id: productID,
      user_id: parseInt(user_id),
      price: productPrice,
    };

    dispatch(incrementCart(productInfo));
  };

  return (
    <div className="after-cart">
      <span className="minus" onClick={()=>decrement(productID)}>-</span>
      <span className="num" >{cartCount}</span>
      <span className="plus" onClick={()=>increment(productID)}>+</span>
    </div>
  );
};
