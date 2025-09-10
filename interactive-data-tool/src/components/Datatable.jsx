import React from 'react';
import TableRow from './TableRow';

const DataTable = ({ rows, onAddNewRow, onUpdateRow, onProcessFile }) => {
  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={onAddNewRow}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Add New Line
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600 uppercase tracking-wider w-1/2">Description</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Cost</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">File Upload</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map(row => (
              <TableRow
                key={row.id}
                row={row}
                onUpdateRow={onUpdateRow}
                onProcessFile={onProcessFile}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;