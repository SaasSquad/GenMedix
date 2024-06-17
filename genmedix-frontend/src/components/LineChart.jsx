import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LineChart = ({ dataPoints = [], title }) => {
  const data = {
    labels: dataPoints.map((_, index) => `Point ${index + 1}`), // Generate labels based on the index
    datasets: [
      {
        label: title,
        data: dataPoints,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return <Line data={data} />;
};

export default LineChart;
