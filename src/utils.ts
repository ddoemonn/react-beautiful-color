import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { RgbColor, HsvColor, HslColor, ColorState, ColorInput } from './types';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const clamp = (num: number, min: number, max: number): number => Math.min(Math.max(num, min), max);

const round = (num: number): number => Math.round(clamp(num, 0, 255));

export const hexToRgb = (hex: string): RgbColor => {
  const h = hex.replace('#', '');
  const bigint = parseInt(h, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
};

export const rgbToHex = ({ r, g, b }: RgbColor): string => {
  const toHex = (c: number) => round(c).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

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

export const hsvToHex = (hsv: HsvColor): string => rgbToHex(hsvToRgb(hsv));

export const hexToHsv = (hex: string): HsvColor => rgbToHsv(hexToRgb(hex));

export const isValidHex = (hex: string): boolean => {
  const h = hex.replace('#', '');
  return /^([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(h);
};

export const normalizeHex = (hex: string): string => {
  const h = hex.replace('#', '');
  if (h.length === 3) {
    return `#${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}`;
  }
  return `#${h}`;
};

export const getContrastColor = (hex: string): string => {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
};

export const randomHex = (): string => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
};

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

export const hslToHex = (hsl: HslColor): string => rgbToHex(hslToRgb(hsl));

export const hexToHsl = (hex: string): HslColor => rgbToHsl(hexToRgb(hex));

export const hsvToHsl = ({ h, s, v }: HsvColor): HslColor => {
  const l = (v * (2 - s / 100)) / 2;
  const sL = l !== 0 && l !== 100 ? ((v - l) / Math.min(l, 100 - l)) * 100 : 0;

  return {
    h,
    s: Math.round(sL),
    l: Math.round(l),
  };
};

export const hslToHsv = ({ h, s, l }: HslColor): HsvColor => {
  const v = l + (s * Math.min(l, 100 - l)) / 100;
  const sV = v === 0 ? 0 : 2 * (1 - l / v) * 100;

  return {
    h,
    s: Math.round(sV),
    v: Math.round(v),
  };
};

export const extractAlphaFromHex = (hex: string): number => {
  const h = hex.replace('#', '');
  if (h.length === 8) {
    const alphaHex = h.substring(6, 8);
    return parseInt(alphaHex, 16) / 255;
  }
  return 1;
};

export const stripAlphaFromHex = (hex: string): string => {
  const h = hex.replace('#', '');
  if (h.length === 8) {
    return `#${h.substring(0, 6)}`;
  }
  return hex;
};

export const parseColorString = (input: string): string => {
  const clean = input.trim();

  if (clean.startsWith('#')) {
    if (isValidHex(clean)) {
      return stripAlphaFromHex(normalizeHex(clean));
    }
    return '#ff0000';
  }

  const rgbMatch = clean.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1]);
    const g = parseInt(rgbMatch[2]);
    const b = parseInt(rgbMatch[3]);
    if (r <= 255 && g <= 255 && b <= 255) {
      return rgbToHex({ r, g, b });
    }
  }

  const hslMatch = clean.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*[\d.]+)?\)/);
  if (hslMatch) {
    const h = parseInt(hslMatch[1]);
    const s = parseInt(hslMatch[2]);
    const l = parseInt(hslMatch[3]);
    if (h <= 360 && s <= 100 && l <= 100) {
      return hslToHex({ h, s, l });
    }
  }

  const namedColors: Record<string, string> = {
    red: '#ff0000',
    green: '#008000',
    blue: '#0000ff',
    white: '#ffffff',
    black: '#000000',
    yellow: '#ffff00',
    cyan: '#00ffff',
    magenta: '#ff00ff',
    gray: '#808080',
    orange: '#ffa500',
    purple: '#800080',
    pink: '#ffc0cb',
  };

  const lowerCase = clean.toLowerCase();
  if (namedColors[lowerCase]) {
    return namedColors[lowerCase];
  }

  return '#ff0000';
};

export const createColorState = (input: string, fallbackAlpha: number = 1): ColorState => {
  let alpha = fallbackAlpha;

  if (input.startsWith('#')) {
    const h = input.replace('#', '');
    if (h.length === 8) {
      alpha = extractAlphaFromHex(input);
    }
  }

  const normalizedHex = parseColorString(input);
  const rgb = hexToRgb(normalizedHex);
  const hsv = rgbToHsv(rgb);
  const hsl = rgbToHsl(rgb);

  return {
    hex: normalizedHex,
    rgb,
    rgba: { ...rgb, a: alpha },
    hsl,
    hsla: { ...hsl, a: alpha },
    hsv,
    hsva: { ...hsv, a: alpha },
    alpha,
  };
};

export const createColorStateFromInput = (colorInput: ColorInput): ColorState => {
  let hexColor: string;
  let alpha: number;

  switch (colorInput.type) {
    case 'hex':
      hexColor = colorInput.value;
      alpha = extractAlphaFromHex(colorInput.value);
      break;
    case 'rgb':
      hexColor = rgbToHex(colorInput);
      alpha = 1;
      break;
    case 'rgba':
      hexColor = rgbToHex(colorInput);
      alpha = colorInput.a;
      break;
    case 'hsl':
      hexColor = hslToHex(colorInput);
      alpha = 1;
      break;
    case 'hsla':
      hexColor = hslToHex(colorInput);
      alpha = colorInput.a;
      break;
    case 'hsv':
      hexColor = hsvToHex(colorInput);
      alpha = 1;
      break;
    case 'hsva':
      hexColor = hsvToHex(colorInput);
      alpha = colorInput.a;
      break;
    default:
      throw new Error(`Unsupported color type: ${(colorInput as { type: string }).type}`);
  }

  return createColorState(hexColor, alpha);
};

// Function to convert any ColorState back to specific ColorInput format
export const colorStateToInput = (colorState: ColorState, targetType: ColorInput['type']): ColorInput => {
  switch (targetType) {
    case 'hex':
      return { type: 'hex', value: colorState.hex };
    case 'rgb':
      return { type: 'rgb', r: colorState.rgb.r, g: colorState.rgb.g, b: colorState.rgb.b };
    case 'rgba':
      return { type: 'rgba', r: colorState.rgba.r, g: colorState.rgba.g, b: colorState.rgba.b, a: colorState.rgba.a };
    case 'hsl':
      return { type: 'hsl', h: colorState.hsl.h, s: colorState.hsl.s, l: colorState.hsl.l };
    case 'hsla':
      return { type: 'hsla', h: colorState.hsla.h, s: colorState.hsla.s, l: colorState.hsla.l, a: colorState.hsla.a };
    case 'hsv':
      return { type: 'hsv', h: colorState.hsv.h, s: colorState.hsv.s, v: colorState.hsv.v };
    case 'hsva':
      return { type: 'hsva', h: colorState.hsva.h, s: colorState.hsva.s, v: colorState.hsva.v, a: colorState.hsva.a };
    default:
      throw new Error(`Unsupported color type: ${targetType}`);
  }
};

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
