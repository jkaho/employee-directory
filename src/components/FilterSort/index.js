import React from "react";
import "./style.css";

function Filter() {
  return (
    <div className="sort-filter-div">
      <div className="filter-div">
        <label htmlFor="state-filter" className="label">Filter by </label>
        <select id="state-filter" className="sort-select" defaultValue="none" defaultChecked="none">
          <option value="none" disabled selected>State</option>
          <option value="nsw">New South Wales</option>
          <option value="vic">Victoria</option>
          <option value="qld">Queensland</option>
          <option value="wa">Western Australia</option>
          <option value="sa">South Australia</option>
          <option value="tas">Tasmania</option>
          <option value="act">Australian Capital Territory</option>
          <option value="nt">Northern Territory</option>
        </select>
        &nbsp;
        <select id="age-filter" className="sort-select" defaultValue="none" defaultChecked="none">
          <option value="none" disabled>Age group</option>
          <option value="under-30">Under 30</option>
          <option value="under-40">30-39</option>
          <option value="under-50">40-49</option>
          <option value="under-60">50-59</option>
          <option value="under-70">Over 60</option>
        </select>
        &nbsp;
        <button id="apply-filter-btn" className="sort-btn"><i className="fas fa-filter"></i></button>
        &nbsp;
        <button id="clear-filter-btn" className="sort-btn"><i className="fas fa-times"></i></button>
      </div>

      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

      <div className="sort-div">
        <label htmlFor="sort" className="label">Sort by </label>
        <select id="sort" className="sort-select" defaultValue="none" defaultChecked="none">
          <option value="none" disabled>Category</option>
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
          <option value="dob">Date of Birth</option>
        </select>
        &nbsp;
        <button id="asc-btn" className="sort-btn"><i className="fas fa-arrow-up"></i></button>
        &nbsp;
        <button id="desc-btn" className="sort-btn"><i className="fas fa-arrow-down"></i></button>
      </div>
    </div>
  )
}

export default Filter;