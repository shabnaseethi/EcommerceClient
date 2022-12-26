import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CardButtons } from "./CardButtons";
import "../styles/ProductDetails.css";
import { useSelector } from "react-redux";

const ProductDetails = () => {
    const { cartList } = useSelector((state) => state.cart);
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [flag, setFlag] = useState(false);
  
    useEffect(() => {
      async function fetchProduct() {
        await fetch(`/products/${id}`)
          .then((res) => res.json())
          .then((data) => setProduct(data.data[0]));
         
        setFlag(true);
      }
  
      fetchProduct();
    }, [id]);   
  let count =1;
    cartList.map((element,key)=>(
      count = element.count
    ))
  return (
    <section className="product-info">
    {flag && (
      <div className="product-details">
        <div className="product-image">
          <img src={product.image} alt="productimage" />
          <div className="product-rating">
          {product.review}
          <span className="fa fa-star"></span>
        </div>
        </div>
        <div className="product-title">
          <h3>{product.name}</h3>
        </div>
        <div className="product-description">{product.description}</div>

        <div className="product-price">&#163;{count>0?(product.price*count).toFixed(2):product.price}</div>
        <CardButtons product={product} />
      </div>
    )}
  </section>
  )
}

export default ProductDetails