import React from 'react';

const ChartControls = ({ currentType, onTypeChange }) => {
  const chartTypes = ['bar', 'line', 'pie'];

  const getButtonStyle = (type) => {
    return currentType === type
      ? 'bg-blue-600 text-white'
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300';
  };

  return (
    <div className="flex space-x-2 mb-4">
      {chartTypes.map(type => (
        <button
          key={type}
          onClick={() => onTypeChange(type)}
          className={`px-3 py-1 text-sm font-semibold rounded-md capitalize transition-colors ${getButtonStyle(type)}`}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default ChartControls;