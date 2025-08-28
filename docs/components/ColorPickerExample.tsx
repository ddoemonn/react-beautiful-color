'use client';

import { ColorPicker, useColorState } from 'react-beautiful-color';
import { Pipette } from 'lucide-react';

export function BasicColorPickerExample() {
  const { color, setColor } = useColorState({ type: 'hex', value: '#ff6b9d' });

  return (
    <div className="flex w-full items-center justify-center py-10">
      <ColorPicker
        color={{ type: 'hex', value: color.hex }}
        onChange={setColor}
      >
        <ColorPicker.Saturation className="mb-3 flex-1" />

        <div className="flex items-center gap-3 p-3 pt-0">
          <ColorPicker.EyeDropper>
            <Pipette
              size={20}
              className="dark:text-black"
            />
          </ColorPicker.EyeDropper>

          <div className="flex flex-1 flex-col gap-3">
            <ColorPicker.Hue className="h-4" />
            <ColorPicker.Alpha className="h-4" />
          </div>
        </div>
      </ColorPicker>

      <div className="mt-20 ml-8 flex min-w-64 flex-col">
        <div className="bg-card mb-4 rounded-lg border p-4">
          <h4 className="text-card-foreground mb-3 text-sm font-semibold">Color Values</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm font-medium">HEX</span>
              <code className="bg-muted rounded px-2 py-1 font-mono text-sm">{color.hex}</code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm font-medium">RGB</span>
              <code className="bg-muted rounded px-2 py-1 font-mono text-sm">
                {color.rgb.r}, {color.rgb.g}, {color.rgb.b}
              </code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm font-medium">HSL</span>
              <code className="bg-muted rounded px-2 py-1 font-mono text-sm">
                {color.hsl.h}°, {color.hsl.s}%, {color.hsl.l}%
              </code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm font-medium">HSV</span>
              <code className="bg-muted rounded px-2 py-1 font-mono text-sm">
                {color.hsv.h}°, {color.hsv.s}%, {color.hsv.v}%
              </code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm font-medium">Alpha</span>
              <code className="bg-muted rounded px-2 py-1 font-mono text-sm">{Math.round(color.alpha * 100)}%</code>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div
            className="border-border h-16 w-32 rounded-lg border-2 shadow-sm"
            style={{
              backgroundColor: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.alpha})`,
              ...(color.alpha < 1 && {
                backgroundImage:
                  'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".1"><rect x="8" width="8" height="8"/><rect y="8" width="8" height="8"/></svg>\')',
                backgroundSize: '16px 16px',
              }),
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function HueExample() {
  const { color, setColor } = useColorState({ type: 'hex', value: '#ff6b9d' });

  return (
    <div className="p-6">
      <div className="max-w-md">
        <h4 className="mb-3 text-sm font-medium">Hue Selector</h4>
        <ColorPicker
          color={{ type: 'hex', value: color.hex }}
          onChange={setColor}
          className="mb-4 max-h-4"
        >
          <ColorPicker.Hue className="max-h-4" />
        </ColorPicker>
        <div className="space-y-1 text-sm">
          <div>Current Hue: {Math.round(color.hsv.h)}°</div>
          <div>
            Color: <span className="font-mono">{color.hex}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SaturationExample() {
  const { color, setColor } = useColorState({ type: 'hex', value: '#ff6b9d' });

  return (
    <div className="p-6">
      <div className="max-w-md">
        <h4 className="mb-3 text-sm font-medium">Saturation Selector</h4>
        <ColorPicker
          color={{ type: 'hex', value: color.hex }}
          onChange={setColor}
          className="mb-4 max-h-40"
        >
          <ColorPicker.Saturation className="max-h-40" />
        </ColorPicker>
        <div className="space-y-1 text-sm">
          <div>
            <div>Current Saturation: {Math.round(color.hsv.s)}%</div>
            <div>Current Brightness: {Math.round(color.hsv.v)}%</div>
            <div>
              Color: <span className="font-mono">{color.hex}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AlphaExample() {
  const { color, setColor } = useColorState({ type: 'hex', value: '#ff6b9d' });

  return (
    <div className="p-6">
      <div className="max-w-md">
        <h4 className="mb-3 text-sm font-medium">Alpha Selector</h4>
        <ColorPicker
          color={{ type: 'hex', value: color.hex }}
          onChange={setColor}
          className="mb-4 max-h-4"
        >
          <ColorPicker.Alpha className="max-h-4" />
        </ColorPicker>
        <div className="space-y-1 text-sm">
          <div>Current Alpha: {Math.round(color.alpha * 100)}%</div>
        </div>
      </div>
    </div>
  );
}
