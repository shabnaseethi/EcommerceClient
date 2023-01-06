import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useDispatch } from "react-redux";
import { addUser, loginStatus } from "../Redux/User";
import { toast } from "react-toastify";


function Login() {
  const dispatch = useDispatch();
  const [inputValues, setInputValues] = useState({});
  const navigate = useNavigate();

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValues),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.loggedIn) {
            dispatch(loginStatus(data.loggedIn));
            const user = {
              id: data.id,
              email: data.username,
              first_name: data.first_name,
              last_name: data.last_name,
            };

            localStorage.setItem("user", JSON.stringify(user.id));

            dispatch(addUser(data));
            navigate("/");
          }
          else{
            toast.error(data.status);
          }
        });
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch("http://localhost:5000/login", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.loggedIn) {
            dispatch(loginStatus(data.loggedIn));
            navigate("/");
          }
          else{
            toast.error(data.status);
          }
        });
    };
    fetchData();
  }, [navigate,dispatch]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form
          id="login-form"
          method="POST"
          action="login"
          onSubmit={handlelogin}
        >
          <p>
            <input
              type="email"
              id="useremail"
              name="email"
              placeholder="Email Address"
              onChange={handleOnChange}
              required
            ></input>
          </p>
          <p>
            <input
              type="password"
              id="userpassword"
              name="password"
              placeholder="Password"
              onChange={handleOnChange}
              required
            ></input>
          </p>
          <p>
            <input type="submit" className="login" value="Login"></input>
          </p>
        </form>
        <div className="create-acc">
          <p>
            Not a member??
            <Link to="/signup" className="signup_link">
              SignUp
            </Link>
          </p>
        </div>
       
      </div>
    </div>
  );
}

export default Login;
