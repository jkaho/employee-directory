import React from "react";
import "./style.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo-div">
        {/* <h1 className="navbar-logo">Employee Directory</h1> */}
        <img src="/images/logo.png" alt="Employee Directory logo" width="450"></img>
      </div>
    </nav>
  )
}

export default Navbar;