import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginStatus, addUser } from "../Redux/User";
import Home from "./Home";
import "../styles/Dashboard.css";
import Products from "./Products";


const Dashboard = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { isLogged, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  var retrievedObject;
  useEffect(() => {
  
    const fetchData = async () => {
      await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(addUser(data.user));
          dispatch(loginStatus(data.loggedIn));
          
          if (!data.loggedIn) {
            navigate("/login");
          }
        });
    };
    if (!isLogged) {
      fetchData();
      
    }
  }, []);
  return (
    <div>
      <div className="my-orders">
        <h6>Welcome   {name}</h6>
        <button>My Orders</button>
      </div>
    <Products/>
    </div>
  );
};

export default Dashboard;
