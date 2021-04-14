import React, { Component } from "react";
import API from "../../utils/API";
import FilterSort from "../FilterSort";
import TableRow from "../TableRow";
import "./style.css";

let employees;

class Table extends Component {
  state = {
    results: [],
    stateFilter: "",
    ageFilter: "",
    sortCategory: ""
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
        console.log("no state")
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
        console.log("no age")
        results = {
          results: filteredEmployeesByState
        }
      } else {
        console.log("both!")
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
        results: results
      });
    }
  };

  removeFilter = () => {
    this.setState({
      results: employees,
      stateFilter: "",
      ageFilter: ""
    });

    document.querySelector("#state-select").value = "none";
    document.querySelector("#age-select").value = "none";
  };

  handleSortCatChange = event => {
    const categoryToSort = event.target.value;
    this.setState({
      sortCategory: categoryToSort
    });
  };

  render() {
    return (
      <div>
        <FilterSort
          handleStateFilterChange={this.handleStateFilterChange}
          handleAgeFilterChange={this.handleAgeFilterChange}
          filterEmployees={this.filterEmployees}
          removeFilter={this.removeFilter}
        />
        <table>
          <thead>
            <tr>
              <th colSpan="2">Name</th>
              <th rowSpan="2">DOB</th>
              <th rowSpan="2">Address</th>
              <th rowSpan="2">Email</th>
              <th rowSpan="2">Mobile</th>
            </tr>
            <tr>
              <th>First</th>
              <th>Last</th>
            </tr>
          </thead>
          <tbody>
            {console.log(this.state.results)}
            {this.state.results.results ? (
              this.state.results.results.map(result => (
                <TableRow 
                  firstName={result.name.first}
                  lastName={result.name.last}
                  dob={result.dob.date}
                  address={`${result.location.street.number} ${result.location.street.name} ${result.location.city} ${result.location.state} ${result.location.country}`}
                  email={result.email}
                  phone={result.cell}
                  key={`key-${this.state.results.results.indexOf(result)}`}
                />
              ))
            ) : (
              <tr>
                <td colSpan="6">No employees to display</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  };
};

export default Table;