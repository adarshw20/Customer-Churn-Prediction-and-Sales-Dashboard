import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

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

export const ChurnTrendChart = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            family: 'Inter, sans-serif'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(139, 92, 246, 0.5)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 11,
            family: 'Inter, sans-serif'
          },
          color: '#6B7280',
          callback: function(value) {
            return value + '%';
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11,
            family: 'Inter, sans-serif'
          },
          color: '#6B7280'
        }
      }
    },
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        borderWidth: 2
      },
      line: {
        tension: 0.4,
        borderWidth: 3
      }
    }
  };

  const chartData = {
    labels: data.map(item => item.quarter),
    datasets: [
      {
        label: 'Churn Rate (%)',
        data: data.map(item => item.churnRate),
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        fill: true
      }
    ]
  };

  return (
    <div className="h-80">
      <Line options={options} data={chartData} />
    </div>
  );
};

export const ChurnDistributionChart = ({ segments }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            family: 'Inter, sans-serif'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.raw / total) * 100).toFixed(1);
            return `${context.label}: ${percentage}%`;
          }
        }
      }
    },
    cutout: '60%'
  };

  const chartData = {
    labels: segments.map(segment => segment.segment),
    datasets: [
      {
        data: segments.map(segment => segment.count),
        backgroundColor: segments.map(segment => segment.color),
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverBorderWidth: 3
      }
    ]
  };

  return (
    <div className="h-80">
      <Doughnut options={options} data={chartData} />
    </div>
  );
};