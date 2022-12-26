import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { useSelector, useDispatch } from "react-redux";
import { loginStatus } from "../Redux/User";
import { fetchCart } from "../Redux/Cart";

const Header = () => {
  const { cartList } = useSelector((state) => state.cart);
  const { isLogged } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user_id = { id: localStorage.getItem("user") };

  const totalCartCount = cartList.reduce(
    (acc, value) => (acc += value.count),
    0
  );

  const handlelogout = async () => {
    await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(loginStatus(data.loggedIn));
      });
    navigate("/login");
  };

  useEffect(() => {
    if (isLogged) {
      dispatch(fetchCart(user_id));
    }
  }, [isLogged]);

  return (
    <header className="header-container">
      <nav className="nav-links">
        <div className="home-header">
          <Link to="/" className="link">
            Home
          </Link>
        </div>
        <div className="login-header">
          {isLogged ? (
            <Link className="link" onClick={handlelogout}>
              Logout
            </Link>
          ) : (
            <Link to="/login" className="link">
              Login
            </Link>
          )}
        </div>
        <div className="right-header">
          {isLogged ? (
            <div className="cart-count-header">{totalCartCount}</div>
          ) : (
            <div className="cart-count-header">0</div>
          )}
          <div className="cart-icon">
            <Link to="/shoppingcart">
              <i className="fa fa-shopping-cart"></i>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
