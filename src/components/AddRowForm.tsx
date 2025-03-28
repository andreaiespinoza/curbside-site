"use client";

import React, { useState, FormEvent } from "react";

export default function AddRowForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/api/table-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age }),
      });
      if (res.ok) {
        setMessage("Entry added successfully!");
        // Clear form
        setName("");
        setAge("");
      } else {
        const data = await res.json();
        setMessage("Error: " + (data.error || "Unknown error"));
      }
    } catch (error: any) {
      setMessage("Error: " + error.message);
    }
  }

  return (
    <section style={{ marginBottom: "2rem" }}>
      <h3>Add a New Row</h3>
      <form onSubmit={handleSubmit}>
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
          <label style={{ marginRight: 8 }}>Age:</label>
          <input
            type="number"
            required
            value={age}
            onChange={(e) =>
              setAge(e.target.value ? parseInt(e.target.value) : "")
            }
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
    </section>
  );
}
