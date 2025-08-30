import React, { useCallback } from 'react';
import { cn } from '../utils';
import { clamp, round } from '../utils/internal';
import { Interaction, Interactive } from './Interactive';

interface HueProps {
  hue: number;
  onChange: (newHue: { h: number }, finishedUpdates: boolean) => void;
  className?: string;
  onFinishedUpdates: () => void;
}

export const Hue: React.FC<HueProps> = ({ hue, onChange, className, onFinishedUpdates }) => {
  const handleMove = useCallback(
    (interaction: Interaction) => {
      const h = round(clamp(360 * interaction.left, 0, 360));
      onChange({ h }, false);
    },
    [onChange]
  );

  const handleKey = useCallback(
    (offset: Interaction) => {
      onChange(
        {
          h: clamp(hue + offset.left * 360, 0, 360),
        },
        true
      );
    },
    [hue, onChange]
  );

  return (
    <div className={cn('relative h-full w-full', className)}>
      <Interactive
        onMove={handleMove}
        onMoveEnd={onFinishedUpdates}
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
