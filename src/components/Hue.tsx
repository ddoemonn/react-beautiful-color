import React, { useCallback } from 'react';
import { Interactive, Interaction } from './Interactive';
import { Pointer } from './Pointer';
import { cn } from '../utils';

interface HueProps {
  hue: number;
  onChange: (newHue: { h: number }) => void;
  className?: string;
}

const clamp = (num: number, min: number, max: number): number => Math.min(Math.max(num, min), max);

const round = (num: number): number => Math.round(num);

export const Hue: React.FC<HueProps> = ({ hue, onChange, className }) => {
  const handleMove = useCallback(
    (interaction: Interaction) => {
      const h = round(clamp(360 * interaction.left, 0, 360));
      onChange({ h });
    },
    [onChange]
  );

  const handleKey = useCallback(
    (offset: Interaction) => {
      onChange({
        h: clamp(hue + offset.left * 360, 0, 360),
      });
    },
    [hue, onChange]
  );

  return (
    <div className={cn('relative h-full w-full', className)}>
      <Interactive
        onMove={handleMove}
        onKey={handleKey}
        aria-label="Hue"
        aria-valuenow={round(hue)}
        aria-valuemax={360}
        aria-valuemin={0}
        className="h-full w-full rounded-lg"
      >
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)',
          }}
        />

        <Pointer
          className="z-[2]"
          top={0.5}
          left={hue / 360}
          color=""
        />
      </Interactive>
    </div>
  );
};
