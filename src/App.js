import React from "react";
import TableComponent from "./components/TableComponent";

const App = () => {
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        margin: "20px auto",
        maxWidth: "80%",
        border: "1px solid #ddd",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "8px",
          color: "#333",
        }}
      >
        Account Lists
      </h1>
      <p
        style={{
          fontSize: "16px",
          color: "#666",
          marginBottom: "16px",
        }}
      >
        Here's a list of your accounts.
      </p>
      <TableComponent />
    </div>
  );
};

export default App;

