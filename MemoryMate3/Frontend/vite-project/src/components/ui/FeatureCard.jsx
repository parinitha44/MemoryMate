// src/components/ui/FeatureCard.jsx

import React from 'react';

// Added optional 'className' prop to allow styling from the parent (Features.jsx)
const FeatureCard = ({ icon: Icon, title, description, className = '' }) => { 
  return (
    <div className={`bg-white p-6 rounded-xl shadow-lg transition duration-300 border border-gray-100 flex flex-col items-start space-y-4 ${className}`}>
      <div className="p-3 bg-blue-100 rounded-full text-blue-600">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;