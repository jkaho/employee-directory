import React, { Component } from "react";
import Mark from "mark.js";
import API from "../../utils/API";
import FilterSort from "../FilterSort";
import TableRow from "../TableRow";
import "./style.css";

let employees;

class Table extends Component {
  state = {
    results: {},
    sortedResults: {},
    stateFilter: "",
    ageFilter: "",
    sortCategory: "",
    search: ""
  }

  componentDidMount() {
    API.getRandomEmployees()
      .then(res => {
        this.setState({ results: res.data });
        employees = this.state.results;
        console.log(this.state.results);
      })
      .catch(err => console.log(err))
  };

  handleNameSearch = event => {
    this.setState({search: event.target.value.trim()}, () => {
      this.markInstance = new Mark(document.querySelectorAll(".name-td"));
      this.markInstance.unmark({
        done: () => {
          this.markInstance.mark(this.state.search)
        }
      });
    });

    const search = event.target.value.trim();
    if (search !== "" && this.state.results) {
      let searchResults = [];
      employees.results.forEach(result => {
        const fullname = `${result.name.first} ${result.name.last}`;
        if (fullname.toLowerCase().includes(search)) {
          searchResults.push(result);
        }
      });

      const searchResultsObject = {
        results: searchResults
      };

      if (searchResults.length < 1) {
        this.setState({
          results: { results: false }
        });

        return;
      }

      this.setState({
        results: searchResultsObject
      });

    } else {
      this.setState({
        results: employees
      })
    }
  };

  highlightSearchTerms = (term, node) => {
    let instance = new Mark(node);
    instance.mark(term, {
      separateWordSearch: true,
      accuracy: "exactly"
    });
  };

  handleStateFilterChange = event => {
    const stateToFilter = event.target.value;
    this.setState({
      stateFilter: stateToFilter
    });
  };

  handleAgeFilterChange = event => {
    const ageToFilter = event.target.value;
    this.setState({
      ageFilter: ageToFilter
    });
  };

  filterEmployees = event => {
    event.preventDefault();
    if (employees.results) {
      const stateFilter = this.state.stateFilter;
      const filteredEmployeesByState = employees.results.filter(employee => employee.location.state === stateFilter);
      const ageFilterSplit = this.state.ageFilter.split("-");
      const ageFilterMin = parseInt(ageFilterSplit[0]);
      const ageFilterMax = parseInt(ageFilterSplit[1]);
      let filteredEmployeesByAge = [];
      let results;

      if (stateFilter === "" && this.state.ageFilter === "") {
        return;
      }

      if (stateFilter === "") {
        employees.results.forEach(employee => {
          if (employee.dob.age >= ageFilterMin && employee.dob.age <= ageFilterMax) {
            filteredEmployeesByAge.push(employee);
          }
        });

        results = {
          results: filteredEmployeesByAge
        }
        // filteredEmployeesByAge = employees.results.filter(employee => employee.dob.age >= ageFilterMin && employee.dob.age <= ageFilterMax);
      } else if (this.state.ageFilter === "") {
        results = {
          results: filteredEmployeesByState
        }
      } else {
        console.log(this.state.ageFilter)
        filteredEmployeesByState.forEach(employee => {
          if (employee.dob.age >= ageFilterMin && employee.dob.age <= ageFilterMax) {
            filteredEmployeesByAge.push(employee);
          }
        });
        results = {
          results: filteredEmployeesByAge
        }
        // filteredEmployeesByAge = filteredEmployeesByState.filter(employee => employee.dob.age >= ageFilterMin && employee.dob.age <= ageFilterMax);
      }

      this.setState({
        results: results,
        filtered: true
      });
    }
  };

  removeFilter = () => {
    this.setState({
      results: employees,
      stateFilter: "",
      ageFilter: "",
      filtered: false
    });

    document.querySelector("#state-select").value = "none";
    document.querySelector("#age-select").value = "none";
    document.querySelector("#sort-select").value = "none";
  };

