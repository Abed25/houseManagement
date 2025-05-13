'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import styles from './ChartPanel.module.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function ChartPanel() {
  const data = {
    labels: ['Sales', 'Revenue', 'Users'],
    datasets: [
      {
        label: 'Statistics',
        data: [120, 200, 150],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Bar Chart',
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Pie Chart',
      },
    },
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Performance Overview</h2>
      <div className={styles.chartWrapper}>
        <div className={styles.chartContainer}>
          <Bar data={data} options={barOptions} />
        </div>
        <div className={styles.chartContainer}>
          <Pie data={data} options={pieOptions} />
        </div>
      </div>
    </div>
  );
} 