import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Pc', 'Tablet', 'Mobile'],
  datasets: [
    {
      data: [55, 30, 15],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  ],
};

const DonutChart = () => (
  <div className="py-6" id="donut-chart">
    <Doughnut data={data} />
  </div>
);

export default DonutChart;
