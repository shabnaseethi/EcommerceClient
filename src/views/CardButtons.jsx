import React, { useMemo } from "react";
import { AfterCart } from "./AfterCart";
import BeforeCart from "./BeforeCart";
import { useSelector } from "react-redux";
export const CardButtons = ({ product }) => {
  const { cartList } = useSelector((state) => state.cart);
 
  const cartCount = useMemo(() => {
   return cartList.find((element) => element.product_id === product.id)?.count;
  }, [cartList,product.id]);

  return (
    <>
      {cartCount > 0 ? (
        <AfterCart productID={product?.id} cartCount={cartCount} productPrice={product?.price} />
      ) : (
        <BeforeCart product={product} />
      )}
    </>
  );
};
