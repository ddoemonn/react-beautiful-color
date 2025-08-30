# react-beautiful-color

[![Image](https://i.hizliresim.com/5o05ik8.png)](https://hizliresim.com/5o05ik8)

The most flexible and beautiful color picker for React. Built with compound components for maximum customization.

## Why Choose This Over Others?

- **🧩 Compound Components** - Compose your own layout, unlike rigid alternatives
- **🎨 Beautiful Design** - Clean, modern UI that fits any design system
- **⚡ Smart Hook** - `useColorState` preserves your input format while providing all color formats instantly
- **🪶 Lightweight** - Pure Tailwind CSS, no external dependencies
- **🛠️ Fully Customizable** - Style and arrange components however you want

## Installation

```bash
npm install react-beautiful-color
```

## Usage

**1. Add CSS to your layout file:**

```tsx
// app/layout.tsx (Next.js) or pages/_app.tsx or index.tsx
import 'react-beautiful-color/dist/react-beautiful-color.css';
```

**2. Use the component:**

```tsx
import { ColorPicker, useColorState } from 'react-beautiful-color';
import { Pipette } from 'lucide-react';

function App() {
  const [{ colorInput, colorState }, setColor] = useColorState({ type: 'hex', value: '#3b82f6' });

  return (
    <ColorPicker color={colorInput} onChange={setColor}>
      <ColorPicker.Saturation className="flex-1 mb-3" />
      
      <div className="flex items-center gap-3 p-3 pt-0">
        <ColorPicker.EyeDropper>
          <Pipette />
        </ColorPicker.EyeDropper>
        
        <div className="flex-1 flex flex-col gap-3">
          <ColorPicker.Hue className="h-4" />
          <ColorPicker.Alpha className="h-4" />
        </div>
      </div>
    </ColorPicker>
  );
}
```

## Powerful State Hook

The `useColorState` hook returns an array with the current state and setter, similar to `useState`. The first element contains both the original input format and all color formats.

```tsx
const [{ colorInput, colorState }, setColor] = useColorState({ type: 'hsva', h: 334, s: 100, v: 100, a: 0.5 });

// colorInput maintains your original format - stays as HSVA!
console.log(colorInput);  // { type: 'hsva', h: 334, s: 100, v: 100, a: 0.5 }

// colorState provides all formats instantly
console.log(colorState.hex);   // "#ff6b9d"
console.log(colorState.rgb);   // { r: 255, g: 107, b: 157 }
console.log(colorState.hsl);   // { h: 334, s: 100, l: 71 }
console.log(colorState.hsv);   // { h: 334, s: 58, v: 100 }
console.log(colorState.alpha); // 0.5

// Set any format with complete type safety
setColor({ type: 'hex', value: '#ff0000' });
setColor({ type: 'rgb', r: 255, g: 0, b: 0 });
setColor({ type: 'hsl', h: 0, s: 100, l: 50 });

// With alpha support
setColor({ type: 'rgba', r: 255, g: 0, b: 0, a: 0.5 });
setColor({ type: 'hsla', h: 0, s: 100, l: 50, a: 0.8 });
setColor({ type: 'hsva', h: 0, s: 100, v: 100, a: 0.9 });

// 🎯 Format preservation: If you initialize with HSVA, colorInput will always return HSVA format!
```

<a href="https://www.buymeacoffee.com/ozergklp" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
