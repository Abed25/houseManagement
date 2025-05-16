"use client";

import DashboardWidget from '../../components/dashboard/DashboardWidget';
import styles from './page.module.css';

interface Widget {
  id: string;
  title: string;
  type: 'chart' | 'pie' | 'metric';
  data?: {
    labels: string[];
    datasets: {
      label?: string;
      data: number[];
      borderColor?: string;
      backgroundColor?: string | string[];
    }[];
  };
  value?: string;
  change?: string;
}

const widgets: Widget[] = [
  {
    id: 'monthly-revenue',
    title: 'Monthly Revenue',
    type: 'chart',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Revenue',
          data: [45000, 52000, 48000, 58000, 62000, 70000],
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
        },
      ],
    },
  },
  {
    id: 'revenue-sources',
    title: 'Revenue Sources',
    type: 'pie',
    data: {
      labels: ['Product Sales', 'Services', 'Subscriptions'],
      datasets: [
        {
          data: [45, 30, 25],
          backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'],
        },
      ],
    },
  },
  {
    id: 'total-revenue',
    title: 'Total Revenue',
    type: 'metric',
    value: '$285,000',
    change: '+15.3%',
  },
  {
    id: 'growth-rate',
    title: 'Growth Rate',
    type: 'metric',
    value: '12.5%',
    change: '+2.8%',
  },
  {
    id: 'quarterly-performance',
    title: 'Quarterly Performance',
    type: 'chart',
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Performance',
          data: [85, 92, 88, 95],
          borderColor: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
        },
      ],
    },
  },
  {
    id: 'customer-distribution',
    title: 'Customer Distribution',
    type: 'pie',
    data: {
      labels: ['New', 'Returning', 'Inactive'],
      datasets: [
        {
          data: [40, 45, 15],
          backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
        },
      ],
    },
  },
];

export default function Analytics() {
  return (
    <div className={`${styles.container} ${styles.mobileContent}`}>
      <div className={styles.grid}>
        {widgets.map((widget) => (
          <DashboardWidget
            key={widget.id}
            widget={widget}
          />
        ))}
      </div>
    </div>
  );
}
