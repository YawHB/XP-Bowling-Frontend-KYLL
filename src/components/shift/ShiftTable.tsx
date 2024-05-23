import React from "react";

interface ShiftTableProps {}

const ShiftTable: React.FC<ShiftTableProps> = () => {
  const rowHeaders = [
    "Receptionist 1",
    "Receptionist 2",
    "Manager",
    "Operator",
    "Rengøring 1",
    "Rengøring 2",
  ];

  const columnHeaders = ["Medarbejder"];

  const cellNames = [
    "Reception1",
    "Reception2",
    "Manager",
    "Operator",
    "Cleaning1",
    "Cleaning2",
  ];

  return (
    <div className="overflow-x-auto">
      <table
        className="border-collapse border border-white text-white"
        style={{ width: "auto" }}
      >
        <thead>
          <tr>
            <th
              className="border border-white px-4 py-2 font-bold text-left"
              style={{ width: "200px" }}
            >
              Jobfunktion
            </th>
            {columnHeaders.map((header) => (
              <th
                key={header}
                className="border border-white px-4 py-2 font-bold text-left"
                style={{ width: "400px" }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowHeaders.map((rowHeader, rowIndex) => (
            <tr key={rowHeader}>
              <td
                className="border border-white px-4 py-2"
                style={{ width: "200px" }}
              >
                {rowHeader}
              </td>
              <td
                className="border border-white px-4 py-2"
                style={{ width: "400px" }}
                data-cell-name={cellNames[rowIndex]}
              ></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShiftTable;
