import React, { useEffect } from "react";
import Header from "./views/Header.jsx";
import { useDispatch } from "react-redux";
import { fetchData } from "./Redux/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home.jsx";
import ProductDetails from "./views/ProductDetails.jsx";
import Login from "./views/Login.jsx";
import { ShoppingCart } from "./views/ShoppingCart.jsx";
import Footer from "./views/Footer.jsx";
import ShippingDetails from "./views/ShippingDetails.jsx";
import Signup from "./views/Signup.jsx";
import Dashboard from "./views/Dashboard.jsx";
import ProtectedRoute from "./Helper/ProtectedRoute.js";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
  
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route
            path="/products/:id"
            exact
            element={<ProductDetails />}
          ></Route>

          <Route path="/shoppingcart" exact element={<ShoppingCart />}></Route>
          <Route
            path="/shippingdetails"
            exact
            element={<ShippingDetails />}
          ></Route>
          <Route path="/signup" exact element={<Signup />}></Route>
          <Route path="/login" exact element={<Login />}></Route>
          <Route path="/dashboard" exact element={<Dashboard />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
