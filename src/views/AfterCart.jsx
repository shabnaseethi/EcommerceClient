import React from "react";
import "../styles/CardButton.css";
import { useDispatch } from "react-redux";
import { incrementCart, decrementCart } from "../Redux/Cart";
export const AfterCart = ({ productID, cartCount, productPrice }) => {
  const dispatch = useDispatch();

  const user_id = { id: localStorage.getItem("user") };
  const decrement = (product) => {
    const productInfo = {
      product_id: product,
      user_id: user_id.id,
      price: productPrice,
    };

    dispatch(decrementCart(productInfo));
  };

  const increment = (productID) => {
    const productInfo = {
      product_id: productID,
      user_id: user_id.id,
      price: productPrice,
    };

    dispatch(incrementCart(productInfo));
  };

  return (
    <div className="after-cart">
      <button
        className="cart-count-button"
        onClick={() => decrement(productID)}
      >
        -
      </button>
      <div className="cart-count">{cartCount}</div>
      <button
        className="cart-count-button"
        onClick={() => increment(productID)}
      >
        +
      </button>
    </div>
  );
};
