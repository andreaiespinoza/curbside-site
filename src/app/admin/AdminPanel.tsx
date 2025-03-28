"use client";
import React, { useEffect, useState, FormEvent } from "react";
import { signOut } from "next-auth/react";

// Updated interface to reflect "post" instead of "age"
interface TableRow {
  id: number;
  name: string;
  post: string; // a string field
}

export default function AdminPanel() {
  // Table data
  const [tableData, setTableData] = useState<TableRow[]>([]);

  // Form fields for adding
  const [name, setName] = useState("");
  const [post, setPost] = useState("");

  // Message to show success/error
  const [message, setMessage] = useState("");

  // Fields for editing
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editPost, setEditPost] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  // GET the table data
  async function fetchData() {
    try {
      const res = await fetch("/api/table-data");
      if (!res.ok) throw new Error("Failed to fetch data");
      const json = await res.json();
      setTableData(json.data);
    } catch (err) {
      console.error("Error fetching table data:", err);
    }
  }

  // POST a new row
  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/table-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // sending name and post instead of age
        body: JSON.stringify({ name, post }),
      });

      if (res.ok) {
        setMessage("Row added successfully!");
        setName("");
        setPost("");
        await fetchData(); // refresh table
      } else {
        const data = await res.json();
        setMessage("Error: " + (data.error || "Unknown error"));
      }
    } catch (error: unknown) {
        if (error instanceof Error) {
          setMessage("Error: " + error.message);
        } else {
          setMessage("An unknown error occurred");
        }
      }
  }

  // Start editing a row
  function startEdit(row: TableRow) {
    setEditingRowId(row.id);
    setEditName(row.name);
    setEditPost(row.post);
  }

  // Cancel editing
  function cancelEdit() {
    setEditingRowId(null);
    setEditName("");
    setEditPost("");
  }

  // PUT (update) a row
  async function submitEdit(e: FormEvent) {
    e.preventDefault();
    if (!editingRowId) return;
    setMessage("");

    try {
      const res = await fetch("/api/table-data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingRowId,
          name: editName,
          post: editPost,
        }),
      });

      if (res.ok) {
        setMessage("Row updated successfully!");
        setEditingRowId(null);
        setEditName("");
        setEditPost("");
        await fetchData();
      } else {
        const data = await res.json();
        setMessage("Error: " + (data.error || "Unknown error"));
      }
    } catch (error: unknown) {
        if (error instanceof Error) {
          setMessage("Error: " + error.message);
        } else {
          setMessage("An unknown error occurred");
        }
      }
  }

  // DELETE a row
  async function handleDelete(id: number) {
    const confirmed = window.confirm("Are you sure you want to delete this row?");
    if (!confirmed) return;

    setMessage("");
    try {
      const res = await fetch("/api/table-data", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setMessage("Row deleted successfully!");
        await fetchData();
      } else {
        const data = await res.json();
        setMessage("Error: " + (data.error || "Unknown error"));
      }
    } catch (error: unknown) {
        if (error instanceof Error) {
          setMessage("Error: " + error.message);
        } else {
          setMessage("An unknown error occurred");
        }
      }
  }

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h1>Admin Panel</h1>
      <p>
        You are logged in.{" "}
        <button onClick={() => signOut()} style={{ marginLeft: "1rem" }}>
          Sign Out
        </button>
      </p>
      <hr style={{ margin: "1rem 0" }} />

      {/* TABLE */}
      <section>
        <h2>Current Rows</h2>
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
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => {
              if (editingRowId === row.id) {
                // Editing mode
                return (
                  <tr key={row.id}>
                    <td style={tdStyle}>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    </td>
                    <td style={tdStyle}>
                      <input
                        type="text"
                        value={editPost}
                        onChange={(e) => setEditPost(e.target.value)}
                      />
                    </td>
                    <td style={tdStyle}>
                      <button onClick={submitEdit}>Save</button>
                      <button onClick={cancelEdit} style={{ marginLeft: "0.5rem" }}>
                        Cancel
                      </button>
                    </td>
                  </tr>
                );
              } else {
                // Normal display row
                return (
                  <tr key={row.id}>
                    <td style={tdStyle}>{row.name}</td>
                    <td style={tdStyle}>{row.post}</td>
                    <td style={tdStyle}>
                      <button onClick={() => startEdit(row)}>Edit</button>
                      <button
                        onClick={() => handleDelete(row.id)}
                        style={{ marginLeft: "0.5rem", color: "red" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </section>

      {/* FORM - ADD NEW ROW */}
      <section style={{ marginTop: "2rem" }}>
        <h2>Add a New Row</h2>
        <form onSubmit={handleAdd} style={{ marginTop: "1rem" }}>
          <div style={{ marginBottom: "0.5rem" }}>
            <label style={{ marginRight: 8 }}>Name:</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: "0.5rem" }}>
            <label style={{ marginRight: 8 }}>Post:</label>
            <input
              type="text"
              required
              value={post}
              onChange={(e) => setPost(e.target.value)}
            />
          </div>
          <button type="submit">Add Row</button>
        </form>
      </section>

      {message && (
        <p style={{ marginTop: "1rem", color: message.includes("Error") ? "red" : "green" }}>
          {message}
        </p>
      )}
    </div>
  );
}

// Helper for table cell styling
const tdStyle = {
  border: "1px solid #ddd",
  padding: "8px",
};
