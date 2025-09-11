import React, { useCallback } from 'react';
import { HsvaColor } from '../types';
import { cn } from '../utils';
import { clamp, round } from '../utils/internal';
import { Interaction, Interactive } from './Interactive';
import { Pointer } from './Pointer';

interface SaturationProps {
  hsva: HsvaColor;
  onChange: (newColor: { s: number; v: number }, finishedUpdates: boolean) => void;
  className?: string;
  onFinishedUpdates: () => void;
}

export const Saturation: React.FC<SaturationProps> = ({ hsva, onChange, className, onFinishedUpdates }) => {
  const handleMove = useCallback(
    (interaction: Interaction) => {
      const s = round(clamp(interaction.left * 100, 0, 100));
      const v = round(clamp(100 - interaction.top * 100, 0, 100));

      onChange({ s, v }, false);
    },
    [onChange]
  );

  const handleKey = useCallback(
    (offset: Interaction) => {
      onChange(
        {
          s: clamp(hsva.s + offset.left * 100, 0, 100),
          v: clamp(hsva.v - offset.top * 100, 0, 100),
        },
        true
      );
    },
    [hsva.s, hsva.v, onChange]
  );

  const pureHue = `hsl(${hsva.h}, 100%, 50%)`;

  return (
    <div className={cn('relative h-full w-full rounded-xl', className)}>
      <Interactive
        onMove={handleMove}
        onMoveEnd={onFinishedUpdates}
        onKey={handleKey}
        aria-label="Color"
        aria-valuetext={`Saturation ${round(hsva.s)}%, Brightness ${round(hsva.v)}%`}
        className="rounded-inherit h-full w-full"
      >
        <div
          className="rounded-inherit absolute inset-0 rounded-b-none"
          style={{
            backgroundColor: pureHue,
            backgroundImage: 'linear-gradient(to top, #000, rgba(0, 0, 0, 0)), linear-gradient(to right, #fff, rgba(255, 255, 255, 0))',
            boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.05)',
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
