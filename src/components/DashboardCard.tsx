import React from 'react';

const DashboardCard = ({ title, children, className = '' }) => {
  return (
    <div className={`glass-card rounded-2xl p-8 hover-lift fade-in ${className}`}>
      {title && (
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default DashboardCard;