import React, { useEffect } from 'react';
import { cn } from '../utils';

interface ToastProps {
  message: string;
  visible: boolean;
  onHide: () => void;
  duration?: number;
  type?: 'success' | 'error' | 'info';
}

export const Toast: React.FC<ToastProps> = ({ message, visible, onHide, duration = 3000, type = 'success' }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onHide();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, onHide]);

  if (!visible) return null;

  return (
    <div className="animate-in slide-in-from-bottom-2 fade-in-0 fixed right-4 bottom-4 z-50 duration-300">
      <div
        className={cn('flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg backdrop-blur-sm', {
          'bg-green-500/90 text-white': type === 'success',
          'bg-red-500/90 text-white': type === 'error',
          'bg-blue-500/90 text-white': type === 'info',
        })}
      >
        <div className="flex-shrink-0">
          {type === 'success' && (
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
          {type === 'error' && (
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
          {type === 'info' && (
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </div>
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onHide}
          className="ml-2 flex-shrink-0 rounded-full p-1 hover:bg-white/20 focus:ring-2 focus:ring-white/50 focus:outline-none"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
