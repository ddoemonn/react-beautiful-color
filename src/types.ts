import { convertColor, formatColorString, getContrastColor } from './utils';

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface RgbaColor extends RgbColor {
  a: number;
}

export interface HslColor {
  h: number;
  s: number;
  l: number;
}

export interface HslaColor extends HslColor {
  a: number;
}

export interface HsvColor {
  h: number;
  s: number;
  v: number;
}

export interface HsvaColor extends HsvColor {
  a: number;
}

export type HexColor = string;

export type ColorFormat = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hsv' | 'hsva';

export interface ColorState {
  hex: string;
  rgb: RgbColor;
  rgba: RgbaColor;
  hsl: HslColor;
  hsla: HslaColor;
  hsv: HsvColor;
  hsva: HsvaColor;
  alpha: number;
}

// Type-safe color input objects using discriminated unions
export type ColorInput =
  | { type: 'hex'; value: string }
  | { type: 'rgb'; r: number; g: number; b: number }
  | { type: 'rgba'; r: number; g: number; b: number; a: number }
  | { type: 'hsl'; h: number; s: number; l: number }
  | { type: 'hsla'; h: number; s: number; l: number; a: number }
  | { type: 'hsv'; h: number; s: number; v: number }
  | { type: 'hsva'; h: number; s: number; v: number; a: number };

export interface UseColorStateReturn {
  color: ColorState;
  setColor: (color: ColorInput) => void;
  setAlpha: (alpha: number) => void;
  setFromRgb: (rgb: RgbColor) => void;
  setFromHsl: (hsl: HslColor) => void;
  setFromHsv: (hsv: HsvColor) => void;
}

// New array-style return type
export type UseColorStateArrayReturn = [
  {
    colorInput: ColorInput;
    colorState: ColorState;
  },
  (color: ColorInput) => void,
];

export interface ColorPickerProps {
  defaultColor?: Color | ColorInput;
  color?: Color | ColorInput;
  onChange?: (color: Color) => void;
  className?: string;
  withEyeDropper?: boolean;
}

export class Color {
  constructor(private color: ColorInput) {}
  public getRgb(): RgbColor {
    return convertColor(this.color, 'rgb');
  }
  public getHsv(): HsvColor {
    return convertColor(this.color, 'hsv');
  }
  public getHsla(): HslaColor {
    return convertColor(this.color, 'hsla');
  }
  public getHsva(): HsvaColor {
    return convertColor(this.color, 'hsva');
  }
  public getHex(): HexColor {
    return convertColor(this.color, 'hex');
  }
  public getHsl(): HslColor {
    return convertColor(this.color, 'hsl');
  }
  public getRgba(): RgbaColor {
    return convertColor(this.color, 'rgba');
  }
  public format(format: Exclude<ColorFormat, 'hsv' | 'hsva'> = 'hex'): string {
    return formatColorString(this, format);
  }
  public getContrastingColor(): Color {
    return new Color({ type: 'hex', value: getContrastColor(this.getHex()) });
  }
}
