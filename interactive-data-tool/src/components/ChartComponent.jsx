import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// We must register the components we wish to use with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = ({ rows }) => {
  // Chart.js requires specific objects for its configuration and data.
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Cost Analysis by Item',
        font: {
          size: 18,
        },
      },
    },
  };

  const data = {
    // The labels are the item descriptions on the x-axis.
    labels: rows.map(row => row.description || 'Untitled'),
    datasets: [
      {
        label: 'Cost ($)',
        // The data is the array of costs on the y-axis.
        data: rows.map(row => row.cost),
        backgroundColor: 'rgba(59, 130, 246, 0.5)', // A nice blue color
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default ChartComponent;