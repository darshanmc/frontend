import React, { useState } from "react";

// A function to parse the uploaded CSV file
const parseCSV = (file, onParseComplete) => {
  const reader = new FileReader();
  reader.onload = function (e) {
    const text = e.target.result;
    const rows = text.split("\n").map((row) => row.split(","));
    onParseComplete(rows[0]);
  };
  reader.readAsText(file);
};

const UserInput = ({ host }) => {
  // Dropdown options
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

  // State for selected dropdown option and CSV data
  const [selectedOption, setSelectedOption] = useState("");
  const [csvData, setCsvData] = useState([]);
  const [displayData, setDisplayData] = useState([]);

  // Event handler for dropdown change
  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
    const data = [];
    data.push(event.target.value);
    setCsvData(data);
  };

  // Event handler for file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      parseCSV(file, (data) => {
        setCsvData(data);
      });
    }
  };

  const apiCall = () => {
    fetch(`${host}/echo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(csvData),
    })
      .then((response) => response.json())
      .then((data) => {
        setDisplayData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="p-6">
      {/* Dropdown List */}
      <div className="mb-4">
        <label
          htmlFor="dropdown"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Select an Option
        </label>
        <select
          id="dropdown"
          value={selectedOption}
          onChange={handleDropdownChange}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">-- Select an Option --</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* File Upload for CSV */}
      <div className="mb-4">
        <label
          htmlFor="fileUpload"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Upload CSV File
        </label>
        <input
          id="fileUpload"
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
        />
      </div>

      {/* Button to call backend API */}
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-2"
        onClick={apiCall}
      >
        Call API
      </button>

      {/* Display CSV Data (optional) */}
      {displayData.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Response Data
          </h3>
          <table className="min-w-full table-auto bg-white border border-gray-200">
            <thead>
              <tr>
                {displayData.map((header, index) => (
                  <th key={index} className="px-4 py-2 border border-gray-300">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserInput;
