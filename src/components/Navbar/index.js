import React from "react";
import logo from './logo.png';
import "./style.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo-div">
        <img src={logo} alt="Employee Directory logo" width="450"></img>
      </div>
    </nav>
  )
}

export default Navbar;
