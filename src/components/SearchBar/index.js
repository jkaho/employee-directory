import React from "react";
import "./style.css";

function SearchBar() {
  return (
    <div className="search-div">
      <span> Search by </span>
      &nbsp;
      <div className="searchbar-div">
        <input className="searchbar" placeholder="Employee name"></input>
      </div>
    </div>
  )
}

export default SearchBar;