import React, { useState, useEffect } from 'react';
import Papa, { ParseResult } from 'papaparse';

interface CSVRow {
  [key: string]: string; // Flexible key-value pairs for CSV rows
}

const CsvViewer: React.FC = () => {
  const [data, setData] = useState<CSVRow[]>([]); // State for parsed CSV data

  useEffect(() => {
    // Load the CSV file
    Papa.parse<CSVRow>('../../../public/student_lifestyle_dataset.csv', {
      download: true,
      header: true, // Treat the first row as headers
      skipEmptyLines: true,
      complete: (results: ParseResult<CSVRow>) => {
        setData(results.data); // Save parsed data to state
      },
    });
  }, []);

  return (
    <div>
      <h1>CSV Data</h1>
      <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((header, index) => <th key={index}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 10).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((value, colIndex) => (
                <td key={colIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CsvViewer;
