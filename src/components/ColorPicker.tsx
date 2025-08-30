import React, { useState, useEffect, useCallback, useRef, createContext, useContext } from 'react';

import type { ColorPickerProps } from '../types';

import { hexToHsv, hsvToHex, parseColorString, cn, rgbToHex, hslToHex } from '../utils';

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
  updateHsva: (params: Partial<HsvaColor>) => void;
  handleEyeDropper: () => void;
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

const ColorPickerMain: React.FC<ColorPickerMainProps> = ({ color = { type: 'hex', value: '#ff6b9d' }, onChange, className, children, ...rest }) => {
  const [hsva, setHsva] = useState<HsvaColor>(() => {
    if (color.type === 'hex') {
      const hexColor = color.value;
      const normalizedHex = parseColorString(hexColor);
      const hsv = hexToHsv(normalizedHex);
      return { ...hsv, a: 1 };
    } else if (color.type === 'rgb') {
      const hexColor = rgbToHex({ r: color.r, g: color.g, b: color.b });
      const normalizedHex = parseColorString(hexColor);
      const hsv = hexToHsv(normalizedHex);
      return { ...hsv, a: 1 };
    } else if (color.type === 'rgba') {
      const hexColor = rgbToHex({ r: color.r, g: color.g, b: color.b });
      const normalizedHex = parseColorString(hexColor);
      const hsv = hexToHsv(normalizedHex);
      return { ...hsv, a: color.a };
    } else if (color.type === 'hsl') {
      const hexColor = hslToHex({ h: color.h, s: color.s, l: color.l });
      const normalizedHex = parseColorString(hexColor);
      const hsv = hexToHsv(normalizedHex);
      return { ...hsv, a: 1 };
    } else if (color.type === 'hsla') {
      const hexColor = hslToHex({ h: color.h, s: color.s, l: color.l });
      const normalizedHex = parseColorString(hexColor);
      const hsv = hexToHsv(normalizedHex);
      return { ...hsv, a: color.a };
    } else if (color.type === 'hsv') {
      // NO CONVERSION NEEDED! Direct use
      return { h: color.h, s: color.s, v: color.v, a: 1 };
    } else if (color.type === 'hsva') {
      // NO CONVERSION NEEDED! Direct use
      return { h: color.h, s: color.s, v: color.v, a: color.a };
    } else {
      const hexColor = '#ff6b9d';
      const normalizedHex = parseColorString(hexColor);
      const hsv = hexToHsv(normalizedHex);
      return { ...hsv, a: 1 };
    }
  });

  const lastExternalColor = useRef(color);
  const isInternalUpdate = useRef(false);

  useEffect(() => {
    if (JSON.stringify(color) !== JSON.stringify(lastExternalColor.current) && !isInternalUpdate.current) {
      let newHsva: HsvaColor;

      if (color.type === 'hex') {
        const normalizedColor = parseColorString(color.value);
        const hsv = hexToHsv(normalizedColor);
        newHsva = { ...hsv, a: 1 };
      } else if (color.type === 'rgb') {
        const hexColor = rgbToHex({ r: color.r, g: color.g, b: color.b });
        const hsv = hexToHsv(hexColor);
        newHsva = { ...hsv, a: 1 };
      } else if (color.type === 'rgba') {
        const hexColor = rgbToHex({ r: color.r, g: color.g, b: color.b });
        const hsv = hexToHsv(hexColor);
        newHsva = { ...hsv, a: color.a };
      } else if (color.type === 'hsl') {
        const hexColor = hslToHex({ h: color.h, s: color.s, l: color.l });
        const hsv = hexToHsv(hexColor);
        newHsva = { ...hsv, a: 1 };
      } else if (color.type === 'hsla') {
        const hexColor = hslToHex({ h: color.h, s: color.s, l: color.l });
        const hsv = hexToHsv(hexColor);
        newHsva = { ...hsv, a: color.a };
      } else if (color.type === 'hsv') {
        // Direct use - no conversion
        newHsva = { h: color.h, s: color.s, v: color.v, a: 1 };
      } else if (color.type === 'hsva') {
        // Direct use - no conversion
        newHsva = { h: color.h, s: color.s, v: color.v, a: color.a };
      } else {
        // Fallback
        const hsv = hexToHsv('#ff6b9d');
        newHsva = { ...hsv, a: 1 };
      }

      setHsva(newHsva);
      lastExternalColor.current = color;
    }
    isInternalUpdate.current = false;
  }, [color]);

  const updateHsva = useCallback(
    (params: Partial<HsvaColor>) => {
      setHsva(current => {
        const updated = { ...current, ...params };

        let newColor: string;
        if (updated.a < 1) {
          const hex = hsvToHex({ h: updated.h, s: updated.s, v: updated.v });
          const alphaHex = Math.round(updated.a * 255)
            .toString(16)
            .padStart(2, '0');
          newColor = hex + alphaHex;
        } else {
          newColor = hsvToHex({ h: updated.h, s: updated.s, v: updated.v });
        }

        if (newColor !== (lastExternalColor.current.type === 'hex' ? lastExternalColor.current.value : '')) {
          isInternalUpdate.current = true;
          lastExternalColor.current = { type: 'hex', value: newColor };
          setTimeout(() => onChange?.({ type: 'hex', value: newColor }), 0);
        }

        return updated;
      });
    },
    [onChange]
  );

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

        setHsva(current => ({ ...newHsv, a: current.a }));

        isInternalUpdate.current = true;
        lastExternalColor.current = result.sRGBHex;

        setTimeout(() => onChange?.({ type: 'hex', value: result.sRGBHex }), 0);
      }
    } catch (error) {
      console.log('EyeDropper cancelled or failed:', error);
    }
  }, [onChange]);

  const contextValue: ColorPickerContextType = {
    hsva,
    updateHsva,
    handleEyeDropper,
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

const CompoundSaturation: React.FC<CompoundSaturationProps> = ({ className }) => {
  const { hsva, updateHsva } = useColorPickerContext();

  const handleSaturationChange = useCallback(
    (newColor: { s: number; v: number }) => {
      updateHsva(newColor);
    },
    [updateHsva]
  );

  return (
    <Saturation
      hsva={hsva}
      onChange={handleSaturationChange}
      className={className}
    />
  );
};

interface CompoundHueProps {
  className?: string;
}

const CompoundHue: React.FC<CompoundHueProps> = ({ className }) => {
  const { hsva, updateHsva } = useColorPickerContext();

  const handleHueChange = useCallback(
    (newHue: { h: number }) => {
      updateHsva(newHue);
    },
    [updateHsva]
  );

  return (
    <Hue
      hue={hsva.h}
      onChange={handleHueChange}
      className={className}
    />
  );
};

interface CompoundAlphaProps {
  className?: string;
}

const CompoundAlpha: React.FC<CompoundAlphaProps> = ({ className }) => {
  const { hsva, updateHsva } = useColorPickerContext();

  const handleAlphaChange = useCallback(
    (newAlpha: { a: number }) => {
      updateHsva(newAlpha);
    },
    [updateHsva]
  );

  return (
    <Alpha
      hsva={hsva}
      onChange={handleAlphaChange}
      className={className}
    />
  );
};

interface CompoundEyeDropperProps {
  className?: string;
  size?: number;
  title?: string;
  children?: React.ReactNode;
}

const CompoundEyeDropper: React.FC<CompoundEyeDropperProps> = ({ className, size = 18, title = 'Pick color from screen', children }) => {
  const { handleEyeDropper } = useColorPickerContext();

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
