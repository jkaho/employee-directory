import React from "react";
import "./style.css";

function Select(props) {
  return (
    <div className="filter">
        <select id={`${props.type}-select`} className="sort-select" defaultValue="none" defaultChecked="none" onChange={props.handleFilterChange}>
          {props.filterOptions.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled ? ("disabled") : ("")}>{option.text}</option>
          ))}
        </select>
    </div>
  )
}

export default Select;