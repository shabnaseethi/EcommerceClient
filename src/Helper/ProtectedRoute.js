import React from "react";
import {  Navigate} from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({children}) => {
  const { isLogged } = useSelector((state) => state.user);
  
  return (
    <>
     {isLogged?children:<Navigate to="/login"/>}
    </>
  );
};

export default ProtectedRoute;
