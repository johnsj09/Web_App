import React from 'react';

const ActionControls = ({ onGenerateAudit, onGeneratePdf }) => {
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={onGenerateAudit}
        className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
      >
        Produce Audit Summary
      </button>
      <button
        onClick={onGeneratePdf}
        className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
      >
        Generate PDF Report
      </button>
    </div>
  );
};

export default ActionControls;