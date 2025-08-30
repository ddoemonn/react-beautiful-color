import React from 'react';
import { cn } from '../utils';

export interface PointerProps {
  className?: string;
  top?: number;
  left: number;
  onTouchStart: (event: React.TouchEvent) => void;
  onMouseDown: (event: React.MouseEvent) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
}

export const Pointer: React.FC<PointerProps> = ({ className, top = 0.5, left, onTouchStart, onMouseDown, onKeyDown }) => {
  return (
    <div
      className={cn(
        'absolute z-[1] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-white',
        'react-colorful-pointer shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-transform',
        className
      )}
      style={{
        top: `${top * 100}%`,
        left: `${left * 100}%`,
      }}
      onTouchStart={onTouchStart}
      onMouseDown={onMouseDown}
      onKeyDown={onKeyDown}
    />
  );
};
