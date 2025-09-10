import React, { useRef } from 'react';

const TableRow = ({ row, onUpdateRow, onProcessFile }) => {
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onUpdateRow(row.id, {
      [name]: name === 'cost' ? parseFloat(value) || 0 : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onProcessFile(row.id, file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
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
        {row.isProcessing ? (
          <span className="text-sm text-gray-500 italic">Processing...</span>
        ) : row.uploadedFile ? (
          <span className="text-sm text-green-600">{row.uploadedFile}</span>
        ) : (
          <>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.png,.jpg,.jpeg"
            />
            <button
              onClick={handleUploadClick}
              className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Upload File
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default TableRow;