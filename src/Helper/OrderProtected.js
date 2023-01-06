import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const OrderProtected = ({ children }) => {
  const { orderStatus } = useSelector((state) => state.order);
  console.log(orderStatus);
  return <>{orderStatus?children:<Navigate to="/"/>}</>;
};

export default OrderProtected;
