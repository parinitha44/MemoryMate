// src/components/ui/Button.jsx

import React from 'react';

const Button = ({ children, primary = true, className = '', ...props }) => {
  const baseStyle = 'px-6 py-3 font-semibold rounded-lg transition duration-300 focus:outline-none focus:ring-4';
  
  // Large, accessible button text size
  const textSize = 'text-lg';

  const primaryStyle = 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300 shadow-lg';
  const secondaryStyle = 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400';

  return (
    <button
      className={`${baseStyle} ${textSize} ${primary ? primaryStyle : secondaryStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;