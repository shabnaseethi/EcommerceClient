import React, { useEffect } from "react";
import { fetchOrder } from "../Redux/Orders";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/Orders.css";

const Orders = () => {
  const { orderList } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const user_id = parseInt(localStorage.getItem("user"));

  const totalCount = orderList.reduce((acc, value) => (acc += value.count), 0);

  const totalPrice = orderList.reduce(
    (acc, value) => (acc += parseInt(value.price)),
    0
  );

  useEffect(() => {
    const fetchOrderDetails = () => dispatch(fetchOrder(user_id));
    fetchOrderDetails();
  }, [user_id]);

  return (
    <>
      <div className="order-wrapper">
        <div className="order-details">
          <h5>Your Last Order</h5>
          <Link to="/order-history" className="link">
           <button>Your order history</button>
          </Link>
        </div>
        {orderList.length > 0 ? (
          <div className="order-container">
            <table>
              <thead>
                <tr>
                  <th>Order Details</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Purchased On</th>
                </tr>
              </thead>
              {orderList.map((order, key) => {
                return (
                  <tbody key={key}>
                    <tr>
                      <td>
                        <img src={order.image} alt="order-product" />
                        <p>{order.name} </p>
                      </td>
                      <td>&#163;{order.price}</td>
                      <td>{order.count}</td>
                      <td>{order.ordered_on}</td>
                    </tr>
                  </tbody>
                );
              })}
              <tfoot>
                <tr>
                  <td>Total Amount</td>
                  <td>&#163;{totalPrice}</td>
                  <td>{totalCount}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <h5>You dont have any orders yet!!!</h5>
        )}
      </div>
    </>
  );
};

export default Orders;
