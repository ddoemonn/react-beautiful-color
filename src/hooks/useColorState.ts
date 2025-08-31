import { useCallback, useMemo, useState } from 'react';
import { Color, ColorFormat, ColorInput, UseColorStateArrayReturn } from '../types';
import { assertUnreachable } from '../utils/internal';

function toColorInput(color: Color, format: ColorFormat) {
  switch (format) {
    case 'hex':
      return { type: 'hex' as const, value: color.getHex() };
    case 'rgb':
      return { type: 'rgb' as const, ...color.getRgb() };
    case 'rgba':
      return { type: 'rgba' as const, ...color.getRgba() };
    case 'hsl':
      return { type: 'hsl' as const, ...color.getHsl() };
    case 'hsla':
      return { type: 'hsla' as const, ...color.getHsla() };
    case 'hsv':
      return { type: 'hsv' as const, ...color.getHsv() };
    case 'hsva':
      return { type: 'hsva' as const, ...color.getHsva() };
    default:
      assertUnreachable(format);
  }
}

type Initializer<T> = T | (() => T);

export const useColorState = (initialColor: Initializer<ColorInput> = { type: 'hex', value: '#ff6b9d' }): UseColorStateArrayReturn => {
  const [value, setValue] = useState<{ color: Color; type: ColorFormat }>(() => {
    const input = typeof initialColor === 'function' ? initialColor() : initialColor;
    return { color: new Color(input), type: input.type };
  });
  const colorInput = useMemo(() => toColorInput(value.color, value.type), [value.color, value.type]);
  const colorState = useMemo(() => {
    const hsva = value.color.getHsva();
    return {
      hex: value.color.getHex(),
      rgb: value.color.getRgb(),
      rgba: value.color.getRgba(),
      hsl: value.color.getHsl(),
      hsla: value.color.getHsla(),
      hsv: value.color.getHsv(),
      hsva,
      alpha: hsva.a,
    };
  }, [value.color]);

  const setColor = useCallback((newColor: ColorInput | Color) => {
    try {
      const newValue = 'type' in newColor ? new Color(newColor) : newColor;
      setValue(oldValue => ({ color: newValue, type: oldValue.type }));
    } catch (error) {
      console.warn('Invalid color input:', newColor, error);
    }
  }, []);

  return [
    {
      colorInput,
      colorState,
    },
    setColor,
  ];
};
