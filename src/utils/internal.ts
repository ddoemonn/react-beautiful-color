import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ColorState, ColorInput } from '../types';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const clamp = (num: number, min: number, max: number): number => Math.min(Math.max(num, min), max);

export const round = (num: number): number => Math.round(clamp(num, 0, 255));

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

// Import functions from public for internal use
import { hexToRgb, rgbToHex, rgbToHsv, rgbToHsl, hslToHex, hsvToHex } from './public';
