import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { name, email, password, passwordConfirm } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/signup`,
        formData
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("loggedUser", response.data.data.user._id);
      alert("Sign up Successful");
      navigate("/");
      location.reload();
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          placeholder="Password"
          required
        />
        <input
          type="password"
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={(e) => onChange(e)}
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <NavLink to="/login">Allready have an account? Login now</NavLink>
    </div>
  );
};

export default Signup;
