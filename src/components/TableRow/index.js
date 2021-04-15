import React from "react";
import moment from "moment";
import "./style.css";

function TableRow(props) {
  return (
    <tr>
      <td className="name-td">{props.firstName}</td>
      <td className="name-td lastName">{props.lastName}</td>
      <td className="img-td"><img src={props.image} alt={`Employee: ${props.firstName} ${props.lastName}`}></img></td>
      <td>{moment(props.dob).format("D/MM/YYYY")}</td>
      <td>{props.address}</td>
      <td>{props.email}</td>
      <td>{props.phone}</td>
    </tr>
  )
}

export default TableRow;