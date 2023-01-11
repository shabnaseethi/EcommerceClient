import React, { useEffect } from "react";
import Header from "./views/Header.jsx";
import { useDispatch } from "react-redux";
import { fetchData } from "./Redux/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home.jsx";
import ProductDetails from "./views/ProductDetails.jsx";
import Login from "./views/Login.jsx";
import { ShoppingCart } from "./views/ShoppingCart.jsx";
import Signup from "./views/Signup.jsx";
import { LoginProtected } from "./Helper/LoginProtected.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Orders from "./views/Orders.jsx";
import CheckoutSuccess from "./views/CheckoutSuccess.jsx";
import CheckoutFailed from "./views/CheckoutFailed.jsx";
import OrderHistory from "./views/OrderHistory.jsx";
import { useSelector } from "react-redux";
import Dashboard from "./views/Dashboard.jsx";


import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  const { isLogged } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/login" exact element={<Login />}></Route>
          <Route path="/signup" exact element={<Signup />}></Route>
          <Route
            path="/products/:id"
            exact
            element={<ProductDetails />}
          ></Route>
          <Route element={<LoginProtected isLogged={isLogged} />}>
            <Route path="/shoppingcart" exact element={<ShoppingCart />} />
            <Route path="/dashboard" exact element={<Dashboard />}></Route>
            <Route path="/orders" exact element={<Orders />}></Route>
            <Route
              path="/order-history"
              exact
              element={<OrderHistory />}
            ></Route>
           
          </Route>
          <Route path="/success" element={<CheckoutSuccess />} />
            <Route path="/failed" element={<CheckoutFailed />} />
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default App;
