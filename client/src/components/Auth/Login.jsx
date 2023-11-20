import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import "./auth-forms.scss";

const Login = ({ setIsModalOpen }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("loggedUser", response.data.data.user._id);
      setIsModalOpen(false);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Login failed. Please try again later.");
      }
    }
  };

  return (
    <div className="auth-form">
      <div className="flex justify-between w-full">
        <span className="text-white">Login</span>
        <span className="cursor-pointer" onClick={() => setIsModalOpen(false)}>
          X
        </span>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <label htmlFor="email" className="text-semi-white">
          Username or email
        </label>
        <input
          className="form-input"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your username or email here"
          required
        />
        <label htmlFor="password" className="text-semi-white">
          Password
        </label>
        <input
          className="form-input"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          required
        />
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
      <span
        onClick={() => setIsModalOpen("signup")}
        className="text-semi-white cursor-pointer self-center"
      >
        No account yet? <span className="text-white">Sign up</span>
      </span>
    </div>
  );
};

export default Login;
