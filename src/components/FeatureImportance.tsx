import React from 'react';

const FeatureImportance = ({ features }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-5 hover:from-blue-50 hover:to-purple-50 transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <h5 className="font-semibold text-gray-800">{feature.feature}</h5>
              <span className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                {(feature.importance * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-700 shadow-sm"
                style={{ width: `${feature.importance * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 font-medium">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureImportance;