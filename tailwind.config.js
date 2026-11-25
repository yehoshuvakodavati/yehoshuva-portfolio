/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: 'rgb(var(--bg-rgb) / <alpha-value>)',
        elev: 'rgb(var(--elev-rgb) / <alpha-value>)',
        ink: 'rgb(var(--ink-rgb) / <alpha-value>)',
        mute: 'rgb(var(--mute-rgb) / <alpha-value>)',
        faint: 'rgb(var(--faint-rgb) / <alpha-value>)',
        accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
        violet: 'rgb(var(--violet-rgb) / <alpha-value>)',
        cyan: 'rgb(var(--cyan-rgb) / <alpha-value>)',
        line: 'var(--line)',
        lineStrong: 'var(--line-strong)',
        glass: 'var(--glass)',
        glassStrong: 'var(--glass-strong)',
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        tightest: '-0.055em',
        widest2: '0.32em',
      },
      maxWidth: {
        shell: '1240px',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(900%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.7' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-14px,0)' },
        },
      },
      animation: {
        'scan-line': 'scan-line 7s linear infinite',
        marquee: 'marquee 38s linear infinite',
        'pulse-ring': 'pulse-ring 2.8s cubic-bezier(0.16,1,0.3,1) infinite',
        drift: 'drift 9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
