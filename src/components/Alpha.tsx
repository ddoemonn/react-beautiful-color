import React, { useCallback, useMemo } from 'react';
import { Color } from '../types';
import { cn } from '../utils';
import { clamp, round } from '../utils/internal';
import { Interaction, Interactive } from './Interactive';
import { Pointer } from './Pointer';

interface HsvaColor {
  h: number;
  s: number;
  v: number;
  a: number;
}

interface AlphaProps {
  hsva: HsvaColor;
  onChange: (newAlpha: { a: number }, finishedUpdates: boolean) => void;
  className?: string;
  onFinishedUpdates: () => void;
}

export const Alpha: React.FC<AlphaProps> = ({ hsva, onChange, className, onFinishedUpdates }) => {
  const handleMove = useCallback(
    (interaction: Interaction) => {
      onChange({ a: interaction.left }, false);
    },
    [onChange]
  );

  const handleKey = useCallback(
    (offset: Interaction) => {
      onChange(
        {
          a: clamp(hsva.a + offset.left, 0, 1),
        },
        true
      );
    },
    [hsva.a, onChange]
  );

  const colorFrom = useMemo(() => new Color({ type: 'hsva', h: hsva.h, s: hsva.s, v: hsva.v, a: 0 }).format('hsla'), [hsva.h, hsva.s, hsva.v]);
  const colorTo = useMemo(() => new Color({ type: 'hsva', h: hsva.h, s: hsva.s, v: hsva.v, a: 1 }).format('hsla'), [hsva.h, hsva.s, hsva.v]);

  return (
    <div className={cn('relative h-full w-full', className)}>
      <Interactive
        onMove={handleMove}
        onMoveEnd={onFinishedUpdates}
        onKey={handleKey}
        aria-label="Alpha"
        aria-valuetext={`${round(hsva.a * 100)}%`}
        aria-valuenow={round(hsva.a * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-full w-full rounded-lg"
      >
        <div
          className="absolute inset-0 rounded-lg bg-white"
          style={{
            backgroundImage:
              'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><rect x="8" width="8" height="8"/><rect y="8" width="8" height="8"/></svg>\')',
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
