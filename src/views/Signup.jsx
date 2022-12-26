import React, { useState } from "react";
import "../styles/Signup.css";
import {useDispatch} from 'react-redux';
import { registerUser } from "../Redux/AuthSlice";

function Signup() {
  const dispatch = useDispatch();
  const [userdata, setUserdata] = useState({
    firstname: "",
    lastname:"",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [errors, setErrors] = useState([]);
  const [success,setSuccess] = useState();
  const handleChange = (e) => {
    setUserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      dispatch(registerUser(userdata));
      
      // await fetch("http://localhost:5000/signup", {
      //   method: "POST",
      //   credentials: "include",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(userdata),
      // }).then((res)=>res.json()).then(data=>setErrors(data));
    } catch (error) {
      console.error(error.message);
    }
    console.log(errors);
   
  };
  
  return (
    <div className="signup-card">
      <h2>SignUp</h2>
      <form
        id="signup-form"
        method="POST"
        action="signup"
        onSubmit={handleSignUp}
      >
        <p>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="First Name"
            autoComplete="off"
            value={userdata.firstname}
            onChange={handleChange}
            required
          ></input>
        </p>
        <p>
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Last Name"
            autoComplete="off"
            value={userdata.lastname}
            onChange={handleChange}
            required
          ></input>
        </p>
        <p>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            value={userdata.email}
            onChange={handleChange}
            autoComplete="off"
            required
          ></input>
        </p>
        <p>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={userdata.password}
            onChange={handleChange}
            autoComplete="on"
            required
          ></input>
        </p>
        <p>
          <input
            type="password"
            id="confirm-password"
            name="confirmpassword"
            placeholder="Confirm password"
            value={userdata.confirmpassword}
            onChange={handleChange}
            autoComplete="on"
            required
          ></input>
        </p>
        <p>
          <input type="submit" className="login" value="SignUp"></input>
        </p>
      </form>
    </div>
  );
}

export default Signup;
