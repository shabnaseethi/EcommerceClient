import React, { useEffect } from "react";
import Products from "./Products";
import "../styles/Home.css";
import { useDispatch } from "react-redux";
import { loginStatus } from "../Redux/User";
import Signup from "./Signup";
import CustomAxios from "../api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
    useEffect(() => {
      const fetchUser = async () => {
        try {
          await CustomAxios.get("/home").then((res) => {
            if (!res.response.data.error) {
              navigate("/dashboard");
              dispatch(loginStatus(true));
            } 
            
          });
        } catch (error) {
          throw error.message;
        }
      };
      fetchUser();
    });

  return (
    <>
      <div className="banner">
        <div className="banner-home">
          <Signup />
        </div>
        <Products />
      </div>
    </>
  );
};

export default Home;
