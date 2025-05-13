'use client';

import DashboardWidget from '../components/dashboard/DashboardWidget';
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
    id: 'sales',
    title: 'Sales Overview',
    type: 'chart',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Sales',
          data: [30, 40, 35, 50, 49, 60],
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
        },
      ],
    },
  },
  {
    id: 'revenue',
    title: 'Revenue Distribution',
    type: 'pie',
    data: {
      labels: ['Product A', 'Product B', 'Product C'],
      datasets: [
        {
          data: [300, 200, 100],
          backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'],
        },
      ],
    },
  },
  {
    id: 'users',
    title: 'Active Users',
    type: 'metric',
    value: '1,234',
    change: '+12.5%',
  },
  {
    id: 'conversion',
    title: 'Conversion Rate',
    type: 'metric',
    value: '3.2%',
    change: '+0.8%',
  },
  {
    id: 'revenue-growth',
    title: 'Revenue Growth',
    type: 'chart',
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Growth',
          data: [12, 19, 15, 25],
          borderColor: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
        },
      ],
    },
  },
  {
    id: 'customer-satisfaction',
    title: 'Customer Satisfaction',
    type: 'pie',
    data: {
      labels: ['Satisfied', 'Neutral', 'Dissatisfied'],
      datasets: [
        {
          data: [70, 20, 10],
          backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
        },
      ],
    },
  },
];

export default function Home() {
  return (
    <div className={styles.container}>
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
