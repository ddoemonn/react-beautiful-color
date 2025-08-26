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

export interface UseColorStateReturn {
  color: ColorState;
  setColor: (color: string) => void;
  setAlpha: (alpha: number) => void;
  setFromRgb: (rgb: RgbColor) => void;
  setFromHsl: (hsl: HslColor) => void;
  setFromHsv: (hsv: HsvColor) => void;
}

export interface ColorPickerProps {
  color?: string;
  onChange?: (color: string) => void;
  className?: string;
  withEyeDropper: boolean;
}

export interface ColorPreset {
  name: string;
  colors: string[];
}
