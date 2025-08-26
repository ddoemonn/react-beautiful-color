import { useState, useCallback, useMemo } from 'react';
import type { ColorState, UseColorStateReturn, RgbColor, HslColor, HsvColor, ColorInput } from '../types';
import { createColorState, rgbToHex, hslToHex, hsvToHex } from '../utils';

export const useColorState = (initialColor: string = '#ff6b9d'): UseColorStateReturn => {
  const [colorState, setColorState] = useState<ColorState>(() => createColorState(initialColor, 1));

  const color = useMemo(() => colorState, [colorState]);

  const setColor = useCallback((colorInput: ColorInput) => {
    try {
      let hexColor: string;
      let alpha: number | undefined;

      switch (colorInput.type) {
        case 'hex':
          hexColor = colorInput.value;
          break;
        case 'rgb':
          hexColor = rgbToHex({ r: colorInput.r, g: colorInput.g, b: colorInput.b });
          break;
        case 'rgba':
          hexColor = rgbToHex({ r: colorInput.r, g: colorInput.g, b: colorInput.b });
          alpha = colorInput.a;
          break;
        case 'hsl':
          hexColor = hslToHex({ h: colorInput.h, s: colorInput.s, l: colorInput.l });
          break;
        case 'hsla':
          hexColor = hslToHex({ h: colorInput.h, s: colorInput.s, l: colorInput.l });
          alpha = colorInput.a;
          break;
        case 'hsv':
          hexColor = hsvToHex({ h: colorInput.h, s: colorInput.s, v: colorInput.v });
          break;
        case 'hsva':
          hexColor = hsvToHex({ h: colorInput.h, s: colorInput.s, v: colorInput.v });
          alpha = colorInput.a;
          break;
        default:
          // TypeScript exhaustiveness check
          const _exhaustive: never = colorInput;
          throw new Error(`Unsupported color type: ${(colorInput as { type: string }).type}`);
      }

      setColorState(createColorState(hexColor, alpha));
    } catch (error) {
      console.warn('Invalid color input:', colorInput, error);
    }
  }, []);
  const setAlpha = useCallback((alpha: number) => {
    const clampedAlpha = Math.max(0, Math.min(1, alpha));
    setColorState(prev => ({
      ...prev,
      alpha: clampedAlpha,
      rgba: { ...prev.rgba, a: clampedAlpha },
      hsla: { ...prev.hsla, a: clampedAlpha },
      hsva: { ...prev.hsva, a: clampedAlpha },
    }));
  }, []);

  const setFromRgb = useCallback(
    (rgb: RgbColor) => {
      setColor({ type: 'rgb', r: rgb.r, g: rgb.g, b: rgb.b });
    },
    [setColor]
  );

  const setFromHsl = useCallback(
    (hsl: HslColor) => {
      setColor({ type: 'hsl', h: hsl.h, s: hsl.s, l: hsl.l });
    },
    [setColor]
  );

  const setFromHsv = useCallback(
    (hsv: HsvColor) => {
      setColor({ type: 'hsv', h: hsv.h, s: hsv.s, v: hsv.v });
    },
    [setColor]
  );

  return {
    color,
    setColor,
    setAlpha,
    setFromRgb,
    setFromHsl,
    setFromHsv,
  };
};
