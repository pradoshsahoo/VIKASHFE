import logo from "../images/logo.png";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./Loading";

export const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const { loginWithRedirect, isAuthenticated, user, isLoading } = useAuth0();
  const { logout } = useAuth0();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <img src={logo} alt="Loading.." className="image" />
          </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            {isAuthenticated ? (
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/addBlog"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Create
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/blog"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Blogs
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/products"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/services"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Services
                  </NavLink>
                </li>
                <li>
                  <button
                    className="btn"
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            ) : (
              <li>
                <button className="btn" onClick={() => loginWithRedirect()}>
                  Log In
                </button>
              </li>
            )}
            {/* <li className="nav-item">
              {isAuthenticated && (
                <img className="user" src={user.picture} alt="" />
              )}
            </li> */}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
};
