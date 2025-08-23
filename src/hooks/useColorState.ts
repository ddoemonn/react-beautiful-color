import { useState, useCallback, useMemo } from "react";
import type { 
  ColorState, 
  UseColorStateReturn, 
  RgbColor, 
  HslColor, 
  HsvColor 
} from "../types";
import { 
  createColorState, 
  parseColorString,
  rgbToHex, 
  hslToHex, 
  hsvToHex 
} from "../utils";

export const useColorState = (
  initialColor: string = "#ff6b9d"
): UseColorStateReturn => {
  const [colorState, setColorState] = useState<ColorState>(() =>
    createColorState(initialColor, 1)
  );

  const color = useMemo(() => colorState, [colorState]);

  const setColor = useCallback((colorString: string) => {
    try {
      setColorState(createColorState(colorString));
    } catch (error) {
      console.warn(`Invalid color: ${colorString}`);
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

  const setFromRgb = useCallback((rgb: RgbColor) => {
    setColor(rgbToHex(rgb));
  }, [setColor]);

  const setFromHsl = useCallback((hsl: HslColor) => {
    setColor(hslToHex(hsl));
  }, [setColor]);

  const setFromHsv = useCallback((hsv: HsvColor) => {
    setColor(hsvToHex(hsv));
  }, [setColor]);

  return {
    color,
    setColor,
    setAlpha,
    setFromRgb,
    setFromHsl,
    setFromHsv,
  };
};
