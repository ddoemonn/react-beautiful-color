import React, { useCallback } from "react";
import { Interactive, Interaction } from "./Interactive";
import { Pointer } from "./Pointer";
import { cn } from "../utils";

interface HsvaColor {
  h: number;
  s: number;
  v: number;
  a: number;
}

interface AlphaProps {
  hsva: HsvaColor;
  onChange: (newAlpha: { a: number }) => void;
  className?: string;
}

const clamp = (num: number, min = 0, max = 1): number =>
  Math.min(Math.max(num, min), max);

const round = (num: number): number => Math.round(num);

const hsvaToHslaString = (hsva: HsvaColor): string => {
  const { h, s, v, a } = hsva;
  const l = v * (2 - s / 100) / 2;
  const sL = l !== 0 && l !== 100 
    ? (v - l) / Math.min(l, 100 - l) * 100 
    : 0;
  
  return `hsla(${round(h)}, ${round(sL)}%, ${round(l)}%, ${a})`;
};

export const Alpha: React.FC<AlphaProps> = ({
  hsva,
  onChange,
  className
}) => {
  const handleMove = useCallback((interaction: Interaction) => {
    onChange({ a: interaction.left });
  }, [onChange]);

  const handleKey = useCallback((offset: Interaction) => {
    onChange({
      a: clamp(hsva.a + offset.left),
    });
  }, [hsva.a, onChange]);

  const colorFrom = hsvaToHslaString({ ...hsva, a: 0 });
  const colorTo = hsvaToHslaString({ ...hsva, a: 1 });

  return (
    <div className={cn("relative w-full", className)}>
      <Interactive
        onMove={handleMove}
        onKey={handleKey}
        aria-label="Alpha"
        aria-valuetext={`${round(hsva.a * 100)}%`}
        aria-valuenow={round(hsva.a * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="w-full h-full rounded-lg"
      >
        <div 
          className="absolute inset-0 rounded-lg bg-white"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><rect x="8" width="8" height="8"/><rect y="8" width="8" height="8"/></svg>')`,
          }}
        />
        
        <div 
          className="absolute inset-0 rounded-lg"
          style={{
            backgroundImage: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`,
          }}
        />
        
        <Pointer
          className="z-[1]"
          top={0.5}
          left={hsva.a}
          color=""
        />
      </Interactive>
    </div>
  );
};