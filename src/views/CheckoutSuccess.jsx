import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginStatus } from "../Redux/User";
import { setOrderStatus,setIsOrdered } from "../Redux/Orders";
import { useSelector } from "react-redux";
import axios from "axios";
import "../styles/Checkout.css";
import { deleteCart } from "../Redux/Cart";


const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  const { isOrdered } = useSelector((state) => state.order);
  const instance = axios.create({
    withCredentials: true,
  });
  const { isLogged } = useSelector((state) => state.user);
  const user_id = { id: localStorage.getItem("user") };
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let id = params.get("session_id");
  

    const fetchOrderStatus = async () => {
      await instance
        .get("http://localhost:5000/success", {
          params: {
            session_id: id,
          },
        })
        .then((res) => {
          
          dispatch(loginStatus(res.data.data));
          dispatch(setIsOrdered(res.data.data));
          dispatch(setOrderStatus(res.data.data));
        })
    };
    fetchOrderStatus();
    if(isOrdered){
      dispatch(deleteCart(user_id));
    }
  }, [isOrdered,user_id.id,dispatch,instance]);

  return (
    <>
    <div className="checkout-wrapper">
    {isOrdered&&isLogged? <div className="checkout-container">
          <h3>Success</h3>
          <h3>Your order has been placed!!!!!</h3>
          <p>My orders</p>
        </div>:<h1>404!!!Page not Found</h1>}
      </div>
    </>
  );
};

export default CheckoutSuccess;
