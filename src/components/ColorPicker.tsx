import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

import type { ColorInput, ColorPickerProps } from '../types';
import { Color } from '../types';
import { cn, hexToHsv, parseColorString } from '../utils';

import { convertColor } from '../utils';
import { Alpha } from './Alpha';
import { Hue } from './Hue';
import { Saturation } from './Saturation';

interface HsvaColor {
  h: number;
  s: number;
  v: number;
  a: number;
}

interface ColorPickerContextType {
  hsva: HsvaColor;
  updateHsva: (params: Partial<HsvaColor>, finishedUpdates: boolean) => void;
  handleEyeDropper: () => void;
  onFinishedUpdates: () => void;
}

const ColorPickerContext = createContext<ColorPickerContextType | null>(null);

const useColorPickerContext = () => {
  const context = useContext(ColorPickerContext);
  if (!context) {
    throw new Error('ColorPicker compound components must be used within a ColorPicker');
  }
  return context;
};

interface ColorPickerMainProps extends Omit<ColorPickerProps, 'withEyeDropper'> {
  children?: React.ReactNode;
}

function getColor(color: Color | ColorInput): Color {
  if ('type' in color) {
    return new Color(color);
  }
  return color;
}

const ColorPickerMain = ({ color, onChange, className, children, defaultColor, ...rest }: ColorPickerMainProps) => {
  const [localColor, setLocalColor] = useState<Color>(getColor(color ?? defaultColor ?? { h: 340, s: 58, v: 100, a: 1, type: 'hsva' }));
  const updating = useRef(false);
  const colorRef = useRef(localColor);

  useEffect(() => {
    if (!updating.current && color) {
      colorRef.current = getColor(color);
      setLocalColor(colorRef.current);
    }
  }, [color]);

  const updateHsva = useCallback(
    (hsvaColor: Partial<HsvaColor>, finishedUpdates: boolean) => {
      const newColor = new Color({ type: 'hsva', ...colorRef.current.getHsva(), ...hsvaColor });
      colorRef.current = newColor;
      setLocalColor(newColor);
      updating.current = !finishedUpdates;
      onChange?.(newColor);
    },
    [onChange]
  );

  const onFinishedUpdates = useCallback(() => {
    updating.current = false;
  }, []);

  const handleEyeDropper = useCallback(async () => {
    if (!('EyeDropper' in window)) {
      console.log('EyeDropper API not supported');
      return;
    }

    try {
      // @ts-expect-error EyeDropper API not in TypeScript types yet
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      if (result.sRGBHex) {
        const normalizedColor = parseColorString(result.sRGBHex);
        const newHsv = hexToHsv(normalizedColor);

        updateHsva(convertColor({ type: 'hex', value: result.sRGBHex }, 'hsva'), true);
      }
    } catch (error) {
      console.log('EyeDropper cancelled or failed:', error);
    }
  }, [onChange]);

  const contextValue: ColorPickerContextType = {
    hsva: localColor.getHsva(),
    updateHsva,
    handleEyeDropper,
    onFinishedUpdates,
  };

  return (
    <ColorPickerContext.Provider value={contextValue}>
      <div
        {...rest}
        className={cn('relative flex h-[280px] w-[280px] cursor-default flex-col rounded-2xl bg-white shadow-lg select-none', className)}
      >
        {children}
      </div>
    </ColorPickerContext.Provider>
  );
};

interface CompoundSaturationProps {
  className?: string;
}

const CompoundSaturation = ({ className }: CompoundSaturationProps) => {
  const { hsva, updateHsva, onFinishedUpdates } = useColorPickerContext();

  const handleSaturationChange = useCallback(
    (newColor: { s: number; v: number }, finishedUpdates: boolean) => {
      updateHsva(newColor, finishedUpdates);
    },
    [updateHsva]
  );

  return (
    <Saturation
      hsva={hsva}
      onChange={handleSaturationChange}
      className={className}
      onFinishedUpdates={onFinishedUpdates}
    />
  );
};

interface CompoundHueProps {
  className?: string;
}

const CompoundHue = ({ className }: CompoundHueProps) => {
  const { hsva, updateHsva, onFinishedUpdates } = useColorPickerContext();

  const handleHueChange = useCallback(
    (newHue: { h: number }, finishedUpdates: boolean) => {
      updateHsva(newHue, finishedUpdates);
    },
    [updateHsva]
  );

  return (
    <Hue
      hue={hsva.h}
      onChange={handleHueChange}
      className={className}
      onFinishedUpdates={onFinishedUpdates}
    />
  );
};

interface CompoundAlphaProps {
  className?: string;
}

const CompoundAlpha = ({ className }: CompoundAlphaProps) => {
  const { hsva, updateHsva, onFinishedUpdates } = useColorPickerContext();

  const handleAlphaChange = useCallback(
    (newAlpha: { a: number }, finishedUpdates: boolean) => {
      updateHsva(newAlpha, finishedUpdates);
    },
    [updateHsva]
  );

  return (
    <Alpha
      hsva={hsva}
      onChange={handleAlphaChange}
      className={className}
      onFinishedUpdates={onFinishedUpdates}
    />
  );
};

interface CompoundEyeDropperProps {
  className?: string;
  size?: number;
  title?: string;
  children?: React.ReactNode;
}

const CompoundEyeDropper = ({ className, size = 18, title = 'Pick color from screen', children }: CompoundEyeDropperProps) => {
  const { handleEyeDropper } = useColorPickerContext();

  if (!('EyeDropper' in window)) {
    return null;
  }
  return (
    <button
      onClick={handleEyeDropper}
      className={cn('flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-gray-100', className)}
      title={title}
    >
      {children}
    </button>
  );
};

export const ColorPicker = Object.assign(ColorPickerMain, {
  Saturation: CompoundSaturation,
  Hue: CompoundHue,
  Alpha: CompoundAlpha,
  EyeDropper: CompoundEyeDropper,
});
