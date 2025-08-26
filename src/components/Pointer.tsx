import React from 'react';
import { cn } from '../utils';

interface PointerProps {
  className?: string;
  top?: number;
  left: number;
  color: string;
}

export const Pointer: React.FC<PointerProps> = ({ className, top = 0.5, left, color }) => {
  return (
    <div
      className={cn(
        'pointer-events-none absolute z-[1] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-white',
        'react-colorful-pointer shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-transform',
        className
      )}
      style={{
        top: `${top * 100}%`,
        left: `${left * 100}%`,
      }}
    />
  );
};
