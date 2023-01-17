import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector} from "react-redux";
import { loginStatus } from "../Redux/User";

import "../styles/Dashboard.css";
import Products from "./Products";


const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await fetch("/dashboard")
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              if (data.user) {
               
                dispatch(loginStatus(true));
                localStorage.setItem("user", JSON.stringify(data.user.id));
                
              }
              else{
                navigate("/login");
              }
            } else {
            
              console.log("No data");
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
      {isLogged?<div><div className="dashboard"></div>
      <Products /></div>:""}
    </>
  );
};

export default Dashboard;
