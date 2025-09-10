import React from 'react';

const TableRow = ({ row, onUpdateRow }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onUpdateRow(row.id, {
      [name]: name === 'cost' ? parseFloat(value) || 0 : value,
    });
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="p-2 whitespace-nowrap">
        <input
          type="text"
          name="description"
          value={row.description}
          onChange={handleInputChange}
          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter description..."
        />
      </td>
      <td className="p-2 whitespace-nowrap">
        <input
          type="number"
          name="cost"
          value={row.cost}
          onChange={handleInputChange}
          className="w-40 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="0.00"
          step="0.01"
        />
      </td>
      <td className="p-2 whitespace-nowrap">
        {/* Placeholder for the file upload button */}
        <button className="text-sm text-gray-500">Upload File</button>
      </td>
    </tr>
  );
};

export default TableRow;