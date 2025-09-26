// Import CSS styles
import './styles.css';

export { ColorPicker } from './components/ColorPicker';
export { ColorInput } from './components/ColorInput';

export { useColorState } from './hooks/useColorState';

// Export color utilities for public use
export * from './utils';

export type { ColorFormat, ColorPickerProps, HexColor, HslaColor, HslColor, HsvaColor, HsvColor, RgbaColor, RgbColor } from './types';
export type { ColorInputProps } from './components/ColorInput';
export type { ColorValidationResult } from './utils/internal';
export { validateAndParseColor } from './utils/internal';

export { Color } from './types';

export const version = '2.0.0';
