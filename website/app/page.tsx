"use client";

import React from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ColorPicker, useColorState } from "react-beautiful-color";
import { NPMIcon, GitHubIcon } from './components/Icons';

const App: React.FC = () => {
  const { color, setColor } = useColorState("#ff00ff");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="py-16 text-center">
        <h1 className="text-3xl md:text-5xl leading-tight tracking-tight">
          <span
            className={`font-[family-name:var(--font-inter)] font-black text-black transition-colors duration-200`}
          >
            react-
          </span>
          <span
            className="font-[family-name:var(--font-pacifico)] pr-2 transition-colors duration-200"
            style={{ color: color.hex }}
          >
            beautiful
          </span>
          <span
            className={`font-[family-name:var(--font-inter)] font-black text-black transition-colors duration-200`}
          >
            -color
          </span>
        </h1>
        <div className="flex flex-col items-center justify-center gap-3 mt-4">
          <p className="text-lg text-black opacity-80">
            The most flexible and beautiful color picker for React
          </p>
        </div>
      
        <div className="flex flex-col items-center justify-center gap-3 my-4 mb-0">
          {/* Header Links */}
          <div className="flex items-center gap-4 mt-2">
            <a 
              href="https://github.com/ddoemonn/react-beautiful-color"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 hover:bg-black/10 transition-colors duration-200 text-sm font-medium text-black/70 hover:text-black"
            >
              <GitHubIcon size={16} />
              <span>GitHub</span>
            </a>
            <a 
              href="https://www.npmjs.com/package/react-beautiful-color"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 hover:bg-black/10 transition-colors duration-200 text-sm font-medium text-black/70 hover:text-black"
            >
              <NPMIcon size={16} />
              <span>npm</span>
            </a>
          </div>
        </div>
      </div>

      {/* ColorPicker */}
      <div className="flex justify-center items-center">
        <div className="relative flex flex-col items-center justify-center">
          {/* ColorPicker */}
          <ColorPicker
            color={color.hex}
            onChange={setColor}
            className="w-[280px] h-[280px]"
          >
            {/* Saturation */}
            <div className="flex-1 mb-3">
              <ColorPicker.Saturation className="w-full h-full" />
            </div>

            <div className="flex items-center gap-3 p-3 pt-0">
              {/* EyeDropper */}
              <div>
                <ColorPicker.EyeDropper />
              </div>

              <div className="flex-1 flex flex-col gap-3">
                {/* Hue */}
                <div>
                  <ColorPicker.Hue className="h-4" />
                </div>

                {/* Alpha */}
                <div>
                  <ColorPicker.Alpha className="h-4" />
                </div>
              </div>
            </div>
          </ColorPicker>

          {/* Install section */}
          <div className="mt-16 text-center space-y-4">
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
          </div>
        </div>
      </div>


    </div>
  );
};

export default App;