  handleSortChange = event => {
    const categoryToSort = event.target.value;
    this.setState({
      sortCategory: categoryToSort
    });
  };

  sortEmployeesAsc = () => {
    const category = this.state.sortCategory;
    const results = this.state.results.results;
    let sorted;
    if (category === "") {
      return;
    }

    switch(category) {
      case "firstName":
        sorted = [...results].sort((a, b) => a.name.first > b.name.first ? 1 : -1)
        break;
      case "lastName":
        sorted = [...results].sort((a, b) => a.name.last > b.name.last ? 1 : -1)
        break;
      default:
        sorted = [...results].sort(function(a, b) {
          return new Date(b.dob.date) - new Date(a.dob.date);
        });
        break;
    }

    const sortedResults = {
      results: sorted
    }

    this.setState({
      results: sortedResults
    })
  };

  sortEmployeesDesc = () => {
    const category = this.state.sortCategory;
    const results = this.state.results.results;
    let sorted;
    if (category === "") {
      return;
    }

    switch(category) {
      case "firstName":
        sorted = [...results].sort((a, b) => b.name.first > a.name.first ? 1 : -1)
        break;
      case "lastName":
        sorted = [...results].sort((a, b) => b.name.last > a.name.last ? 1 : -1)
        break;
      default:
        sorted = [...results].sort(function(a, b) {
          return new Date(a.dob.date) - new Date(b.dob.date);
        });
        break;
    }

    const sortedResults = {
      results: sorted
    }
  
    this.setState({
      results: sortedResults
    })
  };

  removeSort = () => {
    this.setState({
      results: employees,
      sortCategory: ""
    });
    console.log(employees)
    console.log(this.state.results)

    document.querySelector("#sort-select").value = "none";
  };

  handleLeftBtn = event => {
    event.stopPropagation();
    const currentHeading = event.target.parentElement.classList[0];
    let prevHeading;

    switch(currentHeading) {
      case "dob":
        prevHeading = "phone";
        break;
      case "address":
        prevHeading = "dob";
        break;
      case "email":
        prevHeading = "address";
        break;
      default:
        prevHeading = "email";
        break;
    }

    const prevHeadingEl = document.querySelector(`.${prevHeading}-th`);
    const prevDataEls = document.querySelectorAll(`.${prevHeading}-td`);
    const currentHeadingEl = document.querySelector(`.${currentHeading}-th`);
    const currentDataEls = document.querySelectorAll(`.${currentHeading}-td`);

    prevHeadingEl.classList.remove("hide-th");
    currentHeadingEl.classList.add("hide-th");

    prevDataEls.forEach(el => {
      el.classList.remove("hide-td");
    });

    currentDataEls.forEach(el => {
      el.classList.add("hide-td");
    });
  }

  handleRightBtn = event => {
    event.stopPropagation();
    const currentHeading = event.target.parentElement.classList[0];
    let nextHeading;

    switch(currentHeading) {
      case "dob":
        nextHeading = "address";
        break;
      case "address":
        nextHeading = "email";
        break;
      case "email":
        nextHeading = "phone";
        break;
      default:
        nextHeading = "dob";
        break;
    }

    const nextHeadingEl = document.querySelector(`.${nextHeading}-th`);
    const nextDataEls = document.querySelectorAll(`.${nextHeading}-td`);
    const currentHeadingEl = document.querySelector(`.${currentHeading}-th`);
    const currentDataEls = document.querySelectorAll(`.${currentHeading}-td`);

    nextHeadingEl.classList.remove("hide-th");
    currentHeadingEl.classList.add("hide-th");

    nextDataEls.forEach(el => {
      el.classList.remove("hide-td");
    });

    currentDataEls.forEach(el => {
      el.classList.add("hide-td");
    });
  }

  abbrievateState = (stateName) => {
    switch(stateName) {
      case "New South Wales":
        return "NSW";
      case "Victoria":
        return "VIC";
      case "Queensland":
        return "QLD";
      case "Western Australia":
        return "WA";
      case "South Australia":
        return "SA";
      case "Tasmania":
        return "TAS";
      case "Australian Capital Territory":
        return "ACT";
      default:
        return "NT";
    }
  };

