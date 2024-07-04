import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import axios from "axios";
import { Api } from "../../config/Config";
import localStorage from "local-storage";
import { useEffect } from "react";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function Talent_Table({
  total_orders,
  last_transaction,
  overall_earning,
  payment_in_account,
}) {
  const rows = [
    createData(total_orders, 0, overall_earning, payment_in_account),
    // createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    // createData("Eclair", 262, 16.0, 24, 6.0),
    // createData("Cupcake", 305, 3.7, 67, 4.3),
    // createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];
  return (
    <TableContainer>
      <Table>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                style={{
                  color: "white",
                }}
              >
                {row.name}
              </TableCell>
              <TableCell
                align="center"
                style={{
                  color: "white",
                }}
              >
                {row.calories}
              </TableCell>
              <TableCell
                align="right"
                style={{
                  color: "white",
                }}
              >
                {row.fat}
              </TableCell>
              <TableCell
                align="right"
                style={{
                  color: "white",
                }}
              >
                {row.carbs}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
