import React from 'react';

const MetricCard = ({ title, value, change, changeType, icon: Icon, color = 'blue' }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 text-white',
    green: 'from-green-500 to-green-600 text-white',
    orange: 'from-orange-500 to-orange-600 text-white',
    red: 'from-red-500 to-red-600 text-white',
    purple: 'from-purple-500 to-purple-600 text-white'
  };

  const changeColor = changeType === 'positive' ? 'text-green-300' : 'text-red-300';

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-2xl p-6 hover-lift slide-up shadow-xl`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white/80 mb-2">{title}</p>
          <p className="text-3xl font-bold mb-1">{value}</p>
          {change && (
            <p className={`text-sm font-semibold ${changeColor}`}>
              {changeType === 'positive' ? '↗' : '↘'} {change}
            </p>
          )}
        </div>
        {Icon && (
          <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
            <Icon className="w-8 h-8 text-white" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;