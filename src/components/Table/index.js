import React, { Component } from "react";
import API from "../../utils/API";
import TableRow from "../TableRow";
import "./style.css";

class Table extends Component {
  state = {
    results: []
  }

  componentDidMount() {
    API.getRandomEmployees()
      .then(res => {
        this.setState({ results: res.data });
        console.log(this.state.results);
        // this.state.results.results.map(result => {
        //     console.log(result.name.first)
        //     console.log(result.name.last)
        //     console.log(result.dob.date)
        //     console.log(result.dob.age)
        //     console.log(`${result.location.street.number} ${result.location.street.name} ${result.location.city} ${result.location.state} ${result.location.country}`)
        //     console.log(result.cell)
        //     console.log(result.email)
        // })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
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
                <td>No employees to display</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table;