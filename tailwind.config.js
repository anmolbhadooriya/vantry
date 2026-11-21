/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-base': 'var(--bg-base)',
        'bg-raised': 'var(--bg-raised)',
        'bg-surface': 'var(--bg-surface)',
        'bg-overlay': 'var(--bg-overlay)',
        'line-subtle': 'var(--line-subtle)',
        'line-strong': 'var(--line-strong)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          press: 'var(--accent-press)',
          wash: 'var(--accent-wash)',
        },
        'on-accent': 'var(--on-accent)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        'diff-highlight': 'var(--diff-highlight)',
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Geist"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        md: 'var(--radius-md)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        floating: '0 16px 40px -8px rgba(0, 0, 0, 0.7)',
        sheet: '0 -8px 32px rgba(0, 0, 0, 0.8)',
        glow: '0 0 20px rgba(232, 100, 44, 0.15)',
      },
      letterSpacing: {
        eyebrow: '0.08em',
        wordmark: '0.18em',
      }
    },
  },
  plugins: [],
}
