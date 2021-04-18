import React from "react";
import moment from "moment";
import "./style.css";

function TableRow(props) {
  return (
    <tr>
      <td className="name-td">{props.firstName}</td>
      <td className="name-td lastName">{props.lastName}</td>
      <td className="img-td"><img src={props.image} alt={`Employee: ${props.firstName} ${props.lastName}`}></img></td>
      <td className="dob-td">{moment(props.dob).format("D/MM/YYYY")}</td>
      <td className="address-td hide-td">{props.address}</td>
      <td className="email-td hide-td">{props.email}</td>
      <td className="phone-td hide-td">{props.phone}</td>
    </tr>
  )
}

export default TableRow;