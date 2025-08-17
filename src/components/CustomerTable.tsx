import React, { useState } from 'react';
import { Search, Filter, TrendingUp, TrendingDown } from 'lucide-react';

const CustomerTable = ({ customers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('churnProbability');
  const [sortOrder, setSortOrder] = useState('desc');

  const filteredCustomers = customers
    .filter(customer => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.segment.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

  const getRiskColor = (probability) => {
    if (probability < 0.3) return 'text-green-600 bg-green-50';
    if (probability < 0.6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="churnProbability">Churn Risk</option>
            <option value="tenure">Tenure</option>
            <option value="monthlyCharges">Monthly Charges</option>
            <option value="totalCharges">Total Charges</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full glass-card rounded-2xl overflow-hidden">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Customer
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                onClick={() => handleSort('churnProbability')}
              >
                <div className="flex items-center space-x-1">
                  <span>Churn Risk</span>
                  {sortBy === 'churnProbability' && (
                    sortOrder === 'asc' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                onClick={() => handleSort('tenure')}
              >
                <div className="flex items-center space-x-1">
                  <span>Tenure</span>
                  {sortBy === 'tenure' && (
                    sortOrder === 'asc' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                onClick={() => handleSort('monthlyCharges')}
              >
                <div className="flex items-center space-x-1">
                  <span>Monthly Charges</span>
                  {sortBy === 'monthlyCharges' && (
                    sortOrder === 'asc' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />
                  )}
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Segment
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Last Activity
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-blue-50/50 transition-all duration-300">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{customer.name}</div>
                    <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full inline-block mt-1">Age: {customer.age}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`inline-flex px-3 py-2 text-xs font-bold rounded-full shadow-sm ${getRiskColor(customer.churnProbability)}`}>
                    {(customer.churnProbability * 100).toFixed(1)}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {customer.tenure} months
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  ${customer.monthlyCharges.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-2 text-xs font-bold rounded-full shadow-sm ${
                    customer.segment === 'Low Risk' ? 'text-green-800 bg-green-100' :
                    customer.segment === 'Medium Risk' ? 'text-yellow-800 bg-yellow-100' :
                    'text-red-800 bg-red-100'
                  }`}>
                    {customer.segment}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                  {new Date(customer.lastActivity).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;