import { useState, useCallback } from 'react';
import type { ColorState, UseColorStateArrayReturn, ColorInput } from '../types';
import { createColorStateFromInput, colorStateToInput } from '../utils';

export const useColorState = (initialColor: ColorInput = { type: 'hex', value: '#ff6b9d' }): UseColorStateArrayReturn => {
  const [colorInput, setColorInput] = useState<ColorInput>(initialColor);
  const [colorState, setColorState] = useState<ColorState>(() => createColorStateFromInput(initialColor));

  const setColor = useCallback((newColorInput: ColorInput) => {
    try {
      const newColorState = createColorStateFromInput(newColorInput);
      const outputColorInput = colorStateToInput(newColorState, initialColor.type);

      setColorInput(outputColorInput);
      setColorState(newColorState);
    } catch (error) {
      console.warn('Invalid color input:', newColorInput, error);
    }
  }, []);

  return [
    {
      colorInput,
      colorState,
    },
    setColor,
  ];
};
