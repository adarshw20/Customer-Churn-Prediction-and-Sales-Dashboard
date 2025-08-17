import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ModelComparison = ({ models }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15,
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
        padding: 12
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
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
            return (value * 100).toFixed(0) + '%';
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
      bar: {
        borderRadius: 4,
        borderSkipped: false
      }
    }
  };

  const data = {
    labels: models.map(model => model.model),
    datasets: [
      {
        label: 'Accuracy',
        data: models.map(model => model.accuracy),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: '#3B82F6',
        borderWidth: 1
      },
      {
        label: 'Precision',
        data: models.map(model => model.precision),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: '#10B981',
        borderWidth: 1
      },
      {
        label: 'Recall',
        data: models.map(model => model.recall),
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
        borderColor: '#8B5CF6',
        borderWidth: 1
      },
      {
        label: 'F1-Score',
        data: models.map(model => model.f1Score),
        backgroundColor: 'rgba(245, 158, 11, 0.8)',
        borderColor: '#F59E0B',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="h-96">
      <Bar options={options} data={data} />
    </div>
  );
};

export default ModelComparison;