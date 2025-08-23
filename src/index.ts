// Import CSS styles
import "./styles.css";

export { ColorPicker } from "./components/ColorPicker";

export { useColorState } from "./hooks/useColorState";

export {
  cn,
  parseColorString,
  createColorState,
  formatColorString,
  hexToRgb,
  rgbToHex,
  hsvToRgb,
  rgbToHsv,
  hsvToHex,
  hexToHsv,
  hslToRgb,
  rgbToHsl,
  hslToHex,
  hexToHsl,
  hsvToHsl,
  hslToHsv,
  isValidHex,
  normalizeHex,
  getContrastColor,
  randomHex,
  extractAlphaFromHex,
  stripAlphaFromHex,
} from "./utils";

export type {
  RgbColor,
  RgbaColor,
  HslColor,
  HslaColor,
  HsvColor,
  HsvaColor,
  HexColor,
  ColorFormat,
  ColorState,
  UseColorStateReturn,
  ColorPickerProps,
} from "./types";

export const version = "2.0.0";
