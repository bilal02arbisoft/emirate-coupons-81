import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ error, onRetry, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <AlertCircle className="w-12 h-12 text-destructive mb-4" />
      <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
      <p className="text-muted-foreground mb-4 max-w-md">
        {error?.message || 'Failed to load data. Please try again.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;