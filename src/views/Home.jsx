import React from 'react';
import { useSelector } from "react-redux";
import Products from './Products';
import "../styles/Home.css";

const Home = () => {
  const  authUser = useSelector((state) => state.auth);
  console.log(authUser);
  return (
    <>
    <section className="product-list">
      <div className='banner-container'></div>
      <Products/>
    </section>
  </>
  )
}

export default Home