import React, { useCallback, useEffect, useRef } from 'react';

import { cn } from '../utils';
import { clamp } from '../utils/internal';
import { Pointer, PointerProps } from './Pointer';

export interface Interaction {
  left: number;
  top: number;
}

interface InteractiveProps {
  onMove: (interaction: Interaction) => void;
  onMoveEnd: () => void;
  onKey?: (offset: Interaction) => void;
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
  'aria-valuenow'?: number;
  'aria-valuemax'?: number;
  'aria-valuemin'?: number;
  'aria-valuetext'?: string;
  pointer: Pick<PointerProps, 'className' | 'top' | 'left'>;
}

// Simple and reliable position calculation based on react-colorful approach
const getRelativePosition = (element: HTMLElement, event: MouseEvent | TouchEvent): Interaction => {
  const rect = element.getBoundingClientRect();

  // Get pointer coordinates
  let clientX: number;
  let clientY: number;

  if ('touches' in event) {
    // Touch event
    const touch = event.touches[0] || event.changedTouches[0];
    clientX = touch.clientX;
    clientY = touch.clientY;
  } else {
    // Mouse event
    clientX = event.clientX;
    clientY = event.clientY;
  }

  // Calculate relative position
  const x = clientX - rect.left;
  const y = clientY - rect.top;

  // Convert to normalized coordinates (0-1)
  const left = clamp(x / rect.width, 0, 1);
  const top = clamp(y / rect.height, 0, 1);

  return { left, top };
};

export const Interactive: React.FC<InteractiveProps> = ({ onMove, onMoveEnd, onKey, children, className, pointer, ...ariaProps }) => {
  const container = useRef<HTMLDivElement>(null);
  const isPressed = useRef(false);

  const handleMove = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!isPressed.current || !container.current) return;

      event.preventDefault();
      onMove(getRelativePosition(container.current, event));
    },
    [onMove]
  );

  const handleMoveEnd = useCallback(() => {
    isPressed.current = false;

    onMoveEnd();
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', handleMoveEnd);
    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('touchend', handleMoveEnd);
  }, [handleMove, onMoveEnd]);

  const handleMoveStart = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      const element = container.current;
      if (!element) return;

      event.preventDefault();

      isPressed.current = true;

      // Update position immediately
      onMove(getRelativePosition(element, event.nativeEvent));

      // Add event listeners
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleMoveEnd);
      document.addEventListener('touchmove', handleMove, { passive: false });
      document.addEventListener('touchend', handleMoveEnd);
    },
    [onMove, handleMove, handleMoveEnd]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!onKey) return;

      const keyCode = event.which || event.keyCode;

      if (keyCode < 37 || keyCode > 40) return;

      event.preventDefault();

      onKey({
        left: keyCode === 39 ? 0.05 : keyCode === 37 ? -0.05 : 0,
        top: keyCode === 40 ? 0.05 : keyCode === 38 ? -0.05 : 0,
      });
    },
    [onKey]
  );

  // Clean up event listeners on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleMoveEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleMoveEnd);
    };
  }, [handleMove, handleMoveEnd]);

  return (
    <div
      ref={container}
      className={cn('rounded-inherit absolute inset-0 touch-none outline-none', 'focus:[&_.react-colorful-pointer]:scale-110', className)}
      onTouchStart={handleMoveStart}
      onMouseDown={handleMoveStart}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="slider"
      {...ariaProps}
    >
      {children}
    </div>
  );
};
