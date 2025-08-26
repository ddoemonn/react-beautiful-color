import React, { useRef, useCallback, useEffect } from 'react';
import { cn } from '../utils';

export interface Interaction {
  left: number;
  top: number;
}

interface InteractiveProps {
  onMove: (interaction: Interaction) => void;
  onKey?: (offset: Interaction) => void;
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
  'aria-valuenow'?: number;
  'aria-valuemax'?: number;
  'aria-valuemin'?: number;
  'aria-valuetext'?: string;
}

const isTouch = (event: MouseEvent | TouchEvent): event is TouchEvent => 'touches' in event;

const getTouchPoint = (touches: TouchList, touchId: null | number): Touch => {
  for (let i = 0; i < touches.length; i++) {
    if (touches[i].identifier === touchId) return touches[i];
  }
  return touches[0];
};

const getParentWindow = (node?: HTMLDivElement | null): Window => {
  return (node && node.ownerDocument.defaultView) || self;
};

const clamp = (num: number, min = 0, max = 1): number => Math.min(Math.max(num, min), max);

const getRelativePosition = (node: HTMLDivElement, event: MouseEvent | TouchEvent, touchId: null | number): Interaction => {
  const rect = node.getBoundingClientRect();
  const pointer = isTouch(event) ? getTouchPoint(event.touches, touchId) : (event as MouseEvent);

  return {
    left: clamp((pointer.pageX - (rect.left + getParentWindow(node).pageXOffset)) / rect.width),
    top: clamp((pointer.pageY - (rect.top + getParentWindow(node).pageYOffset)) / rect.height),
  };
};

const preventDefaultMove = (event: MouseEvent | TouchEvent): void => {
  !isTouch(event) && event.preventDefault();
};

const isInvalid = (event: MouseEvent | TouchEvent, hasTouch: boolean): boolean => {
  return hasTouch && !isTouch(event);
};

export const Interactive: React.FC<InteractiveProps> = ({ onMove, onKey, children, className, ...ariaProps }) => {
  const container = useRef<HTMLDivElement>(null);
  const touchId = useRef<null | number>(null);
  const hasTouch = useRef(false);

  const handleMove = useCallback(
    (event: MouseEvent | TouchEvent) => {
      preventDefaultMove(event);

      const isDown = isTouch(event) ? event.touches.length > 0 : event.buttons > 0;

      if (isDown && container.current) {
        onMove(getRelativePosition(container.current, event, touchId.current));
      } else {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleMoveEnd);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleMoveEnd);
      }
    },
    [onMove]
  );

  const handleMoveEnd = useCallback(() => {
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', handleMoveEnd);
    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('touchend', handleMoveEnd);
  }, [handleMove]);

  const handleMoveStart = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      const el = container.current;
      if (!el) return;

      preventDefaultMove(event.nativeEvent);

      if (isInvalid(event.nativeEvent, hasTouch.current)) return;

      if (isTouch(event.nativeEvent)) {
        hasTouch.current = true;
        const changedTouches = event.nativeEvent.changedTouches || [];
        if (changedTouches.length) touchId.current = changedTouches[0].identifier;
      }

      el.focus();
      onMove(getRelativePosition(el, event.nativeEvent, touchId.current));

      const touch = hasTouch.current;
      document.addEventListener(touch ? 'touchmove' : 'mousemove', handleMove);
      document.addEventListener(touch ? 'touchend' : 'mouseup', handleMoveEnd);
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
