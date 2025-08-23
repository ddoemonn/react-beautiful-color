import React, { useCallback } from "react";
import { Interactive, Interaction } from "./Interactive";
import { Pointer } from "./Pointer";
import { cn, hsvToHex } from "../utils";

interface HsvaColor {
  h: number;
  s: number;
  v: number;
  a: number;
}

interface SaturationProps {
  hsva: HsvaColor;
  onChange: (newColor: { s: number; v: number }) => void;
  className?: string;
}

const clamp = (num: number, min: number, max: number): number =>
  Math.min(Math.max(num, min), max);

const round = (num: number): number => Math.round(num);

export const Saturation: React.FC<SaturationProps> = ({
  hsva,
  onChange,
  className
}) => {
  console.log("🟩 Saturation component rendering with hsva:", hsva);

  const handleMove = useCallback((interaction: Interaction) => {
    const newColor = {
      s: interaction.left * 100,
      v: 100 - interaction.top * 100,
    };
    console.log("🟩 Saturation handleMove:", newColor);
    onChange(newColor);
  }, [onChange]);

  const handleKey = useCallback((offset: Interaction) => {
    const newColor = {
      s: clamp(hsva.s + offset.left * 100, 0, 100),
      v: clamp(hsva.v - offset.top * 100, 0, 100),
    };
    console.log("🟩 Saturation handleKey:", newColor);
    onChange(newColor);
  }, [hsva.s, hsva.v, onChange]);

  const pureHue = `hsl(${hsva.h}, 100%, 50%)`;

  return (
    <div className={cn("relative w-full h-full", className)}>
      <Interactive
        onMove={handleMove}
        onKey={handleKey}
        aria-label="Color"
        aria-valuetext={`Saturation ${round(hsva.s)}%, Brightness ${round(hsva.v)}%`}
        className="w-full h-full rounded-xl"
      >
        <div 
          className="absolute inset-0 rounded-xl rounded-b-none"
          style={{ 
            backgroundColor: pureHue,
            backgroundImage: 'linear-gradient(to top, #000, rgba(0, 0, 0, 0)), linear-gradient(to right, #fff, rgba(255, 255, 255, 0))',
            boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.05)'
          }}
        />
        
        <Pointer
          className="z-[3]"
          top={1 - hsva.v / 100}
          left={hsva.s / 100}
          color=""
        />
      </Interactive>
    </div>
  );
};