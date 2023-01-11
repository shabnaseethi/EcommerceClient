import React from "react";
import { Link } from "react-router-dom";
import "../styles/HeaderLogin.css"

const LoginHeader = () => {
  return (
    <div className="navbar-login">
      <div></div>
      <nav className="nav-links">
      
      <ul id="navigation">
     
        <li>
          <Link to="/" className="link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/signup" className="link">
            Register
          </Link>
        </li>

        <li>
          <Link to="/login" className="link">
            Login
          </Link>
        </li>
      </ul>
    </nav>
    </div>
  );
};

export default LoginHeader;
