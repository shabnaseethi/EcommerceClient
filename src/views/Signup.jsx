import React, { useState } from "react";
import "../styles/Signup.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Redux/AuthSlice";

function Signup() {
  const { registerStatus } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [userdata, setUserdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      dispatch(registerUser(userdata));
      
      if (registerStatus) {
        setUserdata({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          confirmpassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
     <div className="banner">
     <div className="form-box-register">
        <form
          id="signup-form"
          method="POST"
          action="signup"
          onSubmit={handleSignUp}
          className="input-group-register"
        >
          <input
            type="text"
            className="input-field"
            placeholder="First Name"
            name="firstname"
            autoComplete="off"
            value={userdata.firstname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="input-field"
            id="lastname"
            name="lastname"
            placeholder="Last Name"
            autoComplete="off"
            value={userdata.lastname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="input-field"
            id="email"
            name="email"
            placeholder="Email Address"
            value={userdata.email}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <input
            type="password"
            className="input-field"
            id="password"
            name="password"
            placeholder="Password"
            value={userdata.password}
            onChange={handleChange}
            autoComplete="on"
            required
          />
          <input
            type="password"
            id="confirm-password"
            name="confirmpassword"
            placeholder="Confirm password"
            value={userdata.confirmpassword}
            onChange={handleChange}
            autoComplete="on"
            required
          />
          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>
      </div>
     </div>
    </>
  );
}

export default Signup;
