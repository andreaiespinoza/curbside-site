"use client";
import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


interface TableRow {
  name: string;
  post: string;
}

export default function DashboardTable() {
  const [tableData, setTableData] = useState<TableRow[]>([]);

  useEffect(() => {
    fetch("/api/table-data")
      .then((res) => res.json())
      .then((json) => setTableData(json.data))
      .catch((err) => console.error("Failed to fetch table data:", err));
  }, []);

  return (
  <div style={{ maxWidth: "500px", margin: "auto" }} >
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Post</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((item, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell>{item.post}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
  );
}
