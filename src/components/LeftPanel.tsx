import React from 'react';
import { 
  BarChart3, 
  Users, 
  TrendingDown, 
  DollarSign,
  Brain,
  Settings,
  Filter,
  Calendar
} from 'lucide-react';

const LeftPanel = ({ 
  activeTab, 
  setActiveTab, 
  selectedCustomer, 
  setSelectedCustomer, 
  customers,
  filters,
  setFilters 
}) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'churn', label: 'Churn Prediction', icon: TrendingDown },
    { id: 'sales', label: 'Sales Analysis', icon: DollarSign },
    { id: 'customers', label: 'Customer Insights', icon: Users },
    { id: 'models', label: 'ML Models', icon: Brain }
  ];

  return (
    <div className="left-panel">
      {/* Header */}
      <div className="panel-header">
        <div className="header-content">
          <div className="header-icon">
            <BarChart3 size={24} />
          </div>
          <div className="header-text">
            <h1>Analytics</h1>
            <p>Customer Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="navigation">
        <nav className="nav-list">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`nav-item ${
                  activeTab === tab.id
                    ? 'active'
                    : ''
                }`}
              >
                <Icon className="nav-icon" size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="filters-header">
          <Filter size={16} />
          <h3>Filters</h3>
        </div>
        
        <div>
          {/* Date Range */}
          <div className="filter-group">
            <label className="filter-label">
              Date Range
            </label>
            <select 
              className="filter-select"
              value={filters.dateRange}
              onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
            >
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
              <option value="all">All time</option>
            </select>
          </div>

          {/* Risk Level */}
          <div className="filter-group">
            <label className="filter-label">
              Risk Level
            </label>
            <select 
              className="filter-select"
              value={filters.riskLevel}
              onChange={(e) => setFilters({...filters, riskLevel: e.target.value})}
            >
              <option value="all">All Levels</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="low">Low Risk</option>
            </select>
          </div>

          {/* Customer Segment */}
          <div className="filter-group">
            <label className="filter-label">
              Segment
            </label>
            <select 
              className="filter-select"
              value={filters.segment}
              onChange={(e) => setFilters({...filters, segment: e.target.value})}
            >
              <option value="all">All Segments</option>
              <option value="high-value">High Value</option>
              <option value="medium-value">Medium Value</option>
              <option value="low-value">Low Value</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer List */}
      <div className="customer-list">
        <h3>Recent Customers</h3>
        <div className="customer-items">
          {customers.slice(0, 8).map((customer) => (
            <button
              key={customer.id}
              onClick={() => setSelectedCustomer(customer)}
              className={`customer-item ${
                selectedCustomer?.id === customer.id
                  ? 'selected'
                  : ''
              }`}
            >
              <div className="customer-header">
                <div>
                  <p className="customer-name">{customer.name}</p>
                  <p className="customer-tenure">Tenure: {customer.tenure}m</p>
                </div>
                <div className={`risk-badge ${
                  customer.churnProbability > 0.6 
                    ? 'risk-high'
                    : customer.churnProbability > 0.3
                    ? 'risk-medium'
                    : 'risk-low'
                }`}>
                  {(customer.churnProbability * 100).toFixed(0)}%
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="settings-section">
        <button className="settings-button">
          <Settings size={20} />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default LeftPanel;