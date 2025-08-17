import React, { useState } from 'react';
import LeftPanel from './components/LeftPanel';
import MainChart from './components/MainChart';
import { 
  customerData, 
  salesData, 
  churnMetrics, 
  modelPerformance, 
  customerSegments, 
  featureImportance 
} from './data/mockData';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [filters, setFilters] = useState({
    dateRange: '30d',
    riskLevel: 'all',
    segment: 'all'
  });

  const dashboardData = {
    customerData,
    salesData,
    churnMetrics,
    modelPerformance,
    customerSegments,
    featureImportance
  };

  return (
    <div className="dashboard-container">
      <LeftPanel
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
        customers={customerData}
        filters={filters}
        setFilters={setFilters}
      />
      
      <div className="main-content">
        <MainChart
          activeTab={activeTab}
          data={dashboardData}
          selectedCustomer={selectedCustomer}
        />
        
        {/* Additional Info Panel */}
        <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-content">
                <div className="metric-header">
                  <div className="metric-info">
                    <h3>Total Customers</h3>
                    <div className="metric-value">{churnMetrics.totalCustomers.toLocaleString()}</div>
                    <div className="metric-change">+5.2% from last month</div>
                  </div>
                  <div className="metric-icon">
                    <Users size={24} />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-content">
                <div className="metric-header">
                  <div className="metric-info">
                    <h3>Churn Rate</h3>
                    <div className="metric-value">{churnMetrics.churnRate}%</div>
                    <div className="metric-change">-1.2% from last month</div>
                  </div>
                  <div className="metric-icon">
                    <TrendingDown size={24} />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-content">
                <div className="metric-header">
                  <div className="metric-info">
                    <h3>Revenue at Risk</h3>
                    <div className="metric-value">${(churnMetrics.revenueAtRisk / 1000).toFixed(0)}K</div>
                    <div className="metric-change">-$15K from last month</div>
                  </div>
                  <div className="metric-icon">
                    <DollarSign size={24} />
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

// Import icons for metric cards
import { Users, TrendingDown, DollarSign } from 'lucide-react';

export default App;