import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

// Register all the chart elements we will be using
ChartJS.register(
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,
  PointElement, LineElement, ArcElement
);

const ChartComponent = ({ rows, type }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Cost Analysis by Item', font: { size: 18 } },
    },
  };

  const labels = rows.map(row => row.description || 'Untitled');
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Cost ($)',
        data: rows.map(row => row.cost),
        // Use different colors for the pie chart slices
        backgroundColor: type === 'pie'
          ? [
              'rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)', 'rgba(255, 159, 64, 0.5)',
            ]
          : 'rgba(59, 130, 246, 0.5)',
        borderColor: type === 'pie'
          ? [
              'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',
            ]
          : 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Conditionally render the correct chart component based on the 'type' prop
  switch (type) {
    case 'line':
      return <Line options={options} data={data} />;
    case 'pie':
      return <Pie options={options} data={data} />;
    case 'bar':
    default:
      return <Bar options={options} data={data} />;
  }
};

export default ChartComponent;