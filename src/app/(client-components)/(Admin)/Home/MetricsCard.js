import React from 'react';

const metrics = [
  {
    id: 1,
    title: 'Total Sales',
    value: '$50,000',
    description: '10% increase from last month',
  },
  {
    id: 2,
    title: 'New Users',
    value: '1,200',
    description: '5% decrease from last month',
  },
  {
    id: 3,
    title: 'Bounce Rate',
    value: '30%',
    description: '2% increase from last month',
  },
  {
    id: 4,
    title: 'Active Users',
    value: '3,500',
    description: '15% increase from last month',
  },
];

const MetricsCard = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800"
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {metric.title}
          </h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {metric.value}
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {metric.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MetricsCard;
