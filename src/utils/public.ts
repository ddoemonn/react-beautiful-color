import type { RgbColor, HsvColor, HslColor, ColorState } from '../types';

const clamp = (num: number, min: number, max: number): number => Math.min(Math.max(num, min), max);
const round = (num: number): number => Math.round(clamp(num, 0, 255));

/**
 * Convert hex color to RGB values
 * @param hex - Hex color string (e.g., "#ff6b9d")
 * @returns RGB color object with r, g, b values (0-255)
 */
export const hexToRgb = (hex: string): RgbColor => {
  const h = hex.replace('#', '');
  const bigint = parseInt(h, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
};

/**
 * Convert RGB values to hex color
 * @param rgb - RGB color object with r, g, b values (0-255)
 * @returns Hex color string (e.g., "#ff6b9d")
 */
export const rgbToHex = ({ r, g, b }: RgbColor): string => {
  const toHex = (c: number) => round(c).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Convert HSV color to RGB values
 * @param hsv - HSV color object with h (0-360), s (0-100), v (0-100)
 * @returns RGB color object with r, g, b values (0-255)
 */
export const hsvToRgb = ({ h, s, v }: HsvColor): RgbColor => {
  h = h / 360;
  s = s / 100;
  v = v / 100;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  let r: number, g: number, b: number;

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
    default:
      r = g = b = 0;
  }

  return {
    r: round(r * 255),
    g: round(g * 255),
    b: round(b * 255),
  };
};

/**
 * Convert RGB values to HSV color
 * @param rgb - RGB color object with r, g, b values (0-255)
 * @returns HSV color object with h (0-360), s (0-100), v (0-100)
 */
export const rgbToHsv = ({ r, g, b }: RgbColor): HsvColor => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  let h = 0;
  const s = max === 0 ? 0 : diff / max;
  const v = max;

  if (diff !== 0) {
    switch (max) {
      case r:
        h = ((g - b) / diff + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / diff + 2) / 6;
        break;
      case b:
        h = ((r - g) / diff + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
};

/**
 * Convert HSV color to hex string
 * @param hsv - HSV color object with h (0-360), s (0-100), v (0-100)
 * @returns Hex color string (e.g., "#ff6b9d")
 */
export const hsvToHex = (hsv: HsvColor): string => rgbToHex(hsvToRgb(hsv));

/**
 * Convert hex color to HSV values
 * @param hex - Hex color string (e.g., "#ff6b9d")
 * @returns HSV color object with h (0-360), s (0-100), v (0-100)
 */
export const hexToHsv = (hex: string): HsvColor => rgbToHsv(hexToRgb(hex));

/**
 * Convert RGB values to HSL color
 * @param rgb - RGB color object with r, g, b values (0-255)
 * @returns HSL color object with h (0-360), s (0-100), l (0-100)
 */
export const rgbToHsl = ({ r, g, b }: RgbColor): HslColor => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (diff !== 0) {
    s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / diff + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / diff + 2) / 6;
        break;
      case b:
        h = ((r - g) / diff + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

/**
 * Convert HSL color to RGB values
 * @param hsl - HSL color object with h (0-360), s (0-100), l (0-100)
 * @returns RGB color object with r, g, b values (0-255)
 */
export const hslToRgb = ({ h, s, l }: HslColor): RgbColor => {
  h /= 360;
  s /= 100;
  l /= 100;

  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
};

/**
 * Convert HSL color to hex string
 * @param hsl - HSL color object with h (0-360), s (0-100), l (0-100)
 * @returns Hex color string (e.g., "#ff6b9d")
 */
export const hslToHex = (hsl: HslColor): string => rgbToHex(hslToRgb(hsl));

/**
 * Convert hex color to HSL values
 * @param hex - Hex color string (e.g., "#ff6b9d")
 * @returns HSL color object with h (0-360), s (0-100), l (0-100)
 */
export const hexToHsl = (hex: string): HslColor => rgbToHsl(hexToRgb(hex));

/**
 * Convert HSV color to HSL color
 * @param hsv - HSV color object with h (0-360), s (0-100), v (0-100)
 * @returns HSL color object with h (0-360), s (0-100), l (0-100)
 */
export const hsvToHsl = ({ h, s, v }: HsvColor): HslColor => {
  const l = (v * (2 - s / 100)) / 2;
  const sL = l !== 0 && l !== 100 ? ((v - l) / Math.min(l, 100 - l)) * 100 : 0;

  return {
    h,
    s: Math.round(sL),
    l: Math.round(l),
  };
};

/**
 * Convert HSL color to HSV color
 * @param hsl - HSL color object with h (0-360), s (0-100), l (0-100)
 * @returns HSV color object with h (0-360), s (0-100), v (0-100)
 */
export const hslToHsv = ({ h, s, l }: HslColor): HsvColor => {
  const v = l + (s * Math.min(l, 100 - l)) / 100;
  const sV = v === 0 ? 0 : 2 * (1 - l / v) * 100;

  return {
    h,
    s: Math.round(sV),
    v: Math.round(v),
  };
};

/**
 * Get the contrast color (black or white) for a given hex color
 * @param hex - Hex color string (e.g., "#ff6b9d")
 * @returns "#000000" for light colors, "#ffffff" for dark colors
 */
export const getContrastColor = (hex: string): string => {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
};

/**
 * Generate a random hex color
 * @returns Random hex color string (e.g., "#a1b2c3")
 */
export const randomHex = (): string => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
};

/**
 * Format a ColorState object into a CSS color string
 * @param color - ColorState object
 * @param format - Output format: 'hex', 'rgb', 'rgba', 'hsl', 'hsla'
 * @returns Formatted color string
 */
export const formatColorString = (color: ColorState, format: 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' = 'hex'): string => {
  switch (format) {
    case 'hex':
      return color.hex;
    case 'rgb':
      return `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
    case 'rgba':
      return `rgba(${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b}, ${color.rgba.a})`;
    case 'hsl':
      return `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`;
    case 'hsla':
      return `hsla(${color.hsla.h}, ${color.hsla.s}%, ${color.hsla.l}%, ${color.hsla.a})`;
    default:
      return color.hex;
  }
};
