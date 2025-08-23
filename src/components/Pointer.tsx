import React from "react";
import { cn } from "../utils";

interface PointerProps {
  className?: string;
  top?: number;
  left: number;
  color: string;
}

export const Pointer: React.FC<PointerProps> = ({
  className,
  top = 0.5,
  left,
  color
}) => {
  return (
    <div
      className={cn(
        "absolute z-[1] w-6 h-6 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-white rounded-full pointer-events-none",
        "shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-transform react-colorful-pointer",
        className
      )}
      style={{
        top: `${top * 100}%`,
        left: `${left * 100}%`,
      }}
    />
  );
};
