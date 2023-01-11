import React from "react";
import { AfterCart } from "./AfterCart";
import { useDispatch } from "react-redux";
import { removeCart,deleteCart } from "../Redux/Cart";

const CartDetails = (props) => {
  const { cartList, totalCartCount, totalAmount } = props;
  const dispatch = useDispatch();
  const user_id =localStorage.getItem("user_id")
  const handleRemoveItem = (id) => {
    const productInfo = { product_id: id, customer_id: user_id.id };
    dispatch(removeCart(productInfo));
  };

  const handleCheckout = async () => {
    await fetch(`/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cartList }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.url) {
          window.location.assign(response.url); // Forwarding user to Stripe
        }
      });
  };
  const handleRemoveAll = async () => {
      dispatch(deleteCart(user_id));
  };

  return (
    <div className="cart-body">
      <div className="cart-list">
        <div className="header">
          <h3 className="heading">Shopping Cart</h3>
          <h5 className="action" onClick={handleRemoveAll}>
            Remove all
          </h5>
        </div>
        {cartList.map((item, key) =>
          item.count > 0 ? (
            <div className="cart-container" key={key}>
              <div className="cart-items">
                <div className="image-box">
                  <img src={item?.image} alt="product" />
                </div>
                <div className="about">
                  <h1 className="title">{item.name}</h1>
                  <AfterCart
                    productID={item?.product_id}
                    cartCount={item?.count}
                    productPrice={item?.price}
                  />
                </div>
                <div className="prices">
                  <div className="amount">&#163;{item.price * item.count}</div>
                  <div
                    className="remove"
                    onClick={() => handleRemoveItem(item?.product_id)}
                  >
                    <u>Remove</u>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )
        )}
      </div>

      {/* -------------------------------CheckOut--------------------- */}

      <div className="checkout">
        <div className="total">
          Basket Subtotal:
          <div className="items">{totalCartCount} items</div>
        </div>
        <div className="total-amount">
          Amount:
          <h5>
            <sup>&#163;</sup>
            {totalAmount.toFixed(2)}
          </h5>
        </div>
        <div className="shipping-charge">Free Delivery at checkout</div>

        <button className="checkout-btn" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartDetails;
