import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchCart } from "../Redux/Cart";
import "../styles/Header.css"

const LogoutHeader = ({ handlelogout, totalCartCount }) => {
  // const user_id = localStorage.getItem("user_id");
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchCart(user_id));
  // }, []);
  return (
<div className="logout-header">
<nav className="nav-links">
      <ul id="navigation">
        <li>
          <Link to="/dashboard" className="link">
            Home
          </Link>
        </li>
        <li>
          <Link className="link" onClick={handlelogout}>
            Logout
          </Link>
        </li>

        <li>
          <Link to="/orders" className="link">
            My Orders
          </Link>
        </li>
      </ul>

      <div className="right-header">
        <div className="cart-count-header">{totalCartCount}</div>

        <div className="cart-icon">
          <Link to="/shoppingcart">
            <FontAwesomeIcon
              className="fa-shopping-cart"
              icon={faShoppingBag}
            />
          </Link>
        </div>
      </div>
    </nav>

</div>  );
};

export default LogoutHeader;
