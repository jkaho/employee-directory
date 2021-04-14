import React from "react";
import Select from "../Select";
import "./style.css";


const stateFilterOptions = [
  {
    value: "none",
    text: "State",
    disabled: true
  },
  {
    value: "nsw",
    text: "New South Wales"
  },
  {
    value: "vic",
    text: "Victoria"
  },
  {
    value: "qld",
    text: "Queensland"
  },
  {
    value: "wa",
    text: "Western Australia"
  },
  {
    value: "sa",
    text: "South Australia"
  },  
  {
    value: "tas",
    text: "Tasmania"
  },
  {
    value: "act",
    text: "Australian Capital Territory"
  },
  {
    value: "nt",
    text: "Northern Territory"
  },
]

const ageFilterOptions = [
  {
    value: "none",
    text: "Age group",
    disabled: true
  },
  {
    value: "group-20",
    text: "Under 30"
  },
  {
    value: "group-30",
    text: "30-39"
  },
  {
    value: "group-40",
    text: "40-49"
  },
  {
    value: "group-50",
    text: "50-59"
  },
  {
    value: "group-60",
    text: "Over 60"
  },
]

const sortOptions = [
  {
    value: "none",
    text: "Category",
    disabled: true
  },
  {
    value: "firstName",
    text: "First name"
  },
  {
    value: "lastName",
    text: "Last name"
  },
  {
    value: "age",
    text: "Age"
  },
]

function FilterSort() {
  return (
    <div className="sort-filter-div">
      <div className="filter-div">
        <span>Filter by </span>
        &nbsp;
        <Select
          type="state"
          filterOptions={stateFilterOptions}
        />
        &nbsp;
        <Select 
          type="age"
          filterOptions={ageFilterOptions}
        />
        &nbsp;
        <button id="apply-filter-btn" className="sort-btn"><i className="fas fa-filter"></i></button>
        &nbsp;
        <button id="clear-filter-btn" className="sort-btn"><i className="fas fa-times"></i></button>
      </div>
      <div className="sort-div">
        <span>Sort by </span>
        &nbsp;
        <Select
            type="sort"
            filterOptions={sortOptions}
        />
                &nbsp;
        <button id="asc-btn" className="sort-btn"><i className="fas fa-arrow-up"></i></button>
        &nbsp;
        <button id="desc-btn" className="sort-btn"><i className="fas fa-arrow-down"></i></button>
      </div>
    </div>
  )
}

// function FilterSort() {
//   return (
//     <div className="sort-filter-div">
//       <div className="filter-div">
//         <label htmlFor="state-filter" className="label">Filter by </label>
//         <select id="state-filter" className="sort-select" defaultValue="none" defaultChecked="none">
//           <option value="none" disabled selected>State</option>
//           <option value="nsw">New South Wales</option>
//           <option value="vic">Victoria</option>
//           <option value="qld">Queensland</option>
//           <option value="wa">Western Australia</option>
//           <option value="sa">South Australia</option>
//           <option value="tas">Tasmania</option>
//           <option value="act">Australian Capital Territory</option>
//           <option value="nt">Northern Territory</option>
//         </select>
//         &nbsp;
//         <select id="age-filter" className="sort-select" defaultValue="none" defaultChecked="none">
//           <option value="none" disabled>Age group</option>
//           <option value="under-30">Under 30</option>
//           <option value="under-40">30-39</option>
//           <option value="under-50">40-49</option>
//           <option value="under-60">50-59</option>
//           <option value="under-70">Over 60</option>
//         </select>
//         &nbsp;
//         <button id="apply-filter-btn" className="sort-btn"><i className="fas fa-filter"></i></button>
//         &nbsp;
//         <button id="clear-filter-btn" className="sort-btn"><i className="fas fa-times"></i></button>
//       </div>

//       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

//       <div className="sort-div">
//         <label htmlFor="sort" className="label">Sort by </label>
//         <select id="sort" className="sort-select" defaultValue="none" defaultChecked="none">
//           <option value="none" disabled>Category</option>
//           <option value="firstName">First Name</option>
//           <option value="lastName">Last Name</option>
//           <option value="dob">Date of Birth</option>
//         </select>
//         &nbsp;
//         <button id="asc-btn" className="sort-btn"><i className="fas fa-arrow-up"></i></button>
//         &nbsp;
//         <button id="desc-btn" className="sort-btn"><i className="fas fa-arrow-down"></i></button>
//       </div>
//     </div>
//   )
// }

export default FilterSort;