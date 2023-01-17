import React from "react";
import Products from "./Products";
import "../styles/Home.css";
import Signup from "./Signup";


const Home = () => {

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
