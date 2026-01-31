import type { Config } from 'tailwindcss';

const config: Config = {
  // 1. CRITICAL: Enable class-based dark mode
  darkMode: 'class', 

  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    // 2. Ensure your monorepo packages are scanned
    '../../packages/ui/src/**/*.{ts,tsx}', 
    './node_modules/@deeprubric/ui/**/*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        // We keep your brand colors but let Tailwind handle the rest of the palette
        primary: '#1E40AF',
        secondary: '#F59E0B',
        success: '#16A34A',
        warning: '#FBBF24',
        danger: '#DC2626',
        // Expert Tip: Don't override 'gray' manually unless you have to. 
        // Tailwind's 'slate' or 'zinc' palettes are better for Dark Mode.
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      // Note: I removed the restricted 'spacing' and 'borderRadius' 
      // so you can use classes like rounded-[2.5rem] and pt-80.
    },
  },
  plugins: [],
};

export default config;