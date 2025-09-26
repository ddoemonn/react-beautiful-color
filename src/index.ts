// Import CSS styles
import './styles.css';

export { ColorPicker } from './components/ColorPicker';
export { ColorValue } from './components/ColorValue';
export { Toast } from './components/Toast';
export { ToastContainer } from './components/ToastContainer';

export { useColorState } from './hooks/useColorState';
export { useToast, useToastProvider } from './hooks/useToast';

// Export color utilities for public use
export * from './utils';

export type { ColorFormat, ColorPickerProps, HexColor, HslaColor, HslColor, HsvaColor, HsvColor, RgbaColor, RgbColor } from './types';

export { Color } from './types';

export const version = '2.0.0';
