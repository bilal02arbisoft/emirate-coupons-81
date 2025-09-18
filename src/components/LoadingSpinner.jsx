import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 'default', className = '' }) => {
  const sizeClass = {
    small: 'w-4 h-4',
    default: 'w-8 h-8',
    large: 'w-12 h-12'
  }[size];

  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <Loader2 className={`animate-spin text-primary ${sizeClass}`} />
    </div>
  );
};

export default LoadingSpinner;