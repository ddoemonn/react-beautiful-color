"use client";

import React, { useMemo, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Palette, ArrowDown } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ColorPicker, useColorState } from "react-beautiful-color";

const cn = (...inputs: unknown[]) => twMerge(clsx(inputs));

const App: React.FC = () => {
  const { color, setColor } = useColorState("#ff00ff");
  const [isScrollComplete, setIsScrollComplete] = useState(false);

  const { scrollYProgress } = useScroll();

  // Simple scroll reveals
  const showSaturation = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const showHue = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
  const showAlpha = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);
  const showEyeDropper = useTransform(scrollYProgress, [0.75, 1], [0, 1]);
  const showInstall = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  
  // Check if scroll is complete
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setIsScrollComplete(latest > 0.85);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // Clean background without pattern
  const backgroundStyle = useMemo(() => {
    const backgroundColor = isScrollComplete ? 
      `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, 0.05)` : 
      '#fafafa';

    return {
      backgroundColor: backgroundColor,
      transition: 'background-color 0.5s ease'
    };
  }, [color.rgb.r, color.rgb.g, color.rgb.b, isScrollComplete]);

  return (
    <div 
      className="min-h-[500vh] transition-all duration-300"
      style={backgroundStyle}
    >
      {/* Fixed header */}
      <div className="fixed top-8 left-0 right-0 z-50 text-center">
        <h1 className="text-3xl md:text-5xl leading-tight tracking-tight">
          <span
            className={`font-[family-name:var(--font-inter)] font-black text-black transition-colors duration-200`}
          >
            react-
          </span>
          <span
            className={cn(
              "font-[family-name:var(--font-pacifico)] pr-2 transition-colors duration-200",
              !isScrollComplete && "bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500 bg-[length:300%_300%] bg-clip-text text-transparent animate-[gradient_3s_ease-in-out_infinite]"
            )}
            style={{
              color: isScrollComplete ? color.hex : undefined,
            }}
          >
            beautiful
          </span>
          <span
            className={`font-[family-name:var(--font-inter)] font-black text-black transition-colors duration-200`}
          >
            -color
          </span>
        </h1>
        {!isScrollComplete && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <Palette size={20} className="text-black opacity-70" />
          <p className={`text-lg text-black opacity-80 underline-offset-4`}>
            Scroll to craft your perfect color picker
          </p>
          <ArrowDown size={20} className="text-black opacity-70 mt-2 animate-bounce" />
        </div>
        )}
      </div>

      {/* Sticky/Fixed ColorPicker */}
      <div 
        className={`flex justify-center items-center pt-20 transition-all duration-500 ${
          isScrollComplete 
            ? 'fixed top-18 left-0 right-0 z-40' 
            : 'sticky top-32'
        }`}
      >
        <div className="relative  flex flex-col items-center justify-center">
          {/* Single ColorPicker with animated parts */}
          <ColorPicker
            color={color.hex}
            onChange={setColor}
            className="w-[280px] h-[280px]"
          >
            {/* Saturation */}
            <motion.div
              style={{ opacity: showSaturation }}
              className="flex-1 mb-3"
            >
              <ColorPicker.Saturation className="w-full h-full" />
            </motion.div>

            <div className="flex items-center gap-3 p-3 pt-0">
              {/* EyeDropper */}
              <motion.div style={{ opacity: showEyeDropper }}>
                <ColorPicker.EyeDropper />
              </motion.div>

              <div className="flex-1 flex flex-col gap-3">
                {/* Hue */}
                <motion.div style={{ opacity: showHue }}>
                  <ColorPicker.Hue className="h-4" />
                </motion.div>

                {/* Alpha */}
                <motion.div style={{ opacity: showAlpha }}>
                  <ColorPicker.Alpha className="h-4" />
                </motion.div>
              </div>
            </div>
          </ColorPicker>

          {/* Install section - appears when component building is complete - BELOW ColorPicker */}
          <motion.div 
            className="mt-16 text-center space-y-4"
            style={{ opacity: showInstall }}
          >
            
                           
            <div className="rounded-lg overflow-hidden inline-block shadow-xl">
              <SyntaxHighlighter
                language="bash"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: '16px 32px',
                  fontSize: '18px',
                  fontWeight: '700',
                  fontFamily: 'var(--font-geist-mono)',
                  borderRadius: '12px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                }}
              >
                npm install react-beautiful-color
              </SyntaxHighlighter>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Spacer for more scroll */}
      <div className="h-[200vh]"></div>
    </div>
  );
};

export default App;
