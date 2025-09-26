import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const clamp = (num: number, min: number, max: number): number => Math.min(Math.max(num, min), max);

export const round = (num: number): number => Math.round(num);

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

export interface ColorValidationResult {
  isValid: boolean;
  correctedValue?: string;
  format?: 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'named';
  errorMessage?: string;
}

export const validateAndParseColor = (input: string): ColorValidationResult => {
  const clean = input.trim();

  if (!clean) {
    return { isValid: false, errorMessage: 'Color value cannot be empty' };
  }

  if (clean.startsWith('#')) {
    const hexValue = clean.replace('#', '');

    if (/^[0-9A-Fa-f]{3}$/.test(hexValue)) {
      const normalized = `#${hexValue[0]}${hexValue[0]}${hexValue[1]}${hexValue[1]}${hexValue[2]}${hexValue[2]}`;
      return { isValid: true, correctedValue: normalized, format: 'hex' };
    }

    if (/^[0-9A-Fa-f]{6}$/.test(hexValue)) {
      return { isValid: true, correctedValue: clean.toLowerCase(), format: 'hex' };
    }

    if (/^[0-9A-Fa-f]{8}$/.test(hexValue)) {
      const withoutAlpha = `#${hexValue.substring(0, 6)}`;
      return { isValid: true, correctedValue: withoutAlpha.toLowerCase(), format: 'hex' };
    }

    if (/^[0-9A-Fa-f]*$/.test(hexValue) && hexValue.length <= 6) {
      const padded = hexValue.padEnd(6, '0');
      return { isValid: true, correctedValue: `#${padded}`, format: 'hex' };
    }

    return { isValid: false, errorMessage: 'Invalid hex format. Use #RGB, #RRGGBB, or #RRGGBBAA' };
  }

  const rgbMatch = clean.match(/^rgba?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)(?:\s*,\s*([\d.]+))?\s*\)$/i);
  if (rgbMatch) {
    const r = Math.round(parseFloat(rgbMatch[1]));
    const g = Math.round(parseFloat(rgbMatch[2]));
    const b = Math.round(parseFloat(rgbMatch[3]));
    const a = rgbMatch[4] ? parseFloat(rgbMatch[4]) : undefined;

    if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
      if (a !== undefined) {
        if (a >= 0 && a <= 1) {
          return { isValid: true, correctedValue: `rgba(${r}, ${g}, ${b}, ${a})`, format: 'rgba' };
        } else {
          return { isValid: false, errorMessage: 'Alpha value must be between 0 and 1' };
        }
      } else {
        return { isValid: true, correctedValue: `rgb(${r}, ${g}, ${b})`, format: 'rgb' };
      }
    }
    return { isValid: false, errorMessage: 'RGB values must be between 0 and 255' };
  }

  const hslMatch = clean.match(/^hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%(?:\s*,\s*([\d.]+))?\s*\)$/i);
  if (hslMatch) {
    const h = Math.round(parseFloat(hslMatch[1])) % 360;
    const s = Math.round(Math.min(parseFloat(hslMatch[2]), 100));
    const l = Math.round(Math.min(parseFloat(hslMatch[3]), 100));
    const a = hslMatch[4] ? parseFloat(hslMatch[4]) : undefined;

    if (h >= 0 && s >= 0 && s <= 100 && l >= 0 && l <= 100) {
      if (a !== undefined) {
        if (a >= 0 && a <= 1) {
          return { isValid: true, correctedValue: `hsla(${h}, ${s}%, ${l}%, ${a})`, format: 'hsla' };
        } else {
          return { isValid: false, errorMessage: 'Alpha value must be between 0 and 1' };
        }
      } else {
        return { isValid: true, correctedValue: `hsl(${h}, ${s}%, ${l}%)`, format: 'hsl' };
      }
    }
    return { isValid: false, errorMessage: 'HSL values: H(0-360), S(0-100%), L(0-100%)' };
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
    grey: '#808080',
    orange: '#ffa500',
    purple: '#800080',
    pink: '#ffc0cb',
    brown: '#a52a2a',
    lime: '#00ff00',
    navy: '#000080',
    teal: '#008080',
    silver: '#c0c0c0',
    gold: '#ffd700',
    indigo: '#4b0082',
    violet: '#ee82ee',
    turquoise: '#40e0d0',
    maroon: '#800000',
    olive: '#808000',
    aqua: '#00ffff',
    fuchsia: '#ff00ff',
  };

  const lowerCase = clean.toLowerCase();
  if (namedColors[lowerCase]) {
    return { isValid: true, correctedValue: namedColors[lowerCase], format: 'named' };
  }

  if (/^\w+$/.test(clean)) {
    return { isValid: false, errorMessage: `Unknown color name: ${clean}` };
  }

  return { isValid: false, errorMessage: 'Invalid color format. Use hex (#RGB), rgb(), hsl(), or color names' };
};

export const parseColorString = (input: string): string => {
  const result = validateAndParseColor(input);
  if (result.isValid && result.correctedValue) {
    if (result.format === 'hex' || result.format === 'named') {
      return result.correctedValue;
    }
    if (result.format === 'rgb' || result.format === 'rgba') {
      const rgbMatch = result.correctedValue.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (rgbMatch) {
        return rgbToHex({
          r: parseInt(rgbMatch[1]),
          g: parseInt(rgbMatch[2]),
          b: parseInt(rgbMatch[3]),
        });
      }
    }
    if (result.format === 'hsl' || result.format === 'hsla') {
      const hslMatch = result.correctedValue.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%/);
      if (hslMatch) {
        return hslToHex({
          h: parseInt(hslMatch[1]),
          s: parseInt(hslMatch[2]),
          l: parseInt(hslMatch[3]),
        });
      }
    }
  }
  return '#ff0000';
};

// Import functions from public for internal use
import { hslToHex, rgbToHex } from './public';

export function assertUnreachable(x: never): never {
  throw new Error(`You should never get here. Received: ${x}`);
}
