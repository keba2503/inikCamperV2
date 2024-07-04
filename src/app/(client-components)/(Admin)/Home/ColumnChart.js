import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Reservas',
      data: [65, 59, 80, 81, 56, 55, 90],
      backgroundColor: 'rgba(75,192,192,1)',
    },
  ],
};

const ColumnChart = () => (
  <div id="column-chart">
    <Bar data={data} />
  </div>
);

export default ColumnChart;
