import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.scss";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <NavLink to="/">ReportHub</NavLink>
      </div>
      <ul className="navbar__links">
        <li>
          <NavLink to="/" activeclassname="navbar__link--active" exact="true">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/report" activeclassname="navbar__link--active">
            Report
          </NavLink>
        </li>
        {localStorage.getItem("token") ? (
          <li
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("loggedUser");
              location.reload();
            }}
          >
            <NavLink to="/" activeclassname="navbar__link--active">
              logout
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink to="/login" activeclassname="navbar__link--active">
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
