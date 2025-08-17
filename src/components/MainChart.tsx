import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

const MainChart = ({ activeTab, data, selectedCustomer }) => {
  const chartOptions = {
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
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 11,
            family: 'Inter, sans-serif'
          },
          color: '#6B7280'
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
        radius: 4,
        hoverRadius: 6,
        borderWidth: 2
      },
      line: {
        tension: 0.4,
        borderWidth: 3
      }
    }
  };

  const renderChurnPrediction = () => {
    const churnData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Churn Probability (%)',
          data: [7.2, 6.8, 8.1, 7.5, 6.9, 7.0],
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          fill: true
        },
        {
          label: 'Retention Rate (%)',
          data: [92.8, 93.2, 91.9, 92.5, 93.1, 93.0],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true
        }
      ]
    };

    return (
      <div className="h-96">
        <Line options={chartOptions} data={churnData} />
      </div>
    );
  };

  const renderSalesAnalysis = () => {
    const salesData = {
      labels: data.salesData.monthly.map(item => item.month),
      datasets: [
        {
          label: 'Sales Revenue ($)',
          data: data.salesData.monthly.map(item => item.sales),
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: '#3b82f6',
          borderWidth: 1
        }
      ]
    };

    return (
      <div className="h-96">
        <Bar options={chartOptions} data={salesData} />
      </div>
    );
  };

  const renderCustomerInsights = () => {
    const segmentData = {
      labels: data.customerSegments.map(segment => segment.segment),
      datasets: [
        {
          data: data.customerSegments.map(segment => segment.count),
          backgroundColor: data.customerSegments.map(segment => segment.color),
          borderWidth: 2,
          borderColor: '#ffffff'
        }
      ]
    };

    const doughnutOptions = {
      ...chartOptions,
      plugins: {
        ...chartOptions.plugins,
        legend: {
          position: 'right'
        }
      },
      cutout: '60%'
    };

    return (
      <div className="h-96">
        <Doughnut options={doughnutOptions} data={segmentData} />
      </div>
    );
  };

  const renderModelPerformance = () => {
    const modelData = {
      labels: data.modelPerformance.map(model => model.model),
      datasets: [
        {
          label: 'Accuracy',
          data: data.modelPerformance.map(model => model.accuracy),
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: '#3b82f6',
          borderWidth: 1
        },
        {
          label: 'Precision',
          data: data.modelPerformance.map(model => model.precision),
          backgroundColor: 'rgba(16, 185, 129, 0.8)',
          borderColor: '#10b981',
          borderWidth: 1
        }
      ]
    };

    return (
      <div className="h-96">
        <Bar options={chartOptions} data={modelData} />
      </div>
    );
  };

  const renderOverview = () => {
    const overviewData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Revenue ($M)',
          data: [1.2, 1.5, 1.8, 2.1],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          yAxisID: 'y'
        },
        {
          label: 'Churn Rate (%)',
          data: [8.5, 7.2, 6.8, 5.9],
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          fill: true,
          yAxisID: 'y1'
        }
      ]
    };

    const dualAxisOptions = {
      ...chartOptions,
      scales: {
        ...chartOptions.scales,
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: {
            drawOnChartArea: false,
          },
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        }
      }
    };

    return (
      <div className="h-96">
        <Line options={dualAxisOptions} data={overviewData} />
      </div>
    );
  };

  const getChartTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Revenue vs Churn Rate Trends';
      case 'churn': return 'Churn Prediction Analysis';
      case 'sales': return 'Monthly Sales Performance';
      case 'customers': return 'Customer Segmentation';
      case 'models': return 'ML Model Performance Comparison';
      default: return 'Analytics Dashboard';
    }
  };

  const renderChart = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'churn': return renderChurnPrediction();
      case 'sales': return renderSalesAnalysis();
      case 'customers': return renderCustomerInsights();
      case 'models': return renderModelPerformance();
      default: return renderOverview();
    }
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h2 className="chart-title">{getChartTitle()}</h2>
        <p className="chart-subtitle">
          {selectedCustomer 
            ? `Analyzing data for ${selectedCustomer.name}` 
            : 'Real-time analytics and predictions'
          }
        </p>
      </div>
      
      <div className="chart-content">
        {renderChart()}
      </div>

      {/* Chart Controls */}
      <div className="chart-controls">
        <div className="control-buttons">
          <button className="btn btn-secondary">Export</button>
          <button className="btn btn-secondary">Share</button>
        </div>
        <div className="last-updated">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default MainChart;