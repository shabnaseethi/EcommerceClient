import React from "react";
import {  useNavigate } from "react-router-dom";

import "../styles/HeaderLogin.css"
import { useSelector, useDispatch } from "react-redux";
import { loginStatus } from "../Redux/User";
import { toast } from "react-toastify";

import CustomAxios from "../api";

import LoginHeader from "./LoginHeader";
import LogoutHeader from "./LogoutHeader";


const Header = () => {
  const { cartList } = useSelector((state) => state.cart);
  const { isLogged } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
 

  const totalCartCount = cartList.reduce(
    (acc, value) => (acc += value.count),
    0
  );
  const token = localStorage.getItem("refreshToken");
  

  const handlelogout = async () => {
    await CustomAxios.post("/logout", {
      token: token,
    }).then((response) => {
      localStorage.clear();
      dispatch(loginStatus(false));
      navigate("/");
    });
    toast.info("Successfully Loggedout!!!", {
      className: "toast-info",
    });
  };

 const renderHeader=()=>{
  if(!isLogged){
    return <LoginHeader/>
  }
  return <LogoutHeader totalCartCount={totalCartCount} handlelogout={handlelogout}/>

 }

  return (
    <header className="header-container">
      
      {renderHeader()}
      
    </header>
  );
};

export default Header;
