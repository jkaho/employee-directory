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
        <table>
          <thead>
            <tr>
              <th colSpan="2">NAME</th>
              <th rowSpan="2">PHOTO</th>
              <th rowSpan="2">DOB</th>
              <th rowSpan="2">ADDRESS</th>
              <th rowSpan="2">EMAIL</th>
              <th rowSpan="2">MOBILE</th>
            </tr>
            <tr>
              <th>FIRST</th>
              <th>LAST</th>
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
    )
  };
};

export default Table;