// import React from "react";
// import { NavLink } from "react-router-dom";
// import "./navbar.scss";

// function Navbar() {
//   return (
//     <nav className="navbar">
//       <ul className="navbar__links">
//         <div className="navbar__logo">
//           <NavLink to="/">AbuseAccounts</NavLink>
//         </div>
//         <div className="middle-nav-links">
//           <li>
//             <NavLink to="/" activeclassname="navbar__link--active" exact="true">
//               Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/report" activeclassname="navbar__link--active">
//               Report
//             </NavLink>
//           </li>
//         </div>
//         <div className="end-nav-links">
//           {localStorage.getItem("token") ? (
//             <li
//               onClick={() => {
//                 localStorage.removeItem("token");
//                 localStorage.removeItem("loggedUser");
//                 location.reload();
//               }}
//             >
//               <NavLink to="/" activeclassname="navbar__link--active">
//                 logout
//               </NavLink>
//             </li>
//           ) : (
//             <>
//               <li>
//                 <NavLink to="/login" activeclassname="navbar__link--active">
//                   Login
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/signup" activeclassname="navbar__link--active">
//                   Sign up
//                 </NavLink>
//               </li>
//             </>
//           )}
//         </div>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./navbar.scss";
import Logo from "../../assets/facebook.svg";

const Navbar = () => {
  // React Hooks and relevant imports
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const from = location.state?.from?.pathname || "/";

  // Toggle the menu's open state
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Helper function to check if the current path matches a given routePath
  const isActiveRoute = (routePath) => {
    return location.pathname === routePath;
  };

  // Add event listener to handle clicks outside the dropdown
  // and close the dropdown if click occurs outside
  useEffect(() => {
    const handleClickOutsideDropdown = (event) => {};

    document.addEventListener("click", handleClickOutsideDropdown);

    return () => {
      document.removeEventListener("click", handleClickOutsideDropdown);
    };
  }, []);

  const NavLink = ({ to, label }) => {
    return (
      <li>
        <Link
          to={to}
          onClick={closeMenu}
          className={`
          ${
            isActiveRoute(to)
              ? "font-bold border-b-2 pb-[1.9px] border-[#EEB30D] text-white"
              : ""
          }
            ${
              label === "Log in" &&
              "py-2 px-6 border-2 rounded-xl pb-2 border-white/50 bg-white/10"
            } 
            ${
              label === "Sign up"
                ? "py-2 px-6 border-2 rounded-xl pb-2  bg-white text-black"
                : " text-semi-white hover:text-white pb-1 nav-effect "
            }
        `}
        >
          {label}
        </Link>
      </li>
    );
  };

  return (
    <nav
      className={`top-0 backdrop-blur-sm z-10 w-full fixed md:sticky color-background: #FFFFFF99`}
    >
      <Helmet>
        <link rel="icon" href={Logo} />
      </Helmet>

      <div className="relative w-full mx-auto bg-inherit py-3 px-3 lg:flex justify-around items-center h-auto border-b-2 border-white/10 font-lato">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-black text-xl font-semibold">
            <div className="flex items-center gap-1">
              <img
                className="w-[8rem] md:w-[2rem] logo"
                src={Logo}
                alt="logo"
              />
            </div>
          </Link>
          <div className="ml-3 lg:hidden">
            <button
              onClick={handleMenuToggle}
              className="text-black p-2 focus:outline-none transition-opacity duration-300 ease-in-out"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              style={{ opacity: isMenuOpen ? 0.5 : 1 }}
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center">
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } lg:flex lg:w-auto mt-4 lg:mt-0 cleancode-menu-animation  transition-all duration-300 `}
            id="mobile-menu"
          >
            <ul className="flex flex-col gap-3 md:gap-8 md:mt-[1.5px] lg:text-left lg:flex-row lg:items-center">
              {[
                { to: "/home", label: "Home" },
                { to: "/report", label: "Report account" },
                { to: "/about", label: "About" },
                { to: "/hotitworks", label: "How it works" },
                { to: "/statistics", label: "Statistics" },
              ].map((link) => (
                <NavLink key={link.to} {...link} />
              ))}
            </ul>
          </div>
        </div>
        <div className="flex items-center">
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } lg:flex lg:w-auto mt-4 lg:mt-0 cleancode-menu-animation  transition-all duration-300 `}
            id="mobile-menu"
          >
            <ul className="flex flex-col gap-3 md:gap-3 md:mt-[1.5px] lg:text-left lg:flex-row lg:items-center">
              {
              [
                { to: "/login", label: "Log in" },
                { to: "/signup", label: "Sign up" },
              ].map((link) => (
                <NavLink key={link.to} {...link} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
