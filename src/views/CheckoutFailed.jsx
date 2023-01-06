import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrderStatus, setIsOrdered } from "../Redux/Orders";
import { loginStatus } from "../Redux/User";
import axios from "axios";

const CheckoutFailed = () => {
  const dispatch = useDispatch();
  const { isOrdered } = useSelector((state) => state.order);
  const instance = axios.create({
    withCredentials: true,
  });
  useEffect(() => {
    dispatch(loginStatus(true));
    const params = new URLSearchParams(window.location.search);
    let id = params.get("session_id");

    const fetchOrderStatus = async () => {
      await instance
        .get("http://localhost:5000/cancel", {
          params: {
            session_id: id,
          },
        })
        .then((res) => {
          dispatch(loginStatus(res.data.data));
          dispatch(setIsOrdered(res.data.data));
          dispatch(setOrderStatus(res.data.data));
        });
    };
    fetchOrderStatus();
  }, [dispatch,instance]);
  return (
    <>
      <div className="checkout-wrapper">
        {isOrdered ? (
          <div className="checkout-container">
            <h2>Failed</h2>
            <h2>Your order has not been placed!!!!!</h2>
            <h4>Please try again!!!!</h4>
          </div>
        ) : (
          <h1>404!!!Page not Found</h1>
        )}
      </div>
    </>
  );
};

export default CheckoutFailed;
