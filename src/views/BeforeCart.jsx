import React from "react";
import "../styles/CardButton.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/Cart";

function BeforeCart({ product }) {
  const user_id = { id: localStorage.getItem("user") };
  const addCart = (product) => {
    product.product.user_id = parseInt(user_id.id);
    dispatch(addToCart({ product }));
  };

  const dispatch = useDispatch();
  return (
    <div className="before-cart">
      <button className="add-cart-button" onClick={() => addCart({ product })}>
        Add to Cart
      </button>
    </div>
  );
}

export default BeforeCart;
