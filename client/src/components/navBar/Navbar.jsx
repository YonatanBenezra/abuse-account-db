import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.scss';

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
        <li>
          <NavLink to="/about" activeclassname="navbar__link--active">
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
