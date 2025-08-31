'use client';

import { Pipette } from 'lucide-react';
import { ColorPicker, useColorState } from 'react-beautiful-color';

export function BasicColorPickerExample() {
  const [{ colorInput, colorState }, setColor] = useColorState({ type: 'hex', value: '#ff6b9d' });

  return (
    <div className="flex w-full flex-col items-center justify-center py-10 sm:flex-row">
      <ColorPicker
        color={colorInput}
        onChange={setColor}
        className="border-fd-border rounded-2xl border bg-white shadow-lg dark:bg-black/200"
      >
        <ColorPicker.Saturation className="mb-3 flex-1" />

        <div className="flex items-center gap-3 p-3 pt-0">
          <ColorPicker.EyeDropper className="hover:bg-black/10 dark:hover:bg-white/10">
            <Pipette
              size={20}
              className="dark:text-white"
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
              <code className="bg-muted rounded px-2 py-1 font-mono text-sm">{colorState.hex}</code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm font-medium">RGB</span>
              <code className="bg-muted rounded px-2 py-1 font-mono text-sm">
                {colorState.rgb.r}, {colorState.rgb.g}, {colorState.rgb.b}
              </code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm font-medium">HSL</span>
              <code className="bg-muted rounded px-2 py-1 font-mono text-sm">
                {colorState.hsl.h}°, {colorState.hsl.s}%, {colorState.hsl.l}%
              </code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm font-medium">HSV</span>
              <code className="bg-muted rounded px-2 py-1 font-mono text-sm">
                {colorState.hsv.h}°, {colorState.hsv.s}%, {colorState.hsv.v}%
              </code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm font-medium">Alpha</span>
              <code className="bg-muted rounded px-2 py-1 font-mono text-sm">{Math.round(colorState.alpha * 100)}%</code>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div
            className="border-border h-16 w-32 rounded-lg border-2 shadow-sm"
            style={{
              backgroundColor: 'rgba(' + colorState.rgb.r + ', ' + colorState.rgb.g + ', ' + colorState.rgb.b + ', ' + colorState.alpha + ')',
              ...(colorState.alpha < 1 && {
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
  const [{ colorInput, colorState }, setColor] = useColorState({ type: 'hex', value: '#ff6b9d' });

  return (
    <div className="p-6">
      <div className="max-w-md">
        <h4 className="mb-3 text-sm font-medium">Hue Selector</h4>
        <ColorPicker
          color={colorInput}
          onChange={setColor}
          className="mb-4 max-h-4"
        >
          <ColorPicker.Hue className="max-h-4" />
        </ColorPicker>
        <div className="space-y-1 text-sm">
          <div>Current Hue: {Math.round(colorState.hsv.h)}°</div>
          <div>
            Color: <span className="font-mono">{colorState.hex}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SaturationExample() {
  const [{ colorInput, colorState }, setColor] = useColorState({ type: 'hex', value: '#ff6b9d' });

  return (
    <div className="p-6">
      <div className="max-w-md">
        <h4 className="mb-3 text-sm font-medium">Saturation Selector</h4>
        <ColorPicker
          color={colorInput}
          onChange={setColor}
          className="mb-4 max-h-40"
        >
          <ColorPicker.Saturation className="max-h-40" />
        </ColorPicker>
        <div className="space-y-1 text-sm">
          <div>
            <div>Current Saturation: {Math.round(colorState.hsv.s)}%</div>
            <div>Current Brightness: {Math.round(colorState.hsv.v)}%</div>
            <div>
              Color: <span className="font-mono">{colorState.hex}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AlphaExample() {
  const [{ colorInput, colorState }, setColor] = useColorState({ type: 'hex', value: '#ff6b9d' });

  return (
    <div className="p-6">
      <div className="max-w-md">
        <h4 className="mb-3 text-sm font-medium">Alpha Selector</h4>
        <ColorPicker
          color={colorInput}
          onChange={setColor}
          className="mb-4 max-h-4"
        >
          <ColorPicker.Alpha className="max-h-4" />
        </ColorPicker>
        <div className="space-y-1 text-sm">
          <div>Current Alpha: {Math.round(colorState.alpha * 100)}%</div>
        </div>
      </div>
    </div>
  );
}