  render() {
    return (
      <div>
        <FilterSort
          handleNameSearch={this.handleNameSearch}
          handleStateFilterChange={this.handleStateFilterChange}
          handleAgeFilterChange={this.handleAgeFilterChange}
          filterEmployees={this.filterEmployees}
          removeFilter={this.removeFilter}
          handleSortChange={this.handleSortChange}
          sortEmployeesAsc={this.sortEmployeesAsc}
          sortEmployeesDesc={this.sortEmployeesDesc}
          removeSort={this.removeSort}
        />
        <div className="table-div">
          <table className="employee-table">
            <thead>
              <tr>
                <th id="th-1" className="name name-th th" colSpan="2">NAME</th>
                <th id="th-2" className="img img-th th" rowSpan="2">PHOTO</th>
                <th id="th-3" className="dob dob-th th" rowSpan="2">
                  <button className="dob th-btn" onClick={this.handleLeftBtn}><i className="fas fa-chevron-left"></i></button>
                  DOB
                  <button className="dob th-btn" onClick={this.handleRightBtn}><i className="fas fa-chevron-right"></i></button>
                </th>
                <th id="th-4" className="address address-th th hide-th" rowSpan="2">
                  <button className="address th-btn" onClick={this.handleLeftBtn}><i className="fas fa-chevron-left"></i></button>
                  ADDRESS
                  <button className="address th-btn" onClick={this.handleRightBtn}><i className="fas fa-chevron-right"></i></button>
                </th>
                <th id="th-5" className="email email-th th hide-th" rowSpan="2">
                  <button className="email th-btn" onClick={this.handleLeftBtn}><i className="fas fa-chevron-left"></i></button>
                  EMAIL
                  <button className="email th-btn hide-th" onClick={this.handleRightBtn}><i className="fas fa-chevron-right"></i></button>
                </th>
                <th id="th-6" className="phone phone-th th hide-th" rowSpan="2">
                  <button className="phone th-btn" onClick={this.handleLeftBtn}><i className="fas fa-chevron-left"></i></button>
                  MOBILE
                  <button className="phone th-btn" onClick={this.handleRightBtn}><i className="fas fa-chevron-right"></i></button>
                </th>
              </tr>
              <tr>
                <th className="first-th th">FIRST</th>
                <th className="last-th th">LAST</th>
              </tr>
            </thead>
            <tbody className="search-results">
              {this.state.results.results ? (
                this.state.results.results.map(result => (
                  <TableRow 
                    image={result.picture.medium}
                    firstName={result.name.first}
                    lastName={result.name.last}
                    dob={result.dob.date}
                    address={`${result.location.street.number} ${result.location.street.name}, ${result.location.city}, ${this.abbrievateState(result.location.state)}`}
                    email={result.email}
                    phone={result.cell}
                    key={`key-${this.state.results.results.indexOf(result)}`}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="7">No employees to display</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  };
};

export default Table;

// Table headings
// const nameTh = document.querySelector(".name-th");
// const firstTh = document.querySelector(".first-th");
// const lastTh = document.querySelector(".last-th");
// const imgTh = document.querySelector(".img-th");
// const dobTh = document.querySelector(".dob-th");
// const addressTh = document.querySelector(".address-th");
// const emailTh = document.querySelector(".email-th");
// const phoneTh = document.querySelector(".phone-th");

// Responsive table headings
// const nameThMobile = document.querySelector(".name-th-m");
// const firstThMobile = document.querySelector(".first-th-m");
// const lastThMobile = document.querySelector(".last-th-m");
// const imgThMobile = document.querySelector(".img-th-m");
// const dobThMobile = document.querySelector(".dob-th-m");
// const addressThMobile = document.querySelector(".address-th-m");
// const emailThMobile = document.querySelector(".email-th-m");
// const phoneThMobile = document.querySelector(".phone-th-m");

