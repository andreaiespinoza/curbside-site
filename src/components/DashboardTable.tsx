"use client";
import React, { useEffect, useState } from "react";


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
    <section style={{ marginBottom: "2rem" }}>
      <h2>Posts for the week</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "1rem",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Post</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.name}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.post}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
