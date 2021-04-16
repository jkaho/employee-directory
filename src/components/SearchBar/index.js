import React from "react";
import "./style.css";

function SearchBar(props) {
  return (
    <div className="search-div">
      <span> Search by </span>
      &nbsp;
      <div className="searchbar-div">
        <input className="searchbar" placeholder="Employee name" onChange={props.handleNameSearch}></input>
      </div>
    </div>
  )
}

export default SearchBar;