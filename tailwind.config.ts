import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00E5FF',
        'neon-purple': '#8B5CF6',
        'neon-blue': '#22D3EE',
        'neon-pink': '#F472B6',
        'neon-green': '#4ADE80',
        'dark-100': '#1E293B',
        'dark-200': '#0F172A',
        'dark-300': '#020617',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 10px #00E5FF, 0 0 20px #00E5FF, 0 0 40px rgba(0, 229, 255, 0.3)',
        'neon-purple': '0 0 10px #8B5CF6, 0 0 20px #8B5CF6, 0 0 40px rgba(139, 92, 246, 0.3)',
        'neon-blue': '0 0 10px #22D3EE, 0 0 20px #22D3EE, 0 0 40px rgba(34, 211, 238, 0.3)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.37)',
        'card': '0 4px 30px rgba(0, 229, 255, 0.1)',
        'card-hover': '0 8px 40px rgba(139, 92, 246, 0.25)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan-line': 'scanLine 3s linear infinite',
        'border-flow': 'borderFlow 3s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00E5FF, 0 0 10px #00E5FF' },
          '100%': { boxShadow: '0 0 20px #00E5FF, 0 0 40px #00E5FF, 0 0 60px rgba(0,229,255,0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        borderFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': "linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
    },
  },
  plugins: [],
};

export default config;
