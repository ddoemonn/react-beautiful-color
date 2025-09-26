import React from 'react';
import { Toast } from './Toast';
import { useToast } from '../hooks/useToast';

export const ToastContainer: React.FC = () => {
  const { toasts, hideToast } = useToast();

  return (
    <div className="fixed right-4 bottom-4 z-50 space-y-2">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          visible={true}
          onHide={() => hideToast(toast.id)}
          duration={toast.duration}
          type={toast.type}
        />
      ))}
    </div>
  );
};
