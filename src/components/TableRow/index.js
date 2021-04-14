import React from "react";
import moment from "moment";
import "./style.css";

function TableRow(props) {
  return (
    <tr>
      <td>{props.firstName}</td>
      <td>{props.lastName}</td>
      <td>{moment(props.dob).format("D/MM/YYYY")}</td>
      <td>{props.address}</td>
      <td>{props.email}</td>
      <td>{props.phone}</td>
    </tr>
  )
}

export default TableRow;