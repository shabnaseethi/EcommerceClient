import React, {useEffect } from "react";
import { fetchAllOrder } from "../Redux/Orders";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Orders.css";

const OrderHistory = () => {
    const { allOrderList } = useSelector((state) => state.order);
    const dispatch = useDispatch();
  
    const user_id = parseInt(localStorage.getItem("user_id"))
  
    useEffect(() => {
      const fetchOrderDetails = () => dispatch(fetchAllOrder(user_id));
      fetchOrderDetails();
    },[user_id]);
  
  
  return (
    <>
    <div className="order-wrapper">
        <h5>Order History</h5>
        {allOrderList.length>0?<div className="order-container">
          <table>
            <thead>
              <tr>
                <th>Order Details</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Purchased On</th>
              </tr>
            </thead>
           {allOrderList.map((order,key)=>{
            return(
                <tbody key={key}>
                <tr>
                  <td><img src={order.image} alt="order_image"/><p>{order.name} </p></td>
                  <td>&#163;{order.price}</td>
                  <td>{order.count}</td>
                  <td>{order.ordered_on}</td>
                </tr>
              </tbody>            
            )
           })}
         
          </table>
        </div>:<h5>You dont have any orders yet!!!</h5>}
      </div></>
  )
}

export default OrderHistory