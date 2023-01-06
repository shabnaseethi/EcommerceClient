import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginStatus, addUser } from "../Redux/User";

import "../styles/Dashboard.css";
import Products from "./Products";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isLogged} = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
  }, [dispatch,isLogged,navigate]);

  const handleMyOrders = () => {
    navigate("/orders");
  };
  return (
    <div>
      <div className="my-orders">
        <button onClick={handleMyOrders}>My Orders</button>
      </div>
      <Products />
    </div>
  );
};

export default Dashboard;
