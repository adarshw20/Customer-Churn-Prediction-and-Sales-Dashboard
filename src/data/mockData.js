// Mock data for Customer Churn Prediction Dashboard

export const customerData = [
  { id: 1, name: 'John Smith', age: 35, tenure: 24, monthlyCharges: 85.50, totalCharges: 2052, churnProbability: 0.15, segment: 'Low Risk', lastActivity: '2024-01-10' },
  { id: 2, name: 'Sarah Johnson', age: 42, tenure: 8, monthlyCharges: 120.75, totalCharges: 966, churnProbability: 0.78, segment: 'High Risk', lastActivity: '2023-12-15' },
  { id: 3, name: 'Mike Chen', age: 28, tenure: 36, monthlyCharges: 95.25, totalCharges: 3429, churnProbability: 0.25, segment: 'Medium Risk', lastActivity: '2024-01-08' },
  { id: 4, name: 'Emily Davis', age: 31, tenure: 12, monthlyCharges: 65.00, totalCharges: 780, churnProbability: 0.45, segment: 'Medium Risk', lastActivity: '2024-01-05' },
  { id: 5, name: 'Alex Wilson', age: 45, tenure: 48, monthlyCharges: 110.50, totalCharges: 5304, churnProbability: 0.12, segment: 'Low Risk', lastActivity: '2024-01-12' }
];

export const salesData = {
  monthly: [
    { month: 'Jan 2024', sales: 125000, transactions: 1250 },
    { month: 'Feb 2024', sales: 135000, transactions: 1350 },
    { month: 'Mar 2024', sales: 142000, transactions: 1420 },
    { month: 'Apr 2024', sales: 138000, transactions: 1380 },
    { month: 'May 2024', sales: 155000, transactions: 1550 },
    { month: 'Jun 2024', sales: 168000, transactions: 1680 },
    { month: 'Jul 2024', sales: 175000, transactions: 1750 },
    { month: 'Aug 2024', sales: 162000, transactions: 1620 },
    { month: 'Sep 2024', sales: 185000, transactions: 1850 },
    { month: 'Oct 2024', sales: 195000, transactions: 1950 },
    { month: 'Nov 2024', sales: 202000, transactions: 2020 },
    { month: 'Dec 2024', sales: 220000, transactions: 2200 }
  ],
  quarterly: [
    { quarter: 'Q1 2024', sales: 402000, churnRate: 8.5 },
    { quarter: 'Q2 2024', sales: 461000, churnRate: 7.2 },
    { quarter: 'Q3 2024', sales: 522000, churnRate: 6.8 },
    { quarter: 'Q4 2024', sales: 617000, churnRate: 5.9 }
  ]
};

export const churnMetrics = {
  totalCustomers: 12500,
  churnedCustomers: 875,
  churnRate: 7.0,
  retentionRate: 93.0,
  averageLifetime: 32.5,
  revenueAtRisk: 285000
};

export const modelPerformance = [
  { model: 'Logistic Regression', accuracy: 0.82, precision: 0.78, recall: 0.85, f1Score: 0.81 },
  { model: 'Random Forest', accuracy: 0.89, precision: 0.87, recall: 0.91, f1Score: 0.89 },
  { model: 'Gradient Boosting', accuracy: 0.91, precision: 0.89, recall: 0.93, f1Score: 0.91 },
  { model: 'Neural Network', accuracy: 0.87, precision: 0.84, recall: 0.89, f1Score: 0.86 }
];

export const customerSegments = [
  { segment: 'High Value', count: 2100, avgRevenue: 1850, churnRate: 4.2, color: '#10B981' },
  { segment: 'Medium Value', count: 5200, avgRevenue: 950, churnRate: 6.8, color: '#3B82F6' },
  { segment: 'Low Value', count: 3800, avgRevenue: 380, churnRate: 12.5, color: '#F59E0B' },
  { segment: 'At Risk', count: 1400, avgRevenue: 720, churnRate: 35.2, color: '#EF4444' }
];

export const featureImportance = [
  { feature: 'Tenure', importance: 0.35, description: 'Customer subscription length' },
  { feature: 'Monthly Charges', importance: 0.28, description: 'Average monthly billing amount' },
  { feature: 'Total Charges', importance: 0.22, description: 'Lifetime customer value' },
  { feature: 'Support Tickets', importance: 0.18, description: 'Number of support interactions' },
  { feature: 'Last Activity', importance: 0.15, description: 'Days since last engagement' },
  { feature: 'Payment Method', importance: 0.12, description: 'Preferred payment type' },
  { feature: 'Contract Type', importance: 0.10, description: 'Subscription plan type' }
];