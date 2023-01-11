import React from "react";
import "../styles/CardButton.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addToCart } from "../Redux/Cart";
import { toast } from "react-toastify";

function BeforeCart({ product }) {
  const user_id = localStorage.getItem("user_id");
  const { isLogged } = useSelector((state) => state.user);
  const addCart = (product) => {
    product.product.user_id = parseInt(user_id);
    if(isLogged){
      dispatch(addToCart({ product }));
    }
    else{
      toast.warning("Please Login.....")
    }
  };

  const dispatch = useDispatch();
  return (
    <div className="before-cart">
      <button className="add-cart-button" onClick={() => addCart({ product })}>
        Add Cart
      </button>
    </div>
  );
}

export default BeforeCart;
