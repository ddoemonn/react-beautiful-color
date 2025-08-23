import React, { useState, useEffect, useCallback, useRef, createContext, useContext } from "react";
import { Saturation } from "./Saturation";
import { Hue } from "./Hue";
import { Alpha } from "./Alpha";
import { EyedropperIcon } from "./EyedropperIcon";
import type { ColorPickerProps } from "../types";
import { hexToHsv, hsvToHex, parseColorString, cn } from "../utils";

interface HsvaColor {
  h: number;
  s: number;
  v: number;
  a: number;
}

interface ColorPickerContextType {
  hsva: HsvaColor;
  updateHsva: (params: Partial<HsvaColor>) => void;
  handleEyeDropper: () => void;
}

const ColorPickerContext = createContext<ColorPickerContextType | null>(null);

const useColorPickerContext = () => {
  const context = useContext(ColorPickerContext);
  if (!context) {
    throw new Error('ColorPicker compound components must be used within a ColorPicker');
  }
  return context;
};

interface ColorPickerMainProps extends Omit<ColorPickerProps, 'withEyeDropper'> {
  children?: React.ReactNode;
}

const ColorPickerMain: React.FC<ColorPickerMainProps> = ({
  color = "#ff6b9d",
  onChange,
  className,
  children,
  ...rest
}) => {
  const [hsva, setHsva] = useState<HsvaColor>(() => {
    const normalizedHex = parseColorString(color);
    const hsv = hexToHsv(normalizedHex);
    return { ...hsv, a: 1 };
  });

  const lastExternalColor = useRef(color);
  const isInternalUpdate = useRef(false);

  useEffect(() => {
    if (color !== lastExternalColor.current && !isInternalUpdate.current) {
      const normalizedColor = parseColorString(color);
      const newHsv = hexToHsv(normalizedColor);
      setHsva((current) => ({ ...newHsv, a: current.a }));
      lastExternalColor.current = color;
    }
    isInternalUpdate.current = false;
  }, [color]);

  const updateHsva = useCallback(
    (params: Partial<HsvaColor>) => {
      setHsva((current) => {
        const updated = { ...current, ...params };

        let newColor: string;
        if (updated.a < 1) {
          const hex = hsvToHex({ h: updated.h, s: updated.s, v: updated.v });
          const alphaHex = Math.round(updated.a * 255)
            .toString(16)
            .padStart(2, "0");
          newColor = hex + alphaHex;
        } else {
          newColor = hsvToHex({ h: updated.h, s: updated.s, v: updated.v });
        }

        if (newColor !== lastExternalColor.current) {
          isInternalUpdate.current = true;
          lastExternalColor.current = newColor;
          setTimeout(() => onChange?.(newColor), 0);
        }

        return updated;
      });
    },
    [onChange],
  );

  const handleEyeDropper = useCallback(async () => {
    if (!("EyeDropper" in window)) {
      console.log("EyeDropper API not supported");
      return;
    }

    try {
      // @ts-expect-error EyeDropper API not in TypeScript types yet
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      if (result.sRGBHex) {
        const normalizedColor = parseColorString(result.sRGBHex);
        const newHsv = hexToHsv(normalizedColor);

        setHsva((current) => ({ ...newHsv, a: current.a }));

        isInternalUpdate.current = true;
        lastExternalColor.current = result.sRGBHex;

        setTimeout(() => onChange?.(result.sRGBHex), 0);
      }
    } catch (error) {
      console.log("EyeDropper cancelled or failed:", error);
    }
  }, [onChange]);

  const contextValue: ColorPickerContextType = {
    hsva,
    updateHsva,
    handleEyeDropper,
  };

  console.log("🎨 ColorPicker Main rendering with hsva:", hsva);

  return (
    <ColorPickerContext.Provider value={contextValue}>
      <div
        {...rest}
        className={cn(
          "relative flex flex-col w-[280px] h-[280px] select-none cursor-default bg-white rounded-2xl shadow-lg",
          className,
        )}
      >
        {children}
      </div>
    </ColorPickerContext.Provider>
  );
};

interface CompoundSaturationProps {
  className?: string;
}

const CompoundSaturation: React.FC<CompoundSaturationProps> = ({ className }) => {
  console.log("🟦 CompoundSaturation rendering!");
  const { hsva, updateHsva } = useColorPickerContext();
  
  const handleSaturationChange = useCallback((newColor: { s: number; v: number }) => {
    console.log("🟦 Saturation change:", newColor);
    updateHsva(newColor);
  }, [updateHsva]);
  
  return (
    <Saturation 
      hsva={hsva} 
      onChange={handleSaturationChange} 
      className={className} 
    />
  );
};

interface CompoundHueProps {
  className?: string;
}

const CompoundHue: React.FC<CompoundHueProps> = ({ className }) => {
  console.log("🌈 CompoundHue rendering!");
  const { hsva, updateHsva } = useColorPickerContext();
  
  const handleHueChange = useCallback((newHue: { h: number }) => {
    console.log("🌈 Hue change:", newHue);
    updateHsva(newHue);
  }, [updateHsva]);
  
  return (
    <Hue 
      hue={hsva.h} 
      onChange={handleHueChange} 
      className={className} 
    />
  );
};

interface CompoundAlphaProps {
  className?: string;
}

const CompoundAlpha: React.FC<CompoundAlphaProps> = ({ className }) => {
  console.log("🔘 CompoundAlpha rendering!");
  const { hsva, updateHsva } = useColorPickerContext();
  
  const handleAlphaChange = useCallback((newAlpha: { a: number }) => {
    console.log("🔘 Alpha change:", newAlpha);
    updateHsva(newAlpha);
  }, [updateHsva]);
  
  return (
    <Alpha 
      hsva={hsva} 
      onChange={handleAlphaChange} 
      className={className} 
    />
  );
};

interface CompoundEyeDropperProps {
  className?: string;
  size?: number;
  title?: string;
  children?: React.ReactNode;
}

const CompoundEyeDropper: React.FC<CompoundEyeDropperProps> = ({ 
  className, 
  size = 18, 
  title = "Pick color from screen",
  children 
}) => {
  console.log("👁️ CompoundEyeDropper rendering!");
  const { handleEyeDropper } = useColorPickerContext();
  
  return (
    <button
      onClick={handleEyeDropper}
      className={cn(
        "flex-shrink-0 w-10 h-10 hover:bg-gray-100 cursor-pointer rounded-lg flex items-center justify-center transition-colors",
        className
      )}
      title={title}
    >
      {children || <EyedropperIcon size={size} />}
    </button>
  );
};

export const ColorPicker = Object.assign(ColorPickerMain, {
  Saturation: CompoundSaturation,
  Hue: CompoundHue,
  Alpha: CompoundAlpha,
  EyeDropper: CompoundEyeDropper,
});