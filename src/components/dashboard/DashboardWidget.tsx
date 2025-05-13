'use client';

import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartData,
} from 'chart.js';
import styles from './DashboardWidget.module.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface WidgetProps {
  widget: {
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
  };
}

export default function DashboardWidget({ widget }: WidgetProps) {
  const renderWidgetContent = () => {
    if (!widget.data) return null;

    switch (widget.type) {
      case 'chart':
        return (
          <Line
            data={widget.data as ChartData<'line', number[], string>}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.1)',
                  },
                },
                x: {
                  grid: {
                    display: false,
                  },
                },
              },
            }}
          />
        );
      case 'pie':
        return (
          <Pie
            data={widget.data as ChartData<'pie', number[], string>}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom',
                },
              },
            }}
          />
        );
      case 'metric':
        return (
          <div className={styles.metricContent}>
            <div className={styles.metricValue}>{widget.value}</div>
            {widget.change && (
              <div className={styles.metricChange}>
                {widget.change}
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.widget}>
      <div className={styles.widgetHeader}>
        <h3 className={styles.widgetTitle}>{widget.title}</h3>
      </div>
      <div className={styles.widgetContent}>
        {renderWidgetContent()}
      </div>
    </div>
  );
} 