import React from "react";
import { useSelector } from "react-redux";
import Products from "./Products";
import "../styles/Home.css";
import Dashboard from "./Dashboard";


const Home = () => {
  const { isLogged } = useSelector((state) => state.user);

  return (
    <>
      {isLogged ? (
        <Dashboard />
      ) : (
        <section className="product-list">
          <div className="banner-container"></div>
          <Products />
        </section>
      )}
    </>
  );
};

export default Home;
