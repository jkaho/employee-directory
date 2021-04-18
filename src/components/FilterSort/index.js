import React from "react";
import SearchBar from "../SearchBar";
import Select from "../Select";
import "./style.css";

const stateFilterOptions = [
  {
    value: "none",
    text: "State",
    disabled: true
  },
  {
    value: "New South Wales",
    text: "New South Wales"
  },
  {
    value: "Victoria",
    text: "Victoria"
  },
  {
    value: "Queensland",
    text: "Queensland"
  },
  {
    value: "Western Australia",
    text: "Western Australia"
  },
  {
    value: "South Australia",
    text: "South Australia"
  },  
  {
    value: "Tasmania",
    text: "Tasmania"
  },
  {
    value: "Australian Capital Territory",
    text: "Australian Capital Territory"
  },
  {
    value: "Northern Territory",
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
    value: "0-29",
    text: "Under 30"
  },
  {
    value: "30-39",
    text: "30-39"
  },
  {
    value: "40-49",
    text: "40-49"
  },
  {
    value: "50-59",
    text: "50-59"
  },
  {
    value: "60-100",
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

function FilterSort(props) {
  return (
    <div className="search-sort-filter-div">
      <SearchBar
        handleNameSearch={props.handleNameSearch}
      />
      <div className="sort-filter-div">
      <div className="filter-div">
        <span className="span-label">Filter by </span>
        &nbsp;
        <Select
          type="state"
          filterOptions={stateFilterOptions}
          handleFilterChange={props.handleStateFilterChange}
        />
        &nbsp;
        <Select 
          type="age"
          filterOptions={ageFilterOptions}
          handleFilterChange={props.handleAgeFilterChange}
        />
        &nbsp;
        <button id="apply-filter-btn" className="sort-btn" onClick={props.filterEmployees}><i className="fas fa-filter"></i></button>
        &nbsp;
        <button id="clear-filter-btn" className="sort-btn" onClick={props.removeFilter}><i className="fas fa-times"></i></button>
      </div>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <div className="sort-div">
        <span className="span-label">Sort by </span>
        &nbsp;
        <Select
            type="sort"
            filterOptions={sortOptions}
            handleFilterChange={props.handleSortChange}
        />
                &nbsp;
        <button id="asc-btn" className="sort-btn" onClick={props.sortEmployeesAsc}><i className="fas fa-arrow-up"></i></button>
        &nbsp;
        <button id="desc-btn" className="sort-btn" onClick={props.sortEmployeesDesc}><i className="fas fa-arrow-down"></i></button>
        &nbsp;
        <button id="clear-sort-btn" className="sort-btn" onClick={props.removeSort}><i className="fas fa-times"></i></button>
      </div>
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