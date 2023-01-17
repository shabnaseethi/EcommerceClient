import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useDispatch } from "react-redux";
import { loginStatus } from "../Redux/User";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";


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
        .then((response) => {
          if (response.status === 200) {
            
            return response.json();
          } else {
            toast.error("Wrong credentials!!!")
            
          }
        })
        .then((data) => {
          if (data) {
            if (data.user) {
              dispatch(loginStatus(true));
              localStorage.setItem("user", JSON.stringify(data.user.id));
              navigate("/dashboard");
            }
          } else {
            console.log("No data");
          }
        });
    } catch (error) {
      return;
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        await fetch("/login")
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              if (data.user) {
                const user = {
                  id: data.user.id,
                  email: data.user.email,
                };
                dispatch(loginStatus(true));
                localStorage.setItem("user", JSON.stringify(data.user.id));
                navigate("/dashboard");
              }
            } else {
              console.log("No data");
            }
          });
      } catch (error) {
        throw error.message;
      }
    };
    fetchUser();
  }, [navigate, dispatch]);

  return (
    <>
      <div className="banner">
        <div className="form-box-login">
          <form
            id="login"
            className="input-group-login"
            method="POST"
            action="login"
            onSubmit={handlelogin}
          >
            <FontAwesomeIcon className="fa-user" icon={faUser} />
            <input
              type="email"
              id="useremail"
              name="email"
              placeholder="Email Address"
              onChange={handleOnChange}
              required
            />
            <input
              type="password"
              id="userpassword"
              name="password"
              placeholder="Password"
              onChange={handleOnChange}
              required
            />
            <button type="submit" className="submit-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
