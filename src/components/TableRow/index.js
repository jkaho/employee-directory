import React from "react";
import moment from "moment";
import "./style.css";

function TableRow(props) {
  return (
    <tr className="tr">
      <td className="td">{props.name}</td>
      <td className="td">{moment(props.dob).format("D/MM/YYYY")}</td>
      <td className="td">{props.address}</td>
      <td className="td">{props.email}</td>
      <td className="td">{props.phone}</td>
    </tr>
  )
}

export default TableRow;