import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = ({ setIsModalOpen }) => {
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
    <div className="auth-form signup">
      <div className="flex justify-between w-full">
        <h2>Create account</h2>
        <span className="cursor-pointer" onClick={() => setIsModalOpen(false)}>
          X
        </span>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <label className="mb-1 text-semi-white" htmlFor="name">
          Username
        </label>
        <input
          className="form-input"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
          placeholder="Name"
          required
        />
        <label className="mb-1 text-semi-white" htmlFor="email">
          email
        </label>
        <input
          className="form-input"
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          placeholder="Email"
          required
        />
        <label className="mb-1 text-semi-white" htmlFor="password">
          password
        </label>
        <input
          className="form-input"
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          placeholder="Password"
          required
        />
        <label className="mb-1 text-semi-white" htmlFor="passwordConfirm">
          Confirm password
        </label>
        <input
          id="passwordConfirm"
          className="form-input"
          type="password"
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={(e) => onChange(e)}
          placeholder="Confirm Password"
          required
        />
        <button type="submit" className="submit-button">
          Sign Up
        </button>
      </form>
      <span
        className="text-semi-white cursor-pointer self-center"
        onClick={() => setIsModalOpen("login")}
      >
        Already have an account? <span className="text-white">Login now</span>
      </span>
    </div>
  );
};

export default Signup;
