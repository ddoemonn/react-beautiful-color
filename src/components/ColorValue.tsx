import React, { useCallback } from 'react';
import { cn } from '../utils';

interface ColorValueProps {
  value: string;
  label?: string;
  className?: string;
  onCopy?: (value: string, label?: string) => void;
}

export const ColorValue: React.FC<ColorValueProps> = ({ value, label, className, onCopy }) => {
  const handleClick = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      onCopy?.(value, label);
    } catch (error) {
      console.warn('Failed to copy color value:', error);
    }
  }, [value, label, onCopy]);

  return (
    <button
      onClick={handleClick}
      className={cn(
        'group flex items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-2 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-400',
        className
      )}
      title={`Click to copy ${label || value}`}
    >
      <div className="flex flex-col items-start">
        {label && <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</span>}
        <span className="font-mono text-gray-900 dark:text-gray-100">{value}</span>
      </div>
      <div className="ml-2 opacity-0 transition-opacity group-hover:opacity-100">
        <svg
          className="h-4 w-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </div>
    </button>
  );
};
