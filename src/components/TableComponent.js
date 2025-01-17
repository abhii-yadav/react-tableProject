import React, { useMemo, useState } from "react";
import { useTable, usePagination, useSortBy, useGlobalFilter } from "react-table";
import * as XLSX from "xlsx";
import "./TableComponent.css";

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div className="search-bar">
      <input
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search Here..."
        className="search-input"
      />
    </div>
  );
};

const TableComponent = () => {
  // Table Data
  const data = useMemo(
    () => [
      { id: 1, accountName: "John Doe", email: "john@example.com", phone: "1234567890", website: "www.johndoe.com", industry: "Technology", accountStatus: "Active", remark: "Good Client", action: "Edit/Delete" },
      { id: 2, accountName: "Jane Doe", email: "jane@example.com", phone: "9876543210", website: "www.janedoe.com", industry: "Finance", accountStatus: "Inactive", remark: "Follow-up Required", action: "Edit/Delete" },
      { id: 3, accountName: "Alice Brown", email: "alice@example.com", phone: "5556667777", website: "www.alicebrown.com", industry: "Healthcare", accountStatus: "Active", remark: "Premium Client", action: "Edit/Delete" },
      { id: 4, accountName: "John Doe", email: "john@example.com", phone: "1234567890", website: "www.johndoe.com", industry: "Technology", accountStatus: "Active", remark: "Good Client", action: "Edit/Delete" },
      { id: 5, accountName: "Jane Doe", email: "jane@example.com", phone: "9876543210", website: "www.janedoe.com", industry: "Finance", accountStatus: "Inactive", remark: "Follow-up Required", action: "Edit/Delete" },
      { id: 6, accountName: "Alice Brown", email: "alice@example.com", phone: "5556667777", website: "www.alicebrown.com", industry: "Healthcare", accountStatus: "Active", remark: "Premium Client", action: "Edit/Delete" },
      { id: 7, accountName: "John Doe", email: "john@example.com", phone: "1234567890", website: "www.johndoe.com", industry: "Technology", accountStatus: "Active", remark: "Good Client", action: "Edit/Delete" },
      { id: 8, accountName: "Jane Doe", email: "jane@example.com", phone: "9876543210", website: "www.janedoe.com", industry: "Finance", accountStatus: "Inactive", remark: "Follow-up Required", action: "Edit/Delete" },
      { id: 9, accountName: "Alice Brown", email: "alice@example.com", phone: "5556667777", website: "www.alicebrown.com", industry: "Healthcare", accountStatus: "Active", remark: "Premium Client", action: "Edit/Delete" },
      { id: 10, accountName: "John Doe", email: "john@example.com", phone: "1234567890", website: "www.johndoe.com", industry: "Technology", accountStatus: "Active", remark: "Good Client", action: "Edit/Delete" },
      { id: 11, accountName: "Jane Doe", email: "jane@example.com", phone: "9876543210", website: "www.janedoe.com", industry: "Finance", accountStatus: "Inactive", remark: "Follow-up Required", action: "Edit/Delete" },
      { id: 12, accountName: "Alice Brown", email: "alice@example.com", phone: "5556667777", website: "www.alicebrown.com", industry: "Healthcare", accountStatus: "Active", remark: "Premium Client", action: "Edit/Delete" },
      { id: 13, accountName: "John Doe", email: "john@example.com", phone: "1234567890", website: "www.johndoe.com", industry: "Technology", accountStatus: "Active", remark: "Good Client", action: "Edit/Delete" },
      { id: 14, accountName: "Jane Doe", email: "jane@example.com", phone: "9876543210", website: "www.janedoe.com", industry: "Finance", accountStatus: "Inactive", remark: "Follow-up Required", action: "Edit/Delete" },
      { id: 15, accountName: "Alice Brown", email: "alice@example.com", phone: "5556667777", website: "www.alicebrown.com", industry: "Healthcare", accountStatus: "Active", remark: "Premium Client", action: "Edit/Delete" },
      { id: 16, accountName: "John Doe", email: "john@example.com", phone: "1234567890", website: "www.johndoe.com", industry: "Technology", accountStatus: "Active", remark: "Good Client", action: "Edit/Delete" },
      { id: 17, accountName: "Jane Doe", email: "jane@example.com", phone: "9876543210", website: "www.janedoe.com", industry: "Finance", accountStatus: "Inactive", remark: "Follow-up Required", action: "Edit/Delete" },
      { id: 18, accountName: "Alice Brown", email: "alice@example.com", phone: "5556667777", website: "www.alicebrown.com", industry: "Healthcare", accountStatus: "Active", remark: "Premium Client", action: "Edit/Delete" },
      { id: 19, accountName: "Alice Brown", email: "alice@example.com", phone: "5556667777", website: "www.alicebrown.com", industry: "Healthcare", accountStatus: "Active", remark: "Premium Client", action: "Edit/Delete" },
      { id: 20, accountName: "John Doe", email: "john@example.com", phone: "1234567890", website: "www.johndoe.com", industry: "Technology", accountStatus: "Active", remark: "Good Client", action: "Edit/Delete" },  
      // Add more rows as needed
    ],
    []
  );

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Account Name", accessor: "accountName" },
      { Header: "Email", accessor: "email" },
      { Header: "Phone", accessor: "phone" },
      { Header: "Website", accessor: "website" },
      { Header: "Industry", accessor: "industry" },
      { Header: "Account Status", accessor: "accountStatus" },
      { Header: "Remark", accessor: "remark" },
      { Header: "Action", accessor: "action" },
    ],
    []
  );

  // React Table Hooks
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setGlobalFilter,
    toggleSortBy,
  } = useTable(
    { columns, data, initialState: { pageSize: 10 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // State for Sorting Direction
  const [isAscending, setIsAscending] = useState(true);

  // Toggle Sort Function for All Columns
  const toggleSortForAll = () => {
    headerGroups[0].headers.forEach((column) => {
      toggleSortBy(column.id, !isAscending); 
    });
    setIsAscending(!isAscending);
  };

  // Export Filtered Data
  const downloadFilteredData = () => {
    const filteredData = page.map((row) => row.original);
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Filtered Data");
    XLSX.writeFile(wb, "filtered_data.xlsx");
  };

  return (
    <div className="table-container">
      {/* Header Controls */}
      <div className="header-controls">
        <button className="download-button" onClick={downloadFilteredData}>
          <i className="fas fa-file-excel"></i> Download XLSX
        </button>
        <button className="sort-button" onClick={toggleSortForAll}>
          View 
        </button>
        <GlobalFilter filter={state.globalFilter} setFilter={setGlobalFilter} />
      </div>

      {/* Table */}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={previousPage} disabled={!canPreviousPage}>
          Previous
        </button>
        <span>
          Page {state.pageIndex + 1} of {pageOptions.length}
        </span>
        <button onClick={nextPage} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
