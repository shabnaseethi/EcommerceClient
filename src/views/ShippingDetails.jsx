import React, { useState, useEffect } from "react";
import "../styles/ShippingDetails.css";
import StripeCheckout from "react-stripe-checkout";
import { useSelector } from "react-redux";


const ShippingDetails = () => {
  const { cartList } = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);

const product= cartList.map((item)=>
{
  return {
    id:item.product.id,
    count:item.count
  }
})


  const totalCartCount = cartList.reduce(
    (acc, value) => (acc += value.count),
    0
  );
  const totalAmount = cartList.reduce(
    (acc, value) => (acc += value.product.price * value.count),
    0
  );

  const stripeAmount = totalAmount*100;
  const [checkout, setCheckout] = useState(false);

  const onToken = (token) => {
    console.log(token);
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await fetch("http://localhost:5000/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tokenId: stripeToken.id,
            amount: stripeAmount,
            cart:product
          }),
        }).then((response) => {
          console.log(response);
        });
      } catch (error) {}
    };
    stripeToken && makeRequest();
  }, [stripeToken]);
  return (
    <div className="shipping-details">
      <h2>Shipping Address</h2>
      <div className="name-details">
        <label>First Name</label>
        <input type="text" placeholder="First Name"></input>
        <label>Last Name</label>
        <input type="text" placeholder="Last Name"></input>
      </div>
      <div className="address-details">
        <div className="house-number">
          <label>House Number</label>
          <input type="text" placeholder="House Number"></input>
        </div>
        <div className="street-address">
          <label>Street Address</label>
          <input type="text" placeholder="Street Address"></input>
        </div>

        <div className="country-city">
          <div className="city">
            <label>City</label>
            <input type="text" placeholder="City"></input>
          </div>
          <div className="country">
            <label>Country</label>
            <input type="text" placeholder="Country"></input>
          </div>
        </div>
        <div className="postcode">
          <label>PostCode</label>
          <input type="text" placeholder="PostCode"></input>
        </div>
      </div>
      <button className="address-button" onClick={() => setCheckout(true)}>
        Use this Address
      </button>
      {checkout && (
        <div className="order-summary">
         
          <h5>Total Amount: &#163;{totalAmount}</h5>
          <StripeCheckout
            className="stripe-details"
            name="I Store"
            token={onToken}
            amount={stripeAmount}
          
            currency="GBP"
            stripeKey="pk_test_51M9REOIMbP7OC3kMFVV12xYubAsAqfmHsRo6NbSMi8hY6h9uQFCtb9mZ62UONRZtMLuPRnj6joQQ0a4hlxLTlWnS00eKAZk4Tq"
          >
            <button className="pay-button">Pay Now</button>
          </StripeCheckout>
        </div>
      )}
    </div>
  );
};

export default ShippingDetails;
