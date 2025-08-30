'use client';

import Link from 'next/link';
import { Palette, Zap, Code, Sparkles, Pipette, Github, Package, Coffee, Heart } from 'lucide-react';
import { ColorPicker, useColorState } from 'react-beautiful-color';

export default function HomePage() {
  const { color, setColor } = useColorState({ type: 'hsva', h: 334, s: 100, v: 100, a: 0.5 });

  return (
    <main className="flex flex-1 flex-col">
      {/* Hero Section */}
      <section className="flex flex-1 flex-col justify-center px-6 py-12 pb-28 text-center">
        <div className="mx-auto max-w-4xl">
          {/* Badge */}
          <div className="border-fd-border bg-fd-card text-fd-muted-foreground mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 pt-0 text-sm">
            <Sparkles className="h-4 w-4" />
            Beautiful • Flexible • Type-Safe
          </div>

          {/* Hero Title */}
          <div className="text-center dark:text-white">
            <h1 className="text-6xl leading-tight tracking-tight md:text-5xl">
              <span className="font-[family-name:var(--font-inter)] font-black text-black transition-colors duration-200 dark:text-white">react-</span>
              <span
                className="pr-2 font-[family-name:var(--font-pacifico)] transition-colors duration-200"
                style={{ color: color.hex }}
              >
                beautiful
              </span>
              <span className="font-[family-name:var(--font-inter)] font-black text-black transition-colors duration-200 dark:text-white">-color</span>
            </h1>
            <div className="mt-4 flex flex-col items-center justify-center gap-3">
              <p className="text-lg text-black opacity-80 dark:text-white">The most flexible and beautiful color picker for React</p>
            </div>

            <div className="my-6 flex flex-col items-center justify-center gap-3">
              {/* Social Links */}
              <div className="my-2 flex items-center gap-3">
                <a
                  href="https://github.com/ddoemonn/react-beautiful-color"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-black/5 px-4 py-2 text-sm font-medium text-black/70 transition-all duration-200 hover:scale-105 hover:bg-black/10 hover:text-black dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/20 dark:hover:text-white"
                >
                  <Github
                    size={16}
                    className="transition-transform group-hover:rotate-12"
                  />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.npmjs.com/package/react-beautiful-color"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-all duration-200 hover:scale-105 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                >
                  <Package
                    size={16}
                    className="group-hover:bounce transition-transform"
                  />
                  <span>npm</span>
                </a>
                <Link
                  href="/docs"
                  className="group inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-all duration-200 hover:scale-105 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
                >
                  <Sparkles
                    size={16}
                    className="transition-transform group-hover:rotate-12"
                  />
                  <span>Docs</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Hero Subtitle */}

          <div className="flex w-full justify-center">
            <ColorPicker
              color={{ type: 'hsva', h: color.hsv.h, s: color.hsv.s, v: color.hsv.v, a: color.alpha }}
              onChange={setColor}
              className="border-fd-border rounded-2xl border bg-white shadow-lg dark:bg-black/200"
            >
              <ColorPicker.Saturation className="mb-3 flex-1" />

              <div className="flex items-center gap-3 p-3 pt-0">
                <ColorPicker.EyeDropper className="hover:bg-black/10 dark:hover:bg-white/10">
                  <Pipette
                    size={20}
                    className="text-black dark:text-white"
                  />
                </ColorPicker.EyeDropper>

                <div className="flex flex-1 flex-col gap-3">
                  <ColorPicker.Hue className="h-4" />
                  <ColorPicker.Alpha className="h-4" />
                </div>
              </div>
            </ColorPicker>
          </div>

          {/* Made with love */}
          <div className="mt-20 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Made with</span>
              <Heart
                size={14}
                className="animate-pulse text-red-500"
              />
              <span>for</span>
              <div className="flex items-center gap-1">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.682-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.866.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"
                    fill="#61DAFB"
                  />
                </svg>
                <span className="font-medium text-[#61DAFB]">React</span>
              </div>
              <span>by</span>
              <Link
                href="https://github.com/ddoemonn"
                className="font-semibold hover:underline"
              >
                Özer Gökalpsezer
              </Link>
            </div>
            <a
              href="https://buymeacoffee.com/ozergklp?status=1"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-700 transition-all duration-200 hover:scale-105 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400 dark:hover:bg-yellow-900/30"
            >
              <Coffee
                size={16}
                className="group-hover:pulse transition-transform"
              />
              <span>Buy me a coffee</span>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-fd-border bg-fd-muted/30 border-t px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Why Choose React Beautiful Color?</h2>
            <p className="text-fd-muted-foreground mx-auto max-w-2xl text-lg">
              Built for developers who care about flexibility, performance, and beautiful user experiences.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="border-fd-border bg-fd-card rounded-lg border p-6 text-center transition-shadow hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Compound Components</h3>
              <p className="text-fd-muted-foreground">Compose your own layout with flexible compound components. No rigid UI constraints.</p>
            </div>

            {/* Feature 2 */}
            <div className="border-fd-border bg-fd-card rounded-lg border p-6 text-center transition-shadow hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20">
                <Palette className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Beautiful Design</h3>
              <p className="text-fd-muted-foreground">Clean, modern UI that fits any design system. Built with Tailwind CSS for easy customization.</p>
            </div>

            {/* Feature 3 */}
            <div className="border-fd-border bg-fd-card rounded-lg border p-6 text-center transition-shadow hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
                <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Powerful Hook</h3>
              <p className="text-fd-muted-foreground">useColorState hook with all color formats instantly available and complete type safety.</p>
            </div>

            {/* Feature 4 */}
            <div className="border-fd-border bg-fd-card rounded-lg border p-6 text-center transition-shadow hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/20">
                <Sparkles className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Lightweight</h3>
              <p className="text-fd-muted-foreground">Pure Tailwind CSS with no external dependencies. Small bundle size, maximum performance.</p>
            </div>

            {/* Feature 5 */}
            <div className="border-fd-border bg-fd-card rounded-lg border p-6 text-center transition-shadow hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100 dark:bg-pink-900/20">
                <Code className="h-6 w-6 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Type-Safe</h3>
              <p className="text-fd-muted-foreground">Full TypeScript support with discriminated unions for color inputs and complete type safety.</p>
            </div>

            {/* Feature 6 */}
            <div className="border-fd-border bg-fd-card rounded-lg border p-6 text-center transition-shadow hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/20">
                <Palette className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Eye Dropper</h3>
              <p className="text-fd-muted-foreground">Built-in eye dropper support for picking colors from anywhere on the screen.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
