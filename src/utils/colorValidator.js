export const validateColor = (color) => {
  if (!color) return { isValid: false, format: null };

  // HEX: #fff or #ffffff
  const hexRegex = /^#([A-Fa-f0-9]{3}){1,2}$/;
  if (hexRegex.test(color)) return { isValid: true, format: 'HEX' };

  // RGB: rgb(255, 0, 0) or rgba(255, 0, 0, 1)
  const rgbRegex = /^rgba?\((\s*\d+\s*,\s*){2}\s*\d+\s*(,\s*(0|1|0?\.\d+)\s*)?\)$/;
  if (rgbRegex.test(color)) return { isValid: true, format: 'RGB' };

  // HSL: hsl(120, 100%, 50%) or hsla(...)
  const hslRegex = /^hsla?\((\s*\d+\s*,\s*){2}\s*\d+%\s*(,\s*(0|1|0?\.\d+)\s*)?\)$/;
  if (hslRegex.test(color)) return { isValid: true, format: 'HSL' };

  // CSS Named Colors: Validating via browser DOM
  const s = new Option().style;
  s.color = color;
  if (s.color !== '') return { isValid: true, format: 'CSS Name' };

  return { isValid: false, format: null };
};
