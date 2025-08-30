// Import CSS styles
import './styles.css';

export { ColorPicker } from './components/ColorPicker';

export { useColorState } from './hooks/useColorState';

// Export color utilities for public use
export * from './utils';

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
} from './types';

export const version = '2.0.0';
