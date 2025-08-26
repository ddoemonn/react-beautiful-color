# react-beautiful-color

[![Image](https://i.hizliresim.com/5o05ik8.png)](https://hizliresim.com/5o05ik8)

The most flexible and beautiful color picker for React. Built with compound components for maximum customization.

## Why Choose This Over Others?

- **🧩 Compound Components** - Compose your own layout, unlike rigid alternatives
- **🎨 Beautiful Design** - Clean, modern UI that fits any design system
- **⚡ Powerful Hook** - `useColorState` with all color formats instantly available and type-safe input
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

function App() {
  const { color, setColor } = useColorState("#3b82f6");

  return (
    <ColorPicker color={color.hex} onChange={setColor}>
      <ColorPicker.Saturation className="flex-1 mb-3" />
      
      <div className="flex items-center gap-3 p-3 pt-0">
        <ColorPicker.EyeDropper />
        
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

```tsx
const { color, setColor } = useColorState("#3b82f6");

// Access all formats instantly
console.log(color.hex);   // "#3b82f6"
console.log(color.rgb);   // { r: 59, g: 130, b: 246 }
console.log(color.hsl);   // { h: 217, s: 91, l: 60 }

// Set any format with complete type safety
setColor({ type: 'hex', value: '#ff0000' });
setColor({ type: 'rgb', r: 255, g: 0, b: 0 });
setColor({ type: 'hsl', h: 0, s: 100, l: 50 });

// With alpha support
setColor({ type: 'rgba', r: 255, g: 0, b: 0, a: 0.5 });
setColor({ type: 'hsla', h: 0, s: 100, l: 50, a: 0.8 });
setColor({ type: 'hsva', h: 0, s: 100, v: 100, a: 0.9 });
```
