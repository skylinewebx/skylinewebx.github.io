/** Colours resolve to theme tokens in src/index.css — edit the palettes there. */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        background: v('background'),
        surface: v('surface'),
        foreground: v('foreground'),
        muted: v('muted'),
        border: v('border'),
        accent: v('accent'),
        'accent-foreground': v('accent-foreground'),
      },
      fontFamily: {
        display: ['Anton', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        site: '1440px',
      },
    },
  },
  plugins: [],
}
