import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginStatus } from "../Redux/User";

import "../styles/Dashboard.css";
import Products from "./Products";
import CustomAxios from "../api";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await CustomAxios.get("/dashboard").then((res) => {
        
          if (res.response.data.error) {
            console.log("Not Authenticated");
            navigate("/login");
           
          }
          else {
            
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
      <div className="dashboard">
       
      </div>
      <Products />
    </>
  );
};

export default Dashboard;
