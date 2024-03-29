import React from "react";
import SearchBar from "../SearchBar";
import Select from "../Select";
import "./style.css";

// Option data for select elements
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
      <hr id="search-hr"></hr>
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

export default FilterSort;
