import React from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/Products.css"

const Products = () => {
    const { productData } = useSelector((state) => state.cart);
  return (
    <>
    <div className="all-products">
    {productData?.map((element, key) => (
        <section className="product-container" key={key}>
          <Link to={`/products/${element?.id}`} state={{type:1}} className="product-link" >
            <div className="main-container" key={key}>
              <div className="image-container">
                <img src={element?.image} alt="pic" />
              </div>
              <div className="product-name">{element?.name}</div>           
            </div>
          </Link>
        </section>
      ))}
    </div>
    </>
  )
}

export default Products